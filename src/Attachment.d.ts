/// <reference types="node" />

/**
 * A file sent with an API request, inside its JSON body, as an `encoded_content` file object with an optional
 * filename and media type: give it as the value of a file parameter, such as `attachment_file` when creating a
 * behavior.
 *
 * The source is a Buffer or other Uint8Array, which is sent as it is and again when the request is retried, or a
 * Node.js Readable stream of bytes, which is read once from its current position. The source still belongs to the
 * caller: the SDK does not copy a Buffer, and does not close, rewind or destroy a stream. A stream can be sent by one
 * request at a time, and not again once any of it has been read.
 *
 * Node.js only. Throws an `InvalidParameterError` for an invalid source, filename, type or limit.
 */
declare class Attachment {
  // Only an object this class made is sent as a file, since the SDK recognizes attachments with `instanceof`.
  #private

  constructor(source: Attachment.Source, options?: Attachment.Options)

  /** The default `maxBytes`, 64 MiB. */
  static DEFAULT_MAX_BYTES: number

  /** The Buffer, Uint8Array or stream given to the constructor. */
  readonly source: Attachment.Source

  /** The file name sent with the file, if any. */
  readonly filename: string | undefined

  /** The media type sent with the file, if any. */
  readonly type: string | undefined

  /** The most bytes this attachment may send. */
  readonly maxBytes: number

  /** The number of bytes sent from a Buffer or Uint8Array, or null for a stream, whose length is known only once read. */
  readonly byteLength: number | null

  /** Whether the attachment can be sent again, as a Buffer or Uint8Array can; a stream can be read only once. */
  readonly isReplayable: boolean
}

declare namespace Attachment {
  /**
   * What an attachment sends: a Buffer or other Uint8Array, or a Node.js Readable stream of bytes, such as one from
   * `fs.createReadStream()`. A string is never read as a file path; an object-mode stream or one with an encoding is
   * refused.
   */
  type Source = Uint8Array | import('stream').Readable

  interface Options {
    /** The file name sent with the file. */
    filename?: string | null | undefined

    /** The media type sent with the file, such as `'image/png'`. */
    type?: string | null | undefined

    /**
     * The most bytes the attachment may send, `Attachment.DEFAULT_MAX_BYTES` by default: a positive integer. A larger
     * Buffer is refused here; a stream fails its request as soon as the bytes it has ready would pass the limit.
     */
    maxBytes?: number | undefined
  }
}

export default Attachment
