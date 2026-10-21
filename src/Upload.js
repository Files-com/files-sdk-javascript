import Api from './Api'
import * as errors from './Errors'
import Files from './Files'
import {
  MAX_TIMER_MS,
  abortReason,
  concurrencyOptions,
  controlOf,
  controllerFor,
  createController,
  createProgress,
  delay,
  linkedSignal,
  scopeOf,
} from './Transfer'
import { pathNormalizer } from './utils'

// An upload's one owner, from its first begin_upload to its completion, following the public REST upload guide
// (https://developers.files.com/rest/files/files/#upload-file-optimized): the grants begin_upload gives for its parts,
// asked for in batches and matched to their parts by number and to the upload by its ref and path; how the parts are
// planned, by the client when the destination and the grant permit it, otherwise as the grants size them; each part's
// request, as its grant's http_method, headers, parameters and send instructions place its bytes; reading the source as
// bytes, whatever chunks it gives; sending each part, retrying only a failed part that may be sent again, renewing a
// grant whose URL has expired; and completing the upload with its exact size and every part's ETag. The File model's
// upload methods are its entry points.

const MIB = 1024 * 1024
const GIB = 1024 * MIB

// S3's multipart limits, as Amazon documents them (https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html):
// parts numbered 1 to 10,000, each from 5 MiB to 5 GiB, the last of which may be smaller. They apply to uploads to S3,
// whether Files.com's own storage or a customer's bucket, never to a remote server integration or a Files Agent.
const S3_MAX_PARTS = 10000
const S3_MIN_PART_BYTES = 5 * MIB
const S3_MAX_PART_BYTES = 5 * GIB

// The part size a client-planned upload prefers: small enough to bound the memory held and the bytes sent again on a
// retry, large enough for a few hundred megabytes in flight at the default concurrency. A larger file uses larger
// parts, to fit its destination's part budget.
const PREFERRED_PART_BYTES = 8 * MIB

// How many parts' grants one begin_upload asks for at most, how many it asks for ahead of an upload of unknown size,
// and how few unused grants an upload keeps before asking for the next batch.
const GRANT_BATCH = 32
const UNKNOWN_SIZE_GRANT_BATCH = 4
const GRANT_PREFETCH = 8

// The wait before a part is sent again after a failure other than a throttle (see retry-logic).
const STORAGE_RETRY_MS = 100

// The upload parameters begin_upload takes, besides those the upload sets itself; those that the upload's completion
// takes too; and those that belong to the upload itself, which a caller's params cannot set.
const BEGIN_PARAMETERS = ['buffered_upload', 'mkdir_parents', 'restart', 'with_rename']
const SHARED_PARAMETERS = ['buffered_upload', 'mkdir_parents', 'with_rename']
const OWN_PARAMETERS = ['action', 'etags', 'part', 'parts', 'ref', 'size', 'with_direct_connection_info']

// Headers that the request's transport sets from its body itself, never from a grant.
const TRANSPORT_HEADERS = ['connection', 'content-length', 'host', 'transfer-encoding']

// The send instructions a grant can give, and the query keys of a remote server integration's or Files Agent's part
// numbering, which a client-planned part replaces.
const SEND_KEYS = ['Content-Type', 'file', 'partdata', 'partsize']
const OFFSET_KEYS = ['offset', 'partNumber', 'part_number', 'part_offset']

// The content type a part's own Content-Type instruction is given: the bytes' type, which the upload does not know.
const PART_CONTENT_TYPE = 'application/octet-stream'

const encoder = new globalThis.TextEncoder()

const uploadError = (message, code) => new errors.FilesError(message, code)

const isPlainObject = value => typeof value === 'object' && value !== null && !Array.isArray(value)

const isNonEmptyString = value => typeof value === 'string' && value !== ''

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

// Bytes of value, a view of any kind, without copying them.
const viewOf = value => (value instanceof Uint8Array
  ? value
  : new Uint8Array(value.buffer, value.byteOffset, value.byteLength))

// The bytes of a view, copied into memory of their own: a real copy, whatever the view is. A Node.js Buffer's own
// slice() would share its memory instead.
const copyOf = view => {
  const copy = new Uint8Array(view.length)
  copy.set(view)
  return copy
}

// The number of bytes of a string's UTF-8, as TextEncoder gives it, a lone surrogate as U+FFFD, without encoding it.
const utf8Length = string => {
  let length = 0
  let index = 0

  while (index < string.length) {
    const unit = string.charCodeAt(index)
    const next = index + 1 < string.length ? string.charCodeAt(index + 1) : 0

    if (unit < 0x80) {
      length += 1
    } else if (unit < 0x800) {
      length += 2
    } else if (unit >= 0xd800 && unit <= 0xdbff && next >= 0xdc00 && next <= 0xdfff) {
      length += 4
      index += 1
    } else {
      length += 3
    }

    index += 1
  }

  return length
}

// The bytes of an upload chunk, a string or a byte view, counted without copying it.
const byteLengthOf = chunk => {
  if (typeof chunk === 'string') {
    return utf8Length(chunk)
  }

  if (ArrayBuffer.isView(chunk)) {
    return chunk.byteLength
  }

  throw new errors.InvalidParameterError('Bad parameter: upload data chunks must be strings or bytes')
}

// One array of chunks' bytes, in order, in memory of its own, of length bytes: each string's UTF-8 encoded into it
// and each view's bytes copied, so that changing the caller's chunks afterwards changes nothing in it.
const copiedChunks = (chunks, length) => {
  const bytes = new Uint8Array(length)
  let offset = 0

  chunks.forEach(chunk => {
    if (typeof chunk === 'string') {
      offset += encoder.encodeInto(chunk, bytes.subarray(offset)).written
    } else {
      bytes.set(viewOf(chunk), offset)
      offset += chunk.byteLength
    }
  })

  return bytes
}

// Whether bytes hold sequence, anywhere.
const containsSequence = (bytes, sequence) => {
  let at = bytes.indexOf(sequence[0])

  while (at !== -1 && at + sequence.length <= bytes.length) {
    let index = 1

    while (index < sequence.length && bytes[at + index] === sequence[index]) {
      index += 1
    }

    if (index === sequence.length) {
      return true
    }

    at = bytes.indexOf(sequence[0], at + 1)
  }

  return false
}

// A whole number a grant gives, such as a part size or number: a safe integer, or decimal digits that make one; null
// when it gives none.
const wholeNumber = (value, name, partNumber) => {
  if (value === undefined || value === null || value === '') {
    return null
  }

  const number = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value

  if (!Number.isSafeInteger(number) || number < 0) {
    throw uploadError(`The upload grant for part ${partNumber} has an invalid ${name}`)
  }

  return number
}

// A grant's headers or parameters: names and their exact values, as strings.
const exactValues = (value, name, partNumber) => {
  if (value === undefined || value === null) {
    return {}
  }

  if (!isPlainObject(value)) {
    throw uploadError(`The upload grant for part ${partNumber} has invalid ${name}`)
  }

  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    if (!['boolean', 'number', 'string'].includes(typeof item)) {
      throw uploadError(`The upload grant for part ${partNumber} has an invalid value for ${name} ${key}`)
    }

    return [key, `${item}`]
  }))
}

// Whether direct_connection_info identifies a remote server integration or Files Agent destination, as the shared rule
// validates it: version 1, a server name, at least one address, a direct URI and a CA certificate.
const isDirectConnection = info => isPlainObject(info)
  && info.version === 1
  && isNonEmptyString(info.server_name)
  && Array.isArray(info.addresses)
  && info.addresses.length > 0
  && info.addresses.every(isNonEmptyString)
  && isNonEmptyString(info.direct_uri)
  && isNonEmptyString(info.ca_pem)

// The kind of destination a grant's own answer identifies: 'remote' for a remote server integration or Files Agent,
// otherwise 's3', whatever its URL looks like.
const destinationOf = grant => (isDirectConnection(grant.data.direct_connection_info) ? 'remote' : 's3')

// A site path within a workspace, as the site names one: _/Workspaces/<id>/<path>.
const SITE_WORKSPACE_PATH = /^_\/workspaces\/([^/]+)\/(.*)$/i

// Where a path is, as the SDK normalizes paths (see utils/pathNormalizer): { named, path, workspace }, the workspace
// its site path names (named), or else workspace, the one its request acts in, or null when that is not known; and
// the path within that workspace.
const locate = (path, workspace) => {
  const normalized = pathNormalizer.normalize(`${path}`)
  const site = SITE_WORKSPACE_PATH.exec(normalized)

  if (site) {
    return { named: true, path: site[2], workspace: site[1].toLowerCase() }
  }

  return { named: false, path: normalized, workspace }
}

const folderOf = path => (path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '')

// The rule binding the grants of an upload to destinationPath, asked for in workspace, the one its request names, or
// none: bind(grant) throws when a grant declares a path that is not this upload's, before anything is sent for it. A
// grant may leave its path out. The first declared path binds the upload, in its workspace: the request's own, or the
// one the destination path names as a site path, or, when neither names one, the one the API's own answer names, as a
// site path, which then holds for the whole upload; a path without a workspace is in the request's own. Within that
// workspace it must be the same path, as pathNormalizer.same() compares paths, or, only with renames (with_rename),
// another file in the same folder, as the API names a renamed upload. Every later declared path must be that same
// file, in that same workspace, whichever form it takes. No path crosses into another workspace, rename or not.
const pathBindingOf = ({ destinationPath, renames = false, workspace: requestWorkspace = null }) => {
  const workspace = requestWorkspace === null || requestWorkspace === undefined || `${requestWorkspace}` === ''
    ? null
    : `${requestWorkspace}`.toLowerCase()

  const requested = locate(destinationPath, workspace)
  let boundWorkspace = requested.workspace
  let namedByApi = false
  let boundPath = null

  return {
    bind: grant => {
      if (grant.path === null) {
        return
      }

      const refuse = () => uploadError(`The upload grant for part ${grant.partNumber} is for ${grant.path}, not ${destinationPath}, which this upload is for`)
      const declared = locate(grant.path, workspace)

      if (declared.named) {
        if (boundWorkspace === null) {
          boundWorkspace = declared.workspace
          namedByApi = true
        } else if (declared.workspace !== boundWorkspace) {
          throw refuse()
        }
      } else if (boundWorkspace !== workspace && !namedByApi) {
        throw refuse()
      }

      if (boundPath !== null) {
        if (!pathNormalizer.same(declared.path, boundPath)) {
          throw refuse()
        }

        return
      }

      const same = pathNormalizer.same(declared.path, requested.path)
      const renamed = renames && declared.path !== '' && pathNormalizer.same(folderOf(declared.path), folderOf(requested.path))

      if (!same && !renamed) {
        throw refuse()
      }

      boundPath = declared.path
    },
  }
}

