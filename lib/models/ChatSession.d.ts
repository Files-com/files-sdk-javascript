import Files = require('../Files')
import ChatMessage = require('./ChatMessage')

/** A ChatSession represents one conversation with the Files.com AI Assistant. */
declare class ChatSession {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ChatSession.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ChatSession.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Chat Session ID. */
  readonly id?: string | null

  /** Short AI-generated chat title. */
  readonly title?: string | null

  /** User ID. */
  readonly user_id?: number | null

  /** AI Task ID. Present when the conversation was started by an AI Task. */
  readonly ai_task_id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Most recent chat activity date/time. */
  readonly last_active_at?: Files.DateTimeString | null

  /** Chat session creation date/time. */
  readonly created_at?: Files.DateTimeString | null

  /**
   * Visible conversation messages in this chat session. For performance reasons, this is not provided when listing chat
   * sessions.
   */
  readonly messages?: ChatMessage.Attributes[] | null

  /** Chat Session ID. */
  getId(): string | null | undefined

  /** Short AI-generated chat title. */
  getTitle(): string | null | undefined

  /** User ID. */
  getUserId(): number | null | undefined

  /** AI Task ID. Present when the conversation was started by an AI Task. */
  getAiTaskId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Most recent chat activity date/time. */
  getLastActiveAt(): Files.DateTimeString | null | undefined

  /** Chat session creation date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /**
   * Visible conversation messages in this chat session. For performance reasons, this is not provided when listing chat
   * sessions.
   */
  getMessages(): ChatMessage.Attributes[] | null | undefined

  /** List Chat Sessions */
  static list(params?: ChatSession.ListParams, options?: Files.RequestOptions): Promise<ChatSession[]>

  /** Alias of `list()`. */
  static all(params?: ChatSession.ListParams, options?: Files.RequestOptions): Promise<ChatSession[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ChatSession.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ChatSession>

  /**
   * Show Chat Session
   * @param id - Chat Session ID.
   */
  static find(id: string, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChatSession>

  /** Alias of `find()`. */
  static get(id: string, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChatSession>

  static default: typeof ChatSession
}

declare namespace ChatSession {
  /** The fields of `ChatSession` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Chat Session ID. */
    id?: string | null

    /** Short AI-generated chat title. */
    title?: string | null

    /** User ID. */
    user_id?: number | null

    /** AI Task ID. Present when the conversation was started by an AI Task. */
    ai_task_id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Most recent chat activity date/time. */
    last_active_at?: Files.DateTimeString | null

    /** Chat session creation date/time. */
    created_at?: Files.DateTimeString | null

    /**
     * Visible conversation messages in this chat session. For performance reasons, this is not provided when listing
     * chat sessions.
     */
    messages?: ChatMessage.Attributes[] | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `id`. */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `ai_task_id`,
     * `user_id` or `workspace_id`.
     */
    filter?: Files.JsonObject
  }
}

export = ChatSession
