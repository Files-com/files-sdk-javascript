import { execFileSync } from 'child_process'
import { errorMonitor } from 'events'
import fs from 'fs'
import https from 'https'
import os from 'os'
import path from 'path'
import { Writable } from 'stream'

import File from '../lib/models/File'

const PAYLOAD = Buffer.from(Array.from({ length: 32768 }, (_, index) => index % 251))
const SIGNATURE = 'test-download-signature'
const INTERRUPTED_RESPONSE = /aborted|ended before it was complete/

const withinDeadline = (promise, description) => {
  let timer
  const deadline = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out waiting for ${description}`)), 2000)
  })

  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer))
}

const failureOf = promise => withinDeadline(promise.then(() => {
  throw new Error('Expected the download to fail')
}, error => error), 'the download to fail')

// Records each file stream the SDK opens, without changing it, so the test can wait for it to close.
const trackOpenedFiles = () => {
  const opened = []
  const createWriteStream = fs.createWriteStream.bind(fs)

  jest.spyOn(fs, 'createWriteStream').mockImplementation((...args) => {
    const stream = createWriteStream(...args)
    opened.push(new Promise(resolve => { stream.once('close', resolve) }))
    return stream
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
  let stalledResponseClosed
  let priorCa

  const downloadableFile = urlPath => new File({ download_uri: `${baseUrl}${urlPath}?X-Amz-Signature=${SIGNATURE}` })

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
    https.globalAgent.options.ca = cert

    server = https.createServer({ cert, key: fs.readFileSync(keyPath) }, (request, response) => {
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
      await withinDeadline(opened[0], 'the file to close')

      expect(fs.readFileSync(destination).equals(PAYLOAD)).toBe(true)
    })

    it('rejects and closes the file when the response is cut short', async () => {
      const opened = trackOpenedFiles()

      const error = await failureOf(downloadableFile('/truncated').downloadToFile(path.join(directory, 'truncated.bin')))
      await withinDeadline(opened[0], 'the file to close')

      expect(error.message).toMatch(INTERRUPTED_RESPONSE)
      expect(JSON.stringify(error, Object.getOwnPropertyNames(error))).not.toContain(SIGNATURE)
    })

    it('rejects and closes the file when the download URL is invalid', async () => {
      const opened = trackOpenedFiles()

      const error = await failureOf(new File({ download_uri: 'not a url' }).downloadToFile(path.join(directory, 'invalid.bin')))
      await withinDeadline(opened[0], 'the file to close')

      expect(error.code).toBe('ERR_INVALID_URL')
    })

    it('rejects with the error from opening the destination', async () => {
      const error = await failureOf(downloadableFile('/complete').downloadToFile(directory))

      expect(error.code).toBe('EISDIR')
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
  })
})
