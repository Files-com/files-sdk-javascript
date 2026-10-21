import { execFile, execFileSync } from 'child_process'
import dns from 'dns'
import { errorMonitor } from 'events'
import fs from 'fs'
import https from 'https'
import os from 'os'
import path from 'path'
import { Readable, Writable } from 'stream'
import tls from 'tls'
import { promisify } from 'util'

import crossFetch from 'cross-fetch'

import Api from '../lib/Api'
import { FilesError } from '../lib/Errors'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import { LogLevel } from '../lib/Logger'
import { forTests as downloadThreads } from '../lib/isomorphic/DownloadWorkers.node'
import File from '../lib/models/File'

const PAYLOAD = Buffer.from(Array.from({ length: 32768 }, (_, index) => index % 251))
const SIGNATURE = 'test-download-signature'
const INTERRUPTED_RESPONSE = /aborted|ended before it was complete/
const MIB = 1024 * 1024
const LARGE_DEADLINE = 10000

// A file large enough to come in three ranges. Each group of four bytes holds its own offset plus seed, so that bytes
// written at another offset, or taken from another version, show.
const positionedBytes = seed => {
  const bytes = Buffer.alloc(24 * MIB)

  for (let offset = 0; offset < bytes.length; offset += 4) {
    bytes.writeUInt32BE(offset + seed, offset)
  }

  return bytes
}

const LARGE = positionedBytes(0)
const OTHER_VERSION = positionedBytes(1)

// Where the third range of LARGE begins: of its three, the only one a download thread can read (see
// DownloadWorkers.node.js), the ordinary response and the probe giving the other two.
const THIRD_RANGE = 16 * MIB

// /large/uneven serves UNEVEN, LARGE but for its last 4 KiB, so that its third range ends in a batch smaller than the
// others, its last, given once the range's response has ended.
const UNEVEN = LARGE.subarray(0, LARGE.length - 4096)
const UNEVEN_LAST_BATCH = THIRD_RANGE + 7 * MIB

// /large/parsed-range serves PARSED_RANGE, LARGE up to its third range and only 1 MiB and 64 KiB of that, so that once
// the range's first 1 MiB batch has been taken, only 64 KiB of its response is left: far less than the 4 MiB a paused
// response reads ahead, so its client receives and parses all of it while it waits unread.
const PARSED_RANGE = LARGE.subarray(0, THIRD_RANGE + MIB + 65536)

// /large/unterminated serves UNTERMINATED, LARGE up to its third range and only 1 MiB of that, so that the third range
// is one full batch; its response, declaring no length, sends every byte of it in chunks, but never the chunk that ends
// them (see answerRange()).
const UNTERMINATED = LARGE.subarray(0, THIRD_RANGE + MIB)

// The files /large/<behavior> serves that are shorter than LARGE, by behavior.
const SHORTER_FILES = { 'parsed-range': PARSED_RANGE, uneven: UNEVEN, unterminated: UNTERMINATED }

// The ordinary response of /large/parallel is right only up to the end of its first range, so a file equal to LARGE
// shows that every byte after it came from the range requests.
const PARALLEL_ORDINARY = Buffer.concat([LARGE.subarray(0, 8 * MIB), OTHER_VERSION.subarray(8 * MIB)])

// /held-cut declares CUT_TOTAL bytes but sends only CUT_SENT, until the test cuts it. That is more than a write batch,
// whether 1 MiB or 4 MiB, so that a full batch is written while the rest has still to come; and what is left unread
// beyond that batch is less than the 4 MiB a paused response reads ahead, so that the client still reads, and sees, the
// cut while that write is held.
const CUT_SENT = 4.5 * MIB
const CUT_TOTAL = 6 * MIB

// /held-end sends all of END_BODY at once. It is smaller than either write batch, so that its one write is the final
// one, made once the response has ended.
const END_BODY = LARGE.subarray(0, MIB - 1)

// /resumable gives the first RESUME_CUT bytes of PAYLOAD with its size and a strong ETag, then cuts its connection;
// asked for the rest of that version, it answers with exactly that range. /resumable-unterminated starts the same way,
// but answers for the rest, declaring no length, with every byte of it in chunks and never the chunk that ends them.
const RESUME_CUT = 10000

// The page the Files.com web app answers with, which no download may take for the file.
const FRONTEND_PAGE = '<!DOCTYPE html><html><body>Files.com</body></html>'

// /slow-complete sends SLOW_BODY a byte every SLOW_BYTE_MS, so that it completes after about half a second, sending
// something all along.
const SLOW_BODY = Buffer.from('slowbody')
const SLOW_BYTE_MS = 60

// Lets some turns of the event loop pass, so that a download settling, or closing its file, too early would have.
const eventLoopTurns = async (count = 10) => {
  for (let turn = 0; turn < count; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => { setImmediate(resolve) })
  }
}

