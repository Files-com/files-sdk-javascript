import Files = require('../Files')

/** A FileCommentReaction is a reaction that is attached to a comment on a file. */
declare class FileCommentReaction {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileCommentReaction.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileCommentReaction.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Reaction ID */
  readonly id?: number | null

  /** Emoji used in the reaction. */
  readonly emoji?: string | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** ID of file comment to attach reaction to. */
  readonly file_comment_id?: number

  /** Reaction ID */
  getId(): number | null | undefined

  /** Emoji used in the reaction. */
  getEmoji(): string | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** ID of file comment to attach reaction to. */
  getFileCommentId(): number | undefined

  /** Reaction ID */
  setId(value: number): void

  /** Emoji used in the reaction. */
  setEmoji(value: string): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /** ID of file comment to attach reaction to. */
  setFileCommentId(value: number): void

  /** Delete File Comment Reaction */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** Create File Comment Reaction */
  static create(params: FileCommentReaction.CreateParams, options?: Files.RequestOptions): Promise<FileCommentReaction>

  static default: typeof FileCommentReaction
}

declare namespace FileCommentReaction {
  /** The fields of `FileCommentReaction` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Reaction ID */
    id?: number | null

    /** Emoji used in the reaction. */
    emoji?: string | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** ID of file comment to attach reaction to. */
    file_comment_id?: number
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** ID of file comment to attach reaction to. */
    file_comment_id: number

    /** Emoji to react with. */
    emoji: string
  }
}

export = FileCommentReaction
