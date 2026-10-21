import Files = require('../Files')

/** An AI Assistant Personality defines a system prompt used to customize the in-app AI Assistant. */
declare class AiAssistantPersonality {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AiAssistantPersonality.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AiAssistantPersonality.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** AI Assistant Personality ID. */
  readonly id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** AI Assistant Personality name. */
  readonly name?: string | null

  /** System prompt injected into the in-app AI Assistant. */
  readonly system_prompt?: string | null

  /** Whether this personality is the default personality for the Workspace. */
  readonly use_by_default?: boolean | null

  /** If true, this default-workspace personality can apply to users in all workspaces. */
  readonly apply_to_all_workspaces?: boolean | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** AI Assistant Personality ID. */
  getId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** AI Assistant Personality name. */
  getName(): string | null | undefined

  /** System prompt injected into the in-app AI Assistant. */
  getSystemPrompt(): string | null | undefined

  /** Whether this personality is the default personality for the Workspace. */
  getUseByDefault(): boolean | null | undefined

  /** If true, this default-workspace personality can apply to users in all workspaces. */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** AI Assistant Personality ID. */
  setId(value: number): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** AI Assistant Personality name. */
  setName(value: string): void

  /** System prompt injected into the in-app AI Assistant. */
  setSystemPrompt(value: string): void

  /** Whether this personality is the default personality for the Workspace. */
  setUseByDefault(value: boolean): void

  /** If true, this default-workspace personality can apply to users in all workspaces. */
  setApplyToAllWorkspaces(value: boolean): void

  /** Update Ai Assistant Personality */
  update(params?: AiAssistantPersonality.UpdateParams): Promise<this>

  /** Delete Ai Assistant Personality */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Ai Assistant Personalities */
  static list(params?: AiAssistantPersonality.ListParams, options?: Files.RequestOptions): Promise<AiAssistantPersonality[]>

  /** Alias of `list()`. */
  static all(params?: AiAssistantPersonality.ListParams, options?: Files.RequestOptions): Promise<AiAssistantPersonality[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: AiAssistantPersonality.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<AiAssistantPersonality>

  /**
   * Show Ai Assistant Personality
   * @param id - Ai Assistant Personality ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AiAssistantPersonality>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AiAssistantPersonality>

  /** Create Ai Assistant Personality */
  static create(params: AiAssistantPersonality.CreateParams, options?: Files.RequestOptions): Promise<AiAssistantPersonality>

  static default: typeof AiAssistantPersonality
}

declare namespace AiAssistantPersonality {
  /** The fields of `AiAssistantPersonality` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** AI Assistant Personality ID. */
    id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** AI Assistant Personality name. */
    name?: string | null

    /** System prompt injected into the in-app AI Assistant. */
    system_prompt?: string | null

    /** Whether this personality is the default personality for the Workspace. */
    use_by_default?: boolean | null

    /** If true, this default-workspace personality can apply to users in all workspaces. */
    apply_to_all_workspaces?: boolean | null

    /** Creation time. */
    created_at?: Files.DateTimeString | null

    /** Last update time. */
    updated_at?: Files.DateTimeString | null
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

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** If true, this default-workspace personality can apply to users in all workspaces. */
    apply_to_all_workspaces?: boolean

    /** AI Assistant Personality name. */
    name: string

    /** System prompt injected into the in-app AI Assistant. */
    system_prompt: string

    /** Whether this personality is the default personality for the Workspace. */
    use_by_default?: boolean

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** If true, this default-workspace personality can apply to users in all workspaces. */
    apply_to_all_workspaces?: boolean

    /** AI Assistant Personality name. */
    name?: string

    /** System prompt injected into the in-app AI Assistant. */
    system_prompt?: string

    /** Whether this personality is the default personality for the Workspace. */
    use_by_default?: boolean

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }
}

export = AiAssistantPersonality