const withinDeadline = (promise, description, ms = 2000) => {
  let timer
  const deadline = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out waiting for ${description}`)), ms)
  })

  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer))
}

const failureOf = (promise, ms) => withinDeadline(promise.then(() => {
  throw new Error('Expected the download to fail')
}, error => error), 'the download to fail', ms)

// A download's outcome, which never rejects: { value } or { error }.
const downloadOutcomeOf = download => download.then(value => ({ value }), error => ({ error }))

// Resolves once check() holds, looking every few milliseconds, or rejects once ms have passed without it, looking no
// more: no look is left behind either way.
const waitUntil = (check, description, ms = 2000) => new Promise((resolve, reject) => {
  const deadline = Date.now() + ms

  const look = () => {
    if (check()) {
      resolve()
    } else if (Date.now() >= deadline) {
      reject(new Error(`Timed out waiting for ${description}`))
    } else {
      setTimeout(look, 5)
    }
  }

  look()
})

// Records each file the SDK opens, without changing it, and whether the SDK has closed it.
const trackOpenedFiles = () => {
  const opened = []
  const open = fs.promises.open.bind(fs.promises)

  jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
    const handle = await open(...args)
    const file = { closed: false }
    const close = handle.close.bind(handle)

    handle.close = async () => {
      await close()
      file.closed = true
    }

    opened.push(file)
    return handle
  })

  return opened
}

const writableWithThrowingClose = write => {
  const writable = new Writable({ write })
  writable.close = () => {
    throw new Error('closing the writable failed')
  }

  return writable
}

describe('File downloads', () => {
  let directory
  let server
  let baseUrl
  let certificate
  let stalledResponseClosed
  let priorCa

  // /paced answers with its headers at once, and with its body only once the test calls releasePaced().
  let releasePaced = null

  const downloadableFile = urlPath => new File({ download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` })

  // The Range and If-Match of each request for /large/...; how many range requests of each behavior are open at once,
  // and the most there have been; and the range requests for each file of /large/<behavior>/<file>. Ordinary gathered
  // requests are held until gatherCount have come, and held downloads until the test answers them.
  const largeRequests = []
  const served = []
  const renewals = []
  const heldOrdinary = []
  const heldDownloads = []
  const openRanges = {}
  const mostOpenRanges = {}
  const rangesByFile = {}
  let gatherCount = 0
  let downloadsHeld = null
  let ordinaryClosed = null
  let firstRangeClosed = null
  let heldWriteResponse = null

  // For /large/split-renewal: called as its probe for the second range arrives, which is then answered with that range's
  // headers and first 64 KiB and held, as heldSplitRange, until the test cuts it. While heldRenewals is an array, each
  // request to give a download URL again is held in it, as { answer, closed }: answer() answers it, unless its client
  // has gone, and closed resolves once its connection has closed.
  let onSplitProbe = null
  let heldSplitRange = null
  let heldRenewals = null

  // Every request for /large/<behavior>/... the server has open, the ordinary request, the probe and every other range
  // alike, by behavior, from its arrival until its response has been sent to its end or has closed, and the most there
  // have been at once.
  const openLarge = {}
  const mostOpenLarge = {}

  // For /large/limited and /large/capped-two, by behavior: what sends the rest of the ordinary response, the last 64 KiB
  // of its first range and all after, which it holds until the third range's request has come (see answerOrdinary()).
  const ordinaryTails = {}

  // For /large/held-range: the response to the third range's request, answered with its headers and first 1 MiB and
  // then held, until the test ends it with the rest or it closes. For /large/reset: how many requests for the third
  // range, or the rest of it, have come. While renewedDownloadUri is set, a request to give a download URL again is
  // answered with it rather than /complete.
  let heldThreadRange = null
  let resetRanges = 0
  let renewedDownloadUri = null

  // Answers an ordinary request for LARGE, or the behavior's shorter file (SHORTER_FILES), as storage would, but with a
  // weak ETag, none, or no declared size when the behavior says so.
  const answerOrdinary = (response, behavior) => {
    if (behavior === 'unknown-size') {
      // Written before it ends, the body is sent in chunks, without a Content-Length.
      response.writeHead(200, { ETag: '"v1"' })
      response.write(LARGE)
      response.end()
      return
    }

    const body = SHORTER_FILES[behavior] ?? LARGE
    const headers = { 'Content-Length': body.length, ETag: behavior === 'weak' ? 'W/"v1"' : '"v1"' }

    if (behavior === 'no-etag') {
      delete headers.ETag
    }

    if (behavior === 'cut-range') {
      ordinaryClosed = new Promise(resolve => { response.once('close', resolve) })
    }

    if (behavior === 'broken-range') {
      firstRangeClosed = {}
      firstRangeClosed.promise = new Promise(resolve => { firstRangeClosed.resolve = resolve })
    }

    if (behavior === 'limited' || behavior === 'capped-two') {
      // The first range's last 64 KiB, and what comes after it, are held until the third range's request has come: the
      // client can only send that request once the probe's range has been written and the probe's request has closed,
      // both here and at the client, while the first range cannot be done and the ordinary request stays open. So the
      // third range takes the probe's place, and the most requests open at once, counted here, are those the client has.
      // Should the third range's request never come, the rest is sent once the test's own time is up.
      let sent = false

      const sendTail = () => {
        if (!sent && !response.destroyed) {
          sent = true
          response.end(LARGE.subarray(8 * MIB - 65536))
        }
      }

      ordinaryTails[behavior] = sendTail
      setTimeout(sendTail, LARGE_DEADLINE).unref()
      response.writeHead(200, headers)
      response.write(LARGE.subarray(0, 8 * MIB - 65536))
      return
    }

    response.writeHead(200, headers)
    response.end(behavior === 'parallel' ? PARALLEL_ORDINARY : body)
  }

  // Answers a request for a range of LARGE as storage would, or as the behavior says: from another version, with
  // another range, or never; for the last range, cut short once the ordinary response has closed; or, for the first,
  // cut short just after answering, while the other range's answer waits until well after that cut.
  const answerRange = (response, behavior, start, end) => {
    let closed = false
    openRanges[behavior] = (openRanges[behavior] ?? 0) + 1
    mostOpenRanges[behavior] = Math.max(mostOpenRanges[behavior] ?? 0, openRanges[behavior])

    response.once('close', () => {
      closed = true
      openRanges[behavior] -= 1
    })

    if (behavior === 'slow-ranges') {
      return
    }

    let bytes = behavior === 'other-version' ? OTHER_VERSION : LARGE
    bytes = SHORTER_FILES[behavior] ?? bytes
    const first = behavior === 'other-range' ? start + 1 : start
    const headers = {
      'Content-Length': end - first + 1,
      'Content-Range': `bytes ${first}-${end}/${bytes.length}`,
      ETag: behavior === 'other-version' ? '"v2"' : '"v1"',
    }

    const answer = () => {
      if (!closed) {
        response.writeHead(206, headers)
        response.end(bytes.subarray(first, end + 1))
      }
    }

    if (behavior === 'cut-range' && end === LARGE.length - 1) {
      response.writeHead(206, headers)
      response.write(bytes.subarray(start, start + MIB))
      ordinaryClosed.then(() => response.socket?.destroy())
    } else if (behavior === 'broken-ordinary') {
      ordinaryClosed.then(answer)
    } else if (behavior === 'split-renewal' && start === 8 * MIB) {
      onSplitProbe?.()
      response.writeHead(206, headers)
      response.write(bytes.subarray(start, start + 65536))
      heldSplitRange = response
    } else if (behavior === 'broken-range' && start === 8 * MIB) {
      response.once('close', firstRangeClosed.resolve)
      response.writeHead(206, headers)
      response.write(bytes.subarray(start, start + 65536))
      setTimeout(() => response.destroy(), 50)
    } else if (behavior === 'broken-range') {
      firstRangeClosed.promise.then(() => setTimeout(answer, 200))
    } else if (behavior === 'held-range' && start === THIRD_RANGE) {
      response.writeHead(206, headers)
      response.write(bytes.subarray(start, start + MIB))
      heldThreadRange = response
    } else if (behavior === 'unterminated' && start === THIRD_RANGE) {
      // Declaring no length, the response is sent in chunks: every byte of the range, but not the chunk that ends them.
      const { 'Content-Length': declared, ...unsized } = headers
      response.writeHead(206, unsized)
      response.write(bytes.subarray(start, end + 1))
      heldThreadRange = response
    } else if (behavior === 'reset' && start >= THIRD_RANGE) {
      // The third range is cut once 1 MiB and 4 KiB of it have been sent; the rest of it is then answered as of another
      // version, which starts the download over, and after that, every request as storage would.
      resetRanges += 1

      if (resetRanges === 1) {
        response.writeHead(206, headers)
        response.write(bytes.subarray(start, start + MIB + 4096), () => setTimeout(() => response.socket?.destroy(), 20))
      } else if (resetRanges === 2) {
        response.writeHead(206, { ...headers, ETag: '"v2"' })
        response.end(OTHER_VERSION.subarray(first, end + 1))
      } else {
        answer()
      }
    } else if ((behavior === 'limited' || behavior === 'capped-two') && start === 8 * MIB) {
      // The probe's range comes slowly, its last 7 MiB half a second after its first: however long the probe takes, the
      // third range's request comes only once it is done (see answerOrdinary()).
      response.writeHead(206, headers)
      response.write(bytes.subarray(start, start + MIB))

      setTimeout(() => {
        if (!closed) {
          response.end(bytes.subarray(start + MIB, end + 1))
        }
      }, 500)
    } else if ((behavior === 'limited' || behavior === 'capped-two') && start === THIRD_RANGE) {
      // The third range's request has come: the ordinary response may now end (see answerOrdinary()).
      answer()
      ordinaryTails[behavior]?.()
    } else {
      answer()
    }
  }

  const answerLarge = (request, response, behavior, file) => {
    const asked = /^bytes=(\d+)-(\d+)$/.exec(request.headers.range ?? '')
    largeRequests.push({ ifMatch: request.headers['if-match'], range: request.headers.range })
    openLarge[behavior] = (openLarge[behavior] ?? 0) + 1
    mostOpenLarge[behavior] = Math.max(mostOpenLarge[behavior] ?? 0, openLarge[behavior])

    let counted = true
    const uncount = () => {
      if (counted) {
        counted = false
        openLarge[behavior] -= 1
      }
    }

    response.once('finish', uncount)
    response.once('close', uncount)

    if (asked && file) {
      rangesByFile[file] = (rangesByFile[file] ?? 0) + 1
    }

    if (behavior === 'forbidden') {
      response.writeHead(403, { 'Content-Type': 'application/xml' })
      response.end(`<Error><Code>AccessDenied</Code><Message>${SIGNATURE}</Message></Error>`)
    } else if (behavior === 'held') {
      heldDownloads.push(response)
      downloadsHeld?.(heldDownloads.length)
    } else if (behavior === 'broken-ordinary' && !asked) {
      // The ordinary response could be split, but its connection is cut while its range requests wait, answered only
      // once it has closed.
      ordinaryClosed = new Promise(resolve => { response.once('close', resolve) })
      response.writeHead(200, { 'Content-Length': LARGE.length, ETag: '"v1"' })
      response.write(LARGE.subarray(0, 65536), () => response.socket?.destroy())
    } else if (behavior === 'gathered' && !asked) {
      // Ordinary requests are held until gatherCount have come, then all answered at once.
      heldOrdinary.push(response)

      if (heldOrdinary.length === gatherCount) {
        heldOrdinary.splice(0).forEach(held => answerOrdinary(held, behavior))
      }
    } else if (asked && behavior !== 'ignores-range') {
      answerRange(response, behavior, Number(asked[1]), Number(asked[2]))
    } else {
      answerOrdinary(response, behavior)
    }
  }

  beforeEach(() => {
    largeRequests.length = 0
    served.length = 0
    renewals.length = 0
    releasePaced = null
    onSplitProbe = null
    heldSplitRange = null
    heldRenewals = null
    heldThreadRange = null
    resetRanges = 0
    renewedDownloadUri = null
    Object.keys(ordinaryTails).forEach(behavior => { delete ordinaryTails[behavior] })

    // Range requests are counted by their file's last path segment, which tests reuse, such as /large/split-renewal/1
    // and /large/last/1: each test counts its own.
    Object.keys(rangesByFile).forEach(file => { delete rangesByFile[file] })
  })

  // A File of urlPath on the test server, from a client of its own with settings, such as no retries.
  const clientFile = (urlPath, settings = {}) => new File(
    { download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` },
    { client: new FilesClient({ apiKey: 'client-key', baseUrl, ...settings }) },
  )

  beforeAll(async () => {
    const agentOptions = https.globalAgent.options
    priorCa = { present: Object.prototype.hasOwnProperty.call(agentOptions, 'ca'), value: agentOptions.ca }
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-download-'))

    // A certificate made for this test file only; TLS verification stays on and trusts just this certificate.
    const configPath = path.join(directory, 'openssl.cnf')
    const keyPath = path.join(directory, 'key.pem')
    const certPath = path.join(directory, 'cert.pem')
    fs.writeFileSync(configPath, [
      '[req]',
      'distinguished_name = subject',
      'x509_extensions = extensions',
      'prompt = no',
      '[subject]',
      'CN = 127.0.0.1',
      '[extensions]',
      'subjectAltName = IP:127.0.0.1',
    ].join('\n'))

    execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1', '-config', configPath, '-keyout', keyPath, '-out', certPath], { stdio: 'ignore' })

    const cert = fs.readFileSync(certPath)
    certificate = cert
    https.globalAgent.options.ca = cert

    server = https.createServer({ cert, key: fs.readFileSync(keyPath) }, (request, response) => {
      served.push(`${request.method} ${request.url.split('?')[0]} ${request.headers.range ?? ''} ${request.headers['if-match'] ?? ''}`.trim())

      if (request.url.startsWith('/large/')) {
        const [, , behavior, file] = request.url.split('?')[0].split('/')
        answerLarge(request, response, behavior, file)
        return
      }

      // The API gives a File's download URL again, as its download() does, to the File's own client.
      if (request.url.startsWith('/api/rest/v1/files/')) {
        renewals.push({ key: request.headers['x-filesapi-key'], path: decodeURIComponent(request.url.split('?')[0].replace('/api/rest/v1/files/', '')) })

        let gone = false
        const closed = new Promise(resolve => {
          response.once('close', () => {
            gone = true
            resolve()
          })
        })

        const answerRenewal = () => {
          if (!gone) {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ download_uri: renewedDownloadUri ?? `${baseUrl}/complete?X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin', type: 'file' }))
          }
        }

        if (heldRenewals) {
          heldRenewals.push({ answer: answerRenewal, closed })
        } else {
          answerRenewal()
        }

        return
      }

      // A redirect to /complete, as storage may answer with.
      if (request.url.startsWith('/hop')) {
        response.writeHead(302, { Location: `/complete?X-Amz-Signature=${SIGNATURE}` })
        response.end()
        return
      }

      if (request.url.startsWith('/frontend')) {
        response.writeHead(200, { 'Content-Length': FRONTEND_PAGE.length, 'Content-Type': 'text/html', 'X-Files-Frontend-App': '1' })
        response.end(FRONTEND_PAGE)
        return
      }

      if (request.url.startsWith('/resumable')) {
        const asked = /^bytes=(\d+)-(\d+)$/.exec(request.headers.range ?? '')

        if (asked) {
          const [start, end] = [Number(asked[1]), Number(asked[2])]
          const headers = { 'Content-Range': `bytes ${start}-${end}/${PAYLOAD.length}`, ETag: '"r1"' }

          if (request.url.startsWith('/resumable-unterminated')) {
            response.writeHead(206, headers)
            response.flushHeaders()
            response.write(PAYLOAD.subarray(start, end + 1))
          } else {
            response.writeHead(206, { 'Content-Length': end - start + 1, ...headers })
            response.end(PAYLOAD.subarray(start, end + 1))
          }
        } else {
          response.writeHead(200, { 'Content-Length': PAYLOAD.length, ETag: '"r1"' })
          response.write(PAYLOAD.subarray(0, RESUME_CUT), () => setTimeout(() => response.socket.destroy(), 20))
        }

        return
      }

      if (request.url.startsWith('/held-cut')) {
        response.writeHead(200, { 'Content-Length': CUT_TOTAL })
        response.write(LARGE.subarray(0, CUT_SENT))
        heldWriteResponse = response
        return
      }

      if (request.url.startsWith('/held-end')) {
        response.writeHead(200, { 'Content-Length': END_BODY.length })
        response.end(END_BODY)
        return
      }

      // Never answered: only the client can end the request.
      if (request.url.startsWith('/held-headers')) {
        return
      }

      if (request.url.startsWith('/slow-complete')) {
        response.writeHead(200, { 'Content-Length': SLOW_BODY.length })
        let sent = 0

        const timer = setInterval(() => {
          response.write(SLOW_BODY.subarray(sent, sent + 1))
          sent += 1

          if (sent === SLOW_BODY.length) {
            clearInterval(timer)
            response.end()
          }
        }, SLOW_BYTE_MS)

        response.once('close', () => clearInterval(timer))
        return
      }

      if (request.url.startsWith('/paced')) {
        response.writeHead(200, { 'Content-Length': PAYLOAD.length })
        response.flushHeaders()
        releasePaced = () => response.end(PAYLOAD)
        return
      }

      response.writeHead(200, { 'Content-Length': PAYLOAD.length })

      if (request.url.startsWith('/complete')) {
        response.end(PAYLOAD)
      } else if (request.url.startsWith('/truncated')) {
        response.write(PAYLOAD.subarray(0, 4096), () => response.socket.destroy())
      } else {
        stalledResponseClosed = new Promise(resolve => { response.once('close', resolve) })
        response.write(PAYLOAD.subarray(0, 4096))
      }
    })

    await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
    baseUrl = `https://127.0.0.1:${server.address().port}`
  })

  afterEach(() => {
    jest.restoreAllMocks()
    heldThreadRange?.destroy()
  })

  afterAll(async () => {
    if (priorCa.present) {
      https.globalAgent.options.ca = priorCa.value
    } else {
      delete https.globalAgent.options.ca
    }

    server.closeAllConnections()
    await new Promise(resolve => { server.close(resolve) })
    fs.rmSync(directory, { force: true, recursive: true })
  })

  describe('downloadToFile', () => {
    it('writes the exact bytes and closes the file it opened', async () => {
      const opened = trackOpenedFiles()
      const destination = path.join(directory, 'complete.bin')

      await withinDeadline(downloadableFile('/complete').downloadToFile(destination), 'the download')

      expect(opened).toEqual([{ closed: true }])
      expect(fs.readFileSync(destination).equals(PAYLOAD)).toBe(true)
    })

    it('rejects and closes the file when the response is cut short', async () => {
      const opened = trackOpenedFiles()

      const error = await failureOf(downloadableFile('/truncated').downloadToFile(path.join(directory, 'truncated.bin')))

      expect(opened).toEqual([{ closed: true }])
      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
      expect(JSON.stringify(error, Object.getOwnPropertyNames(error))).not.toContain(SIGNATURE)
    })

    it('rejects and closes the file when the download URL is invalid', async () => {
      const opened = trackOpenedFiles()

      const error = await failureOf(new File({ download_uri: 'not a url' }).downloadToFile(path.join(directory, 'invalid.bin')))

      expect(opened).toEqual([{ closed: true }])
      expect(error.code).toBe('ERR_INVALID_URL')
    })

    it('rejects with the error from opening the destination', async () => {
      const error = await failureOf(downloadableFile('/complete').downloadToFile(directory))

      expect(error.code).toBe('EISDIR')
    })

    it('rejects with the status of a response other than 200, writing none of its body', async () => {
      const opened = trackOpenedFiles()
      const destination = path.join(directory, 'forbidden.bin')

      const error = await failureOf(downloadableFile('/large/forbidden').downloadToFile(destination))

      expect(error.status).toBe(403)
      expect(error.message).toBe('Download failed with HTTP status 403')
      expect(JSON.stringify(error, Object.getOwnPropertyNames(error))).not.toContain(SIGNATURE)
      expect(fs.statSync(destination).size).toBe(0)
      expect(opened).toEqual([{ closed: true }])
      expect(largeRequests).toHaveLength(1)
    })

    it('downloads a large file in ranges of its one version, and closes the file before resolving', async () => {
      const opened = trackOpenedFiles()
      const destination = path.join(directory, 'parallel.bin')

      await withinDeadline(downloadableFile('/large/parallel').downloadToFile(destination), 'the download', LARGE_DEADLINE)

      expect(opened).toEqual([{ closed: true }])
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(largeRequests[0]).toEqual({ ifMatch: undefined, range: undefined })
      expect(largeRequests.slice(1).map(({ ifMatch, range }) => `${range} ${ifMatch}`).sort()).toEqual([
        'bytes=16777216-25165823 "v1"',
        'bytes=8388608-16777215 "v1"',
      ])
    }, LARGE_DEADLINE)

    it.each([
      ['a weak ETag', 'weak'],
      ['no ETag', 'no-etag'],
      ['no declared size', 'unknown-size'],
    ])('downloads a large file through its one response when that response has %s', async (_, behavior) => {
      const destination = path.join(directory, `${behavior}.bin`)

      await withinDeadline(downloadableFile(`/large/${behavior}`).downloadToFile(destination), 'the download', LARGE_DEADLINE)

      expect(largeRequests).toEqual([{ ifMatch: undefined, range: undefined }])
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
    }, LARGE_DEADLINE)

    // Nothing a range request answers is written before every one has answered as asked, and until then the first
    // response is left unread, so it can still give the whole file.
    it.each([
      ['ignore the range asked for', 'ignores-range'],
      ['are of another version', 'other-version'],
      ['are of another range', 'other-range'],
      ['do not answer within two seconds', 'slow-ranges'],
    ])('downloads a large file through its first response alone when its range requests %s', async (_, behavior) => {
      const destination = path.join(directory, `${behavior}.bin`)

      await withinDeadline(downloadableFile(`/large/${behavior}`).downloadToFile(destination), 'the download', LARGE_DEADLINE)

      // Once one range request has answered otherwise, the other may be stopped before it reaches the server.
      const rangeRequests = largeRequests.filter(({ range }) => range)
      expect(rangeRequests.length).toBeGreaterThanOrEqual(1)
      expect(rangeRequests.length).toBeLessThanOrEqual(2)
      expect(largeRequests.filter(({ range }) => !range)).toHaveLength(1)
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
    }, LARGE_DEADLINE)

    // The probe for the second range answers exactly, so the download is split, and then breaks after 64 KiB: the rest
    // of that range is asked for again, of the same version, from its first byte not yet written.
    it('asks for the rest of a range that breaks once the download was split, from the bytes it had written', async () => {
      const opened = trackOpenedFiles()
      const destination = path.join(directory, 'broken-range.bin')

      await withinDeadline(downloadableFile('/large/broken-range').downloadToFile(destination), 'the download', LARGE_DEADLINE)

      const resumed = largeRequests.filter(({ range }) => {
        const asked = /^bytes=(\d+)-16777215$/.exec(range ?? '')
        return asked && Number(asked[1]) > 8 * MIB
      })

      expect(opened).toEqual([{ closed: true }])
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(largeRequests.filter(({ range }) => !range)).toHaveLength(1)
      expect(resumed.map(({ ifMatch }) => ifMatch)).toEqual(['"v1"'])
    }, LARGE_DEADLINE)

    it('rejects with the failure of a range cut short once the download was split, when no retry is left, having closed the file', async () => {
      const opened = trackOpenedFiles()

      const error = await failureOf(
        clientFile('/large/cut-range', { maxNetworkRetries: 0 }).downloadToFile(path.join(directory, 'cut.bin')),
        LARGE_DEADLINE,
      )

      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
      expect(opened).toEqual([{ closed: true }])
    }, LARGE_DEADLINE)

    // The ordinary response is cut while it waits unread for its probe, which answers only once it has closed: the
    // split goes on, and the first range is asked for again, of the same version, from its first byte not yet written.
    it('asks for the first range again when the first response is cut while the split was probed', async () => {
      const opened = trackOpenedFiles()
      const destination = path.join(directory, 'broken-ordinary.bin')

      await withinDeadline(downloadableFile('/large/broken-ordinary').downloadToFile(destination), 'the download', LARGE_DEADLINE)

      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(opened).toEqual([{ closed: true }])
      expect(largeRequests.filter(({ range }) => !range)).toHaveLength(1)
      expect(largeRequests.some(({ ifMatch, range }) => /^bytes=\d+-8388607$/.test(range ?? '') && ifMatch === '"v1"')).toBe(true)
    }, LARGE_DEADLINE)

    // Holds the one write of the file the SDK opens that picks(position, bytes) chooses, until release(), which can be
    // called at any time, even before. held resolves once that write is being held. file records when the file's close
    // began and when it ended.
    const holdWrite = picks => {
      const open = fs.promises.open.bind(fs.promises)
      const file = { closeStarted: false, closed: false }
      let markHeld = null
      let release = null
      const held = new Promise(resolve => { markHeld = resolve })
      const released = new Promise(resolve => { release = resolve })

      jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
        const handle = await open(...args)
        const writev = handle.writev.bind(handle)
        const close = handle.close.bind(handle)
        let holding = true

        handle.writev = async (buffers, position) => {
          const bytes = buffers.reduce((total, buffer) => total + buffer.length, 0)

          if (holding && picks(position, bytes)) {
            holding = false
            markHeld()
            await released
          }

          return writev(buffers, position)
        }

        handle.close = async () => {
          file.closeStarted = true
          await close()
          file.closed = true
        }

        return handle
      })

      return { file, held, release }
    }

    // Watches the response each request the SDK makes receives, through the public https.get, adding listeners but
    // reading nothing: ended resolves when the first response ends, failed with the first response's error.
    const watchResponses = () => {
      const get = https.get
      let markEnded = null
      let markFailed = null
      const ended = new Promise(resolve => { markEnded = resolve })
      const failed = new Promise(resolve => { markFailed = resolve })

      jest.spyOn(https, 'get').mockImplementation((...args) => {
        const request = get.apply(https, args)

        request.once('response', response => {
          response.once('end', () => markEnded())
          response.once('error', error => markFailed(error))
        })

        return request
      })

      return { ended, failed }
    }

    // A download's outcome, which never rejects, and whether it has settled.
    const downloadOutcome = download => {
      const outcome = { settled: false }
      outcome.promise = download.then(() => ({}), error => ({ error }))
      outcome.promise.then(() => { outcome.settled = true })
      return outcome
    }

    // The response ends, and only then is its final write made, the one ending at its last byte: the download settles,
    // and its file starts closing, only once that write is done.
    it('settles, and closes the file, only once the final write made after the response ended is done', async () => {
      const destination = path.join(directory, 'held-end.bin')
      const responses = watchResponses()
      const write = holdWrite((position, bytes) => position + bytes === END_BODY.length)
      const download = downloadOutcome(downloadableFile('/held-end').downloadToFile(destination))

      try {
        await withinDeadline(Promise.all([responses.ended, write.held]), 'the response to end and its final write', LARGE_DEADLINE)
        await eventLoopTurns()

        expect(download.settled).toBe(false)
        expect(write.file.closeStarted).toBe(false)
      } finally {
        write.release()
        await withinDeadline(download.promise, 'the download', LARGE_DEADLINE).catch(() => {})
      }

      const { error } = await download.promise

      expect(error).toBeUndefined()
      expect(write.file.closed).toBe(true)
      expect(fs.readFileSync(destination).equals(END_BODY)).toBe(true)
    }, LARGE_DEADLINE)

    // The response has ended, every byte received, and the final write is held when the download's signal aborts: the
    // download waits for that write, then rejects with the signal's reason, rather than completing, once its file has
    // closed.
    it('rejects with its signal\'s reason, aborted while its final write was held, only once that write is done and its file closed', async () => {
      const destination = path.join(directory, 'held-end-aborted.bin')
      const controller = new AbortController()
      const sentinel = { cause: 'aborted during the final write' }
      const write = holdWrite((position, bytes) => position + bytes === END_BODY.length)
      const download = downloadOutcome(downloadableFile('/held-end').downloadToFile(destination, { signal: controller.signal }))

      try {
        await withinDeadline(write.held, 'the final write', LARGE_DEADLINE)
        controller.abort(sentinel)
        await eventLoopTurns()

        expect(download.settled).toBe(false)
        expect(write.file.closeStarted).toBe(false)
      } finally {
        write.release()
        await withinDeadline(download.promise, 'the download', LARGE_DEADLINE).catch(() => {})
      }

      const { error } = await download.promise

      expect(error).toBe(sentinel)
      expect(write.file.closed).toBe(true)
    }, LARGE_DEADLINE)

    // One download of a job admitting one file at a time is held by storage. Another, to an existing file, waits for
    // its admission without opening that file; one aborted before it starts, and one cancelled while it waits, never
    // open theirs; and the waiting one is admitted, and opens its file, once the first is done.
    it('opens no file of a download waiting for its admission, nor of one cancelled before or while waiting, and admits the next once the first is done', async () => {
      const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
      const opened = trackOpenedFiles()
      const existing = name => {
        const target = path.join(directory, name)
        fs.writeFileSync(target, 'sentinel')
        return target
      }

      const queuedTarget = existing('queued.bin')
      const abortedTarget = existing('aborted-before.bin')
      const cancelledTarget = existing('cancelled-waiting.bin')
      const heldOne = new Promise(resolve => {
        downloadsHeld = count => (count === 1 ? resolve() : undefined)
      })

      const first = downloadOutcomeOf(downloadableFile('/large/held/admission').downloadToFile(path.join(directory, 'admitted.bin'), { job }))
      await withinDeadline(heldOne, 'the admitted download')

      const abortedBefore = new AbortController()
      const abortedReason = { cause: 'aborted before it started' }
      abortedBefore.abort(abortedReason)
      const aborted = await withinDeadline(
        downloadOutcomeOf(downloadableFile('/complete').downloadToFile(abortedTarget, { job, signal: abortedBefore.signal })),
        'the aborted download',
      )

      const cancelling = new AbortController()
      const cancelledReason = { cause: 'cancelled while waiting' }
      const queued = downloadOutcomeOf(downloadableFile('/complete').downloadToFile(queuedTarget, { job }))
      const cancelled = downloadOutcomeOf(downloadableFile('/complete').downloadToFile(cancelledTarget, { job, signal: cancelling.signal }))
      await eventLoopTurns()

      const whileWaiting = {
        cancelled: fs.readFileSync(cancelledTarget, 'utf8'),
        opened: opened.length,
        queued: fs.readFileSync(queuedTarget, 'utf8'),
      }

      cancelling.abort(cancelledReason)
      const cancelledOutcome = await withinDeadline(cancelled, 'the cancelled download')

      heldDownloads.splice(0).forEach(response => {
        response.writeHead(200, { 'Content-Length': PAYLOAD.length })
        response.end(PAYLOAD)
      })

      const outcomes = await withinDeadline(Promise.all([first, queued]), 'the admitted downloads')

      expect(whileWaiting).toEqual({ cancelled: 'sentinel', opened: 1, queued: 'sentinel' })
      expect([aborted.error, cancelledOutcome.error]).toEqual([abortedReason, cancelledReason])
      expect([aborted.error, cancelledOutcome.error].map((error, index) => error === [abortedReason, cancelledReason][index])).toEqual([true, true])
      expect([fs.readFileSync(abortedTarget, 'utf8'), fs.readFileSync(cancelledTarget, 'utf8')]).toEqual(['sentinel', 'sentinel'])
      expect(outcomes.map(({ error }) => error)).toEqual([undefined, undefined])
      expect(fs.readFileSync(queuedTarget).equals(PAYLOAD)).toBe(true)
      expect(opened).toEqual([{ closed: true }, { closed: true }])
      expect(served.filter(request => request === 'GET /complete')).toHaveLength(1)
    }, LARGE_DEADLINE)

    // A download is cancelled in the same turn as its call, once its file's admission, free at once, has been granted
    // but before the download has gone on. Another, waiting for its job's one file, is cancelled as that file is given
    // over to it, in the same turn, before it has gone on: the job's own file admission is wrapped, as this test's seam,
    // so that the cancellation follows the grant at once. Neither opens its file, which stays as it was, nor sends a
    // request, and each rejects with its own reason; the job's file is then free for its next download.
    it('opens no file of a download cancelled right after its call, or as its waiting admission is granted', async () => {
      const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
      const opened = trackOpenedFiles()
      const existing = name => {
        const target = path.join(directory, name)
        fs.writeFileSync(target, 'sentinel')
        return target
      }

      const atCallTarget = existing('cancelled-at-call.bin')
      const atGrantTarget = existing('cancelled-at-grant.bin')

      const atCall = new AbortController()
      const atCallReason = { cause: 'cancelled right after the call' }
      const cancelledAtCall = downloadOutcomeOf(downloadableFile('/complete').downloadToFile(atCallTarget, { signal: atCall.signal }))
      atCall.abort(atCallReason)
      const atCallOutcome = await withinDeadline(cancelledAtCall, 'the download cancelled at its call')

      const heldOne = new Promise(resolve => {
        downloadsHeld = count => (count === 1 ? resolve() : undefined)
      })

      const first = downloadOutcomeOf(downloadableFile('/large/held/grant').downloadToFile(path.join(directory, 'granting.bin'), { job }))
      await withinDeadline(heldOne, 'the admitted download')

      const atGrant = new AbortController()
      const atGrantReason = { cause: 'cancelled as its admission was granted' }
      const files = job._scope().files
      const release = files.release

      files.release = () => {
        files.release = release
        release()
        atGrant.abort(atGrantReason)
      }

      const cancelledAtGrant = downloadOutcomeOf(downloadableFile('/complete').downloadToFile(atGrantTarget, { job, signal: atGrant.signal }))
      await eventLoopTurns()
      const openedWhileWaiting = opened.length

      heldDownloads.splice(0).forEach(response => {
        response.writeHead(200, { 'Content-Length': PAYLOAD.length })
        response.end(PAYLOAD)
      })

      const [firstOutcome, atGrantOutcome] = await withinDeadline(Promise.all([first, cancelledAtGrant]), 'the downloads')
      const next = await withinDeadline(downloadableFile('/complete').downloadToString({ job }), 'the job\'s next download')

      expect(atCallOutcome.error).toBe(atCallReason)
      expect(atGrantOutcome.error).toBe(atGrantReason)
      expect(firstOutcome.error).toBeUndefined()
      expect([fs.readFileSync(atCallTarget, 'utf8'), fs.readFileSync(atGrantTarget, 'utf8')]).toEqual(['sentinel', 'sentinel'])
      expect(openedWhileWaiting).toBe(1)
      expect(opened).toEqual([{ closed: true }])
      expect(served.filter(request => request === 'GET /complete')).toHaveLength(1)
      expect(next).toBe(PAYLOAD.toString('utf8'))
    }, LARGE_DEADLINE)

    // The probe answers, so the download is split, and the URL expires as the probe arrives: the third range's request
    // finds it expired, and waits for it to be given again, which the server holds, with no budget to end it
    // (timeoutSecs 0). Meanwhile the probe's range is cut, with no retry allowed, which ends the split. The range then
    // waits no more for the renewal, which nothing else waits for, so its request to the API is stopped, unanswered.
    // That renewal's own call, Api.sendRequest, settles only when the test lets it, well after its request has closed:
    // until then the download neither closes its file nor settles. Then it rejects with the cut, the split's first
    // failure, not the renewal's, having asked for the third range neither at a new URL nor at the old one.
    it('stops waiting for a URL being given again once its split ends, stopping that renewal and settling only once it has, and sends no range for it', async () => {
      const realNow = Date.now.bind(Date)
      let offset = 0
      jest.spyOn(Date, 'now').mockImplementation(() => realNow() + offset)

      const get = https.get
      let markProbeClosed = null
      const probeClosed = new Promise(resolve => { markProbeClosed = resolve })

      jest.spyOn(https, 'get').mockImplementation((...args) => {
        const request = get.apply(https, args)

        request.once('response', response => {
          if (`${response.headers['content-range']}`.startsWith(`bytes ${8 * MIB}-`)) {
            response.once('close', () => markProbeClosed())
          }
        })

        return request
      })

      const probed = new Promise(resolve => {
        onSplitProbe = () => {
          offset = 7200000
          resolve()
        }
      })

      const sendRequest = Api.sendRequest
      const renewal = { settled: false }
      let releaseRenewal = null
      const renewalReleased = new Promise(resolve => { releaseRenewal = resolve })

      jest.spyOn(Api, 'sendRequest').mockImplementation(async (...args) => {
        try {
          return await sendRequest.apply(Api, args)
        } finally {
          await renewalReleased
          renewal.settled = true
        }
      })

      heldRenewals = []
      const held = heldRenewals
      const opened = trackOpenedFiles()
      const signedAt = new Date(realNow()).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, maxNetworkRetries: 0 })
      const file = new File(
        { download_uri: `${baseUrl}/large/split-renewal/1?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
        { client, timeoutSecs: 0 },
      )

      const download = downloadOutcome(file.downloadToFile(path.join(directory, 'split-renewal.bin')))
      let whileSettling = null

      try {
        await withinDeadline(probed, 'the probe', LARGE_DEADLINE)
        await waitUntil(() => held.length === 1 && heldSplitRange !== null, 'the third range\'s URL to be asked for again', LARGE_DEADLINE)

        heldSplitRange.destroy()
        await withinDeadline(probeClosed, 'the cut to reach the download', LARGE_DEADLINE)

        // The renewal is never answered: its request is stopped, while its call has yet to settle.
        await withinDeadline(held[0].closed, 'the renewal to be stopped', LARGE_DEADLINE)
        await eventLoopTurns()
        await new Promise(resolve => { setTimeout(resolve, 50) })
        whileSettling = { closed: opened.map(({ closed }) => closed), settled: download.settled }
      } finally {
        releaseRenewal()
        held.forEach(({ answer }) => answer())
      }

      const outcome = await withinDeadline(download.promise, 'the download', LARGE_DEADLINE)

      expect(whileSettling).toEqual({ closed: [false], settled: false })
      expect(renewal.settled).toBe(true)
      expect(outcome.error?.message).toMatch(INTERRUPTED_RESPONSE)
      expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
      expect(served.filter(request => request.startsWith('GET /complete'))).toEqual([])
      expect(served.filter(request => request.startsWith('GET /large/split-renewal'))).toHaveLength(2)
      expect(opened).toEqual([{ closed: true }])
    }, LARGE_DEADLINE)

    // A full batch is being written, and held, when the response's connection is cut. The client sees the failure while
    // the write is held, yet the download, with no retry left, rejects with that very error, and its file starts
    // closing, only once the write is done.
    it('rejects with the error of a response cut while a write of a full batch is held, only once that write is done', async () => {
      const responses = watchResponses()
      const write = holdWrite(() => true)
      const download = downloadOutcome(clientFile('/held-cut', { maxNetworkRetries: 0 }).downloadToFile(path.join(directory, 'held-cut.bin')))
      let transportError = null

      try {
        await withinDeadline(write.held, 'a write of a full batch', LARGE_DEADLINE)
        heldWriteResponse.socket.destroy()
        transportError = await withinDeadline(responses.failed, 'the client to see the cut', LARGE_DEADLINE)
        await eventLoopTurns()

        expect(download.settled).toBe(false)
        expect(write.file.closeStarted).toBe(false)
      } finally {
        write.release()
        heldWriteResponse?.socket?.destroy()
        await withinDeadline(download.promise, 'the download', LARGE_DEADLINE).catch(() => {})
      }

      const { error } = await download.promise

      expect(error).toBe(transportError)
      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
      expect(write.file.closed).toBe(true)
    }, LARGE_DEADLINE)

    it('writes every byte when the file takes fewer bytes at a time than it is given', async () => {
      const open = fs.promises.open.bind(fs.promises)
      let shortWrites = 0

      // Each write takes at most 1000 of the bytes it is given, as a file may.
      jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
        const handle = await open(...args)
        const writev = handle.writev.bind(handle)

        handle.writev = async (buffers, position) => {
          const taken = []
          let room = 1000

          buffers.forEach(buffer => {
            const part = buffer.subarray(0, room)
            room -= part.length

            if (part.length > 0) {
              taken.push(part)
            }
          })

          shortWrites += buffers.reduce((total, buffer) => total + buffer.length, 0) > 1000 ? 1 : 0
          return writev(taken, position)
        }

        return handle
      })

      const destination = path.join(directory, 'short.bin')
      await withinDeadline(downloadableFile('/complete').downloadToFile(destination), 'the download')

      expect(shortWrites).toBeGreaterThan(0)
      expect(fs.readFileSync(destination).equals(PAYLOAD)).toBe(true)
    })

    // Thirty-one downloads are under way, their responses held, when a large one starts: its first request takes the
    // last of the process's 32 storage requests, so its probe finds none free and it comes in that one response.
    it('keeps the downloads without a job within the process\'s 32 storage requests at once, splitting none beyond them', async () => {
      const held = Array.from({ length: 31 }, (_, index) => path.join(directory, `held-${index}.bin`))
      const destination = path.join(directory, 'gathered-last.bin')

      const heldDownloads31 = new Promise(resolve => {
        downloadsHeld = count => (count === 31 ? resolve() : undefined)
      })

      const waiting = held.map((target, index) => downloadableFile(`/large/held/${index}`).downloadToFile(target))
      await withinDeadline(heldDownloads31, 'the held downloads to be under way', LARGE_DEADLINE)

      await withinDeadline(downloadableFile('/large/last/1').downloadToFile(destination), 'the download', LARGE_DEADLINE)

      heldDownloads.splice(0).forEach(response => {
        response.writeHead(200, { 'Content-Length': PAYLOAD.length })
        response.end(PAYLOAD)
      })

      await withinDeadline(Promise.all(waiting), 'the held downloads', LARGE_DEADLINE)

      expect(rangesByFile[1]).toBeUndefined()
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(held.every(target => fs.readFileSync(target).equals(PAYLOAD))).toBe(true)
    }, 3 * LARGE_DEADLINE)

    // The server counts every request it has open for each behavior, the ordinary one, the probe and the third range
    // alike, which a download thread sends (see DownloadWorkers.node.js): a request no https.get of this thread makes.
    it('keeps a job\'s downloads within its maxConcurrency, the probe and every range included, one read on a download thread too, and reports their progress', async () => {
      await withinDeadline(downloadThreads.ready(), 'the download threads', LARGE_DEADLINE)
      const sentBefore = downloadThreads.stats().sent
      const job = new Files.TransferJob({ maxConcurrency: 2 })
      const reports = []
      const destination = path.join(directory, 'limited.bin')

      await withinDeadline(downloadableFile('/large/limited').downloadToFile(destination, { job, onProgress: report => reports.push(report) }), 'the download', LARGE_DEADLINE)

      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(mostOpenLarge.limited).toBe(2)
      expect(largeRequests.filter(({ range }) => range)).toHaveLength(2)
      expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
      expect(reports[reports.length - 1]).toMatchObject({ bytesSent: LARGE.length, bytesTransferred: LARGE.length, direction: 'download', state: 'completed', totalBytes: LARGE.length })
      expect(job.snapshot().controllers.map(({ direction, key }) => `${direction} ${key}`)).toEqual(['download download storage default default'])
    }, LARGE_DEADLINE)

    // A large download may have one storage request at once, though the process allows 32: its first response holds
    // that one, so no probe for a split is sent beside it, and the file comes through that one response. Allowed two,
    // the same download sends its probe, and is split, never with more than two requests at once, its third range read
    // on a download thread included: the server holds the ordinary response until that third request has come, and the
    // probe's body comes slowly, so that the count is the client's however long the probe takes.
    it('counts its first response within its own maxConcurrency, probing a split only when that leaves room for the probe', async () => {
      await withinDeadline(downloadThreads.ready(), 'the download threads', LARGE_DEADLINE)
      const single = path.join(directory, 'one-request.bin')
      const pair = path.join(directory, 'two-requests.bin')

      await withinDeadline(downloadableFile('/large/capped-one').downloadToFile(single, { maxConcurrency: 1 }), 'the download', LARGE_DEADLINE)
      const withOne = { most: mostOpenLarge['capped-one'], requests: largeRequests.splice(0) }
      const sentBefore = downloadThreads.stats().sent

      await withinDeadline(downloadableFile('/large/capped-two').downloadToFile(pair, { maxConcurrency: 2 }), 'the download', LARGE_DEADLINE)

      expect(fs.readFileSync(single).equals(LARGE)).toBe(true)
      expect(withOne).toEqual({ most: 1, requests: [{ ifMatch: undefined, range: undefined }] })
      expect(fs.readFileSync(pair).equals(LARGE)).toBe(true)
      expect(largeRequests.filter(({ range }) => range)).toHaveLength(2)
      expect(mostOpenLarge['capped-two']).toBe(2)
      expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
    }, 2 * LARGE_DEADLINE)

    // A job allows one storage request at once, and any number of files. Three small downloads start together: the
    // first one's response is read to its end, and its final write, under 1 MiB, is held at its file. Its request's
    // permit stays held until that write is done, so the others' requests wait for it, and never is more than one final
    // write pending; once it is done, the others go on, one at a time, every file exact.
    it('holds a request\'s permit until what was read from its response has been written, so that a job\'s request limit bounds the writes pending', async () => {
      const job = new Files.TransferJob({ maxConcurrency: 1 })
      const open = fs.promises.open.bind(fs.promises)
      const writes = { most: 0, pending: 0 }
      let markHeld = null
      let release = null
      const held = new Promise(resolve => { markHeld = resolve })
      const released = new Promise(resolve => { release = resolve })

      jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
        const handle = await open(...args)
        const writev = handle.writev.bind(handle)

        handle.writev = async (buffers, position) => {
          writes.pending += 1
          writes.most = Math.max(writes.most, writes.pending)
          markHeld()

          try {
            await released
            return await writev(buffers, position)
          } finally {
            writes.pending -= 1
          }
        }

        return handle
      })

      const targets = [0, 1, 2].map(index => path.join(directory, `staged-${index}.bin`))
      const downloads = targets.map(target => downloadOutcomeOf(downloadableFile('/complete').downloadToFile(target, { job })))
      let whileHeld = null

      try {
        await withinDeadline(held, 'the first final write', LARGE_DEADLINE)
        await eventLoopTurns()
        await new Promise(resolve => { setTimeout(resolve, 100) })
        whileHeld = { pending: writes.pending, requests: served.filter(request => request === 'GET /complete').length }
      } finally {
        release()
      }

      const outcomes = await withinDeadline(Promise.all(downloads), 'the downloads', LARGE_DEADLINE)

      expect(whileHeld).toEqual({ pending: 1, requests: 1 })
      expect(writes.most).toBe(1)
      expect(outcomes.map(({ error }) => error)).toEqual([undefined, undefined, undefined])
      expect(targets.every(target => fs.readFileSync(target).equals(PAYLOAD))).toBe(true)
      expect(served.filter(request => request === 'GET /complete')).toHaveLength(3)
    }, LARGE_DEADLINE)

    it('splits each of the large downloads that start together, and splits again once they are over', async () => {
      await withinDeadline(downloadThreads.ready(), 'the download threads', LARGE_DEADLINE)
      const sentBefore = downloadThreads.stats().sent
      const destinations = [3, 4, 5, 6].map(file => path.join(directory, `gathered-${file}.bin`))

      // Four downloads start together: each may have floor(32 / 4) = 8 requests, so each splits into three, its third
      // range read on a download thread, every request within the process's 32 at once.
      gatherCount = 4
      await withinDeadline(
        Promise.all(destinations.map((destination, index) => downloadableFile(`/large/gathered/${index + 3}`).downloadToFile(destination))),
        'the downloads',
        LARGE_DEADLINE,
      )

      expect([3, 4, 5, 6].map(file => rangesByFile[file])).toEqual([2, 2, 2, 2])
      expect(mostOpenRanges.gathered).toBeLessThanOrEqual(31)
      expect(mostOpenLarge.gathered).toBeLessThanOrEqual(32)
      expect(downloadThreads.stats().sent).toBeGreaterThanOrEqual(sentBefore + 4)
      expect(destinations.map(destination => fs.readFileSync(destination).equals(LARGE))).toEqual([true, true, true, true])

      // Once those have closed, a download splits into three again: its ordinary response is right only up to the end
      // of its first range, so its exact bytes show that both of its range requests were used.
      const after = path.join(directory, 'after.bin')
      largeRequests.length = 0
      await withinDeadline(downloadableFile('/large/parallel').downloadToFile(after), 'the download', LARGE_DEADLINE)

      expect(largeRequests.filter(({ range }) => range)).toHaveLength(2)
      expect(fs.readFileSync(after).equals(LARGE)).toBe(true)
    }, 3 * LARGE_DEADLINE)

    // The third range of LARGE goes through one of the SDK's download threads, the compiled worker entry beside the
    // compiled SDK these tests run (see DownloadWorkers.node.js): each test makes sure they are ready first, and that
    // the range did go through one, so that none passes for a download read on its own thread alone.
    describe('with a range read on a download thread', () => {
      beforeEach(async () => {
        await withinDeadline(downloadThreads.ready(), 'the download threads', LARGE_DEADLINE)
      }, LARGE_DEADLINE)

      // Records the writes and truncations of the file the SDK opens, in the order they begin: each write's position,
      // bytes, and whether it is done; and how many writes were still pending as each truncation began. The first write
      // holds(position) picks waits until release(), held resolving once it waits; a write fails(position) gives an
      // error for fails with it, writing nothing.
      const watchWrites = ({ fails = () => null, holds = () => false } = {}) => {
        const open = fs.promises.open.bind(fs.promises)
        const events = []
        const file = { closeStarted: false, closed: false }
        let pending = 0
        let holding = true
        let markHeld = null
        let release = null
        const held = new Promise(resolve => { markHeld = resolve })
        const released = new Promise(resolve => { release = resolve })

        jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
          const handle = await open(...args)
          const writev = handle.writev.bind(handle)
          const truncate = handle.truncate.bind(handle)
          const close = handle.close.bind(handle)

          handle.writev = async (buffers, position) => {
            const write = { bytes: buffers.reduce((total, buffer) => total + buffer.length, 0), done: false, position, type: 'write' }
            events.push(write)
            pending += 1

            try {
              if (holding && holds(position)) {
                holding = false
                markHeld()
                await released
              }

              const failure = fails(position)

              if (failure) {
                throw failure
              }

              return await writev(buffers, position)
            } finally {
              pending -= 1
              write.done = true
            }
          }

          handle.truncate = async length => {
            events.push({ pending, type: 'truncate' })
            return truncate(length)
          }

          handle.close = async () => {
            file.closeStarted = true
            await close()
            file.closed = true
          }

          return handle
        })

        const writes = () => events.filter(({ type }) => type === 'write')

        return {
          // The bytes the writes before position have written, of those done.
          doneBefore: position => writes().filter(write => write.done && write.position < position).reduce((total, write) => total + write.bytes, 0),
          events,
          file,
          // The writes at position or after it begun so far.
          from: position => writes().filter(write => write.position >= position),
          held,
          release,
        }
      }

      // The requests for the third range, or the rest of it.
      const thirdRangeRequests = () => largeRequests.filter(({ range }) => Number(/^bytes=(\d+)-/.exec(range ?? '')?.[1]) >= THIRD_RANGE)

      // The thread is stopped while the third range's body is arriving: the download fails for good, with no retry, as
      // many as are allowed, once its file and every request have closed; and no range is read on a download thread from
      // then on.
      it.each([0, 1])('fails for good, asking for that range no more, when the download thread reading a range stops unexpectedly, with maxNetworkRetries %i', async retries => {
        const opened = trackOpenedFiles()
        const sentBefore = downloadThreads.stats().sent

        try {
          const download = downloadOutcomeOf(clientFile(`/large/held-range/crash-${retries}`, { maxNetworkRetries: retries }).downloadToFile(path.join(directory, `crash-${retries}.bin`)))
          await waitUntil(() => heldThreadRange !== null && downloadThreads.stats().sent > sentBefore, 'the third range on a download thread', LARGE_DEADLINE)
          await downloadThreads.stop()

          const { error } = await withinDeadline(download, 'the download', LARGE_DEADLINE)
          await waitUntil(() => openLarge['held-range'] === 0, 'every request to close', LARGE_DEADLINE)

          expect(error).toBeInstanceOf(FilesError)
          expect(error.message).toMatch(/download thread/)
          expect(thirdRangeRequests()).toHaveLength(1)
          expect(opened).toEqual([{ closed: true }])
          expect(downloadThreads.stats().disabled).toBe(true)

          const sentAfter = downloadThreads.stats().sent
          const next = path.join(directory, `after-crash-${retries}.bin`)
          await withinDeadline(downloadableFile(`/large/after-crash/next-${retries}`).downloadToFile(next), 'the next download', LARGE_DEADLINE)

          expect(rangesByFile[`next-${retries}`]).toBe(2)
          expect(fs.readFileSync(next).equals(LARGE)).toBe(true)
          expect(downloadThreads.stats().sent).toBe(sentAfter)
        } finally {
          await downloadThreads.restore()
        }
      }, 3 * LARGE_DEADLINE)

      // The file fails the third range's first write, and the download threads are stopped as it fails, before the
      // thread reading that range can hear of it: the write's own error, the first of the two failures, is the
      // download's, once its file and every request have closed.
      it('fails with its file\'s own write error, not the stopped thread\'s, when the download thread reading a range stops once that range\'s write failed', async () => {
        const writeError = Object.assign(new Error('the destination is full'), { code: 'ENOSPC' })
        let stopping = null

        const writes = watchWrites({
          fails: position => {
            if (position !== THIRD_RANGE) {
              return null
            }

            stopping = downloadThreads.stop()
            return writeError
          },
        })

        const sentBefore = downloadThreads.stats().sent

        try {
          const { error } = await withinDeadline(
            downloadOutcomeOf(downloadableFile('/large/write-then-stop').downloadToFile(path.join(directory, 'write-then-stop.bin'))),
            'the download',
            LARGE_DEADLINE,
          )

          await stopping
          await waitUntil(() => openLarge['write-then-stop'] === 0, 'every request to close', LARGE_DEADLINE)

          expect(error).toBe(writeError)
          expect(writes.from(THIRD_RANGE)).toHaveLength(1)
          expect(writes.file.closed).toBe(true)
          expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
          expect(downloadThreads.stats().active).toBe(0)
        } finally {
          await downloadThreads.restore()
        }
      }, LARGE_DEADLINE)

      // The third range's first 1 MiB batch comes, and then: its rest never does (held-range); or all of it comes at
      // once, so little that the range's whole response is received and parsed while that rest waits untaken
      // (parsed-range); or that batch is the whole range, and its response never ends (unterminated). That batch's write
      // is let go once the first two ranges are written, and, for parsed-range, once the server has sent the third
      // range's response to its end, long enough after the last report for its own to come at once, and its report
      // pauses the download. The range's budget of 2 seconds then runs out while its thread waits for that batch to be
      // given back, which no resumption comes to do; the thread tells how the request stood as that broke it. The
      // download fails with the budget's error, paused as it is, no more of that range asked for or written, even with a
      // retry allowed once every byte of the range has been written, once its file and every request have closed, the
      // download threads keeping nothing of it.
      it.each([
        ['its rest never sent', 'held-range', 0, { complete: false, untaken: true, waitingForBatch: true }],
        ['its whole response received and parsed but its rest untaken', 'parsed-range', 0, { complete: true, untaken: true, waitingForBatch: true }],
        ['every byte of it taken and written but its response unended, a retry allowed', 'unterminated', 1, { complete: false, untaken: false, waitingForBatch: true }],
      ])('fails with the budget\'s error a range whose budget runs out on its download thread while the download is paused after a batch of it was written, %s', async (_, behavior, retries, witnessed) => {
        const control = new Files.TransferControl()
        const writes = watchWrites({ holds: position => position === THIRD_RANGE })
        const broken = downloadThreads.watchNextBreak()
        let armed = false

        const onProgress = () => {
          if (armed) {
            armed = false
            control.pause()
          }
        }

        const file = new File(
          { download_uri: `${baseUrl}/large/${behavior}/paused-budget?X-Amz-Signature=${SIGNATURE}` },
          { client: new FilesClient({ apiKey: 'client-key', baseUrl, maxNetworkRetries: retries }), timeoutSecs: 2 },
        )

        const sentBefore = downloadThreads.stats().sent
        const download = downloadOutcomeOf(file.downloadToFile(path.join(directory, `paused-budget-${behavior}.bin`), { control, onProgress }))

        try {
          await withinDeadline(writes.held, 'the third range\'s first write', LARGE_DEADLINE)
          await waitUntil(() => writes.doneBefore(THIRD_RANGE) >= THIRD_RANGE, 'the first two ranges to be written', LARGE_DEADLINE)

          if (behavior === 'parsed-range') {
            await waitUntil(() => openLarge[behavior] === 0, 'the third range\'s response to be sent to its end', LARGE_DEADLINE)
          }

          await new Promise(resolve => { setTimeout(resolve, 150) })
          armed = true
          writes.release()

          const { error } = await withinDeadline(download, 'the download', LARGE_DEADLINE)
          await waitUntil(() => openLarge[behavior] === 0 && downloadThreads.stats().active === 0, 'every request to close and be let go', LARGE_DEADLINE)

          expect(error).toBeInstanceOf(FilesError)
          expect(error.message).toBe('Request timed out')
          expect({ armed, paused: control.paused }).toEqual({ armed: false, paused: true })
          expect(broken.state()).toEqual(witnessed)
          expect(thirdRangeRequests()).toHaveLength(1)
          expect(writes.from(THIRD_RANGE)).toHaveLength(1)
          expect(writes.file.closed).toBe(true)
          expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
        } finally {
          writes.release()
          control.resume()
        }
      }, LARGE_DEADLINE)

      // /large/uneven's third range ends in a smaller batch, given only once the range's response has ended. Its write is
      // held, the thread's request for the range closes, as one read to its end does, and only then is the download
      // cancelled: it rejects with its signal's reason only once that write is done and its file has closed, the
      // download threads keeping nothing of it.
      it('rejects with its signal\'s reason, cancelled once a range\'s request has closed on its download thread while that range\'s last batch is being written', async () => {
        const controller = new AbortController()
        const reason = { cause: 'cancelled while the last batch was being written' }
        const writes = watchWrites({ holds: position => position === UNEVEN_LAST_BATCH })
        const sentBefore = downloadThreads.stats().sent
        const download = downloadOutcome(downloadableFile('/large/uneven').downloadToFile(path.join(directory, 'uneven-cancelled.bin'), { signal: controller.signal }))
        let whileHeld = null

        try {
          await withinDeadline(writes.held, 'the third range\'s last write', LARGE_DEADLINE)
          await waitUntil(() => downloadThreads.stats().unclosed === 0, 'the third range\'s request to close', LARGE_DEADLINE)
          controller.abort(reason)
          await eventLoopTurns()
          whileHeld = { closeStarted: writes.file.closeStarted, settled: download.settled }
        } finally {
          writes.release()
        }

        const { error } = await withinDeadline(download.promise, 'the download', LARGE_DEADLINE)
        await waitUntil(() => downloadThreads.stats().active === 0, 'the download threads to let the request go', LARGE_DEADLINE)

        expect(whileHeld).toEqual({ closeStarted: false, settled: false })
        expect(error).toBe(reason)
        expect(writes.from(UNEVEN_LAST_BATCH)).toHaveLength(1)
        expect(writes.file.closed).toBe(true)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
      }, LARGE_DEADLINE)

      // The global agent's CA certificates are an array with more than its certificates: every range is read on the
      // download's own thread, nothing having been given to a download thread, and nothing of the array is called to tell.
      it.each([
        ['a property of its own that cannot be given to a thread', certificates => {
          // eslint-disable-next-line no-param-reassign
          certificates.check = () => true
        }],
        ['its certificate given by a getter', (certificates, gets) => {
          Object.defineProperty(certificates, 0, {
            enumerable: true,
            get: () => {
              gets.push(new Error('the certificate was got').stack)
              return certificate
            },
          })
        }],
      ])('reads every range on its own thread when the global agent\'s CA certificates are an array with %s', async (_, shape) => {
        const gets = []
        const certificates = [certificate]
        const prior = https.globalAgent.options.ca
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'ca-shape.bin')
        shape(certificates, gets)
        https.globalAgent.options.ca = certificates

        try {
          await withinDeadline(downloadableFile('/large/ca-shape/1').downloadToFile(destination), 'the download', LARGE_DEADLINE)
        } finally {
          https.globalAgent.options.ca = prior
        }

        expect(rangesByFile[1]).toBe(2)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(downloadThreads.stats().sent).toBe(sentBefore)
        expect(downloadThreads.stats().active).toBe(0)
        expect(gets.filter(stack => stack.includes('DownloadWorkers.node'))).toEqual([])
      }, LARGE_DEADLINE)

      // The next request given to a download thread, the third range's, is held there once the thread has made ready all
      // it needs to send it, and the download is paused meanwhile: the thread's last checks, after all of that, find the
      // download paused, so the range's request goes only once the download is resumed, and only once.
      it('sends a range\'s request from its download thread only if the download is not paused when all else for it is ready', async () => {
        const control = new Files.TransferControl()
        const hold = downloadThreads.holdNextSend()
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'held-send.bin')
        const download = downloadOutcomeOf(downloadableFile('/large/held-send').downloadToFile(destination, { control }))
        let whilePaused = null

        try {
          await waitUntil(() => hold.waiting(), 'the third range\'s request to be ready on its thread', LARGE_DEADLINE)
          control.pause()
          hold.release()
          await new Promise(resolve => { setTimeout(resolve, 200) })
          whilePaused = { requests: thirdRangeRequests().length, sent: downloadThreads.stats().sent - sentBefore }
        } finally {
          hold.release()
          control.resume()
        }

        const { error } = await withinDeadline(download, 'the download', LARGE_DEADLINE)

        expect(whilePaused).toEqual({ requests: 0, sent: 0 })
        expect(error).toBeUndefined()
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(thirdRangeRequests()).toHaveLength(1)
        expect(downloadThreads.stats().sent).toBe(sentBefore + 1)
      }, LARGE_DEADLINE)

      // A process of its own downloads a split file with the compiled SDK, started once with a program preloaded by
      // --require, which records each thread it runs on, and once without. Preloaded, it makes no download thread, so the
      // program runs once only, on its main thread, and every range is read there; without, a range is read on one of its
      // download threads. Either way the file is exact.
      it.each([
        ['with a program preloaded, running it once and making no download thread', true],
        ['without one, reading a range on a download thread', false],
      ])('downloads in a process started %s', async (_, preloaded) => {
        const name = preloaded ? 'preloaded' : 'plain'
        const marker = path.join(directory, `${name}-marker.txt`)
        const preload = path.join(directory, 'preload.js')
        const script = path.join(directory, 'download.js')
        const ca = path.join(directory, 'ca.pem')
        const destination = path.join(directory, `${name}.bin`)

        fs.writeFileSync(ca, certificate)
        fs.writeFileSync(preload, "require('fs').appendFileSync(process.env.FILES_TEST_MARKER, require('worker_threads').isMainThread ? 'main\\n' : 'worker\\n')\n")
        fs.writeFileSync(script, [
          "const fs = require('fs')",
          "const https = require('https')",
          'const lib = process.env.FILES_SDK_LIB',
          "const model = require(lib + '/models/File.js')",
          'const File = model.default || model',
          "const { forTests } = require(lib + '/isomorphic/DownloadWorkers.node.js')",
          'https.globalAgent.options.ca = fs.readFileSync(process.env.FILES_TEST_CA)',
          'const main = async () => {',
          '  const ready = await forTests.ready().then(() => true, () => false)',
          '  await new File({ download_uri: process.env.FILES_TEST_URL }).downloadToFile(process.env.FILES_TEST_DESTINATION)',
          '  process.stdout.write(JSON.stringify({ ready, sent: forTests.stats().sent }))',
          '}',
          'main().then(() => process.exit(0), error => {',
          "  process.stderr.write(String(error && error.stack ? error.stack : error) + '\\n')",
          '  process.exit(1)',
          '})',
          '',
        ].join('\n'))
        fs.rmSync(marker, { force: true })

        // NODE_OPTIONS of the test's own process could preload a program in both; the child's options are only those given.
        const { NODE_OPTIONS: ignored, ...environment } = process.env
        const { stdout } = await withinDeadline(promisify(execFile)(process.execPath, [...(preloaded ? ['--require', preload] : []), script], {
          env: {
            ...environment,
            FILES_SDK_LIB: path.resolve(__dirname, '../lib'),
            FILES_TEST_CA: ca,
            FILES_TEST_DESTINATION: destination,
            FILES_TEST_MARKER: marker,
            FILES_TEST_URL: `${baseUrl}/large/launch-${name}/1?X-Amz-Signature=${SIGNATURE}`,
          },
          timeout: LARGE_DEADLINE,
        }), 'the process\'s download', LARGE_DEADLINE)

        const result = JSON.parse(stdout)

        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(rangesByFile[1]).toBe(2)

        if (preloaded) {
          expect(fs.readFileSync(marker, 'utf8')).toBe('main\n')
          expect(result).toEqual({ ready: false, sent: 0 })
        } else {
          expect(fs.existsSync(marker)).toBe(false)
          expect(result.ready).toBe(true)
          expect(result.sent).toBeGreaterThan(0)
        }
      }, 2 * LARGE_DEADLINE)

      // The first write of the third range's body is held: nothing more of that range is written until it is done, nor
      // does the download settle, or its file start closing.
      it('writes a range read on a download thread a batch at a time, taking no more of it until each batch\'s write is done', async () => {
        const writes = watchWrites({ holds: position => position === THIRD_RANGE })
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'thread-batches.bin')
        const download = downloadOutcome(downloadableFile('/large/thread-batches').downloadToFile(destination))
        let whileHeld = null

        try {
          await withinDeadline(writes.held, 'the third range\'s first write', LARGE_DEADLINE)
          await new Promise(resolve => { setTimeout(resolve, 200) })
          whileHeld = { closeStarted: writes.file.closeStarted, settled: download.settled, writes: writes.from(THIRD_RANGE).length }
        } finally {
          writes.release()
        }

        const { error } = await withinDeadline(download.promise, 'the download', LARGE_DEADLINE)

        expect(whileHeld).toEqual({ closeStarted: false, settled: false, writes: 1 })
        expect(error).toBeUndefined()
        expect(writes.file.closed).toBe(true)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
      }, LARGE_DEADLINE)

      // Once the first two ranges are written, and the last report long enough ago that the next comes at once, the
      // third range's first write is let go: its report is the next, and onProgress then throws, or pauses the download.
      it.each(['throws', 'pauses'])('takes no more of a range read on a download thread once onProgress %s as a batch of it is written', async action => {
        const control = new Files.TransferControl()
        const sentinel = { cause: 'onProgress threw' }
        const writes = watchWrites({ holds: position => position === THIRD_RANGE })
        const reports = []
        let armed = false

        const onProgress = report => {
          reports.push({ ...report })

          if (armed) {
            armed = false

            if (action === 'throws') {
              throw sentinel
            }

            control.pause()
          }
        }

        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, `callback-${action}.bin`)
        const download = downloadOutcome(downloadableFile(`/large/callback-${action}`).downloadToFile(destination, { control, onProgress }))
        let afterward = null

        try {
          await withinDeadline(writes.held, 'the third range\'s first write', LARGE_DEADLINE)
          await waitUntil(() => writes.doneBefore(THIRD_RANGE) >= THIRD_RANGE, 'the first two ranges to be written', LARGE_DEADLINE)
          await new Promise(resolve => { setTimeout(resolve, 150) })
          armed = true
          writes.release()
          await waitUntil(() => !armed, 'the report of that write', LARGE_DEADLINE)
          await new Promise(resolve => { setTimeout(resolve, 200) })
          afterward = { writes: writes.from(THIRD_RANGE).length }
        } finally {
          writes.release()
          control.resume()
        }

        const { error } = await withinDeadline(download.promise, 'the download', LARGE_DEADLINE)

        expect(afterward).toEqual({ writes: 1 })
        expect(writes.file.closed).toBe(true)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)

        if (action === 'throws') {
          expect(error).toBe(sentinel)
          expect(writes.from(THIRD_RANGE)).toHaveLength(1)
        } else {
          expect(error).toBeUndefined()
          expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
          expect(reports[reports.length - 1]).toMatchObject({ bytesSent: LARGE.length, bytesTransferred: LARGE.length, state: 'completed' })
        }
      }, 2 * LARGE_DEADLINE)

      // This thread's clock is set two hours back, so that the URL, signed two hours ago for one, has not expired here,
      // while it has by the download thread's own: that thread does not send the third range's request, and the File's
      // own client gives the URL again, with no retry allowed, which a request that sent nothing needs none of.
      it('gets a URL again, having sent nothing to it, when the download thread about to send a range finds it expired', async () => {
        const realNow = Date.now.bind(Date)
        jest.spyOn(Date, 'now').mockImplementation(() => realNow() - 7200000)

        const signedAt = new Date(realNow() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')
        renewedDownloadUri = `${baseUrl}/large/renewed-range/renewed?X-Amz-Signature=${SIGNATURE}`
        const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, maxNetworkRetries: 0 })
        const file = new File(
          { download_uri: `${baseUrl}/large/renewed-range/stale?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
          { client },
        )

        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'renewed-range.bin')
        await withinDeadline(file.downloadToFile(destination), 'the download', LARGE_DEADLINE)

        const thirdRangeAt = name => served.filter(request => request.startsWith(`GET /large/renewed-range/${name} bytes=${THIRD_RANGE}-`))

        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
        expect(thirdRangeAt('stale')).toEqual([])
        expect(thirdRangeAt('renewed')).toHaveLength(1)
        expect(downloadThreads.stats().sent).toBe(sentBefore + 1)
      }, LARGE_DEADLINE)

      // This thread's clock is set two hours back, so that the URL, signed two hours ago for one, has not expired here,
      // until the download tells whether a download thread could send the third range: as it reads this thread's DNS
      // order, the clock is put right, as though telling had taken that long, and the order is found to be another than
      // the download threads have, so the range is to be sent here. Its URL has expired by then: nothing is sent to it,
      // and the File's own client gives it again, once, with no retry allowed, which a request that sent nothing needs
      // none of.
      it('gets a URL again, having sent nothing to it, when it expires as the download tells whether a download thread could send a range, which it then sends itself', async () => {
        const realNow = Date.now.bind(Date)
        const order = dns.getDefaultResultOrder()
        let clockOffset = -7200000
        jest.spyOn(Date, 'now').mockImplementation(() => realNow() + clockOffset)
        jest.spyOn(dns, 'getDefaultResultOrder').mockImplementation(() => {
          clockOffset = 0
          return order === 'ipv4first' ? 'verbatim' : 'ipv4first'
        })

        const signedAt = new Date(realNow() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')
        renewedDownloadUri = `${baseUrl}/large/renewed-fallback/renewed?X-Amz-Signature=${SIGNATURE}`
        const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, maxNetworkRetries: 0 })
        const file = new File(
          { download_uri: `${baseUrl}/large/renewed-fallback/stale?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
          { client },
        )

        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'renewed-fallback.bin')
        await withinDeadline(file.downloadToFile(destination), 'the download', LARGE_DEADLINE)

        const thirdRangeAt = name => served.filter(request => request.startsWith(`GET /large/renewed-fallback/${name} bytes=${THIRD_RANGE}-`))

        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
        expect(thirdRangeAt('stale')).toEqual([])
        expect(thirdRangeAt('renewed')).toHaveLength(1)
        expect(downloadThreads.stats().sent).toBe(sentBefore)
      }, LARGE_DEADLINE)

      // The third range's first 1 MiB comes, and its rest only once the test sends it, so that its response cannot be
      // complete; that first batch's write is held for 1.5 seconds. With a budget of 1 second, the range's request fails
      // with it, on its thread, while that batch waits to be written, and with no retry allowed so does the download;
      // with none, the rest of the range is then sent, and the download completes.
      it.each([
        [1, 'Request timed out'],
        [0, undefined],
      ])('keeps a range\'s budget of %i seconds running on its download thread while a batch of it waits to be written', async (timeoutSecs, failure) => {
        const writes = watchWrites({ holds: position => position === THIRD_RANGE })
        const file = new File(
          { download_uri: `${baseUrl}/large/held-range/budget-${timeoutSecs}?X-Amz-Signature=${SIGNATURE}` },
          { client: new FilesClient({ apiKey: 'client-key', baseUrl, maxNetworkRetries: 0 }), timeoutSecs },
        )

        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, `budget-${timeoutSecs}.bin`)
        const download = downloadOutcomeOf(file.downloadToFile(destination))

        try {
          await withinDeadline(writes.held, 'the third range\'s first write', LARGE_DEADLINE)
          await new Promise(resolve => { setTimeout(resolve, 1500) })
        } finally {
          writes.release()
        }

        if (!failure) {
          heldThreadRange.end(LARGE.subarray(THIRD_RANGE + MIB))
        }

        const { error } = await withinDeadline(download, 'the download', LARGE_DEADLINE)

        expect(writes.file.closed).toBe(true)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)

        if (failure) {
          expect(error).toBeInstanceOf(FilesError)
          expect(error.message).toBe(failure)
        } else {
          expect(error).toBeUndefined()
          expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        }
      }, LARGE_DEADLINE)

      // The file fails the first write of the third range's body: the download fails with that very error, and its last
      // report counts that batch as received but never as transferred.
      it('fails with its file\'s own write error, a batch of a range read on a download thread that it could not write counted as received only', async () => {
        const writeError = Object.assign(new Error('the destination is full'), { code: 'ENOSPC' })
        const writes = watchWrites({ fails: position => (position === THIRD_RANGE ? writeError : null) })
        const reports = []
        const sentBefore = downloadThreads.stats().sent

        const { error } = await withinDeadline(
          downloadOutcomeOf(downloadableFile('/large/write-fails').downloadToFile(path.join(directory, 'write-fails.bin'), { onProgress: report => reports.push({ ...report }) })),
          'the download',
          LARGE_DEADLINE,
        )

        const last = reports[reports.length - 1]

        expect(error).toBe(writeError)
        expect(writes.from(THIRD_RANGE)).toHaveLength(1)
        expect(last.state).toBe('failed')
        expect(last.bytesSent - last.bytesTransferred).toBeGreaterThanOrEqual(writes.from(THIRD_RANGE)[0].bytes)
        expect(writes.file.closed).toBe(true)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
      }, LARGE_DEADLINE)

      // The download is cancelled while the first write of the third range's body is held: it rejects with its signal's
      // reason only once that write is done, every request has closed and the file has closed, and the download threads
      // keep nothing of it.
      it('rejects with its signal\'s reason, aborted while a batch of a range read on a download thread is being written, only once that write is done and its file closed', async () => {
        const controller = new AbortController()
        const reason = { cause: 'aborted while a batch was being written' }
        const writes = watchWrites({ holds: position => position === THIRD_RANGE })
        const sentBefore = downloadThreads.stats().sent
        const download = downloadOutcome(downloadableFile('/large/thread-aborted').downloadToFile(path.join(directory, 'thread-aborted.bin'), { signal: controller.signal }))
        let whileHeld = null

        try {
          await withinDeadline(writes.held, 'the third range\'s first write', LARGE_DEADLINE)
          controller.abort(reason)
          await eventLoopTurns()
          await new Promise(resolve => { setTimeout(resolve, 100) })
          whileHeld = { closeStarted: writes.file.closeStarted, settled: download.settled }
        } finally {
          writes.release()
        }

        const { error } = await withinDeadline(download.promise, 'the download', LARGE_DEADLINE)
        await waitUntil(() => openLarge['thread-aborted'] === 0 && downloadThreads.stats().active === 0, 'every request to close and be let go', LARGE_DEADLINE)

        expect(whileHeld).toEqual({ closeStarted: false, settled: false })
        expect(error).toBe(reason)
        expect(writes.file.closed).toBe(true)
        expect(writes.from(THIRD_RANGE)).toHaveLength(1)
        expect(downloadThreads.stats().sent).toBeGreaterThan(sentBefore)
      }, LARGE_DEADLINE)

      // The third range is cut after its first batch has been written, and its rest is of another version: the download
      // starts over, its file emptied only once every write before has been done, and completes with the one version.
      it('starts over from the first byte, emptying the file only once every write is done, when the rest of a range read on a download thread is of another version', async () => {
        const writes = watchWrites()
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'thread-reset.bin')

        await withinDeadline(downloadableFile('/large/reset').downloadToFile(destination), 'the download', 2 * LARGE_DEADLINE)

        const truncations = writes.events.filter(({ type }) => type === 'truncate')
        const firstTry = writes.events.slice(0, writes.events.indexOf(truncations[0]))

        expect(truncations).toEqual([{ pending: 0, type: 'truncate' }])
        expect(firstTry.some(({ position, type }) => type === 'write' && position === THIRD_RANGE)).toBe(true)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(largeRequests.filter(({ range }) => !range)).toHaveLength(2)
        expect(resetRanges).toBe(3)
        expect(downloadThreads.stats().sent).toBeGreaterThanOrEqual(sentBefore + 3)
      }, 2 * LARGE_DEADLINE)

      // A download whose agent is chosen, even as none, logged at DEBUG, or sent through a configured fetch, reads every
      // range on its own thread, split or not, as before.
      it.each([
        ['a client whose getAgentForUrl chooses no agent', 'no-agent', () => clientFile('/large/no-agent/1', { getAgentForUrl: () => undefined }), 2],
        ['a client whose getAgentForUrl chooses an agent of its own', 'own-agent', agent => clientFile('/large/own-agent/1', { getAgentForUrl: () => agent }), 2],
        ['a client logging at DEBUG', 'debug', () => clientFile('/large/debug/1', { logLevel: LogLevel.DEBUG, logger: { debug() {}, error() {}, info() {}, warn() {} } }), 2],
        ['a configured fetch', 'fetch', () => new File({ download_uri: `${baseUrl}/large/fetch/1?X-Amz-Signature=${SIGNATURE}` }, { fetch: crossFetch }), undefined],
      ])('reads no range on a download thread through %s', async (_, name, fileOf, ranges) => {
        const agent = new https.Agent({ ca: certificate })
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, `${name}.bin`)

        try {
          await withinDeadline(fileOf(agent).downloadToFile(destination), 'the download', LARGE_DEADLINE)
        } finally {
          agent.destroy()
        }

        expect(rangesByFile[1]).toBe(ranges)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(downloadThreads.stats().sent).toBe(sentBefore)
      }, LARGE_DEADLINE)

      // Where a thread can have default CA certificates of its own, a download whose thread's are not the download
      // threads' reads every range on its own thread.
      const withThreadDefaultCA = typeof tls.setDefaultCACertificates === 'function' ? it : it.skip

      withThreadDefaultCA('reads no range on a download thread once its own thread\'s default CA certificates are not those the download threads have', async () => {
        const defaults = tls.getCACertificates('default')
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'default-ca.bin')
        tls.setDefaultCACertificates([...defaults, certificate.toString()])

        try {
          await withinDeadline(downloadableFile('/large/default-ca/1').downloadToFile(destination), 'the download', LARGE_DEADLINE)
        } finally {
          tls.setDefaultCACertificates(defaults)
        }

        expect(rangesByFile[1]).toBe(2)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(downloadThreads.stats().sent).toBe(sentBefore)
      }, LARGE_DEADLINE)

      // The order in which a thread's DNS lookups give a host's addresses is its own: once the download's own thread's
      // is set to another than the download threads have, the download reads every range on its own thread.
      it('reads no range on a download thread once its own thread\'s default DNS result order is not the one the download threads have', async () => {
        const prior = dns.getDefaultResultOrder()
        const sentBefore = downloadThreads.stats().sent
        const destination = path.join(directory, 'dns-order.bin')
        dns.setDefaultResultOrder(prior === 'ipv4first' ? 'verbatim' : 'ipv4first')

        try {
          await withinDeadline(downloadableFile('/large/dns-order/1').downloadToFile(destination), 'the download', LARGE_DEADLINE)
        } finally {
          dns.setDefaultResultOrder(prior)
        }

        expect(rangesByFile[1]).toBe(2)
        expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
        expect(downloadThreads.stats().sent).toBe(sentBefore)
        expect(downloadThreads.stats().active).toBe(0)
      }, LARGE_DEADLINE)
    })
  })

  describe('downloadToStream', () => {
    it('ends a writable without a close method after writing every byte', async () => {
      const chunks = []
      const writable = new Writable({
        write: (chunk, encoding, callback) => {
          chunks.push(chunk)
          callback()
        },
      })

      await withinDeadline(downloadableFile('/complete').downloadToStream(writable), 'the download')

      expect(Buffer.concat(chunks).equals(PAYLOAD)).toBe(true)
      expect(writable.writableFinished).toBe(true)
    })

    it('resolves without an uncaught error when the writable reports an error while it is destroyed after finishing', async () => {
      const cleanupError = new Error('destroying the writable failed')
      const reported = []
      const writable = new Writable({
        destroy: (error, callback) => callback(cleanupError),
        write: (chunk, encoding, callback) => callback(),
      })

      writable.on(errorMonitor, error => reported.push(error))
      const closed = new Promise(resolve => { writable.once('close', resolve) })

      await withinDeadline(downloadableFile('/complete').downloadToStream(writable), 'the download')
      await withinDeadline(closed, 'the writable to close')

      expect(reported).toEqual([cleanupError])
    })

    it('destroys a writable without a close method, and never finishes it, when the response is cut short', async () => {
      const finished = jest.fn()
      const writable = new Writable({ write: (chunk, encoding, callback) => callback() })
      writable.on('finish', finished)

      const error = await failureOf(downloadableFile('/truncated').downloadToStream(writable))

      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
      expect(writable.destroyed).toBe(true)
      expect(finished).not.toHaveBeenCalled()
    })

    it('rejects with the URL error even when closing the writable throws', async () => {
      const writable = writableWithThrowingClose((chunk, encoding, callback) => callback())

      const error = await failureOf(new File({ download_uri: 'not a url' }).downloadToStream(writable))

      expect(error.code).toBe('ERR_INVALID_URL')
    })

    it('rejects when the response is cut short even when closing the writable throws', async () => {
      const writable = writableWithThrowingClose((chunk, encoding, callback) => callback())

      const error = await failureOf(downloadableFile('/truncated').downloadToStream(writable))

      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
    })

    it('rejects with the writable error and stops the response even when closing the writable throws', async () => {
      const writeError = new Error('destination is full')
      const writable = writableWithThrowingClose((chunk, encoding, callback) => callback(writeError))

      const error = await failureOf(downloadableFile('/stalled').downloadToStream(writable))
      await withinDeadline(stalledResponseClosed, 'the response to close')

      expect(error).toBe(writeError)
    })

    it('rejects and stops the response when the writable is closed before the download finishes', async () => {
      const writable = new Writable({
        write: (chunk, encoding, callback) => {
          callback()
          writable.destroy()
        },
      })

      const error = await failureOf(downloadableFile('/stalled').downloadToStream(writable))
      await withinDeadline(stalledResponseClosed, 'the response to close')

      expect(error.message).toMatch(/closed before the download finished/)
    })

    // Another ends the writable once the request has been answered and before any of its body has come: the writable
    // finishes before the download has ended it. Whether it then closes, as a writable does by default, or stays open,
    // with its body then sent, it is given no byte, and the download fails rather than completing.
    it.each([
      ['closes, as it does by default', {}, false],
      ['stays open, the body then sent', { autoDestroy: false }, true],
    ])('fails, rather than completing, when its writable is ended by another before the response is complete and %s', async (_, options, sendBody) => {
      const chunks = []
      const writable = new Writable({
        ...options,
        write: (chunk, encoding, callback) => {
          chunks.push(chunk)
          callback()
        },
      })

      const download = downloadOutcomeOf(downloadableFile('/paced').downloadToStream(writable))
      await waitUntil(() => releasePaced !== null, 'the response\'s headers')

      const finished = new Promise(resolve => { writable.once('finish', resolve) })
      writable.end()
      await withinDeadline(finished, 'the writable to finish')

      if (sendBody) {
        releasePaced()
      }

      const { error } = await withinDeadline(download, 'the download')

      expect(error?.message).toBe('Download destination closed before the download finished')
      expect(chunks).toEqual([])
    })

    // Every byte has been written when the writable's end() throws: the download fails with that very error rather than
    // staying unsettled, and its job's file is free for the next download.
    it('fails with the error its writable\'s end() throws, and leaves its job free', async () => {
      const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
      const endError = new Error('ending the writable failed')
      const chunks = []
      const writable = new Writable({
        write: (chunk, encoding, callback) => {
          chunks.push(chunk)
          callback()
        },
      })

      writable.end = () => {
        throw endError
      }

      const { error } = await withinDeadline(downloadOutcomeOf(downloadableFile('/complete').downloadToStream(writable, { job })), 'the download')
      const next = await withinDeadline(downloadableFile('/complete').downloadToString({ job }), 'the job\'s next download')

      expect(error).toBe(endError)
      expect(Buffer.concat(chunks).equals(PAYLOAD)).toBe(true)
      expect(writable.destroyed).toBe(true)
      expect(next).toBe(PAYLOAD.toString('utf8'))
    })
  })

  describe('through a configured fetch', () => {
    let transported

    // A fetch that records each request it is given, and sends it with cross-fetch through https's global agent, which
    // trusts this file's certificate.
    const recordingFetch = (url, init) => {
      transported.push(`${init.method} ${url.replace(baseUrl, '').split('?')[0]} ${init.headers['Accept-Encoding']} ${init.redirect}`)
      return crossFetch(url, init)
    }

    const fetchedFile = (urlPath, options = { fetch: recordingFetch }) => (
      new File({ download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` }, options)
    )

    const streamInto = chunks => new Writable({
      write: (chunk, encoding, callback) => {
        chunks.push(chunk)
        callback()
      },
    })

    beforeEach(() => {
      transported = []
    })

    afterEach(() => {
      Files.configureNetwork({ fetch: null })
    })

    it('downloads by each method through the File\'s fetch, else its client\'s, else the global one, each in one whole response', async () => {
      const destination = path.join(directory, 'fetched.bin')
      const streamed = []

      await withinDeadline(fetchedFile('/large/parallel').downloadToFile(destination), 'the download', LARGE_DEADLINE)
      await withinDeadline(fetchedFile('/complete').downloadToStream(streamInto(streamed)), 'the download')

      const fromClient = await withinDeadline(
        fetchedFile('/complete', { client: new FilesClient({ fetch: recordingFetch }) }).downloadToString(),
        'the download',
      )

      Files.configureNetwork({ fetch: recordingFetch })
      const fromGlobal = await withinDeadline(downloadableFile('/complete').downloadToString(), 'the download')

      // The ordinary response of /large/parallel is right only up to the end of its first range: the file is exactly
      // that one response, asked for no range.
      expect(fs.readFileSync(destination).equals(PARALLEL_ORDINARY)).toBe(true)
      expect(largeRequests).toEqual([{ ifMatch: undefined, range: undefined }])
      expect(Buffer.concat(streamed).equals(PAYLOAD)).toBe(true)
      expect([fromClient, fromGlobal]).toEqual([PAYLOAD.toString('utf8'), PAYLOAD.toString('utf8')])
      expect(transported).toEqual([
        'GET /large/parallel identity manual',
        'GET /complete identity manual',
        'GET /complete identity manual',
        'GET /complete identity manual',
      ])
    }, LARGE_DEADLINE)

    // The file can start over from its first byte, so a response its budget stops, with no version to resume, is asked
    // for again from the start, once, as the client's one retry allows.
    it('starts a file over once its attempt\'s budget stops a response still arriving, and fails with that budget\'s error once no retry is left', async () => {
      const file = fetchedFile('/stalled', { client: new FilesClient({ maxNetworkRetries: 1 }), fetch: recordingFetch, timeoutSecs: 0.3 })
      const error = await failureOf(file.downloadToFile(path.join(directory, 'fetched-stalled.bin')), 4000)
      await withinDeadline(stalledResponseClosed, 'the response to close')

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Request timed out')
      expect(transported).toEqual(['GET /stalled identity manual', 'GET /stalled identity manual'])
    })

    it('fails a stream or string download with the budget\'s own error, and keeps a destination\'s earlier error instead', async () => {
      const failures = []

      // Each method in turn, against a body that stalls after its first bytes, with a budget of 0.3 seconds and no retry.
      const stalled = async download => {
        const error = await failureOf(download(fetchedFile('/stalled', {
          client: new FilesClient({ maxNetworkRetries: 0 }),
          fetch: recordingFetch,
          timeoutSecs: 0.3,
        })))

        await withinDeadline(stalledResponseClosed, 'the response to close')
        failures.push(error)
      }

      const writable = new Writable({ write: (chunk, encoding, callback) => callback() })
      const writeError = new Error('destination is full')
      const failingWritable = new Writable({ write: (chunk, encoding, callback) => callback(writeError) })

      await stalled(file => file.downloadToStream(writable))
      await stalled(file => file.downloadToString())
      await stalled(file => file.downloadToStream(failingWritable))

      expect(failures.slice(0, 2).every(error => error instanceof FilesError && error.message === 'Request timed out')).toBe(true)
      expect(failures[2]).toBe(writeError)
      expect([writable.destroyed, writable.writableFinished]).toEqual([true, false])
    })

    it.each([['null', null], ['false', false], ['0', 0]])('fails a stream download whose fetch rejects with %s, with that very value, and stops its destination unfinished', async (_, rejection) => {
      let calls = 0
      const rejecting = () => {
        calls += 1
        return Promise.reject(rejection)
      }

      const finished = jest.fn()
      const writable = new Writable({ write: (chunk, encoding, callback) => callback() })
      writable.on('finish', finished)

      const file = fetchedFile('/complete', { client: new FilesClient({ fetch: rejecting, maxNetworkRetries: 1 }) })
      const outcome = await withinDeadline(file.downloadToStream(writable).then(() => ({ resolved: true }), error => ({ error })), 'the download')

      expect(outcome).toEqual({ error: rejection })
      expect(Object.is(outcome.error, rejection)).toBe(true)
      expect(calls).toBe(2)
      expect(writable.destroyed).toBe(true)
      expect(finished).not.toHaveBeenCalled()
    })

    it('fails a stream download whose body closes before its end without an error, given open or already closed, and stops its destination', async () => {
      // A fetch whose response body is a Node.js stream that gives some bytes and then is destroyed, without an error,
      // either soon after it is given or before.
      const closingFetch = when => async () => {
        const body = new Readable({ read() {} })
        body.push(PAYLOAD.subarray(0, 4096))

        if (when === 'before') {
          body.destroy()
        } else {
          setTimeout(() => body.destroy(), 20)
        }

        return {
          body,
          headers: { entries: () => [][Symbol.iterator](), get: () => null },
          json: async () => ({}),
          ok: true,
          redirected: false,
          status: 200,
          statusText: 'OK',
          text: async () => '',
        }
      }

      const outcomes = []

      for (const when of ['after', 'before']) {
        const finished = jest.fn()
        const writable = new Writable({ write: (chunk, encoding, callback) => callback() })
        writable.on('finish', finished)

        // The budget is long, so that only the close itself can end the download in time.
        const file = fetchedFile('/complete', { fetch: closingFetch(when), timeoutSecs: 30 })

        // eslint-disable-next-line no-await-in-loop
        const error = await failureOf(file.downloadToStream(writable), 1000)
        outcomes.push([error.message, writable.destroyed, finished.mock.calls.length])
      }

      expect(outcomes).toEqual([
        ['Download response ended before it was complete', true, 0],
        ['Download response ended before it was complete', true, 0],
      ])
    })

    it('sends a download through its fetch again after a transient status, and fails one answered other than 200 with that status, unread', async () => {
      let calls = 0

      // Answers the first request as a busy storage would, and sends the rest.
      const busyOnce = (url, init) => {
        calls += 1

        if (calls === 1) {
          return Promise.resolve({
            body: null,
            headers: { entries: () => [][Symbol.iterator](), get: () => null },
            json: async () => ({}),
            ok: false,
            status: 503,
            statusText: 'Service Unavailable',
            text: async () => '',
          })
        }

        return recordingFetch(url, init)
      }

      const text = await withinDeadline(fetchedFile('/complete', { fetch: busyOnce }).downloadToString(), 'the download')
      const destination = path.join(directory, 'fetched-forbidden.bin')
      const error = await failureOf(fetchedFile('/large/forbidden').downloadToFile(destination))

      expect([text, calls]).toEqual([PAYLOAD.toString('utf8'), 2])
      expect(error.status).toBe(403)
      expect(error.message).toBe('Download failed with HTTP status 403')
      expect(JSON.stringify(error, Object.getOwnPropertyNames(error))).not.toContain(SIGNATURE)
      expect(fs.statSync(destination).size).toBe(0)
    })

    it('never sends a download whose signed URL has expired by its own signature', async () => {
      const signedAt = new Date(Date.now() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const file = new File(
        { download_uri: `${baseUrl}/complete?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}` },
        { fetch: recordingFetch },
      )

      const error = await failureOf(file.downloadToString())

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('The signed URL had expired before the request could be sent')
      expect(transported).toEqual([])
    })
  })

  describe('recovery and refusal', () => {
    const writableInto = chunks => new Writable({
      write: (chunk, encoding, callback) => {
        chunks.push(chunk)
        callback()
      },
    })

    // The Files.com web app answers instead of storage: no destination is given any of its page.
    it.each([
      ['Node.js\'s https', urlPath => downloadableFile(urlPath)],
      ['a configured fetch', urlPath => new File({ download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` }, { fetch: crossFetch })],
    ])('refuses an answer from the Files.com web app before any of it reaches a file, a stream or a string, through %s', async (_, fileOf) => {
      const destination = path.join(directory, 'frontend.bin')
      const streamed = []
      const writable = writableInto(streamed)

      const errors = [
        await failureOf(fileOf('/frontend').downloadToFile(destination)),
        await failureOf(fileOf('/frontend').downloadToStream(writable)),
        await failureOf(fileOf('/frontend').downloadToString()),
      ]

      expect(errors.every(error => error instanceof FilesError && /Files\.com web app/.test(error.message))).toBe(true)
      expect(fs.statSync(destination).size).toBe(0)
      expect(streamed).toEqual([])
      expect(writable.writableFinished).toBe(false)
      expect(served.filter(request => request.startsWith('GET /frontend'))).toHaveLength(3)
    })

    // The response gives the file's size and a strong ETag, and is cut after RESUME_CUT bytes: the rest of that version
    // is asked for from the first byte not yet delivered, and no destination gets a byte twice.
    it.each([['a file', 'file'], ['a stream', 'stream'], ['a string', 'string']])('resumes a broken response from the bytes %s already has, of the same version', async (_, form) => {
      const destination = path.join(directory, 'resumed.bin')
      const streamed = []

      if (form === 'file') {
        await withinDeadline(downloadableFile('/resumable').downloadToFile(destination), 'the download')
        expect(fs.readFileSync(destination).equals(PAYLOAD)).toBe(true)
      } else if (form === 'stream') {
        await withinDeadline(downloadableFile('/resumable').downloadToStream(writableInto(streamed)), 'the download')
        expect(Buffer.concat(streamed).equals(PAYLOAD)).toBe(true)
      } else {
        const text = await withinDeadline(downloadableFile('/resumable').downloadToString(), 'the download')
        expect(text).toBe(PAYLOAD.toString('utf8'))
      }

      const resumes = served.filter(request => request.startsWith('GET /resumable bytes='))
      expect(served.filter(request => request.startsWith('GET /resumable'))).toHaveLength(2)
      expect(resumes).toHaveLength(1)
      expect(resumes[0]).toMatch(new RegExp(`^GET /resumable bytes=(\\d+)-${PAYLOAD.length - 1} "r1"$`))
      expect(Number(/bytes=(\d+)/.exec(resumes[0])[1])).toBeGreaterThan(0)
    })

    // The same, but the rest of that version comes in full and never ends (/resumable-unterminated), a small file read
    // in order, not split. Once the resumed request's budget of 1 second runs out, every byte has been written and
    // nothing is left to ask for: with a retry still allowed, the download fails with the budget's error, asking for
    // nothing more, once its file and every request have closed.
    it('fails with the budget\'s error, asking for nothing more, when a resumed response sends every byte left but never ends', async () => {
      const opened = trackOpenedFiles()
      const file = new File(
        { download_uri: `${baseUrl}/resumable-unterminated?X-Amz-Signature=${SIGNATURE}` },
        { client: new FilesClient({ apiKey: 'client-key', baseUrl, maxNetworkRetries: 1 }), timeoutSecs: 1 },
      )

      const error = await failureOf(file.downloadToFile(path.join(directory, 'resumed-unterminated.bin')), 4000)
      const requests = served.filter(request => request.startsWith('GET /resumable-unterminated'))

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Request timed out')
      expect(requests).toHaveLength(2)
      expect(requests[1]).toMatch(new RegExp(`^GET /resumable-unterminated bytes=(\\d+)-${PAYLOAD.length - 1} "r1"$`))
      expect(opened).toEqual([{ closed: true }])
      expect(await fs.promises.readFile(path.join(directory, 'resumed-unterminated.bin'))).toEqual(PAYLOAD)
    }, LARGE_DEADLINE)

    // The File's own download URL has expired by its signature: the File's own client gives it again, as its
    // download() does, and the download goes on there, never having sent the expired one.
    it('gets an expired download URL again through the File\'s own client, and downloads from the new one', async () => {
      const signedAt = new Date(Date.now() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, maxNetworkRetries: 0 })
      const file = new File(
        { download_uri: `${baseUrl}/expired?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
        { client },
      )

      const text = await withinDeadline(file.downloadToString(), 'the download')

      expect(text).toBe(PAYLOAD.toString('utf8'))
      expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
      expect(served.some(request => request.startsWith('GET /expired'))).toBe(false)
    })

    it('fails, unsent, a download whose URL has expired when the File cannot get it again', async () => {
      const signedAt = new Date(Date.now() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const file = new File({ download_uri: `${baseUrl}/expired?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}` })

      const error = await failureOf(file.downloadToString())

      expect(error.message).toBe('The signed URL had expired before the request could be sent')
      expect(served).toEqual([])
    })

    it('sends nothing while its control is paused, and downloads once resumed', async () => {
      const control = new Files.TransferControl()
      control.pause()

      const download = downloadOutcomeOf(downloadableFile('/complete').downloadToString({ control }))
      await new Promise(resolve => { setTimeout(resolve, 100) })

      expect(served).toEqual([])

      control.resume()
      const { error, value } = await withinDeadline(download, 'the download')

      expect(error).toBeUndefined()
      expect(value).toBe(PAYLOAD.toString('utf8'))
    })

    it('rejects with its own signal\'s reason, unchanged, once that aborts, having stopped its request', async () => {
      const controller = new AbortController()
      const reason = { cause: 'no longer downloading' }
      const download = downloadOutcomeOf(downloadableFile('/stalled').downloadToString({ signal: controller.signal }))

      await waitUntil(() => served.some(request => request.startsWith('GET /stalled')), 'the request')
      controller.abort(reason)
      const { error } = await withinDeadline(download, 'the download')
      await withinDeadline(stalledResponseClosed, 'the response to close')

      expect(error).toBe(reason)
    })
  })

  describe('budgets, pauses, stops and renewals', () => {
    // A File of urlPath on the test server, from a client of its own with no retries, and with timeoutSecs as each of
    // its download's requests' budget.
    const budgetedFile = (urlPath, timeoutSecs) => new File(
      { download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` },
      { client: new FilesClient({ apiKey: 'client-key', baseUrl, maxNetworkRetries: 0 }), timeoutSecs },
    )

    // An expired download URL of a File with a path, which its client gives again as /complete.
    const expiredFile = (client, urlPath = '/expired') => {
      const signedAt = new Date(Date.now() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')

      return new File(
        { download_uri: `${baseUrl}${urlPath}?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
        { client },
      )
    }

    // Through Node.js's https, the budget runs from sending a request until its body has been read: headers that never
    // come, and a body that keeps arriving, a byte every 60 ms, but not all within it, both fail with the budget's error.
    // Without a budget, the same body is read to its end.
    it('fails a request through Node.js\'s https whose headers or body outlast its budget, however its bytes keep coming, and reads it all without one', async () => {
      const heldHeaders = await failureOf(budgetedFile('/held-headers', 0.3).downloadToString())
      const crossing = await failureOf(budgetedFile('/slow-complete', 0.3).downloadToString())
      const unlimited = await withinDeadline(budgetedFile('/slow-complete', 0).downloadToString(), 'the download')

      expect([heldHeaders, crossing].map(error => error instanceof FilesError && error.message)).toEqual(['Request timed out', 'Request timed out'])
      expect(unlimited).toBe(SLOW_BODY.toString())
    })

    // A configured fetch never answers, and nothing times out, when the destination fails: the request is stopped
    // through its signal, and the download rejects with the destination's own error once it has, leaving its job free.
    it('stops a request still waiting for its headers once its destination fails, rejecting with that failure once the request has stopped', async () => {
      const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
      const destinationError = new Error('the destination failed')
      let requestSignal = null

      const holdingFetch = (url, init) => new Promise((resolve, reject) => {
        requestSignal = init.signal
        init.signal.addEventListener('abort', () => reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' })))
      })

      const writable = new Writable({ write: (chunk, encoding, callback) => callback() })
      const file = new File({ download_uri: `${baseUrl}/complete?X-Amz-Signature=${SIGNATURE}` }, { fetch: holdingFetch, timeoutSecs: 0 })
      const download = downloadOutcomeOf(file.downloadToStream(writable, { job }))

      await waitUntil(() => requestSignal !== null, 'the request')
      writable.destroy(destinationError)
      const { error } = await withinDeadline(download, 'the download')
      const next = await withinDeadline(downloadableFile('/complete').downloadToString({ job }), 'the job\'s next download')

      expect(error).toBe(destinationError)
      expect(requestSignal.aborted).toBe(true)
      expect(next).toBe(PAYLOAD.toString('utf8'))
    })

    // The destination takes the first chunk and never calls back, so the download waits for it to drain, with no budget
    // to end the wait: the download's signal ends it, stops the request, and the download rejects with its reason.
    it('ends a wait for its stream to drain once its signal aborts, rejecting with that reason once its request has closed', async () => {
      const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
      const controller = new AbortController()
      const reason = { cause: 'no longer downloading' }
      let writes = 0
      const writable = new Writable({ highWaterMark: 1, write: () => { writes += 1 } })
      const download = downloadOutcomeOf(budgetedFile('/stalled', 0).downloadToStream(writable, { job, signal: controller.signal }))

      await waitUntil(() => writes > 0, 'the first write')
      controller.abort(reason)
      const { error } = await withinDeadline(download, 'the download')
      await withinDeadline(stalledResponseClosed, 'the response to close')
      const next = await withinDeadline(downloadableFile('/complete').downloadToString({ job }), 'the job\'s next download')

      expect(error).toBe(reason)
      expect(writable.destroyed).toBe(true)
      expect(next).toBe(PAYLOAD.toString('utf8'))
    })

    // The response's headers have been sent, its body held, when the download is paused; the body then arrives, and
    // nothing of it reaches the destination, a writable that records every byte it is given, nor is counted, until the
    // download is resumed; then the destination gets every byte once, exactly. The destination's own bytes are what is
    // observed, not only progress reports, which come at most every 100 ms.
    it('delivers and counts nothing of a body that arrives while paused until resumed, then every byte once', async () => {
      const control = new Files.TransferControl()
      const reports = []
      const chunks = []
      const writable = new Writable({
        write: (chunk, encoding, callback) => {
          chunks.push(Buffer.from(chunk))
          callback()
        },
      })

      const download = downloadOutcomeOf(downloadableFile('/paced').downloadToStream(writable, { control, onProgress: report => reports.push({ ...report }) }))

      await waitUntil(() => releasePaced !== null, 'the request')
      control.pause()
      releasePaced()
      await new Promise(resolve => { setTimeout(resolve, 100) })

      const whilePaused = {
        delivered: chunks.reduce((total, chunk) => total + chunk.length, 0),
        reported: reports.map(({ bytesSent, bytesTransferred }) => bytesSent + bytesTransferred),
      }

      control.resume()
      const { error } = await withinDeadline(download, 'the download')

      expect(whilePaused.delivered).toBe(0)
      expect(whilePaused.reported.every(count => count === 0)).toBe(true)
      expect(error).toBeUndefined()
      expect(Buffer.concat(chunks).equals(PAYLOAD)).toBe(true)
      expect(writable.writableFinished).toBe(true)
      expect(reports[reports.length - 1]).toMatchObject({ bytesSent: PAYLOAD.length, bytesTransferred: PAYLOAD.length, state: 'completed' })
    })

    // Through a configured fetch, the client's agent chooser pauses the download, for 100 ms, the first time it is asked
    // for each URL: the download's own, chosen before its last checks, and the URL its redirect leads to, chosen as the
    // redirect is followed, once every check of the download before it has passed. It pauses it at once, or in a
    // microtask it queues, which runs as soon as anything is awaited. Never is a request handed to the fetch while the
    // download is paused: the decision to send it is made in the same turn as it is handed over, so that a pause queued
    // before it either holds it back until resumed or comes only after it has gone. A paused first request is chosen for
    // again, none; the redirect's goes with the agent chosen for its own URL, never asked again for it; and no request
    // carries the client's credentials.
    it.each([
      ['at once', pause => pause(), ['/hop', '/hop', '/complete']],
      ['in a queued microtask', pause => queueMicrotask(pause), ['/hop', '/complete']],
    ])('sends no request through a configured fetch, a redirect\'s included, while its agent chooser has paused it %s, with the agent chosen for its URL', async (_, pausing, choices) => {
      const control = new Files.TransferControl()
      const redirectAgent = new https.Agent({ ca: certificate })
      const chosenFor = []
      const sent = []
      const timers = new Set()

      const getAgentForUrl = url => {
        const { pathname } = new URL(url)
        chosenFor.push(pathname)

        if (chosenFor.filter(chosen => chosen === pathname).length === 1) {
          pausing(() => control.pause())
          const timer = setTimeout(() => {
            timers.delete(timer)
            control.resume()
          }, 100)
          timers.add(timer)
        }

        return pathname === '/complete' ? redirectAgent : undefined
      }

      const recording = (url, init) => {
        const names = [...new Headers(init.headers ?? {}).keys()]
        sent.push({
          credentials: names.some(name => ['authorization', 'x-filesapi-key', 'x-filesapi-session-id', 'x-files-workspace-id'].includes(name)),
          path: new URL(url).pathname,
          paused: control.paused,
          redirectAgent: init.agent === redirectAgent,
        })

        return crossFetch(url, init)
      }

      const client = new FilesClient({ apiKey: 'client-key', baseUrl, fetch: recording, getAgentForUrl, maxNetworkRetries: 0, workspaceId: 3 })
      const file = new File({ download_uri: `${baseUrl}/hop?X-Amz-Signature=${SIGNATURE}` }, { client })

      try {
        const text = await withinDeadline(file.downloadToString({ control }), 'the download')

        expect(text).toBe(PAYLOAD.toString('utf8'))
        expect(chosenFor).toEqual(choices)
        expect(sent).toEqual([
          { credentials: false, path: '/hop', paused: false, redirectAgent: false },
          { credentials: false, path: '/complete', paused: false, redirectAgent: true },
        ])
      } finally {
        timers.forEach(timer => clearTimeout(timer))
        control.resume()
        redirectAgent.destroy()
      }
    })

    // The client chooses one agent for the expired URL's host and path, and another for the renewed one: the renewal
    // goes, with the client's own key, through the first, and the file through the second.
    it('sends a renewed URL through the agent chosen for that URL, the renewal made in the File\'s own client context', async () => {
      class RecordingAgent extends https.Agent {
        constructor() {
          super({ ca: certificate })
          this.paths = []
        }

        addRequest(request, options) {
          this.paths.push(request.path.split('?')[0])
          return super.addRequest(request, options)
        }
      }

      const forOthers = new RecordingAgent()
      const forRenewed = new RecordingAgent()
      const client = new FilesClient({
        apiKey: 'issuer-key',
        baseUrl,
        getAgentForUrl: url => (url.includes('/complete') ? forRenewed : forOthers),
        maxNetworkRetries: 0,
      })

      try {
        const text = await withinDeadline(expiredFile(client).downloadToString(), 'the download')

        expect(text).toBe(PAYLOAD.toString('utf8'))
        expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
        expect(forRenewed.paths).toEqual(['/complete'])
        expect(forOthers.paths).toEqual(['/api/rest/v1/files/reports%2Frenewed.bin'])
        expect(served.some(request => request.startsWith('GET /expired'))).toBe(false)
      } finally {
        forOthers.destroy()
        forRenewed.destroy()
      }
    })

    // The URL has not expired when the request is made, but has by the time its log callback has run, which moves this
    // test's clock past its expiry: the request is never sent, and the URL is given again, with no retry allowed, which
    // getting a URL again for a request that sent nothing is not.
    it.each([
      ['Node.js\'s https', {}],
      ['a configured fetch', { fetch: crossFetch }],
    ])('gets a URL again that expires while its request\'s callbacks run, unsent, with no retry allowed, through %s', async (_, transport) => {
      const realNow = Date.now.bind(Date)
      let offset = 0
      jest.spyOn(Date, 'now').mockImplementation(() => realNow() + offset)

      const signedAt = new Date(realNow()).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const record = message => {
        if (typeof message === 'string' && message.startsWith('Sending request #1: GET') && message.includes('/soon')) {
          offset = 7200000
        }
      }

      const logger = { debug: record, error: record, info: record, warn: record }
      const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, logLevel: LogLevel.DEBUG, logger, maxNetworkRetries: 0, ...transport })
      const file = new File(
        { download_uri: `${baseUrl}/soon?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
        { client },
      )

      const text = await withinDeadline(file.downloadToString(), 'the download')

      expect(text).toBe(PAYLOAD.toString('utf8'))
      expect(offset).toBe(7200000)
      expect(served.filter(request => request.startsWith('GET /soon'))).toEqual([])
      expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
    })

    // The URL has not expired when the request is made, but has once the client's agent chooser, called for it as the
    // request is about to be sent, has moved this test's clock past its expiry: the request is not sent, and the URL is
    // given again, with no retry allowed, which getting a URL again for a request that sent nothing is not.
    it.each([
      ['Node.js\'s https', {}],
      ['a configured fetch', { fetch: crossFetch }],
    ])('gets a URL again that expires while its agent is chosen, unsent, with no retry allowed, through %s', async (_, transport) => {
      const realNow = Date.now.bind(Date)
      let offset = 0
      jest.spyOn(Date, 'now').mockImplementation(() => realNow() + offset)

      const chosenFor = []
      const getAgentForUrl = url => {
        chosenFor.push(new URL(url).pathname)

        if (url.includes('/soon')) {
          offset = 7200000
        }

        return undefined
      }

      const signedAt = new Date(realNow()).toISOString().replace(/[-:]|\.\d{3}/g, '')
      const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, getAgentForUrl, maxNetworkRetries: 0, ...transport })
      const file = new File(
        { download_uri: `${baseUrl}/soon?X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=${SIGNATURE}`, path: 'reports/renewed.bin' },
        { client },
      )

      const text = await withinDeadline(file.downloadToString(), 'the download')

      expect(text).toBe(PAYLOAD.toString('utf8'))
      expect(chosenFor).toContain('/soon')
      expect(chosenFor).toContain('/complete')
      expect(served.filter(request => request.startsWith('GET /soon'))).toEqual([])
      expect(renewals).toEqual([{ key: 'issuer-key', path: 'reports/renewed.bin' }])
    })

    // The client's agent chooser, called for the storage URL as its request is about to be sent, cancels one download
    // and pauses another: neither request is dispatched then. The cancelled download rejects with its signal's reason;
    // the paused one dispatches its request only once resumed.
    it('dispatches no request that its agent chooser cancels or pauses, rejecting with the signal\'s reason or sending once resumed', async () => {
      const get = https.get
      const dispatched = []

      jest.spyOn(https, 'get').mockImplementation((...args) => {
        dispatched.push(new URL(args[0]).searchParams.get('at'))
        return get.apply(https, args)
      })

      const cancelling = new AbortController()
      const reason = { cause: 'cancelled as its agent was chosen' }
      const control = new Files.TransferControl()
      let pausedByChooser = false

      const getAgentForUrl = url => {
        if (url.includes('at=cancel')) {
          cancelling.abort(reason)
        } else if (url.includes('at=pause') && !pausedByChooser) {
          pausedByChooser = true
          control.pause()
        }

        return undefined
      }

      const client = new FilesClient({ apiKey: 'client-key', baseUrl, getAgentForUrl, maxNetworkRetries: 0 })
      const fileAt = at => new File({ download_uri: `${baseUrl}/complete?at=${at}&X-Amz-Signature=${SIGNATURE}` }, { client })

      const cancelled = await withinDeadline(downloadOutcomeOf(fileAt('cancel').downloadToString({ signal: cancelling.signal })), 'the cancelled download')
      const dispatchedAfterCancel = [...dispatched]

      const pausing = downloadOutcomeOf(fileAt('pause').downloadToString({ control }))
      await waitUntil(() => pausedByChooser, 'the agent\'s choice')
      await new Promise(resolve => { setTimeout(resolve, 100) })
      const whilePaused = { dispatched: [...dispatched], served: [...served] }

      control.resume()
      const { error, value } = await withinDeadline(pausing, 'the paused download')

      expect(cancelled.error).toBe(reason)
      expect(dispatchedAfterCancel).toEqual([])
      expect(whilePaused).toEqual({ dispatched: [], served: [] })
      expect(error).toBeUndefined()
      expect(value).toBe(PAYLOAD.toString('utf8'))
      expect(dispatched).toEqual(['pause'])
      expect(served).toEqual(['GET /complete'])
    })

    // The download is paused while its URL is being given again, as the renewal's own log shows: once renewed, its
    // request is not sent until the download is resumed.
    it('sends no request once paused while its URL was being given again, and downloads once resumed', async () => {
      const control = new Files.TransferControl()
      const record = message => {
        if (typeof message === 'string' && message.startsWith('Sending request #1: GET') && message.includes('/api/rest/v1/files/')) {
          control.pause()
        }
      }

      const logger = { debug: record, error: record, info: record, warn: record }
      const client = new FilesClient({ apiKey: 'issuer-key', baseUrl, logLevel: LogLevel.DEBUG, logger, maxNetworkRetries: 0 })
      const download = downloadOutcomeOf(expiredFile(client).downloadToString({ control }))

      await waitUntil(() => renewals.length > 0, 'the renewal')
      await new Promise(resolve => { setTimeout(resolve, 100) })
      const sentWhilePaused = served.filter(request => request.startsWith('GET /complete'))

      control.resume()
      const { error, value } = await withinDeadline(download, 'the download')

      expect(control.paused).toBe(false)
      expect(sentWhilePaused).toEqual([])
      expect(error).toBeUndefined()
      expect(value).toBe(PAYLOAD.toString('utf8'))
    })
  })

  describe('at the DEBUG log level', () => {
    let entries
    let previous

    beforeEach(() => {
      entries = []
      previous = { logger: Files.getLogger(), logLevel: Files.getLogLevel() }

      const record = (...messages) => entries.push(messages)
      Files.setLogger({ debug: record, error: record, info: record, warn: record })
      Files.setLogLevel(LogLevel.DEBUG)
    })

    afterEach(() => {
      Files.setLogger(previous.logger)
      Files.setLogLevel(previous.logLevel)
    })

    const logged = (from, prefix) => from.filter(([message]) => typeof message === 'string' && message.startsWith(prefix))

    // The chunks logged as response data, in the order logged, each with the bytes of the file it says it holds.
    const loggedData = from => logged(from, 'Response Data (bytes ').map(([message, chunk]) => {
      const [, start, end] = /bytes (\d+)-(\d+)/.exec(message).map(Number)
      return { chunk: Buffer.from(chunk), end, start }
    })

    it('logs each request of a download to disk, every response, a refused range response included, and each chunk as it is read, writing the same bytes', async () => {
      const destination = path.join(directory, 'debug-other-version.bin')

      await withinDeadline(downloadableFile('/large/other-version').downloadToFile(destination), 'the download', LARGE_DEADLINE)

      const requests = logged(entries, 'Sending request #1: GET ')
      const statuses = logged(entries, 'Status: ').map(([message]) => message.split(' ')[1])
      const data = loggedData(entries)

      // The ordinary response first, then each range response that arrived before the split was refused.
      expect(fs.readFileSync(destination).equals(LARGE)).toBe(true)
      expect(statuses[0]).toBe('200')
      expect(statuses.length).toBeGreaterThanOrEqual(2)
      expect(statuses.length).toBeLessThanOrEqual(requests.length)
      expect(statuses.slice(1).every(status => status === '206')).toBe(true)
      expect(logged(entries, 'Response Headers: ')).toHaveLength(statuses.length)

      // Every byte written, from the one response used, logged once, in order, as the bytes it says it is.
      expect(data.every(({ chunk, end, start }) => end - start + 1 === chunk.length)).toBe(true)
      expect(Buffer.concat(data.map(({ chunk }) => chunk)).equals(LARGE)).toBe(true)
    }, LARGE_DEADLINE)

    it('logs each chunk of a streamed download as its stream takes it, with the log settings of the File\'s client, and nothing below DEBUG', async () => {
      const clientEntries = []
      const record = (...messages) => clientEntries.push(messages)
      const logger = { debug: record, error: record, info: record, warn: record }
      const fileOf = client => new File({ download_uri: `${baseUrl}/complete?X-Amz-Signature=${SIGNATURE}` }, { client })
      const streamed = []

      const writable = new Writable({
        write: (chunk, encoding, callback) => {
          streamed.push(chunk)
          callback()
        },
      })

      await withinDeadline(fileOf(new FilesClient({ logger, logLevel: LogLevel.DEBUG })).downloadToStream(writable), 'the download')
      const debugEntries = clientEntries.splice(0)
      const text = await withinDeadline(fileOf(new FilesClient({ logger })).downloadToString(), 'the download')

      expect(Buffer.concat(streamed).equals(PAYLOAD)).toBe(true)
      expect(Buffer.concat(loggedData(debugEntries).map(({ chunk }) => chunk)).equals(PAYLOAD)).toBe(true)
      expect(logged(debugEntries, 'Sending request #1: GET ')).toHaveLength(1)
      expect(logged(debugEntries, 'Status: 200')).toHaveLength(1)
      expect(text).toBe(PAYLOAD.toString('utf8'))

      // The client at INFO logs nothing of its download, and the global logger nothing of either.
      expect([clientEntries, entries]).toEqual([[], []])
    })

    it('logs a download through a configured fetch: its request, its response and each chunk as it is read', async () => {
      const file = new File({ download_uri: `${baseUrl}/complete?X-Amz-Signature=${SIGNATURE}` }, { fetch: crossFetch })
      const text = await withinDeadline(file.downloadToString(), 'the download')

      expect(text).toBe(PAYLOAD.toString('utf8'))
      expect(logged(entries, 'Sending request #1: GET ')).toHaveLength(1)
      expect(logged(entries, 'Status: 200')).toHaveLength(1)
      expect(logged(entries, 'Response Headers: ')).toHaveLength(1)
      expect(Buffer.concat(loggedData(entries).map(({ chunk }) => chunk)).equals(PAYLOAD)).toBe(true)
    })
  })
})
