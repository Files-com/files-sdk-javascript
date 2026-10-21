import Files from '../Files'
import FileCommentReaction from './FileCommentReaction'

/** A FileComment is a comment attached to a file by a user. */
declare class FileComment {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileComment.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileComment.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** File Comment ID */
  readonly id?: number | null

  /** Comment body. */
  readonly body?: string | null

  /** Reactions to this comment. */
  readonly reactions?: FileCommentReaction.Attributes[] | null

  /** File path. */
  readonly path?: string

  /** File Comment ID */
  getId(): number | null | undefined

  /** Comment body. */
  getBody(): string | null | undefined

  /** Reactions to this comment. */
  getReactions(): FileCommentReaction.Attributes[] | null | undefined

  /** File path. */
  getPath(): string | undefined

  /** File Comment ID */
  setId(value: number): void

  /** Comment body. */
  setBody(value: string): void

  /** Reactions to this comment. */
  setReactions(value: FileCommentReaction.Attributes[]): void

  /** File path. */
  setPath(value: string): void

  /** Update File Comment */
  update(params?: FileComment.UpdateParams): Promise<this>

  /** Delete File Comment */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /**
   * List File Comments by Path
   * @param path - Path to operate on.
   */
  static listFor(path: string, params?: FileComment.ListForParams, options?: Files.RequestOptions): Promise<FileComment[]>

  /**
   * The models `listFor()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForIterator(path: string, params?: FileComment.ListForParams, options?: Files.RequestOptions): AsyncIterableIterator<FileComment>

  /** Create File Comment */
  static create(params: FileComment.CreateParams, options?: Files.RequestOptions): Promise<FileComment>
}

declare namespace FileComment {
  /** The fields of `FileComment` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** File Comment ID */
    id?: number | null

    /** Comment body. */
    body?: string | null

    /** Reactions to this comment. */
    reactions?: FileCommentReaction.Attributes[] | null

    /** File path. */
    path?: string
  }

  interface ListForParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number
  }

  interface CreateParams {
    /** Comment body. */
    body: string

    /** File path. */
    path: string
  }

  interface UpdateParams {
    /** Required: when not given, this object's `body` is used. Comment body. */
    body?: string
  }
}

export default FileComment