// One part's grant, from begin_upload's answer, checked: its URL, method, headers, parameters, send instructions, size,
// number, the path it declares, if any, and the upload's ref, which a later grant must keep. partNumber is the part it
// is for when the answer does not say.
const grantOf = (data, partNumber, ref) => {
  if (!isPlainObject(data)) {
    throw uploadError(`The upload grant for part ${partNumber} is not an object`)
  }

  const number = wholeNumber(data.part_number, 'part_number', partNumber) ?? partNumber

  if (number === null || number < 1) {
    throw uploadError('An upload grant has no part_number')
  }

  if (!isNonEmptyString(data.upload_uri)) {
    throw uploadError(`The upload grant for part ${number} has no upload_uri`)
  }

  if (ref !== null && data.ref !== undefined && data.ref !== null && data.ref !== ref) {
    throw uploadError(`The upload grant for part ${number} belongs to another upload`)
  }

  if (data.path !== undefined && data.path !== null && typeof data.path !== 'string') {
    throw uploadError(`The upload grant for part ${number} has an invalid path`)
  }

  const send = exactValues(data.send, 'send', number)
  const unknown = Object.keys(send).find(key => !SEND_KEYS.includes(key))

  if (unknown) {
    throw uploadError(`The upload grant for part ${number} gives a send instruction this SDK does not support: ${unknown}`)
  }

  return {
    availableParts: wholeNumber(data.available_parts, 'available_parts', number),
    data,
    expires: typeof data.expires === 'string' ? data.expires : undefined,
    headers: exactValues(data.headers, 'headers', number),
    method: isNonEmptyString(data.http_method) ? data.http_method.toUpperCase() : 'PUT',
    parallel: data.parallel_parts === true,
    parameters: exactValues(data.parameters, 'parameters', number),
    partNumber: number,
    partSize: wholeNumber(data.partsize, 'partsize', number),
    path: isNonEmptyString(data.path) ? data.path : null,
    ref: isNonEmptyString(data.ref) ? data.ref : ref,
    retry: data.retry_parts !== false,
    send,
    url: data.upload_uri,
  }
}

// The grants of one begin_upload answer, an array or a single grant, for parts firstPart through firstPart + count -
// 1 of the upload whose ref is ref (null for its first). A grant that does not give its part_number is for firstPart,
// and only an answer of one grant may leave it out. A grant for another part, or for the same part twice, fails.
const grantsOf = (answer, { count, firstPart, ref }) => {
  const list = Array.isArray(answer) ? answer : [answer]

  if (list.length === 0) {
    throw uploadError(`The API gave no upload grant for part ${firstPart}`)
  }

  const seen = new Set()

  return list.map(data => {
    const grant = grantOf(data, list.length === 1 ? firstPart : null, ref)

    if (grant.partNumber < firstPart || grant.partNumber >= firstPart + count || seen.has(grant.partNumber)) {
      throw uploadError(`The API gave an upload grant for part ${grant.partNumber}, which was not asked for`)
    }

    seen.add(grant.partNumber)
    return grant
  })
}

// Where one value of a send instruction goes: { at: 'body' }, { at: 'header', name } or { at: 'parameter', name }.
const placementOf = (key, value, partNumber) => {
  if (value === 'body') {
    return { at: 'body' }
  }

  const [, at, name] = /^required-(header|parameter) (.+)$/.exec(value) ?? []

  if (!at || name.trim() === '') {
    throw uploadError(`The upload grant for part ${partNumber} puts ${key} where this SDK cannot: ${value}`)
  }

  return { at, name: name.trim() }
}

// The names a signed S3 URL's signature covers, from its X-Amz-SignedHeaders, in lowercase.
const signedHeadersOf = url => {
  try {
    const signed = [...new URL(url).searchParams.entries()].find(([key]) => key.toLowerCase() === 'x-amz-signedheaders')
    return signed ? signed[1].toLowerCase().split(';') : []
  } catch {
    return []
  }
}

// The boundary a multipart/form-data Content-Type names, or null when it names none.
const boundaryIn = contentType => /;\s*boundary=(?:"([^"]+)"|([^\s;]+))/i.exec(contentType)?.slice(1).find(Boolean) ?? null

// How a grant asks for its part to be sent: where its bytes, size and content type go (placements); whether it is a
// form (form), its fixed field parameters included; the field or place its bytes go (data); a length the grant fixes
// for the part's bytes (fixedLength), by its Content-Length or its URL's signature, or for a form's whole body
// (entityLength), by its Content-Length; the form's boundary, when its Content-Type gives one; whether its headers fix
// the bytes' checksum; whether the whole file must go in one request (wholeFile); and so whether a client may choose
// its part sizes (clientSizing).
//
// Every binding is kept exactly, or the grant is refused, before anything is sent: bytes in a header; a size or type
// in the body; both a form and a raw body; both part and whole-file data; and, for a form, a Content-Type other than
// multipart/form-data, or one without the boundary a form needs, which no rule lets the SDK complete; a length signed
// for its bytes, which the form's envelope would change; its data, size or type in a field a fixed parameter already
// sets otherwise, two of them in one field, or its size or type in the headers that a form's own encoding sets.
const instructionsOf = grant => {
  const number = grant.partNumber
  const placements = Object.fromEntries(Object.entries(grant.send).map(([key, value]) => [key, placementOf(key, value, number)]))
  const parameters = Object.keys(grant.parameters).length > 0
  const form = parameters || Object.values(placements).some(placement => placement.at === 'parameter')
  const refuse = reason => uploadError(`The upload grant for part ${number} ${reason}`)

  if (placements.partdata && placements.file) {
    throw refuse('asks for both its part\'s data and the whole file')
  }

  const given = placements.partdata ?? placements.file

  if (given?.at === 'header') {
    throw refuse('asks for the file\'s data in a header')
  }

  if (form && given?.at === 'body') {
    throw refuse('asks for both form fields and a raw body')
  }

  ['partsize', 'Content-Type'].forEach(key => {
    if (placements[key]?.at === 'body') {
      throw refuse(`asks for its ${key} in the body`)
    }
  })

  const headers = Object.entries(grant.headers).map(([name, value]) => [name.toLowerCase(), value])
  const lengthHeader = headers.find(([name]) => name === 'content-length')
  const typeHeader = headers.find(([name]) => name === 'content-type')
  const lengthSigned = signedHeadersOf(grant.url).includes('content-length')
  const data = given ?? (form ? { at: 'parameter', name: 'file' } : { at: 'body' })
  let fixedLength = null
  let entityLength = null
  let boundary = null

  if (form) {
    if (lengthSigned && !lengthHeader) {
      throw refuse('signs a length for a form, which its encoding would change')
    }

    if (typeHeader && !/^\s*multipart\/form-data\s*(;|$)/i.test(typeHeader[1])) {
      throw refuse(`asks for a form sent as ${typeHeader[1]}`)
    }

    boundary = typeHeader ? boundaryIn(typeHeader[1]) : null

    if (typeHeader && boundary === null) {
      throw refuse(`fixes the form's Content-Type as ${typeHeader[1]}, without the boundary its body needs`)
    }

    entityLength = lengthHeader ? wholeNumber(lengthHeader[1], 'Content-Length', number) : null

    if (hasOwn(grant.parameters, data.name)) {
      throw refuse(`puts the file's data in the field ${data.name}, which a fixed parameter already sets`)
    }

    const fields = ['partsize', 'Content-Type'].map(key => placements[key]).filter(placement => placement?.at === 'parameter')

    if (fields.some(placement => placement.name === data.name)
      || (fields.length === 2 && fields[0].name === fields[1].name)) {
      throw refuse('puts two values in one form field')
    }

    if (placements.partsize?.at === 'header' && placements.partsize.name.toLowerCase() === 'content-length') {
      throw refuse('asks for its part size as the Content-Length of a form, whose envelope makes it longer')
    }

    if (placements['Content-Type']?.at === 'header' && placements['Content-Type'].name.toLowerCase() === 'content-type') {
      throw refuse('asks for its content type as the Content-Type of a form, which must be multipart/form-data')
    }
  } else if (lengthHeader) {
    fixedLength = wholeNumber(lengthHeader[1], 'Content-Length', number)
  } else if (lengthSigned) {
    fixedLength = grant.partSize
  }

  const fixedChecksum = headers.some(([name, value]) => name === 'content-md5'
    || name.startsWith('x-amz-checksum-')
    || (name === 'x-amz-content-sha256' && !/^(UNSIGNED-PAYLOAD|STREAMING-)/.test(value)))

  const wholeFile = Boolean(placements.file)

  return {
    boundary,
    clientSizing: fixedLength === null && entityLength === null && !fixedChecksum && !wholeFile,
    data,
    entityLength,
    fixedChecksum,
    fixedLength,
    form,
    placements,
    wholeFile,
  }
}

// How an upload of size bytes (null when unknown) is planned, from its first grant:
//
// - { mode: 'local', partSize, partCount, offsets } when the client may choose its part sizes: the size is known and
//   the grant fixes no length or checksum. For S3 a part is at least max(5 MiB, PREFERRED_PART_BYTES, ceil(size /
//   budget)), where budget is 10,000 parts, or fewer when the API gives a smaller positive available_parts, and at
//   most 5 GiB. A remote server integration or Files Agent upload keeps the API's part size, or PREFERRED_PART_BYTES
//   without one, grown only to fit a positive available_parts, with no S3 limit, and numbers its parts in its URL
//   query (offsets).
// - { mode: 'server' } otherwise: each part is as large as its own grant's partsize, the last one smaller.
// - { mode: 'whole' } when the grant asks for the whole file in one request.
//
// The arithmetic is exact for any safe integer size; nothing is allocated for it.
const planOf = ({
  destination, grant, instructions, size,
}) => {
  if (instructions.wholeFile) {
    return { mode: 'whole' }
  }

  if (size === null || !instructions.clientSizing) {
    return { mode: 'server' }
  }

  if (destination === 's3') {
    const budget = grant.availableParts > 0 ? Math.min(S3_MAX_PARTS, grant.availableParts) : S3_MAX_PARTS
    const partSize = Math.max(S3_MIN_PART_BYTES, PREFERRED_PART_BYTES, Math.ceil(size / budget))

    if (partSize > S3_MAX_PART_BYTES) {
      throw uploadError(`A file of ${size} bytes cannot be uploaded to S3 in ${budget} parts of at most 5 GiB each`)
    }

    return {
      mode: 'local',
      offsets: false,
      partCount: Math.max(1, Math.ceil(size / partSize)),
      partSize,
    }
  }

  const base = grant.partSize > 0 ? grant.partSize : PREFERRED_PART_BYTES
  const partSize = grant.availableParts > 0 ? Math.max(base, Math.ceil(size / grant.availableParts)) : base

  return {
    mode: 'local',
    offsets: true,
    partCount: Math.max(1, Math.ceil(size / partSize)),
    partSize,
  }
}

