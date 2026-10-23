import crypto from 'crypto'

import FilesClient from '../lib/FilesClient'

import recorder from './scenarios/file-scenarios.cjs'

// The file scenarios' own recorder, test/scenarios/file-scenarios.cjs as rendered from __file_scenarios.cjs, run as it
// is, never a copy of it: each test carries out the binary scenario's upload from a forward-only stream of unknown size
// through the recorder's own runUpload() and the SDK's own helper, the client's fetch the recorder's own over a
// deterministic transport standing for the Mock, and then joins what the recorder saw with the Mock's journal as it
// would have it (joinJournal()). The transport holds every grant the upload asks for ahead, never answering it, until
// that request's own signal aborts.

const SCENARIO_ID = 'files.owned-binary-roundtrip'
const SCENARIO = recorder.SCENARIOS[SCENARIO_ID]
const STEP = SCENARIO.steps.find(step => step.runs && step.kind === 'intent' && step.intent === 'upload' &&
  step.details.source === 'forward-only-stream' && !step.details.cancel)
const STEP_INDEX = SCENARIO.steps.indexOf(STEP)

const ORIGIN = 'http://mock.example.test'
const API_KEY = 'recorder-test-api-key'
const NAMESPACE = 'js-scenario-recorder'
const DESTINATION = `${NAMESPACE}/${SCENARIO.fixtures[STEP.fixture].path}`
const REF = 'upload-ref-7'
const UPLOAD = 7
const PART_SIZE = 5 * 1024 * 1024

const BEGIN_PATH = '/api/rest/v1/file_actions/begin_upload/'
const FILES_PATH = '/api/rest/v1/files/'
const STORAGE_PATH = '/storage/upload/'
const BEGIN = 'files.begin_upload'
const FINALIZE = 'files.finalize_upload'

// The Mock's catalogue of the operations an upload sends, as its readiness gives them.
const OPERATIONS = [
  { id: BEGIN, method: 'post', path: `${BEGIN_PATH}{path}` },
  { id: FINALIZE, method: 'post', path: `${FILES_PATH}{path}` },
]

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex')

const json = (status, body) => new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' }, status })

// An AbortError as an AbortSignal's own abort without a reason gives it, of the same text as the failed run's.
const abortError = () => AbortSignal.abort().reason

