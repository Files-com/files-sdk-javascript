// The query parameters of a signed storage URL that give when it was signed and for how many seconds it is valid: S3's,
// Files.com's and Google Cloud Storage's.
const SIGNED_URL_VALIDITIES = [
  ['x-amz-date', 'x-amz-expires'],
  ['x-files-date', 'x-files-expires'],
  ['x-goog-date', 'x-goog-expires'],
]

// A time a signature gives, in milliseconds: in the basic ISO 8601 form signatures use, such as 20261019T120000Z, or in
// any form Date.parse() reads; or null.
const signedTimeOf = value => {
  const basic = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value ?? '')

  if (basic) {
    const [year, month, day, hours, minutes, seconds] = basic.slice(1).map(Number)
    return Date.UTC(year, month - 1, day, hours, minutes, seconds)
  }

  const time = Date.parse(value ?? '')
  return Number.isFinite(time) ? time : null
}

// When a signed URL expires, in milliseconds, by its own query: its signing time plus its seconds, or, for an Azure
// shared access signature, its se; the earliest, when it gives several; or null when it gives none.
const signedUrlExpiryOf = url => {
  let query
  try {
    query = [...new URL(url).searchParams.entries()]
  } catch {
    return null
  }

  const parameter = name => query.find(([key]) => key.toLowerCase() === name)?.[1] ?? null
  const expiries = SIGNED_URL_VALIDITIES.map(([dateName, secondsName]) => {
    const signedAt = signedTimeOf(parameter(dateName))
    const seconds = parameter(secondsName) ?? ''

    return signedAt !== null && /^\d+$/.test(seconds) ? signedAt + Number(seconds) * 1000 : null
  })

  if (parameter('sig') !== null) {
    expiries.push(signedTimeOf(parameter('se')))
  }

  const known = expiries.filter(expiry => expiry !== null)
  return known.length > 0 ? Math.min(...known) : null
}

/**
 * Returns the earliest known expiration in epoch milliseconds, or null when unknown.
 * expires is an optional ISO date-time supplied by the API. This only reads the URL;
 * it does not validate its signature or obtain a replacement URL.
 */
const getUrlExpiration = (url, expires) => {
  const given = typeof expires === 'string' ? Date.parse(expires) : NaN
  const known = [Number.isFinite(given) ? given : null, signedUrlExpiryOf(url)].filter(expiry => expiry !== null)

  return known.length > 0 ? Math.min(...known) : null
}

/** Whether a known expiration is at or before the local clock. Unknown is false, not proof of validity. */
const isUrlExpired = (url, expires) => {
  const expiry = getUrlExpiration(url, expires)
  return expiry !== null && expiry <= Date.now()
}

/** The most leading bytes of a response's body isUrlExpiredResponse() examines. */
const URL_EXPIRED_RESPONSE_BYTES = 4096

// Storage's own expiry answers, S3's, Amazon's and Google's ExpiredToken, and Azure's, matched without regard to case
// as the Python and .NET SDKs match them.
const EXPIRED_RESPONSE_MARKERS = [
  'request has expired',
  '<code>expiredtoken</code>',
  'signature not valid in the specified time frame',
]

const EXPIRED_RESPONSE_TYPES = ['download_request_expired', 'upload_request_expired']

// The text of at most URL_EXPIRED_RESPONSE_BYTES leading bytes of body, as UTF-8, and whether they are all of it; or
// null for a body of another kind.
const leadingOf = body => {
  let bytes = null

  if (typeof body === 'string') {
    // One character more than that many is more than that many bytes.
    bytes = new globalThis.TextEncoder().encode(body.slice(0, URL_EXPIRED_RESPONSE_BYTES + 1))
  } else if (ArrayBuffer.isView(body)) {
    bytes = new Uint8Array(body.buffer, body.byteOffset, body.byteLength)
  } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    bytes = new Uint8Array(body)
  }

  return bytes === null ? null : {
    complete: bytes.length <= URL_EXPIRED_RESPONSE_BYTES,
    text: new globalThis.TextDecoder().decode(bytes.subarray(0, URL_EXPIRED_RESPONSE_BYTES)),
  }
}

// Whether the leading text of a body, complete when it is all of it, says its URL has expired. Text that starts as JSON,
// an object, array or string, only as a whole body that parses to an object of an exact top-level Files.com type; any
// other text by storage's own markers, anywhere in it.
const saysExpired = ({ complete, text }) => {
  if (!/^\s*["[{]/.test(text)) {
    const lowered = text.toLowerCase()
    return EXPIRED_RESPONSE_MARKERS.some(marker => lowered.includes(marker))
  }

  if (!complete) {
    return false
  }

  try {
    const parsed = JSON.parse(text)
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
      && EXPIRED_RESPONSE_TYPES.includes(parsed.type)
  } catch {
    return false
  }
}

/**
 * Whether a storage response, its status and the body it gave, says the signed URL the request was sent to has
 * expired, whatever the URL's own query or the local clock say: only a 400 or 403 whose first
 * URL_EXPIRED_RESPONSE_BYTES bytes say so. It only reads what it is given; nothing is kept or logged.
 */
const isUrlExpiredResponse = (status, body) => {
  if (status !== 400 && status !== 403) {
    return false
  }

  const leading = leadingOf(body)
  return leading !== null && saysExpired(leading)
}

export {
  URL_EXPIRED_RESPONSE_BYTES, getUrlExpiration, isUrlExpired, isUrlExpiredResponse,
}