// url, a remote server integration's or Files Agent's upload URL, for the part partNumber at the zero-based offset:
// its part_number and part_offset query values set, any partNumber or offset alias removed, and every other part of
// the URL, its other query values' encoding included, kept exactly.
const withPartOffset = (url, partNumber, offset) => {
  const fragmentAt = url.indexOf('#')
  const fragment = fragmentAt === -1 ? '' : url.slice(fragmentAt)
  const beforeFragment = fragmentAt === -1 ? url : url.slice(0, fragmentAt)
  const queryAt = beforeFragment.indexOf('?')
  const base = queryAt === -1 ? beforeFragment : beforeFragment.slice(0, queryAt)
  const query = queryAt === -1 ? '' : beforeFragment.slice(queryAt + 1)
  const kept = query.split('&').filter(pair => pair !== '' && !OFFSET_KEYS.includes(pair.split('=')[0]))

  kept.push(`part_number=${partNumber}`, `part_offset=${offset}`)
  return `${base}?${kept.join('&')}${fragment}`
}

// A form field's name or file name as a multipart body quotes it.
const quoted = name => name.replace(/"/g, '%22').replace(/\r/g, '%0D').replace(/\n/g, '%0A')

const boundaryOf = () => `----FilesSdkBoundary${Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`

// The length of every boundary the SDK makes itself.
const BOUNDARY_LENGTH = boundaryOf().length

// A form's text before its file field's bytes, its fields in order, and after them, for boundary.
const formHeadOf = ({
  boundary, fields, fileField, fileName,
}) => [
  ...fields.map(([name, value]) => `--${boundary}\r\nContent-Disposition: form-data; name="${quoted(name)}"\r\n\r\n${value}\r\n`),
  `--${boundary}\r\nContent-Disposition: form-data; name="${quoted(fileField)}"; filename="${quoted(fileName)}"\r\nContent-Type: ${PART_CONTENT_TYPE}\r\n\r\n`,
].join('')

const formTailOf = boundary => `\r\n--${boundary}--\r\n`

// The headers and form fields of a request for a part of length bytes, as grant asks, with instructions (see
// instructionsOf()): its exact headers, except those its transport sets from the body, and fixed parameters, with its
// size and content type where its send instructions place them. A value placed where the grant already fixes one must
// agree with it, except the content type, for which the grant's own is kept; anything else is refused.
const placedOf = ({ grant, instructions, length }) => {
  const refuse = reason => uploadError(`Part ${grant.partNumber} ${reason}`)
  const headers = Object.fromEntries(Object.entries(grant.headers)
    .filter(([name]) => !TRANSPORT_HEADERS.includes(name.toLowerCase())))

  const fixedHeader = name => Object.entries(grant.headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1]
  const fields = Object.entries(grant.parameters)

  // Places value, the part's size or content type, as placement asks; keepFixed keeps a value the grant fixes there.
  const place = (key, placement, value, keepFixed) => {
    if (placement.at === 'parameter') {
      if (!hasOwn(grant.parameters, placement.name)) {
        fields.push([placement.name, value])
      } else if (grant.parameters[placement.name] !== value && !keepFixed) {
        throw refuse(`has its ${key} fixed as ${grant.parameters[placement.name]} by its upload grant, not ${value}`)
      }

      return
    }

    const fixed = fixedHeader(placement.name)
    const name = placement.name.toLowerCase()

    if (fixed !== undefined) {
      if (fixed !== value && !keepFixed) {
        throw refuse(`has its ${key} fixed as ${fixed} by its upload grant, not ${value}`)
      }
    } else if (TRANSPORT_HEADERS.includes(name)) {
      // The transport sends the body's own length, which only a raw body's size is.
      if (name !== 'content-length' || instructions.form || value !== `${length}`) {
        throw refuse(`cannot have its ${key} in the ${placement.name} header`)
      }
    } else {
      headers[placement.name] = value
    }
  }

  if (instructions.placements.partsize) {
    place('partsize', instructions.placements.partsize, `${length}`, false)
  }

  if (instructions.placements['Content-Type']) {
    place('Content-Type', instructions.placements['Content-Type'], PART_CONTENT_TYPE, true)
  }

  return { fields, headers }
}

// How many bytes the form a part of length bytes is sent in adds to them, as grant asks: what a part's buffer credit
// counts for it before its bytes are read (see uploadSource()). 0 for a raw body.
const formEnvelopeOf = ({
  fileName = 'file', grant, instructions, length,
}) => {
  if (!instructions.form) {
    return 0
  }

  const { fields } = placedOf({ grant, instructions, length })
  const boundary = instructions.boundary ?? '-'.repeat(BOUNDARY_LENGTH)

  return utf8Length(formHeadOf({
    boundary, fields, fileField: instructions.data.name, fileName,
  })) + utf8Length(formTailOf(boundary))
}

// The request that sends a part's bytes to url as grant asks, with instructions (see instructionsOf() and placedOf()):
// its method; its headers; and its bytes as the raw body, or as the file field of a multipart form after the grant's
// parameters, in one allocation, with dataOffset, where the bytes begin within the body. A length the grant fixes must
// be the part's, or the form's, found before the form is made; a boundary the grant gives is kept exactly, as long as
// no field or byte of the part holds it. Anything else is refused before the part is sent, and before anything is
// changed. within, when given, is the memory that holds bytes already, such as the part's earlier form, which the form
// is then made in, its bytes moved where the form puts them, without another allocation; it must have room for it.
const partRequestOf = ({
  bytes, fileName = 'file', grant, instructions, url, within = null,
}) => {
  const refuse = reason => uploadError(`Part ${grant.partNumber} ${reason}`)

  if (instructions.fixedLength !== null && bytes.length !== instructions.fixedLength) {
    throw refuse(`has ${bytes.length} bytes, but its upload grant fixes ${instructions.fixedLength}`)
  }

  const { fields, headers } = placedOf({ grant, instructions, length: bytes.length })

  if (!instructions.form) {
    return {
      body: bytes,
      dataOffset: 0,
      headers,
      method: grant.method,
      url,
    }
  }

  const boundary = instructions.boundary ?? boundaryOf()

  if (instructions.boundary !== null
    && (fields.some(([, value]) => value.includes(`--${boundary}`)) || containsSequence(bytes, encoder.encode(`--${boundary}`)))) {
    throw refuse(`holds the form boundary its upload grant gives, ${boundary}`)
  }

  // The grant's own Content-Type, with its boundary, is kept exactly; without one, the form's own is given.
  if (instructions.boundary === null) {
    headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`
  }

  // The form's text before and after the bytes is measured as UTF-8, and encoded straight into the body, so that the
  // body is the form's one allocation: no encoding of either is held beside it.
  const head = formHeadOf({
    boundary, fields, fileField: instructions.data.name, fileName,
  })

  const tail = formTailOf(boundary)
  const headLength = utf8Length(head)
  const length = headLength + bytes.length + utf8Length(tail)

  if (instructions.entityLength !== null && length !== instructions.entityLength) {
    throw refuse(`makes a form of ${length} bytes, but its upload grant fixes ${instructions.entityLength}`)
  }

  let body

  if (within !== null) {
    const from = bytes.byteOffset - within.byteOffset

    if (within.buffer !== bytes.buffer || from < 0 || from + bytes.length > within.length || within.length < length) {
      throw refuse('has no room for its form where its bytes are held')
    }

    // copyWithin() moves the bytes as memmove() would, overlapping or not, with no copy of its own; set() of a view of
    // the same memory would copy them first.
    body = within.subarray(0, length)
    body.copyWithin(headLength, from, from + bytes.length)
  } else {
    body = new Uint8Array(length)
    body.set(bytes, headLength)
  }

  encoder.encodeInto(head, body.subarray(0, headLength))
  encoder.encodeInto(tail, body.subarray(headLength + bytes.length))

  return {
    body,
    dataOffset: headLength,
    headers,
    method: grant.method,
    url,
  }
}

// Resolves once stream has something to give, its end, a failure or its close; or rejects with signal's reason as
// soon as it aborts. Either way it leaves no listener of its own on stream or signal.
const whenReadable = (stream, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) {
    reject(abortReason(signal))
    return
  }

  const events = ['close', 'end', 'error', 'readable']
  let onAbort = null
  let onEvent = null

  const detach = () => {
    events.forEach(event => stream.removeListener(event, onEvent))
    signal?.removeEventListener('abort', onAbort)
  }

  onEvent = () => {
    detach()
    resolve()
  }

  onAbort = () => {
    detach()
    reject(abortReason(signal))
  }

  events.forEach(event => stream.on(event, onEvent))
  signal?.addEventListener('abort', onAbort, { once: true })
})

// The sources an upload reads (see uploadSource()): { size, read(length, hooks), close() }, and, for some, atEnd(hooks),
// whether no byte is left; prepare(), which opens what the source reads, such as a file on disk, once the upload's file
// has been admitted, and only then gives its size; held, the bytes of the SDK's own it holds in the upload's buffer
// budget, its own there (see byteBudget), which only reading on, or closing it, gives back; and views, whether its parts
// are views of memory it holds, needing no buffer of their own. read(length, hooks) resolves with the next length
// bytes, fewer only at the end, or null once none are left. hooks are the reader's own: signal stops any wait for more;
// whenRunning() resolves once the upload is not paused, before anything more is taken from a stream; holding, the
// buffer room the reader holds meanwhile for the part; and reserve, room it holds besides, which a stream's read may
// use, and which it lowers by what it used (see streamSource()). A stream's source also tells, by reserveFor(length),
// how much such room a read of length may need. close() gives back whatever the source still holds of the SDK's own.

// Moves pending's bytes, in order, into part, from filled on, as many as it has room for, and gives where they end.
// pending holds strings, encoded as UTF-8 as they are moved, which nothing can change; and copies of the SDK's own,
// { bytes, credit }, credit the buffer room each is counted for, which taken(credit) gives back once all of its bytes
// have been moved. Of a character split between two parts, the bytes the next one takes, at most three, are kept as
// such a copy, counted for nothing.
const fillFrom = (pending, part, filled, taken = () => {}) => {
  let at = filled

  while (at < part.length && pending.length > 0) {
    const entry = pending[0]

    if (typeof entry === 'string') {
      const { read, written } = encoder.encodeInto(entry, part.subarray(at))
      at += written

      if (read === entry.length) {
        pending.shift()
      } else if (at < part.length) {
        // The next character's bytes do not all fit: those that do end the part, and the rest begin the next one.
        const units = entry.codePointAt(read) > 0xffff ? 2 : 1
        const bytes = encoder.encode(entry.slice(read, read + units))
        const used = part.length - at
        part.set(bytes.subarray(0, used), at)
        at += used
        pending[0] = entry.slice(read + units)
        pending.unshift({ bytes: bytes.subarray(used), credit: 0 })
      } else {
        pending[0] = entry.slice(read)
      }
    } else {
      const used = Math.min(entry.bytes.length, part.length - at)
      part.set(entry.bytes.subarray(0, used), at)
      at += used

      if (used === entry.bytes.length) {
        pending.shift()
        taken(entry.credit)
      } else {
        pending[0] = { bytes: entry.bytes.subarray(used), credit: entry.credit }
      }
    }
  }

  return at
}

// Whether pending (see fillFrom()) has any byte left.
const hasPending = pending => pending.some(entry => (typeof entry === 'string' ? entry.length : entry.bytes.length) > 0)

// A source of bytes in memory, read in order, each part a view of them. held is the room they are counted for, when
// they are the SDK's own copy (see dataSourceOf()), which onClose(), when given, gives back once, as the source is
// closed.
const bytesSource = (bytes, { held = 0, onClose = null } = {}) => {
  let offset = 0
  let closed = false

  return {
    atEnd: async () => offset >= bytes.length,
    close: () => {
      if (!closed) {
        closed = true
        onClose?.()
      }
    },
    get held() { return closed ? 0 : held },
    read: async length => {
      if (offset >= bytes.length) {
        return null
      }

      const part = bytes.subarray(offset, offset + length)
      offset += part.length
      return part
    },
    size: bytes.length,
    views: true,
  }
}

// A source of strings, read as their UTF-8 bytes, in order, each part encoded into a buffer of its own, which its
// reader has made room for, as it is read: a string cannot change, so nothing of it is copied before then.
const textSource = strings => {
  const pending = [...strings]

  return {
    atEnd: async () => !hasPending(pending),
    close: () => {},
    held: 0,
    read: async length => {
      const part = new Uint8Array(length)
      const filled = fillFrom(pending, part, 0)
      return filled === 0 ? null : part.subarray(0, filled)
    },
    size: strings.reduce((total, string) => total + utf8Length(string), 0),
    views: false,
  }
}

// A source reading a Node.js readable stream, or one like it, only as the upload needs its bytes, taking each chunk the
// stream gives whole, as it gives it. A string, which nothing can change, is encoded as UTF-8 into the parts that take
// it. Of a byte chunk, the bytes the part being read has room for are copied into it, and the rest, if any, into a copy
// of the SDK's own, in the same turn as the stream gave the chunk, so that nothing the caller does with the chunk
// afterwards changes any part, a part sent again included. With admission, the upload's (see uploadSource()), that copy
// is counted against its buffer budget as the upload's own (see byteBudget) before anything of the chunk is copied:
// within the room the reader reserved for it (hooks.reserve), which reserveFor(length) sizes as the largest chunk the
// stream has given yet, less a byte, or, before any, its buffer's highWaterMark for a stream of bytes; or else room
// admitted at once within the budget's limit; or, beyond it, only while nothing but the upload's own bytes is held, as
// for a chunk larger than the budget given to an upload alone. Otherwise the read fails with a FilesError before the
// copy is made, the chunk taken from the stream and nothing of it kept. A chunk is taken only while the budget is open
// to the upload, which otherwise waits for it, holding what it holds meanwhile, before it takes anything. The copy is
// given back once the parts after it have taken all of its bytes. Nothing is taken from the stream while the upload is
// paused, and atEnd(), a look ahead for its end, takes nothing at all. The stream is never closed, ended, resumed or
// destroyed: close() only removes the upload's listener and gives back any copy still held, leaving the rest of the
// stream to its owner. A stream that fails, or closes before its end, fails the read; a stopped wait leaves the stream as
// it is.
const streamSource = (stream, { admission = null, size = null } = {}) => {
  // What the stream has given that no part has taken yet (see fillFrom()), and the room its copies are counted for.
  const pending = []
  let held = 0
  let failure = null

  // The largest byte chunk the stream has given, or, before any, the size its buffer fills to for a stream of bytes.
  let largest = stream.readableObjectMode ? 0 : (stream.readableHighWaterMark ?? 0)

  // The bytes the upload holds of its own while a read with hooks is under way: its part's room, its reserve and its
  // copies.
  const ownBytes = hooks => (hooks.holding ?? 0) + (hooks.reserve ?? 0) + held

  const onError = error => {
    failure = failure ?? { error }
  }

  stream.on('error', onError)

  const giveBack = credit => {
    if (credit > 0) {
      held -= credit
      admission.budget.release(credit)
    }
  }

  // Counts rest bytes of a chunk being taken, before they are copied, against hooks.reserve, or else the budget (see
  // streamSource()): gives the room they are counted for, and how to give it back should the copy fail; or throws.
  const roomFor = (rest, length, hooks) => {
    if (!admission) {
      return { credit: 0, undo: () => {} }
    }

    if ((hooks.reserve ?? 0) >= rest) {
      // eslint-disable-next-line no-param-reassign
      hooks.reserve -= rest
      // eslint-disable-next-line no-param-reassign
      return { credit: rest, undo: () => { hooks.reserve += rest } }
    }

    if (admission.budget.admitNow(rest, admission, ownBytes(hooks))) {
      return { credit: rest, undo: () => admission.budget.release(rest) }
    }

    throw uploadError(`The upload's stream gave a chunk of ${length} bytes, whose ${rest} bytes after the part being read must be copied as the chunk is taken, and the buffer budget of ${admission.budget.limit} bytes (maxBufferBytes) has no room for them beside what other uploads hold. Give the stream in smaller chunks, give the budget more room, or upload it once room is free`)
  }

  // Takes the stream's next chunk, as soon as it gives one, into part from filled on: resolves with where part's bytes
  // then end, or null at the stream's end. Without a part, as to look ahead in a stream that cannot tell what it has
  // buffered, the whole chunk is kept.
  const take = async (part, filled, hooks = {}) => {
    const { signal, whenRunning } = hooks

    for (;;) {
      if (failure) {
        throw failure.error
      }

      if (signal?.aborted) {
        throw abortReason(signal)
      }

      // eslint-disable-next-line no-await-in-loop
      await whenRunning?.()

      if (admission && !admission.budget.isOpen(admission)) {
        // eslint-disable-next-line no-await-in-loop
        await admission.budget.whenOpen(admission, ownBytes(hooks), signal)
      } else {
        // From here until the chunk has been copied, nothing waits: the budget is still open to the upload, and the
        // chunk is never held past this turn.
        const chunk = stream.read()

        if (typeof chunk === 'string') {
          pending.push(chunk)
          return part ? fillFrom(pending, part, filled, giveBack) : filled
        }

        if (ArrayBuffer.isView(chunk)) {
          const bytes = viewOf(chunk)
          const used = part ? Math.min(bytes.length, part.length - filled) : 0
          const rest = bytes.length - used
          largest = Math.max(largest, bytes.length)

          // The room for the rest is had, or the read refused, before anything of the chunk is copied.
          const room = rest > 0 ? roomFor(rest, bytes.length, hooks) : null

          if (room) {
            let copy

            try {
              copy = copyOf(bytes.subarray(used))
            } catch (error) {
              room.undo()
              throw error
            }

            held += room.credit
            pending.push({ bytes: copy, credit: room.credit })
          }

          if (used > 0) {
            part.set(bytes.subarray(0, used), filled)
          }

          return filled + used
        }

        if (chunk !== null) {
          throw new errors.InvalidParameterError('Bad parameter: upload data chunks must be strings or bytes')
        }

        if (stream.readableEnded) {
          return null
        }

        if (stream.errored) {
          throw stream.errored
        }

        if (stream.destroyed) {
          throw uploadError('The upload stream closed before its end')
        }

        // eslint-disable-next-line no-await-in-loop
        await whenReadable(stream, signal)
      }
    }
  }

  return {
    // Whether the stream has no byte left, found, when nothing is pending, without taking anything from it: by what it
    // has buffered, by its end, or once read(0), which has it fill its buffer without giving any of it, and its next
    // event tell. Nothing is asked of it while the upload is paused. A stream like a Node.js one that cannot tell what
    // it has buffered has its next chunk taken instead, and kept (see take()).
    atEnd: async (hooks = {}) => {
      const { signal, whenRunning } = hooks

      for (;;) {
        if (hasPending(pending)) {
          return false
        }

        if (typeof stream.readableLength !== 'number') {
          // eslint-disable-next-line no-await-in-loop
          if (await take(null, 0, hooks) === null) {
            return true
          }

          // eslint-disable-next-line no-continue
          continue
        }

        if (failure) {
          throw failure.error
        }

        if (signal?.aborted) {
          throw abortReason(signal)
        }

        // eslint-disable-next-line no-await-in-loop
        await whenRunning?.()

        if (stream.readableLength > 0) {
          return false
        }

        if (stream.readableEnded) {
          return true
        }

        if (stream.errored) {
          throw stream.errored
        }

        if (stream.destroyed) {
          throw uploadError('The upload stream closed before its end')
        }

        stream.read(0)

        if (stream.readableLength > 0) {
          return false
        }

        // eslint-disable-next-line no-await-in-loop
        await whenReadable(stream, signal)
      }
    },

    close: () => {
      stream.removeListener('error', onError)
      pending.splice(0).forEach(entry => {
        if (typeof entry !== 'string') {
          giveBack(entry.credit)
        }
      })
    },

    get held() { return held },

    read: async (length, hooks = {}) => {
      const part = new Uint8Array(length)
      let filled = fillFrom(pending, part, 0, giveBack)
      let ended = false

      while (filled < length && !ended) {
        // eslint-disable-next-line no-await-in-loop
        const taken = await take(part, filled, hooks)

        if (taken === null) {
          ended = true
        } else {
          filled = taken
        }
      }

      return filled === 0 ? null : part.subarray(0, filled)
    },

    // The room a read of length may need for the rest of the last chunk it takes: none while what is pending covers it.
    reserveFor: length => {
      const pendingBytes = pending.reduce((total, entry) => total + (typeof entry === 'string' ? utf8Length(entry) : entry.bytes.length), 0)
      return pendingBytes >= length ? 0 : Math.max(0, largest - 1)
    },

    size,

    views: false,
  }
}

// Whether a value is a Node.js readable stream, or one like it.
const isStream = value => typeof value?.pipe === 'function' && typeof value?.on === 'function' && typeof value?.read === 'function'

// The source of data as uploadData() takes it, given admission, the upload's (see uploadSource()), or none, as for a
// direct call. An array is taken as its elements are at the call, whatever becomes of it after.
//
// Strings, a string or an array of them, cannot change: they are read as their UTF-8 bytes, in order, each part encoded
// as it is read (see textSource()), of a size so known. Data in memory with bytes, a byte view or an array of strings
// and bytes, which its caller may change or reuse as soon as its call returns, is copied in the call itself, in one
// allocation of the SDK's own, each part then a view of the copy, of a size so known. The copy cannot wait, so it is
// admitted at once against admission.budget, the upload's buffer budget, before it is made, as the upload's own, and
// given back once the upload has settled; and it is made only for an upload whose file is admitted at once
// (admission.fileNow()), so that no upload waits for its file's admission holding buffer room that the uploads already
// admitted may need to go on. It is admitted only when it fits within the budget's limit; or, when it is larger than
// the whole budget, only when nothing else is held, so that it is held alone and never waits beyond the limit.
// Otherwise the data is refused, with a FilesError, before anything is copied or sent. Without admission, the copy is
// counted against nothing.
//
// A stream is read as it is (see streamSource()), and anything else iterable as a stream that makeStream(data) makes of
// it, of unknown size.
const dataSourceOf = (data, makeStream, admission = null) => {
  const chunks = Array.isArray(data) ? [...data] : [data]
  const inMemory = (typeof data === 'string' || ArrayBuffer.isView(data) || Array.isArray(data))
    && chunks.every(chunk => typeof chunk === 'string' || ArrayBuffer.isView(chunk))

  if (!inMemory) {
    return streamSource(isStream(data) ? data : makeStream(Array.isArray(data) ? chunks : data), { admission })
  }

  if (chunks.every(chunk => typeof chunk === 'string')) {
    return textSource(chunks)
  }

  const length = chunks.reduce((total, chunk) => total + byteLengthOf(chunk), 0)

  if (admission === null) {
    return bytesSource(copiedChunks(chunks, length))
  }

  const { budget } = admission
  const alone = length > budget.limit
  const refusal = reason => uploadError(`The upload's ${length} bytes of data in memory cannot be copied now: ${reason}`)
  const onlyAlone = `they are more than the buffer budget of ${budget.limit} bytes (maxBufferBytes), which can hold them only alone, with nothing else held and a file admission free at once. Upload them once nothing else is held, or give them as a stream or a file`

  if (alone ? budget.held > 0 : length > 0 && budget.held + length > budget.limit) {
    throw refusal(alone ? onlyAlone : `the buffer budget of ${budget.limit} bytes (maxBufferBytes) has no room for them. Upload them once room is free, or give them as a stream or a file`)
  }

  if (!admission.fileNow()) {
    throw refusal(alone ? onlyAlone : 'the transfer job has no file admission free for them at once (maxConcurrentFiles), and a copy cannot wait for one while it holds buffer room the uploads already admitted may need. Upload them once a file is free, or give them as a string, a stream or a file')
  }

  budget.admitWithin(length, admission)

  try {
    return bytesSource(copiedChunks(chunks, length), { held: length, onClose: () => budget.release(length) })
  } catch (error) {
    budget.release(length)
    throw error
  }
}

// A size a caller declares, in options.size or else params.size: a safe whole number of bytes, or null for none.
const declaredSizeOf = (options, params) => {
  const size = options.size ?? params.size

  if (size === undefined || size === null) {
    return null
  }

  if (!Number.isSafeInteger(size) || size < 0) {
    throw new errors.InvalidParameterError('Bad parameter: size must be a whole number of bytes')
  }

  return size
}

// Whether a storage error response is S3's RequestTimeout, which a retry can answer: a whole XML document whose root,
// Error, has the Code RequestTimeout, and no document type declaration.
const isRequestTimeout = (status, text) => status === 400
  && typeof text === 'string'
  && !/<!DOCTYPE/i.test(text)
  && /^\s*(<\?xml[^>]*\?>\s*)?<Error>[\s\S]*<Code>RequestTimeout<\/Code>[\s\S]*<\/Error>\s*$/.test(text)

// The options a transfer takes that are not options of its requests.
const TRANSFER_OPTIONS = ['concurrency', 'control', 'determinePartUploadUri', 'job', 'maxConcurrency', 'onProgress', 'size', 'startup']

const requestOptionsOf = options => Object.fromEntries(Object.entries(options)
  .filter(([name]) => !TRANSFER_OPTIONS.includes(name)))

// Checks the options of an upload, as a whole, before anything is opened, sent or held, however the upload turns out
// to run: its concurrency options (see concurrencyOptions()), size, onProgress, determinePartUploadUri, control and job.
const checkedUploadOptions = (given, params) => {
  concurrencyOptions(given)

  if (given.onProgress !== undefined && given.onProgress !== null && typeof given.onProgress !== 'function') {
    throw new errors.InvalidParameterError('Bad parameter: onProgress must be a function')
  }

  if (given.determinePartUploadUri !== undefined && given.determinePartUploadUri !== null
    && typeof given.determinePartUploadUri !== 'function') {
    throw new errors.InvalidParameterError('Bad parameter: determinePartUploadUri must be a function')
  }

  return {
    control: controlOf(given.control),
    declared: declaredSizeOf(given, params),
    scope: scopeOf(given.job),
  }
}

// Uploads the source open(admission) gives (see streamSource and dataSourceOf), to destinationPath, with params and
// options as the File model's upload methods take them. hooks are the File model's own: agentFor(url, options), the
// agent of a part's request; makeFile(data, options), the File the upload resolves with; makeUploadPart(data), the
// FileUploadPart determinePartUploadUri receives; and storageOptionsOf(options), the options of a part's request.
//
// Every option is checked before the source is opened or anything sent; open() is called at once after, in the same
// turn as the call, so that data in memory is copied, or refused, before its caller can change it (see dataSourceOf()).
// The upload owns the source from then on, closing it, which gives back whatever it holds, once it has settled,
// however it settles.
//
// The upload begins with begin_upload, given the known size and asking for direct connection information, then asks
// for its parts' grants in batches, ahead of the parts that need them but never beyond the parts its plan, size or
// available_parts allow; a grant asked for ahead that fails, or goes unused, fails nothing, and every request for grants
// has settled before the upload does. A request for grants a part needs that does not give that part's grant fails the
// upload, so that no request is repeated without progress. Each grant must keep the upload's ref and its path binding
// (see pathBindingOf()). A part is read only once it has room in the buffer budget and among the parts ready to be
// sent, so that reading never runs ahead of sending, and sent once the concurrency controller admits it and the request
// budget allows. Parts go in parallel only when the API allows it and the size is known; once a later grant no longer
// allows parallel parts, the rest go one at a time, in order: each only once nothing else is on the wire and every part
// before it is stored, so that an earlier part sent again goes first. Parts already sent cannot be taken back.
//
// Only a part whose grant allows parallel parts and retrying (retry_parts) is sent again after a transient failure,
// with the same number and bytes, after storage's wait, whether the upload's parts go in parallel or not; a part whose
// URL has expired is given a new grant first, which, once the part may have been sent, must still allow retrying it.
// Paused, the upload sends and reads nothing new, a look ahead for the source's end included, holding no request permit
// or new buffer room meanwhile. The first failure, or the caller's signal, stops everything, any wait for the source
// included, without closing it, and its parts' requests under way, without a deadline of its own; the upload rejects
// with that failure, or the signal's reason, never with the stop, once every part under way has settled, without
// completing. Its completion sends the exact size, and every part's ETag when storage gave them; a part without one,
// when others have one, refuses it.
//
// Every byte the SDK holds for the upload is counted against its scope's one buffer budget before it is allocated (see
// byteBudget): its copy of data in memory, made as its upload is called only once its file has been admitted (see
// dataSourceOf()); the copies of the stream chunks it takes (see streamSource()); and each part's buffers, from before
// it is read until it settles: its own buffer, unless it is a view of the copy of data in memory, and, for a form, the
// form too, made while that buffer still holds the part's bytes (see requestFor). A part that cannot fit waits for room,
// holding nothing but the upload's own copy; one the budget refuses, rather than go beyond its limit, fails the upload.
// No upload waits for its file's admission holding any of the budget. A whole file the API asks for in one request, of
// unknown size, holds the whole budget while its source is read, and fails the upload when that source is larger than
// half of it, which leaves room to join what was read into one body, or when the part, its form included, needs more
// than the whole budget. A source that opens what it reads, such as a file on disk, opens it only once the upload's file
// has been admitted (see the sources).
const uploadSource = async ({
  destinationPath,
  fileName,
  hooks,
  open,
  options: givenOptions,
  params: givenParams,
}) => {
  const given = givenOptions || {}
  const params = isPlainObject(givenParams) ? givenParams : {}
  const options = requestOptionsOf(given)
  const { signal } = options
  const { control, declared, scope } = checkedUploadOptions(given, params)
  const config = options.client ?? Files
  const log = Api._loggerFor(config)
  const maxRetries = config.getMaxNetworkRetries()
  const beginPath = `/file_actions/begin_upload/${encodeURIComponent(destinationPath)}`
  const renames = Boolean(params.with_rename) && params.with_rename !== 'false'
  const pathBinding = pathBindingOf({
    destinationPath,
    renames,
    workspace: hasOwn(options, 'workspaceId') ? options.workspaceId : config.getWorkspaceId(),
  })

  const stopping = new AbortController()
  const prefetching = new AbortController()
  let failed = false
  let firstFailure

  const fail = error => {
    if (!failed) {
      failed = true
      firstFailure = error
      stopping.abort()
    }
  }

  const onCallerAbort = () => fail(abortReason(signal))

  // Requests for grants: stopped with the upload, and the speculative ones, asked for ahead, once it no longer needs them.
  const negotiationOptions = { ...options, signal: linkedSignal([signal, stopping.signal, prefetching.signal]) }

  // Requests for parts: stopped with the upload too, so that its first failure, or its caller's signal, stops every
  // part under way, each settled, its body included, before the upload is; the upload still rejects with that first
  // failure, never with the stop. Another upload's requests, even in the same job, are not stopped.
  const storageOptions = { ...hooks.storageOptionsOf(options), signal: linkedSignal([signal, stopping.signal]) }

  let source = null
  let fileAdmitted = false
  let progress = null
  let batch = null

  // The upload as the owner of what it holds in its scope's buffer budget (see byteBudget), which its source is opened
  // with: budget, for its copy of data in memory (see dataSourceOf()), its stream's copies of the chunks it takes (see
  // streamSource()) and its parts' buffers; and fileNow(), which takes the upload's file admission at once, if it is
  // free, for a copy of data in memory, which is made only then: whether the upload has it.
  const admission = {
    budget: scope.buffers,
    fileNow: () => {
      if (!fileAdmitted && scope.files.tryAcquire()) {
        fileAdmitted = true
      }

      return fileAdmitted
    },
  }

  try {
    source = await open(admission)

    signal?.addEventListener('abort', onCallerAbort, { once: true })

    if (signal?.aborted) {
      onCallerAbort()
    }

    if (failed) {
      throw firstFailure
    }

    // A size declared for a source whose size is known, now or once it has been opened, must be its size.
    const checkSize = () => {
      if (source.size !== null && declared !== null && declared !== source.size) {
        throw new errors.InvalidParameterError(`Bad parameter: size ${declared} is not the size of the upload's source, ${source.size}`)
      }
    }

    checkSize()

    // An upload with a copy of data in memory has its file already (see dataSourceOf()); any other waits for it here,
    // holding nothing of the buffer budget.
    if (!fileAdmitted) {
      await scope.files.acquire(stopping.signal)
      fileAdmitted = true
    }

    if (typeof source.prepare === 'function') {
      await source.prepare()
    }

    if (failed) {
      throw firstFailure
    }

    checkSize()

    const size = source.size ?? declared
    const viewsOnly = source.views === true

    const beginParams = {
      ...Object.fromEntries(Object.entries(params).filter(([name]) => BEGIN_PARAMETERS.includes(name))),
      ...(size !== null ? { size } : {}),
      with_direct_connection_info: true,
    }

    const begun = await Api.sendRequest(beginPath, 'POST', beginParams, options)
    const [first] = grantsOf(begun.data, { count: 1, firstPart: 1, ref: null })

    if (!isNonEmptyString(first.ref)) {
      throw uploadError('The upload was begun without a ref')
    }

    const { ref } = first
    pathBinding.bind(first)

    const grants = new Map([[1, { ...first, negotiationHeaders: begun.headers }]])
    const destination = destinationOf(first)
    const plan = planOf({
      destination, grant: first, instructions: instructionsOf(first), size,
    })

    // Parts go in parallel only when the API allows it and the size is known; otherwise one at a time, in order, with
    // a controller of their own that teaches no shared one. A later grant that withdraws the API's permission makes
    // the rest go one at a time too (serialNow).
    const scheduledParallel = first.parallel && size !== null && plan.mode !== 'whole'
    const serialController = createController({ direction: 'upload', fixed: 1 })
    const controller = scheduledParallel
      ? controllerFor(scope, {
        concurrency: given.concurrency,
        destination,
        direction: 'upload',
        maxConcurrency: given.maxConcurrency,
        startup: given.startup,
      })
      : serialController

    let serialNow = !scheduledParallel
    const controllerNow = () => (serialNow ? serialController : controller)

    // The highest part number the API allows, when a grant has said, which nothing is asked for beyond ahead of need.
    let partLimit = first.availableParts > 0 ? first.availableParts : null

    const noteGrant = grant => {
      if (grant.availableParts > 0) {
        partLimit = grant.availableParts
      }

      if (!grant.parallel && !serialNow) {
        serialNow = true
        log.info(`The upload grant for part ${grant.partNumber} allows no parallel parts: the rest of the upload goes one part at a time`)
      }
    }

    progress = createProgress({
      control,
      direction: 'upload',
      onProgress: given.onProgress,
      totalBytes: size,
    })

    progress.start()

    // How far the parts go: the plan's last part, one for a whole-file upload, or, for a server-sized upload of known
    // size, as many as its remaining bytes need at the latest grant's size (lastPartGuess); null when the size is
    // unknown.
    const readState = { latestPartSize: first.partSize, offset: 0, partNumber: 0 }

    const lastPartGuess = () => {
      if (plan.mode === 'whole') {
        return 1
      }

      if (plan.mode === 'local') {
        return plan.partCount
      }

      if (size === null || !(readState.latestPartSize > 0)) {
        return null
      }

      return Math.max(1, readState.partNumber + Math.ceil((size - readState.offset) / readState.latestPartSize))
    }

    // Grants: asked for in batches of at most GRANT_BATCH from begin_upload with the upload's path and ref. One
    // request is under way at a time (batch). A part that needs a grant asks for it, and the parts after it as far
    // as they are known to be needed; once a part's grant is taken with GRANT_PREFETCH or fewer unused ahead of it, the
    // next batch is asked for ahead, speculatively, never beyond lastPartGuess() or the API's partLimit, and, for an
    // upload of unknown size, at most UNKNOWN_SIZE_GRANT_BATCH beyond the last granted. A batch must give the grant of
    // the first part it asks for, or fails; the grants it gives besides are kept. A speculative batch that fails, or
    // goes unused past the end of the source, fails nothing: a part that still needs a grant asks again, and, once one
    // has failed, grants are asked for only as parts need them (speculating). A needed request that fails fails the
    // part, so that no request is ever repeated without progress.
    let grantedThrough = 1
    let speculating = true

    const ask = (fromPart, upTo, speculative = false) => {
      const count = Math.max(1, Math.min(GRANT_BATCH, upTo - fromPart + 1))

      const request = Api.sendRequest(beginPath, 'POST', {
        part: fromPart,
        parts: count,
        ref,
        with_direct_connection_info: true,
      }, negotiationOptions).then(response => {
        const received = grantsOf(response.data, { count, firstPart: fromPart, ref })

        received.forEach(grant => {
          pathBinding.bind(grant)
          noteGrant(grant)
          grants.set(grant.partNumber, { ...grant, negotiationHeaders: response.headers })
        })

        if (!grants.has(fromPart)) {
          throw uploadError(`The API gave no upload grant for part ${fromPart}`)
        }

        while (grants.has(grantedThrough + 1)) {
          grantedThrough += 1
        }
      })

      const current = {
        done: request.then(() => {}, () => {
          if (speculative) {
            speculating = false
          }
        }),
        request,
      }

      batch = current
      current.done.then(() => {
        if (batch === current) {
          batch = null
        }
      })

      return current
    }

    const prefetch = partNumber => {
      if (failed || !speculating || batch || grantedThrough - partNumber > GRANT_PREFETCH) {
        return
      }

      const guess = lastPartGuess()
      const upTo = Math.min(
        guess ?? grantedThrough + UNKNOWN_SIZE_GRANT_BATCH,
        partLimit ?? Number.MAX_SAFE_INTEGER,
        grantedThrough + GRANT_BATCH,
      )

      if (upTo > grantedThrough) {
        ask(grantedThrough + 1, upTo, true)
      }
    }

    const grantFor = async partNumber => {
      while (!grants.has(partNumber)) {
        if (failed) {
          throw firstFailure
        }

        if (batch) {
          // eslint-disable-next-line no-await-in-loop
          await batch.done
        } else {
          // Needed now: its failure is the part's.
          const upTo = Math.max(partNumber, Math.min(lastPartGuess() ?? partNumber, partLimit ?? Number.MAX_SAFE_INTEGER))
          // eslint-disable-next-line no-await-in-loop
          await ask(grantedThrough + 1, upTo).request
        }
      }

      prefetch(partNumber)
      return grants.get(partNumber)
    }

    // A new grant for partNumber, whose URL has expired, with the upload's path and ref.
    const renewGrant = async partNumber => {
      const response = await Api.sendRequest(beginPath, 'POST', {
        part: partNumber,
        parts: 1,
        ref,
        with_direct_connection_info: true,
      }, negotiationOptions)

      const [grant] = grantsOf(response.data, { count: 1, firstPart: partNumber, ref })
      pathBinding.bind(grant)
      noteGrant(grant)

      const renewed = { ...grant, negotiationHeaders: response.headers }
      grants.set(partNumber, renewed)
      return renewed
    }

    // Turns: determinePartUploadUri is called for each part's first send in part order, and the next part's turn comes
    // once this part's URL and agent have been chosen.
    let nextTurn = 1
    const turns = new Map()

    const takeTurn = partNumber => (partNumber === nextTurn ? Promise.resolve(true) : new Promise(resolve => {
      turns.set(partNumber, resolve)
    }))

    const passTurn = () => {
      nextTurn += 1
      const take = turns.get(nextTurn)
      turns.delete(nextTurn)
      take?.(true)
    }

    stopping.signal.addEventListener('abort', () => {
      turns.forEach(take => take(false))
      turns.clear()
    }, { once: true })

    const urlOf = (part, grant) => {
      let { url } = grant

      if (typeof given.determinePartUploadUri === 'function') {
        url = given.determinePartUploadUri(hooks.makeUploadPart({
          ...grant.data,
          headers: grant.negotiationHeaders,
          parameters: { action: 'put', part: part.number, ref },
        }))

        if (!isNonEmptyString(url)) {
          throw uploadError(`determinePartUploadUri gave no URL for part ${part.number}`)
        }
      }

      return plan.offsets ? withPartOffset(url, part.number, part.offset) : url
    }

    // The parts read, by number, and those read but not yet admitted for their first request: the reader waits while
    // there are as many as the target.
    const parts = []
    let ready = 0
    let wakeReader = null

    const leaveReady = number => {
      const part = parts[number - 1]

      if (!part.readyLeft) {
        part.readyLeft = true
        ready -= 1
        const wake = wakeReader
        wakeReader = null
        wake?.()
      }
    }

    stopping.signal.addEventListener('abort', () => wakeReader?.(), { once: true })

    // The parts on the wire, and the lowest part number not yet stored (nextSerial): one at a time, a part goes only once
    // nothing else is on the wire and every part before it is stored, so that a part sent again goes before the next.
    let sending = 0
    let nextSerial = 1
    const serialWaiters = []

    const waitForSerialTurn = () => new Promise(resolve => { serialWaiters.push(resolve) })

    const wakeSerial = () => serialWaiters.splice(0).forEach(resolve => resolve())

    const sent = () => {
      sending -= 1

      if (sending === 0) {
        wakeSerial()
      }
    }

    const stored = number => {
      parts[number - 1].stored = true

      while (parts[nextSerial - 1]?.stored) {
        nextSerial += 1
      }

      wakeSerial()
    }

    stopping.signal.addEventListener('abort', wakeSerial, { once: true })

    const serialBlocked = number => serialNow && (sending > 0 || number !== nextSerial)

    // Admits one request for part number: once the upload is running, by the controller now in charge and the request
    // budget, and then, at the actual dispatch, only if the upload has not failed, is not paused and has not since gone
    // one part at a time; otherwise what was acquired is given back and the part waits again. Resolves with its
    // attempt, counted among the parts on the wire, or null once the upload has failed.
    const dispatch = async number => {
      for (;;) {
        if (failed) {
          return null
        }

        // eslint-disable-next-line no-await-in-loop
        await control?._whenRunning(stopping.signal)

        if (serialBlocked(number)) {
          // eslint-disable-next-line no-await-in-loop
          await waitForSerialTurn()
        } else {
          const owner = controllerNow()
          // eslint-disable-next-line no-await-in-loop
          const attempt = await owner.admit(stopping.signal)

          try {
            // eslint-disable-next-line no-await-in-loop
            await scope.requests.upload.acquire(stopping.signal)
          } catch (error) {
            attempt.abandon()
            throw error
          }

          if (!failed && !control?.paused && owner === controllerNow() && !serialBlocked(number)) {
            sending += 1
            return attempt
          }

          scope.requests.upload.release()
          attempt.abandon()
        }
      }
    }

    // The request that sends part with grant to url, built once for that grant and URL, and kept for its retries. A
    // part's credit covers, all along, the memory of the SDK's own it holds alone, part.own, of part.ownBytes: its own
    // buffer, or its form, once made. A form is made only once that credit covers what is held while it is made, the
    // part's buffer and the form together, as the credit a part read for a form already does; or, for a renewed
    // grant's form with no more bytes than the part's form has room for, within that form, which nothing more is
    // needed for. The form then becomes what the part holds, its bytes a view of it, and the rest of the credit is
    // given back, once. A form needing more than the part's credit, as a renewed grant's longer form, is given only
    // room the buffer budget admits at once within its limit (see byteBudget), since no part waits for room while
    // holding its own: otherwise it is refused, failing the upload, before anything is made.
    const requestFor = (part, grant, url) => {
      if (part.request && part.request.grant === grant && part.request.url === url) {
        return part.request.built
      }

      const instructions = instructionsOf(grant)

      if (!instructions.form) {
        const built = partRequestOf({
          bytes: part.bytes, fileName, grant, instructions, url,
        })

        part.request = { built, grant, url }
        return built
      }

      const length = part.length + formEnvelopeOf({
        fileName, grant, instructions, length: part.length,
      })

      const within = part.own !== null && part.own.length >= length && part.request?.built.body.buffer === part.own.buffer
        ? part.own
        : null

      const needed = part.ownBytes + (within ? 0 : length)

      if (needed > part.credit) {
        if (!scope.buffers.admitWithin(needed - part.credit, admission)) {
          throw uploadError(`Part ${part.number} needs a form of ${length} bytes, more than the buffer room held for it, and the buffer budget of ${scope.buffers.limit} bytes (maxBufferBytes) has no room for the rest at once`)
        }

        part.credit = needed
      }

      const built = partRequestOf({
        bytes: part.bytes, fileName, grant, instructions, url, within,
      })

      if (!within) {
        part.own = built.body
        part.ownBytes = length
      }

      scope.buffers.release(part.credit - part.ownBytes)
      part.credit = part.ownBytes
      part.bytes = built.body.subarray(built.dataOffset, built.dataOffset + part.length)
      part.request = { built, grant, url }
      return built
    }

    const sendPart = async number => {
      const part = parts[number - 1]
      let grant = await grantFor(number)
      let url = null
      let agent
      let retries = 0
      let renewedFor = -1

      for (;;) {
        if (failed) {
          return
        }

        // A URL known to have expired, by its grant's expires or its own signature, is renewed before it is sent: once
        // for the part's first send and once for each retry.
        if (Api._storageExpired({ expires: grant.expires, url: url ?? grant.url })) {
          if (renewedFor === retries) {
            throw uploadError('The signed URL had expired before the request could be sent')
          }

          renewedFor = retries
          // eslint-disable-next-line no-await-in-loop
          grant = await renewGrant(number)

          if (!grant.retry && part.sends > 0) {
            part.replayWithdrawn = true
            throw uploadError(`Part ${number} may have been sent, and its renewed grant does not allow sending it again`)
          }

          // A renewed URL that has expired already is not called back for, nor sent.
          if (Api._storageExpired({ expires: grant.expires, url: grant.url })) {
            throw uploadError('The signed URL had expired before the request could be sent')
          }

          url = null
        }

        if (url === null) {
          if (part.sends === 0 && !part.turnTaken) {
            // eslint-disable-next-line no-await-in-loop
            if (!await takeTurn(number)) {
              return
            }

            part.turnTaken = true

            // A turn that comes once the upload has failed calls nothing back; and a callback that fails fails the
            // upload before the next part's turn comes, so that no later part is called back for.
            if (failed) {
              passTurn()
              return
            }

            try {
              url = urlOf(part, grant)
              agent = hooks.agentFor(url, options)
            } catch (error) {
              fail(error)
              throw error
            } finally {
              passTurn()
            }
          } else {
            url = urlOf(part, grant)
            agent = hooks.agentFor(url, options)
          }
        }

        const request = requestFor(part, grant, url)

        // eslint-disable-next-line no-await-in-loop
        const attempt = await dispatch(number)

        if (!attempt) {
          return
        }

        leaveReady(number)
        attempt.start()
        let result

        try {
          // eslint-disable-next-line no-await-in-loop
          result = await Api._sendStorageAttempt({
            agent,
            expires: grant.expires,
            headers: request.headers,
            method: request.method,
            url: request.url,
          }, request.body, storageOptions)
        } catch (error) {
          attempt.abandon()
          throw error
        } finally {
          scope.requests.upload.release()
          sent()
        }

        // Unsent only when found expired before any of its requests was dispatched: a redirect from a request that was
        // sent, to a URL found expired, leaves that request sent.
        const unsent = result.expired === true && result.dispatched !== true

        if (!unsent) {
          part.sends += 1
          progress.sent(part.length)
        }

        if (result.ok) {
          attempt.accept(part.length)
          part.etag = result.headers.etag
          stored(number)
          progress.accepted(part.length)
          return
        }

        let failure
        let waitMs = STORAGE_RETRY_MS

        if (unsent) {
          // Found expired as it was to be sent, the part sent nothing: it is renewed, unless it already has been for
          // this send.
          attempt.abandon()

          if (renewedFor === retries) {
            throw result.failure
          }

          url = null
          grant = { ...grant, expires: new Date(0).toISOString() }
          failure = result.failure
          waitMs = 0
        } else if (result.expired) {
          // Sent, and redirected to a URL found expired, which is never sent to: the part may have been stored, and is
          // sent again only as any failure of a sent part is retried, counted as a retry, with a renewed grant, which
          // must still allow retrying it; otherwise the upload fails with the expiry.
          attempt.abandon()
          url = null
          grant = { ...grant, expires: new Date(0).toISOString() }
          failure = result.failure
          waitMs = 0
        } else if (result.failure !== undefined) {
          if (result.permanent) {
            attempt.abandon()
            throw result.failure
          }

          attempt.fail()
          failure = result.failure
        } else {
          failure = uploadError(`Storage answered part ${number} with HTTP status ${result.status}`, result.status)

          if (result.status === 429 || result.status === 503) {
            waitMs = Api._retryAfterMs(result.headers['retry-after']) ?? 0

            // A wait no timer can be set for is refused before it reaches the controller.
            if (waitMs > MAX_TIMER_MS) {
              attempt.fail({ throttled: true })
              log.info(`Part ${number} is not retried because its wait of ${waitMs} ms cannot be scheduled`)
              throw failure
            }

            attempt.fail({ retryAfterMs: waitMs, throttled: true })
          } else if (Api._isTransientStatus(result.status) || isRequestTimeout(result.status, result.data)) {
            attempt.fail()
          } else {
            attempt.abandon()
            throw failure
          }
        }

        // An expired URL that sent nothing is renewed without counting as a retry. Any other failure is retried only
        // when the grant allows parallel parts and retrying them, however the upload schedules its parts.
        if (!unsent) {
          if (!grant.parallel || !grant.retry || part.replayWithdrawn || retries >= maxRetries) {
            throw failure
          }

          if (waitMs > MAX_TIMER_MS) {
            log.info(`Part ${number} is not retried because its wait of ${waitMs} ms cannot be scheduled`)
            throw failure
          }

          retries += 1

          const cause = (result.status && `HTTP ${result.status}`)
            || (result.expired ? 'a redirect to an expired URL' : 'a network error')

          log.info(`Retrying request (retry ${retries} of ${maxRetries}) in ${waitMs} ms after ${cause}`)
        }

        // eslint-disable-next-line no-await-in-loop
        await delay(waitMs, stopping.signal)
      }
    }

    const running = new Set()
    let exhausted = false

    // What a read waits for: the upload's stop, and its control, which nothing is taken from the source while paused;
    // the buffer room the reader holds meanwhile for its part, holding; and reserve, room it holds besides for the rest
    // of a stream's chunk, which the read lowers by what it uses (see streamSource()).
    const readHooks = (holding, reserve = 0) => ({
      holding,
      reserve,
      signal: stopping.signal,
      whenRunning: () => control?._whenRunning(stopping.signal),
    })

    // The buffer credit a part of length bytes with grant needs before it is read: its own buffer, unless it is a view
    // of memory the source holds, and, for a form, the form's whole body as well, a new allocation made while that
    // buffer still holds the part's bytes (see requestFor).
    const creditOf = (grant, length) => {
      const instructions = instructionsOf(grant)
      const own = viewsOnly ? 0 : length

      if (instructions.form) {
        return own + length + formEnvelopeOf({
          fileName, grant, instructions, length,
        })
      }

      return own
    }

    // Reads the next length bytes, once credit, the buffer room they need, has been admitted, the upload's request
    // holding as its own any copy of its stream's chunk still to be taken (see byteBudget): none is asked for when the
    // part needs none, such as a view of the source's own copy. A part read from a stream is admitted with room besides,
    // within the budget's limit, for the rest of the last chunk it takes (see streamSource()), and gives back what that
    // read did not use. At the actual read, once room has been given, nothing is read while the upload is paused, the
    // room given back while it waits, or once it has failed. Resolves with { bytes, credit, ownBytes }, ownBytes the
    // length of the buffer of the part's own the bytes were read into, or 0 for a view of the source's memory; bytes
    // null at the source's end, the credit then given back; or null once the upload has failed.
    const takeBytes = async (length, credit) => {
      for (;;) {
        const reserve = credit > 0 && typeof source.reserveFor === 'function'
          ? Math.min(source.reserveFor(length), Math.max(0, scope.buffers.limit - credit))
          : 0

        if (credit + reserve > 0) {
          // eslint-disable-next-line no-await-in-loop
          await scope.buffers.acquire(credit + reserve, stopping.signal, source.held ?? 0, admission)
        }

        if (failed) {
          scope.buffers.release(credit + reserve)
          return null
        }

        if (control?.paused) {
          scope.buffers.release(credit + reserve)
          // eslint-disable-next-line no-await-in-loop
          await control._whenRunning(stopping.signal)
        } else {
          const reading = readHooks(credit, reserve)
          let bytes

          try {
            // eslint-disable-next-line no-await-in-loop
            bytes = await source.read(length, reading)
          } catch (error) {
            scope.buffers.release(credit + reading.reserve)
            throw error
          }

          // What of the reserve the read did not use is given back; what it used is the source's copy's own.
          scope.buffers.release(reading.reserve)

          if (bytes === null) {
            scope.buffers.release(credit)
            return { bytes: null, credit: 0, ownBytes: 0 }
          }

          return { bytes, credit, ownBytes: viewsOnly ? 0 : length }
        }
      }
    }

    // The whole of a source of unknown size, for an upload the API asks for in one request: the whole buffer budget is
    // admitted for it, held alone, before anything is read, and the source may hold at most half of it, read in pieces
    // of no more than that in all, so that they can be joined into one body within it; a larger source, found by
    // looking ahead once that much has been read, fails the upload, and so does one whose form, made while the joined
    // bytes are held (see requestFor), would need more than the budget. Its credit becomes the part's only once it is
    // returned, the rest given back; on any failure, all of it is given back, once.
    const takeWhole = async grant => {
      const { limit } = scope.buffers
      const most = Math.floor(limit / 2)
      let credit = 0

      try {
        await scope.buffers.acquire(limit, stopping.signal, source.held ?? 0, admission)
        credit = limit

        if (failed) {
          return null
        }

        const pieces = []
        let total = 0
        let ended = false

        while (!ended) {
          if (total === most) {
            // eslint-disable-next-line no-await-in-loop
            if (!await source.atEnd(readHooks(credit))) {
              throw uploadError(`The upload grant asks for the whole file in one request, and its source, of unknown size, holds more than the ${most} bytes, half the buffer budget, that the upload can hold for it: give the upload's size`)
            }

            ended = true
          } else {
            // eslint-disable-next-line no-await-in-loop
            const piece = await source.read(Math.min(MIB, most - total), readHooks(credit))

            if (piece === null) {
              ended = true
            } else {
              total += piece.length
              pieces.push(piece)
            }
          }
        }

        const bytes = new Uint8Array(total)
        let offset = 0

        pieces.forEach(piece => {
          bytes.set(piece, offset)
          offset += piece.length
        })

        const needed = creditOf(grant, total)

        if (needed > credit) {
          throw uploadError(`The upload grant asks for the whole file in one request, as a form, which with the source's ${total} bytes needs ${needed} bytes, more than the buffer budget of ${limit}: give the upload's size`)
        }

        scope.buffers.release(credit - needed)
        credit = 0
        return { bytes, credit: needed, ownBytes: total }
      } finally {
        if (credit > 0) {
          scope.buffers.release(credit)
        }
      }
    }

    // The length of part number, with its grant: the plan's, the grant's, or all that is left of a whole-file upload
    // (null when its size is unknown).
    const lengthOf = (number, grant) => {
      if (plan.mode === 'whole') {
        return size
      }

      if (plan.mode === 'local') {
        return Math.min(plan.partSize, size - readState.offset)
      }

      if (!(grant.partSize > 0)) {
        throw uploadError(`The upload grant for part ${number} gives no part size`)
      }

      readState.latestPartSize = grant.partSize
      return size === null ? grant.partSize : Math.min(grant.partSize, size - readState.offset)
    }

    const waitForReader = () => new Promise(resolve => { wakeReader = resolve })

    // Whether the source has no byte left, for a part after the first of an upload of unknown size, found before its
    // grant is asked for, with the reader's own hooks: nothing is taken from the source while paused.
    const sourceEnded = async () => (typeof source.atEnd === 'function' ? source.atEnd(readHooks(0)) : false)

    try {
      while (!failed && !exhausted) {
        // eslint-disable-next-line no-await-in-loop
        await control?._whenRunning(stopping.signal)

        while (!failed && ready >= Math.max(1, controllerNow().target)) {
          // eslint-disable-next-line no-await-in-loop
          await waitForReader()
        }

        const number = readState.partNumber + 1

        // eslint-disable-next-line no-await-in-loop
        if (failed || (size === null && number > 1 && plan.mode !== 'whole' && await sourceEnded())) {
          exhausted = true
        } else {
          // eslint-disable-next-line no-await-in-loop
          const grant = await grantFor(number)
          const length = lengthOf(number, grant)

          // eslint-disable-next-line no-await-in-loop
          const taken = length === null ? await takeWhole(grant) : await takeBytes(length, creditOf(grant, length))

          if (taken === null) {
            exhausted = true
          } else {
            const bytes = taken.bytes ?? new Uint8Array(0)

            if (bytes.length === 0 && number > 1) {
              scope.buffers.release(taken.credit)
              exhausted = true
            } else if (size !== null && length !== null && bytes.length < length) {
              scope.buffers.release(taken.credit)
              throw uploadError(`The upload source ended after ${readState.offset + bytes.length} bytes, before its size of ${size}`)
            } else {
              readState.partNumber = number
              parts.push({
                bytes,
                credit: taken.credit,
                etag: undefined,
                length: bytes.length,
                number,
                offset: readState.offset,
                own: taken.ownBytes > 0 ? bytes : null,
                ownBytes: taken.ownBytes,
                readyLeft: false,
                replayWithdrawn: false,
                request: null,
                sends: 0,
                stored: false,
                turnTaken: false,
              })

              readState.offset += bytes.length
              ready += 1

              const work = sendPart(number)
                .catch(fail)
                .finally(() => {
                  const part = parts[number - 1]
                  leaveReady(number)
                  scope.buffers.release(part.credit)
                  part.credit = 0
                  part.bytes = null
                  part.own = null
                  part.request = null
                  running.delete(work)
                })

              running.add(work)

              if (size !== null) {
                exhausted = readState.offset >= size
              } else {
                exhausted = plan.mode === 'whole' || bytes.length < length
              }
            }
          }
        }
      }

      // A source of known size must end where its size says, found with the reader's own hooks.
      if (!failed && size !== null) {
        const ended = typeof source.atEnd === 'function'
          ? await source.atEnd(readHooks(0))
          : await source.read(1, readHooks(0)) === null

        if (!ended) {
          throw uploadError(`The upload source has more bytes than its size of ${size}`)
        }
      }
    } catch (error) {
      fail(error)
    }

    while (running.size > 0) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all([...running])
    }

    // Grants asked for ahead are no longer needed: whatever request is still under way is stopped and settled.
    prefetching.abort()
    await batch?.done

    if (failed) {
      progress.finish('failed')
      throw firstFailure
    }

    const withEtags = parts.filter(part => isNonEmptyString(part.etag))

    if (withEtags.length > 0 && withEtags.length < parts.length) {
      throw uploadError('Storage gave an ETag for some parts of the upload but not others, so it cannot be completed')
    }

    const completionParams = {
      ...Object.fromEntries(Object.entries(params).filter(([name]) => !OWN_PARAMETERS.includes(name)
        && (!BEGIN_PARAMETERS.includes(name) || SHARED_PARAMETERS.includes(name)))),
      action: 'end',
      ...(withEtags.length > 0 ? { etags: parts.map(part => ({ etag: part.etag, part: part.number })) } : {}),
      ref,
      size: readState.offset,
    }

    let completed

    try {
      completed = await Api.sendRequest(`/files/${encodeURIComponent(destinationPath)}`, 'POST', completionParams, Api._withUnambiguousRetries(options))
    } catch (error) {
      // A completion that failed without a definite refusal may have completed the upload: it is not sent again, and
      // the error says so.
      if (!(signal?.aborted && Object.is(error, abortReason(signal))) && typeof error === 'object' && error !== null) {
        const status = error.code
        error.completionUnknown = !(status >= 400 && status < 500 && status !== 429)
      }

      progress.finish('failed')
      throw error
    }

    progress.finish('completed')
    return hooks.makeFile(completed.data, options)
  } catch (error) {
    fail(error)
    progress?.finish('failed')
    prefetching.abort()
    await batch?.done
    throw firstFailure
  } finally {
    // Whatever the outcome, every admission the upload holds is given back, and its source closed, which gives back
    // what it holds (see the sources): a failure to close it cannot change the outcome, nor keep the file's admission
    // from being released.
    signal?.removeEventListener('abort', onCallerAbort)

    try {
      await source?.close()
    } catch {
      // The upload has its outcome already.
    }

    if (fileAdmitted) {
      scope.files.release()
    }
  }
}

export {
  GRANT_BATCH,
  PREFERRED_PART_BYTES,
  S3_MAX_PARTS,
  S3_MAX_PART_BYTES,
  S3_MIN_PART_BYTES,
  bytesSource,
  checkedUploadOptions,
  copyOf,
  dataSourceOf,
  destinationOf,
  formEnvelopeOf,
  grantsOf,
  instructionsOf,
  isRequestTimeout,
  partRequestOf,
  pathBindingOf,
  planOf,
  streamSource,
  textSource,
  uploadSource,
  utf8Length,
  withPartOffset,
}
