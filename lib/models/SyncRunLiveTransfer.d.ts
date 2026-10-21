import Files = require('../Files')

/** Represents a single in-progress file transfer within a running SyncRun. */
declare class SyncRunLiveTransfer {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SyncRunLiveTransfer.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SyncRunLiveTransfer.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * The file path being transferred. This must be slash-delimited, but it must neither start nor end with a slash.
   * Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Status of this individual transfer */
  readonly status?: string | null

  /** Bytes transferred so far */
  readonly bytes_copied?: number | null

  /** Total bytes of the file being transferred */
  readonly bytes_total?: number | null

  /** Transfer progress from 0.0 to 1.0 */
  readonly percentage?: number | null

  /** Estimated time remaining (human-readable) */
  readonly eta?: string | null

  /** When this individual transfer started */
  readonly started_at?: string | null

  /**
   * The file path being transferred. This must be slash-delimited, but it must neither start nor end with a slash.
   * Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Status of this individual transfer */
  getStatus(): string | null | undefined

  /** Bytes transferred so far */
  getBytesCopied(): number | null | undefined

  /** Total bytes of the file being transferred */
  getBytesTotal(): number | null | undefined

  /** Transfer progress from 0.0 to 1.0 */
  getPercentage(): number | null | undefined

  /** Estimated time remaining (human-readable) */
  getEta(): string | null | undefined

  /** When this individual transfer started */
  getStartedAt(): string | null | undefined

  static default: typeof SyncRunLiveTransfer
}

declare namespace SyncRunLiveTransfer {
  /** The fields of `SyncRunLiveTransfer` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * The file path being transferred. This must be slash-delimited, but it must neither start nor end with a slash.
     * Maximum of 5000 characters.
     */
    path?: string | null

    /** Status of this individual transfer */
    status?: string | null

    /** Bytes transferred so far */
    bytes_copied?: number | null

    /** Total bytes of the file being transferred */
    bytes_total?: number | null

    /** Transfer progress from 0.0 to 1.0 */
    percentage?: number | null

    /** Estimated time remaining (human-readable) */
    eta?: string | null

    /** When this individual transfer started */
    started_at?: string | null
  }
}

export = SyncRunLiveTransfer
