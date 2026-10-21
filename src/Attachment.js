import * as errors from './Errors'
import { getType } from './utils'

const DEFAULT_MAX_BYTES = 64 * 1024 * 1024

const states = new WeakMap()

// Streams that a request is sending. A stream belongs to one request at a time, from serialization until the request
// ends, so two requests can never both read it.
const reservedStreams = new WeakSet()

const badParameter = message => new errors.InvalidParameterError(`Bad parameter: ${message}`)

const isStream = source => typeof source?.read === 'function'
  && typeof source?.removeListener === 'function'
  && typeof source?.readableLength === 'number'

// Reads a Buffer view in pieces of at most `size` bytes, without copying it.
const readBytes = bytes => {
  let offset = 0

  return {
    read: size => {
      if (offset === bytes.length) {
        return null
      }

      const chunk = bytes.subarray(offset, offset + size)
      offset += chunk.length
      return chunk
    },
    release: () => {},
  }
}

// Borrows a stream for one attempt, from its current position. read(size) takes only bytes the stream has already
// buffered and returns undefined while there are none; onChange is called when that may have changed. It returns null
// at the end of the stream. Nothing is read while waiting, so release() detaches at once and leaves every later chunk
// to the caller. The stream is never closed, rewound or destroyed.
const borrowStream = (state, onChange) => {
  const { maxBytes, source: stream } = state
  let failure = null
  let total = 0

  const onError = error => {
    failure = error
    onChange()
  }

  const listeners = [['close', onChange], ['end', onChange], ['error', onError], ['readable', onChange]]
  listeners.forEach(([event, listener]) => stream.on(event, listener))

  return {
    read: size => {
      if (failure) {
        throw failure
      }

      if (stream.readableObjectMode || stream.readableEncoding) {
        throw badParameter('attachment stream must produce bytes, not objects or strings')
      }

      if (stream.readableEnded) {
        return null
      }

      if (stream.destroyed) {
        throw stream.errored ?? new errors.FilesError('Attachment stream closed before it ended')
      }

      // Bytes past the limit are refused while still buffered, so they stay in the stream.
      const buffered = stream.readableLength
      if (buffered > maxBytes - total) {
        throw badParameter(`attachment stream is larger than its maxBytes of ${maxBytes}`)
      }

      if (buffered === 0) {
        stream.read(0) // asks the stream for more, or to signal its end, without taking anything
        return undefined
      }

      // Never more than the stream's own highWaterMark, which a larger read would raise.
      const chunk = stream.read(Math.min(buffered, size, Math.max(stream.readableHighWaterMark, 1)))
      state.consumed = true
      total += chunk.length
      return chunk
    },
    release: () => listeners.forEach(([event, listener]) => stream.removeListener(event, listener)),
  }
}

// A file sent with an API request as an `encoded_content` file object, with an optional filename and media type.
// The source is either a Buffer or other Uint8Array, which is sent as it is and can be sent again when the request is
// retried, or a Node.js Readable stream of bytes, which is read once from its current position. The caller keeps
// ownership of the source: the SDK does not copy a Buffer up front, and does not close, rewind or destroy a stream.
class Attachment {
  static DEFAULT_MAX_BYTES = DEFAULT_MAX_BYTES

  constructor(source, { filename, type, maxBytes = DEFAULT_MAX_BYTES } = {}) {
    if (filename !== undefined && filename !== null && typeof filename !== 'string') {
      throw badParameter(`attachment filename must be of type String, received ${getType(filename)}`)
    }

    if (type !== undefined && type !== null && typeof type !== 'string') {
      throw badParameter(`attachment type must be of type String, received ${getType(type)}`)
    }

    if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
      throw badParameter('attachment maxBytes must be a positive integer')
    }

    const state = {
      consumed: false,
      filename: filename ?? undefined,
      maxBytes,
      source,
      type: type ?? undefined,
    }

    if (source instanceof Uint8Array) {
      if (source.byteLength > maxBytes) {
        throw badParameter(`attachment is ${source.byteLength} bytes, larger than its maxBytes of ${maxBytes}`)
      }

      state.bytes = Buffer.from(source.buffer, source.byteOffset, source.byteLength)
    } else if (isStream(source)) {
      if (source.readableObjectMode || source.readableEncoding) {
        throw badParameter('attachment stream must produce bytes, not objects or strings')
      }

      if (source.destroyed) {
        throw badParameter('attachment stream has already been destroyed')
      }
    } else {
      throw badParameter(`attachment source must be a Buffer, Uint8Array or readable stream, received ${getType(source)}`)
    }

    states.set(this, state)
  }

  get source() { return states.get(this).source }

  get filename() { return states.get(this).filename }

  get type() { return states.get(this).type }

  get maxBytes() { return states.get(this).maxBytes }

  // The number of bytes sent from a Buffer or Uint8Array, or null for a stream, whose length is known only once read.
  get byteLength() { return states.get(this).bytes?.length ?? null }

  // A Buffer or Uint8Array can be sent again on a retry; a stream can be read only once.
  get isReplayable() { return Boolean(states.get(this).bytes) }

  // Whether any of this attachment's stream has been read.
  get _consumed() { return states.get(this).consumed }

  // Internal: claims the source for one request, synchronously, before anything is sent. A stream can be claimed by
  // one request at a time and never again once read; a Buffer or Uint8Array can be sent by any number of requests.
  _reserve() {
    const { bytes, consumed, source } = states.get(this)
    if (bytes) {
      return
    }

    if (consumed || reservedStreams.has(source)) {
      throw badParameter('an attachment stream can be sent only once')
    }

    reservedStreams.add(source)
  }

  // Internal: ends a request's claim. A stream that was never read can then be sent by another request.
  _release() {
    const { bytes, source } = states.get(this)
    if (!bytes) {
      reservedStreams.delete(source)
    }
  }

  // Internal: reads the source for one attempt of the request that reserved it.
  _borrow(onChange) {
    const state = states.get(this)
    return state.bytes ? readBytes(state.bytes) : borrowStream(state, onChange)
  }
}

export default Attachment

module.exports = Attachment
module.exports.default = Attachment
