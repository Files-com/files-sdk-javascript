import Attachment from '../Attachment'

// A source is read at most 48 KiB at a time, a multiple of 3, so each piece of the body is at most 64 KiB of Base64.
// With up to two bytes carried between pieces and the body stream's own small buffer, encoding needs well under 1 MiB
// per request, apart from the caller's source and the JSON of the other parameters.
const SLICE_BYTES = 48 * 1024

// A file object's JSON up to its Base64, which is followed by the rest of the object.
const ENCODED_CONTENT_OPENING = '{"encoded_content":"'

const base64Length = byteLength => 4 * Math.ceil(byteLength / 3)

// A JSON request body in which each Attachment is sent as an `encoded_content` file object. parts holds the body in
// order: JSON text, with each Attachment at the place of its Base64. The body is streamed afresh for each attempt, so a
// file is never held in memory as one Base64 string.
class AttachmentBody {
  constructor(parts) {
    this.parts = parts
    this.attachments = parts.filter(part => part instanceof Attachment)
  }

  // The exact byte length when every attachment is a Buffer or Uint8Array; a body with a stream is sent chunked.
  get length() {
    if (!this.attachments.every(attachment => attachment.isReplayable)) {
      return null
    }

    return this.parts.reduce((total, part) => total + (part instanceof Attachment
      ? base64Length(part.byteLength)
      : Buffer.byteLength(part)), 0)
  }

  // The same body can be sent again only while none of its streams has been read.
  canReplay() {
    return this.attachments.every(attachment => !attachment._consumed)
  }

  // Ends the request's claim on its streams once the request has finished.
  release() {
    this.attachments.forEach(attachment => attachment._release())
  }

  // Stops whatever the request's latest attempt still has open, once the request has failed.
  abort() {
    this.attempt?.abort()
  }

  // Starts one attempt, with its own body stream that reads a source only when the request asks for more, and keeps it
  // as the request's latest attempt. The attempt lets go of the borrowed stream as soon as it fails or the server
  // answers, so nothing of it keeps running or reads a later chunk, and it closes its own request when that was not
  // sent in full.
  open(callerSignal) {
    const { Readable } = require('stream')
    const controller = new AbortController()
    const { parts } = this
    let index = 0
    let reader = null
    let carry = null
    let waiting = false
    let upload = null // node-fetch's request, which the body is piped into
    let pump // defined below; the body and the borrowed stream call it when they can take or give more

    const attempt = {
      failure: null,
      signal: callerSignal ? AbortSignal.any([callerSignal, controller.signal]) : controller.signal,
    }

    // Destroying the body ends the attempt for good. waiting is cleared before the borrowed stream is let go, so a
    // notification the stream is already delivering, such as one whose earlier listener cancelled the request, cannot
    // restart the pump; and nextPiece reads and borrows nothing once the body is destroyed.
    const body = new Readable({
      destroy: (error, callback) => {
        waiting = false
        reader?.release()
        reader = null
        callback(error)
      },
      read: () => pump(),
    })

    // The next piece of the body: text, null at its end, or undefined while a stream has nothing to read yet or once the
    // body is destroyed. Bytes are encoded in multiples of 3, carrying up to two bytes to the next piece, so the pieces
    // join into one Base64 value.
    const nextPiece = () => {
      if (body.destroyed) {
        return undefined
      }

      const part = parts[index]
      if (part === undefined) {
        return null
      }

      if (typeof part === 'string') {
        index += 1
        return part
      }

      if (!reader) {
        reader = part._borrow(() => {
          if (waiting) {
            pump()
          }
        })
      }

      const chunk = reader.read(SLICE_BYTES)
      if (chunk === undefined) {
        return undefined
      }

      if (chunk === null) {
        const rest = carry
        reader.release()
        reader = null
        carry = null
        index += 1
        return rest ? rest.toString('base64') : nextPiece()
      }

      const bytes = carry ? Buffer.concat([carry, chunk]) : chunk
      const whole = bytes.length - (bytes.length % 3)
      carry = whole < bytes.length ? Buffer.from(bytes.subarray(whole)) : null
      return whole > 0 ? bytes.toString('base64', 0, whole) : nextPiece()
    }

    // Pushes pieces until the request wants no more for now, the body ends, or a stream has nothing to read yet. A
    // failure to read or encode a source ends the attempt at once and becomes its error.
    pump = () => {
      waiting = false

      try {
        let piece = nextPiece()
        while (piece !== undefined) {
          if (!body.push(piece)) {
            return
          }

          piece = nextPiece()
        }

        waiting = !body.destroyed
      } catch (error) {
        attempt.failure = error
        controller.abort()
        body.destroy()
      }
    }

    // Closes the connection of a request whose body was not sent in full, so it is neither left open nor reused half
    // sent. A request whose body ended is left to node-fetch and its agent.
    const closeUnfinishedUpload = () => {
      if (upload && !upload.writableEnded) {
        upload.destroy()
      }
    }

    // node-fetch pipes the body into its request, which is how the attempt gets hold of that request. When the server
    // answers, no more of the body is sent and the borrowed stream is let go at once. An unfinished request is closed
    // only once the whole response has arrived, so the response is never cut short. node-fetch has finished with the
    // signal by then; aborting it first keeps node-fetch from taking that close for a broken response. A 303 is
    // followed with the same signal, so its signal is left alone.
    body.pipe = (destination, options) => {
      upload = destination
      upload.once('response', response => {
        body.destroy()
        response.once('end', () => {
          if (!upload.writableEnded && response.statusCode !== 303) {
            controller.abort()
          }

          closeUnfinishedUpload()
        })
      })

      return Readable.prototype.pipe.call(body, destination, options)
    }

    attempt.body = body
    attempt.abort = () => {
      body.destroy()
      controller.abort()
      closeUnfinishedUpload()
    }

    this.attempt = attempt
    return attempt
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `[JSON body with ${this.attachments.length} attachment(s)]`
  }
}

// Returns the JSON request body for params: a string, or an AttachmentBody when params hold an Attachment. Each stream
// is claimed for this request as it is serialized, so a second request that holds the same stream is refused here,
// before it sends anything.
const jsonBody = params => {
  const attachments = []
  let nonce
  const placeholder = index => {
    if (nonce === undefined) {
      nonce = globalThis.crypto.randomUUID()
    }

    return `files.com-attachment:${nonce}:${index}`
  }

  let json
  try {
    json = JSON.stringify(params, (key, value) => {
      if (!(value instanceof Attachment)) {
        return value
      }

      value._reserve()
      attachments.push(value)
      return placeholder(attachments.length - 1)
    })
  } catch (error) {
    attachments.forEach(attachment => attachment._release())
    throw error
  }

  if (attachments.length === 0) {
    return json
  }

  const parts = []
  let start = 0
  attachments.forEach((attachment, index) => {
    const quoted = JSON.stringify(placeholder(index))
    const end = json.indexOf(quoted, start)
    const fileObject = JSON.stringify({ encoded_content: '', filename: attachment.filename, type: attachment.type })
    parts.push(`${json.slice(start, end)}${ENCODED_CONTENT_OPENING}`, attachment, fileObject.slice(ENCODED_CONTENT_OPENING.length))
    start = end + quoted.length
  })

  parts.push(json.slice(start))
  return new AttachmentBody(parts)
}

export { AttachmentBody, jsonBody }