// The bytes of a request's body, as given or as read from its stream.
const bytesOf = async body => {
  if (typeof body === 'string' || ArrayBuffer.isView(body)) {
    return Buffer.from(body)
  }

  const chunks = []

  for await (const chunk of body) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

// An answer never given: rejects only once the request's own signal aborts, with exactly its reason, as Node.js's fetch
// does.
const heldUntilAborted = init => new Promise((resolve, reject) => {
  const { signal } = init

  if (signal.aborted) {
    reject(signal.reason)
    return
  }

  signal.addEventListener('abort', () => reject(signal.reason), { once: true })
})

// The Mock's API and storage for one upload, as the transport the recorder's own fetch sends each request through in
// place of Node.js's. A request whose signal has already aborted rejects with its reason, as Node.js's fetch does; the
// upload's first begin_upload (begin), whatever its body, grants part 1 of REF; each later begin_upload (grants), sent
// with the ref to ask for grants ahead, is held until its own signal aborts; a part's storage (store) stores it,
// answering the SHA-256 of its bytes as its ETag; and the completion (complete) publishes the destination. A test may
// answer any of them otherwise. stored holds the bytes of each part stored, by path.
const transportOf = ({ begin, complete, grants = heldUntilAborted, store } = {}) => {
  const stored = new Map()
  let begun = false

  const answers = {
    begin: begin ?? (() => json(200, [{
      parallel_parts: true,
      part_number: 1,
      partsize: PART_SIZE,
      ref: REF,
      upload_uri: `${ORIGIN}${STORAGE_PATH}1`,
    }])),
    complete: complete ?? (() => json(201, {
      path: DESTINATION,
      size: [...stored.values()].reduce((total, bytes) => total + bytes.length, 0),
      type: 'file',
    })),
    grants,
    store: store ?? (async (init, pathname) => {
      const bytes = await bytesOf(init.body)
      stored.set(pathname, bytes)
      return new Response(null, { headers: { etag: `"${sha256(bytes)}"` }, status: 200 })
    }),
  }

  const transport = async (url, init) => {
    const { pathname } = new URL(url)

    if (init.signal?.aborted) {
      throw init.signal.reason
    }

    if (pathname.startsWith(BEGIN_PATH)) {
      const first = !begun
      begun = true
      return first ? answers.begin(init) : answers.grants(init)
    }

    return pathname.startsWith(FILES_PATH) ? answers.complete(init) : answers.store(init, pathname)
  }

  return { stored, transport }
}

// A phase of the case, as the recorder's own phase() gives one, that never runs out of time but is stopped, with a
// reason, when a test says so.
const phaseOf = () => {
  const controller = new AbortController()

  return {
    check: () => {
      if (controller.signal.aborted) {
        throw controller.signal.reason
      }
    },
    end: () => {},
    expired: () => false,
    signal: controller.signal,
    stop: reason => controller.abort(reason),
  }
}

// Carries out the step's upload through the recorder's own runUpload(), within phase, as the case does (runCase()): the
// step passes only once it is checked within the phase. send, when given, gives the body of the upload's first
// begin_upload in place of the SDK's, as the recorder's own fetch is given that request: the recorder sees that body
// alone, and the transport answers it as the first begin_upload all the same. Gives, once every call and request of it
// has settled, the receipt's positions, every request the recorder saw and the bytes stored.
const upload = async (answers = {}, phase = phaseOf(), send = null) => {
  const { stored, transport } = transportOf(answers)
  const observed = recorder.observingFetch(ORIGIN, API_KEY, () => false, transport)
  let begun = false
  const client = new FilesClient({
    apiKey: API_KEY,
    autoPaginate: false,
    baseUrl: ORIGIN,
    fetch: (url, init) => {
      const first = !begun && new URL(url).pathname.startsWith(BEGIN_PATH)
      begun = begun || first
      return observed(url, first && send !== null ? { ...init, body: send(init.body) } : init)
    },
    maxNetworkRetries: 0,
  })
  recorder.use({ client, namespace: NAMESPACE, operations: OPERATIONS, scenarioId: SCENARIO_ID, scratch: null })
  const position = { attempts: 0, intent: null, outcome: 'not_run', statuses: [] }

  try {
    await recorder.runUpload(STEP, position, phase)
    phase.check()
    position.outcome = 'passed'
  } catch {
    position.outcome = 'failed'
  }

  expect(await recorder.settled(phaseOf())).toBe(true)

  return {
    positions: SCENARIO.steps.map(step => (step === STEP ? position : { outcome: 'not_run' })),
    records: [...recorder.wire.exchanges],
    stored,
  }
}

const isBegin = record => record.api && record.path.startsWith(BEGIN_PATH) && record.sent.ref_sha256 === null
const isGrant = record => record.api && record.path.startsWith(BEGIN_PATH) && record.sent.ref_sha256 !== null
const isCompletion = record => record.api && record.path.startsWith(FILES_PATH)

// The Mock's journal entry of an API request of this run's own credential and of UPLOAD, with fields over it.
const apiEntry = (record, operation, fields = {}) => ({
  credentials: { api_key: 1 },
  epoch: 1,
  fault_id: null,
  method: record.method,
  operation,
  path: record.path,
  status: record.status,
  upload: UPLOAD,
  ...fields,
})

// The Mock's journal of an upload's answered requests, numbered as the Mock would: each API entry (apiEntry()), and
// each part's, of the bytes storage stored; and the grant's entry, answered 200, at 'stored', between its part's and the
// completion's, as the failed run's journal had it, at 'completed', after the completion's, or, at 'absent', none.
// begin, grant and part are fields over those entries', and duplicate journals the grant again at the end. Gives the
// journal and the grant's first entry.
const journalOf = ({ records, stored }, { at = 'stored', begin = {}, duplicate = false, grant = {}, part = {} } = {}) => {
  const grantRecord = records.find(isGrant)
  const grantEntry = grantRecord ? apiEntry(grantRecord, BEGIN, { status: 200, ...grant }) : null
  const entries = []
  let completed = false

  records.filter(record => record.status !== null).forEach(record => {
    if (isBegin(record)) {
      entries.push(apiEntry(record, BEGIN, begin))
    } else if (isCompletion(record)) {
      entries.push(...(!completed && at === 'stored' ? [grantEntry] : []), apiEntry(record, FINALIZE))
      entries.push(...(!completed && at === 'completed' ? [grantEntry] : []))
      completed = true
    } else if (!record.api) {
      const bytes = stored.get(record.path)
      entries.push({
        bytes: bytes.length,
        epoch: 1,
        fault_id: null,
        method: record.method,
        operation: 'transfers.upload_part',
        part: 1,
        path: record.path,
        sha256: sha256(bytes),
        status: record.status,
        upload: UPLOAD,
        ...part,
      })
    }
  })

  if (duplicate) {
    entries.push(grantEntry)
  }

  const numbered = entries.map((entry, index) => ({ ...entry, seq: index + 1 }))
  return { grantEntry: numbered[entries.indexOf(grantEntry)] ?? null, journal: { entries: numbered } }
}

// What the recorder finds of a request that got no answer: answered, the status the journal has it answered with, or
// null when the journal does not have it; and reason, why a grant asked for ahead is no unused grant the SDK stopped.
const noAnswer = (record, answered, reason = null) => {
  const journaled = answered === null ? 'and the journal does not have it' : `though the journal has it, answered ${answered}`
  return `Request ${record.seq} got no answer, ${journaled}${reason === null ? '' : `; it is no unused grant the SDK stopped: ${reason}`}`
}

const notInJournal = record => `Request ${record.seq} to storage got no answer, and the journal does not have it`

// The most bytes of a request's body the recorder reads, a text's counted in UTF-8.
const SENT_LIMIT = 64 * 1024

// Why a stopped grant fails when its step's first begin_upload is not one read as a JSON object without a ref.
const NO_FIRST_BEGIN = `0 begin_upload requests of its step sent as JSON objects without a ref began upload ${UPLOAD}, which its ref finalized, not one`

// The JSON object the SDK sent as a request's body.
const askedOf = body => JSON.parse(Buffer.from(body).toString('utf8'))

// The JSON object asked, with a note added, as JSON text of exactly bytes in UTF-8: of two-byte characters, each one
// UTF-16 code unit, and one of one byte more when the bytes left are odd.
const noted = (asked, bytes) => {
  const left = bytes - Buffer.byteLength(JSON.stringify({ ...asked, note: '' }))
  return JSON.stringify({ ...asked, note: `${'é'.repeat(Math.floor(left / 2))}${left % 2 === 1 ? 'a' : ''}` })
}

describe('the file scenarios\' recorder', () => {
  describe('a grant an upload asked for ahead, which the SDK stopped once it no longer needed it and never used', () => {
    it.each([
      ['once its part was stored, as the failed run\'s journal had it', 'stored'],
      ['once the upload completed', 'completed'],
    ])('keeps the server\'s answer the journal has %s apart from its own record, which got none', async (_, at) => {
      const run = await upload()
      const { grantEntry, journal } = journalOf(run, { at })
      const grant = run.records.find(isGrant)
      const completion = run.records.find(isCompletion)

      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(recorder.joinJournal(journal, run.positions)).toEqual([])
      expect(grant).toMatchObject({
        abort: { phase_ended: false, reason_name: 'AbortError', rejected_with_reason: true, signal_aborted: true },
        disposition: 'stopped-unused-grant',
        journal: null,
        journal_seq: null,
        sent: { part: 2, parts: 4, ref_sha256: sha256(REF) },
        server_outcome: { journal_seq: grantEntry.seq, status: 200 },
        status: null,
      })
      expect(grant.rejection).toMatch(/^AbortError: /)
      expect(grant.abort.settled_after).toBeGreaterThanOrEqual(grant.seq)
      expect(completion.seq).toBeGreaterThan(grant.abort.settled_after)
      expect(completion.sent.ref_sha256).toBe(grant.sent.ref_sha256)
      expect(JSON.stringify(run.records)).not.toContain(REF)
      expect(JSON.stringify(run.records)).not.toContain(API_KEY)
    })

    it('observes no server outcome when the final journal has no entry of it, which never shows it was not sent', async () => {
      const run = await upload()
      const grant = run.records.find(isGrant)

      expect(recorder.joinJournal(journalOf(run, { at: 'absent' }).journal, run.positions)).toEqual([])
      expect(grant).toMatchObject({ disposition: 'stopped-unused-grant', journal: null, server_outcome: null, status: null })
    })

    it('leaves unexplained a second journal entry of it, its server outcome the first', async () => {
      const run = await upload()
      const grant = run.records.find(isGrant)
      const { grantEntry, journal } = journalOf(run, { duplicate: true })

      expect(recorder.joinJournal(journal, run.positions)).toEqual(['The journal holds 1 API requests the SDK was not seen to send'])
      expect(grant.server_outcome).toEqual({ journal_seq: grantEntry.seq, status: 200 })
    })

    it.each([
      ['of another credential', { credentials: { api_key: 2 } }],
      ['with a fault', { fault_id: 'grant-fault' }],
      ['of another path', { path: `${BEGIN_PATH}${encodeURIComponent(`${NAMESPACE}/other.bin`)}` }],
    ])('never takes as its own a journal entry %s, which stays unexplained', async (_, fields) => {
      const run = await upload()
      const grant = run.records.find(isGrant)

      expect(recorder.joinJournal(journalOf(run, { at: 'completed', grant: fields }).journal, run.positions)).toEqual([
        'The journal holds 1 API requests the SDK was not seen to send',
      ])
      expect(grant.server_outcome).toBeNull()
    })
  })

  describe('any other request that got no answer', () => {
    it('fails an upload\'s first begin_upload, though its own signal stopped it', async () => {
      const phase = phaseOf()
      const run = await upload({
        begin: init => {
          phase.stop(abortError())
          return heldUntilAborted(init)
        },
      }, phase)
      const begin = run.records.find(isBegin)
      const journal = { entries: [{ ...apiEntry(begin, BEGIN, { status: 200 }), seq: 1 }] }

      expect(run.positions[STEP_INDEX].outcome).toBe('failed')
      expect(begin.abort).toMatchObject({ rejected_with_reason: true, signal_aborted: true })
      expect(recorder.joinJournal(journal, run.positions)).toEqual([noAnswer(begin, 200)])
      expect(begin.disposition).toBeNull()
    })

    it('fails a grant asked for ahead whose fetch failed, its own signal not aborted', async () => {
      const run = await upload({ grants: () => Promise.reject(new TypeError('fetch failed')) })
      const grant = run.records.find(isGrant)

      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(recorder.joinJournal(journalOf(run, { at: 'absent' }).journal, run.positions)).toEqual([
        noAnswer(grant, null, 'it was not stopped by its own signal'),
      ])
      expect(grant.disposition).toBeNull()
    })

    it('fails a grant asked for ahead that rejected, once its own signal aborted, with another AbortError of the same text', async () => {
      const run = await upload({ grants: init => heldUntilAborted(init).catch(() => { throw abortError() }) })
      const grant = run.records.find(isGrant)

      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(grant.rejection).toMatch(/^AbortError: This operation was aborted/)
      expect(grant.abort).toMatchObject({ rejected_with_reason: false, signal_aborted: true })
      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([
        noAnswer(grant, 200, 'it was not stopped by its own signal'),
      ])
    })

    it('fails a grant asked for ahead that its own signal stopped, with an AbortError, as the case\'s phase ended', async () => {
      const phase = phaseOf()
      const run = await upload({
        grants: init => {
          phase.stop(abortError())
          return heldUntilAborted(init)
        },
      }, phase)
      const grant = run.records.find(isGrant)
      const parts = run.records.filter(record => !record.api)

      expect(run.positions[STEP_INDEX].outcome).toBe('failed')
      expect(grant.abort).toMatchObject({ phase_ended: true, reason_name: 'AbortError', rejected_with_reason: true, signal_aborted: true })
      expect(recorder.joinJournal(journalOf(run, { at: 'absent' }).journal, run.positions)).toEqual([
        noAnswer(grant, null, 'the case\'s phase had ended when it was stopped'),
        ...parts.map(notInJournal),
      ])
    })

    it('fails a grant asked for ahead that the SDK stopped once it no longer needed it, when its upload then failed', async () => {
      const run = await upload({ complete: () => json(500, { 'http-code': 500, title: 'Internal Server Error', type: 'internal-server-error' }) })
      const grant = run.records.find(isGrant)

      expect(run.positions[STEP_INDEX].outcome).toBe('failed')
      expect(grant.abort).toMatchObject({ phase_ended: false, reason_name: 'AbortError', rejected_with_reason: true, signal_aborted: true })
      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([
        noAnswer(grant, 200, 'its upload step did not pass'),
      ])
    })

    it('fails a request to storage that got no answer, and the grant its failed upload had asked for ahead', async () => {
      const run = await upload({ store: () => Promise.reject(new TypeError('fetch failed')) })
      const grant = run.records.find(isGrant)
      const parts = run.records.filter(record => !record.api)

      expect(run.positions[STEP_INDEX].outcome).toBe('failed')
      expect(parts.length).toBeGreaterThan(0)
      expect(recorder.joinJournal(journalOf(run, { at: 'absent' }).journal, run.positions)).toEqual([
        noAnswer(grant, null, 'its upload step did not pass'),
        ...parts.map(notInJournal),
      ])
    })

    it('fails a grant asked for ahead when storage was sent a part it asked a grant for', async () => {
      const run = await upload()
      const grant = run.records.find(isGrant)
      const [stored] = run.records.filter(record => !record.api)

      expect(recorder.joinJournal(journalOf(run, { part: { part: 2 } }).journal, run.positions)).toEqual([
        noAnswer(grant, 200, `part 2, one it asked a grant for, was sent to storage in request ${stored.seq}`),
      ])
      expect(grant).toMatchObject({ disposition: null, server_outcome: null })
    })

    it.each([
      [
        'whose journal entry is of another upload than the one its ref finalized',
        { grant: { upload: 8 } },
        'the journal has it for upload 8, not upload 7, which its ref finalized',
      ],
      [
        'whose step\'s first begin_upload the journal shows beginning another upload',
        { begin: { upload: 9 } },
        NO_FIRST_BEGIN,
      ],
    ])('fails a grant asked for ahead %s', async (_, fields, reason) => {
      const run = await upload()
      const grant = run.records.find(isGrant)

      expect(recorder.joinJournal(journalOf(run, fields).journal, run.positions)).toEqual([noAnswer(grant, 200, reason)])
      expect(grant.disposition).toBeNull()
    })

    it('fails a grant asked for ahead whose ref is not the one its upload\'s completion sent', async () => {
      const run = await upload()
      const grant = run.records.find(isGrant)
      grant.sent.ref_sha256 = sha256('another-upload-ref')

      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([
        noAnswer(grant, 200, 'no answered completion of its upload by its ref started once it had settled'),
      ])
      expect(grant.disposition).toBeNull()
    })
  })

  // The witness that a stopped grant's upload was begun by its step's first begin_upload, sent without a ref: only a
  // body the recorder read whole, within its bytes, as a JSON object with no ref of its own gives it. Each body here is
  // the one the recorder's own fetch is given in place of the SDK's (upload()'s send), the upload, its transport and its
  // journal otherwise as ever.
  describe('the first begin_upload of a stopped grant\'s upload, as the witness that upload was begun without a ref', () => {
    it.each([
      ['as bytes, the SDK\'s own JSON text in UTF-8', body => Buffer.from(body)],
      [`as JSON text of exactly ${SENT_LIMIT} bytes in UTF-8`, body => noted(askedOf(body), SENT_LIMIT)],
      [`as exactly ${SENT_LIMIT} bytes of JSON`, body => Buffer.from(noted(askedOf(body), SENT_LIMIT))],
    ])('is taken sent %s, an object without a ref', async (_, send) => {
      const run = await upload({}, phaseOf(), send)
      const grant = run.records.find(isGrant)

      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([])
      expect(grant.disposition).toBe('stopped-unused-grant')
    })

    it.each([
      ['with no body', () => undefined],
      ['with a body neither text nor bytes', body => Uint8Array.from(Buffer.from(body)).buffer],
      [`as ${SENT_LIMIT + 1} bytes of JSON`, body => Buffer.from(noted(askedOf(body), SENT_LIMIT + 1))],
      ['as malformed JSON', body => Buffer.from(body).toString('utf8').slice(0, -1)],
      ['as JSON that is no object', body => JSON.stringify([askedOf(body)])],
      ['with a ref of \'\'', body => JSON.stringify({ ...askedOf(body), ref: '' })],
      ['with a ref of null', body => JSON.stringify({ ...askedOf(body), ref: null })],
      ['with a ref that is no string', body => JSON.stringify({ ...askedOf(body), ref: 7 })],
    ])('is not taken sent %s, which shows no ref absent', async (_, send) => {
      const run = await upload({}, phaseOf(), send)
      const grant = run.records.find(isGrant)

      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([noAnswer(grant, 200, NO_FIRST_BEGIN)])
      expect(grant.disposition).toBeNull()
    })

    it(`is not taken sent as JSON text of ${SENT_LIMIT + 1} bytes in UTF-8, though of fewer UTF-16 code units than ${SENT_LIMIT}`, async () => {
      let sent = null
      const run = await upload({}, phaseOf(), body => {
        sent = noted(askedOf(body), SENT_LIMIT + 1)
        return sent
      })
      const grant = run.records.find(isGrant)

      expect(sent.length).toBeLessThan(SENT_LIMIT)
      expect(Buffer.byteLength(sent)).toBe(SENT_LIMIT + 1)
      expect(run.positions[STEP_INDEX].outcome).toBe('passed')
      expect(recorder.joinJournal(journalOf(run).journal, run.positions)).toEqual([noAnswer(grant, 200, NO_FIRST_BEGIN)])
      expect(grant.disposition).toBeNull()
      expect(JSON.stringify(run.records)).not.toContain('é')
    })
  })
})
