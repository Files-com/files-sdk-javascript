import Files from '../Files'
import PartnerConnection from './PartnerConnection'

/**
 * A Partner is a first-class entity that cleanly represents an external organization, enables delegated administration,
 * and enforces strict boundaries.
 */
declare class Partner {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Partner.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Partner.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
  readonly allow_bypassing_2fa_policies?: boolean | null

  /**
   * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
   * the Partner, User, or Site allowed IP lists.
   */
  readonly allowed_ips?: string | null

  /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
  readonly allow_credential_changes?: boolean | null

  /** Allow Partner Admins to provide GPG keys. */
  readonly allow_providing_gpg_keys?: boolean | null

  /** Allow Partner Admins to create users. */
  readonly allow_user_creation?: boolean | null

  /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
  readonly cc_emails_to_responsible_party?: boolean | null

  /**
   * Approved Connected Sites relationships for this Partner, in both directions. Empty when this Partner has no
   * connections. Read-only.
   */
  readonly connections?: PartnerConnection.Attributes[] | null

  /** The unique ID of the Partner. */
  readonly id?: number | null

  /**
   * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
   * per-user assignment overrides it.
   */
  readonly ai_assistant_personality_id?: number | null

  /** ID of the Workspace associated with this Partner. */
  readonly workspace_id?: number | null

  /** The name of the Partner. */
  readonly name?: string | null

  /** Notes about this Partner. */
  readonly notes?: string | null

  /** Array of User IDs that are Partner Admins for this Partner. */
  readonly partner_admin_ids?: number[] | null

  /** ID of the Partner Channel Template assigned to this Partner. */
  readonly partner_channel_template_id?: number | null

  /**
   * This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured.
   * `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot hold
   * users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that is
   * also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together with a
   * `root_folder`.
   */
  readonly partnership_role?: 'host' | 'guest' | 'host_and_guest' | Files.OtherString | null

  /** ID of the Group responsible for this Partner. */
  readonly responsible_group_id?: number | null

  /** ID of the User responsible for this Partner. */
  readonly responsible_user_id?: number | null

  /** The root folder path for this Partner. */
  readonly root_folder?: string | null

  /** Show Partner users a simplified home page built from this Partner's Channels. */
  readonly show_partner_channel_home_page?: boolean | null

  /**
   * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which
   * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  readonly tags?: string | null

  /** Array of User IDs that belong to this Partner. */
  readonly user_ids?: number[] | null

  /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
  getAllowBypassing2faPolicies(): boolean | null | undefined

  /**
   * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
   * the Partner, User, or Site allowed IP lists.
   */
  getAllowedIps(): string | null | undefined

  /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
  getAllowCredentialChanges(): boolean | null | undefined

  /** Allow Partner Admins to provide GPG keys. */
  getAllowProvidingGpgKeys(): boolean | null | undefined

  /** Allow Partner Admins to create users. */
  getAllowUserCreation(): boolean | null | undefined

  /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
  getCcEmailsToResponsibleParty(): boolean | null | undefined

  /**
   * Approved Connected Sites relationships for this Partner, in both directions. Empty when this Partner has no
   * connections. Read-only.
   */
  getConnections(): PartnerConnection.Attributes[] | null | undefined

  /** The unique ID of the Partner. */
  getId(): number | null | undefined

  /**
   * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
   * per-user assignment overrides it.
   */
  getAiAssistantPersonalityId(): number | null | undefined

  /** ID of the Workspace associated with this Partner. */
  getWorkspaceId(): number | null | undefined

  /** The name of the Partner. */
  getName(): string | null | undefined

  /** Notes about this Partner. */
  getNotes(): string | null | undefined

  /** Array of User IDs that are Partner Admins for this Partner. */
  getPartnerAdminIds(): number[] | null | undefined

  /** ID of the Partner Channel Template assigned to this Partner. */
  getPartnerChannelTemplateId(): number | null | undefined

  /**
   * This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured.
   * `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot hold
   * users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that is
   * also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together with a
   * `root_folder`.
   */
  getPartnershipRole(): 'host' | 'guest' | 'host_and_guest' | Files.OtherString | null | undefined

  /** ID of the Group responsible for this Partner. */
  getResponsibleGroupId(): number | null | undefined

  /** ID of the User responsible for this Partner. */
  getResponsibleUserId(): number | null | undefined

  /** The root folder path for this Partner. */
  getRootFolder(): string | null | undefined

  /** Show Partner users a simplified home page built from this Partner's Channels. */
  getShowPartnerChannelHomePage(): boolean | null | undefined

  /**
   * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which
   * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  getTags(): string | null | undefined

  /** Array of User IDs that belong to this Partner. */
  getUserIds(): number[] | null | undefined

  /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
  setAllowBypassing2faPolicies(value: boolean): void

  /**
   * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
   * the Partner, User, or Site allowed IP lists.
   */
  setAllowedIps(value: string): void

  /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
  setAllowCredentialChanges(value: boolean): void

  /** Allow Partner Admins to provide GPG keys. */
  setAllowProvidingGpgKeys(value: boolean): void

  /** Allow Partner Admins to create users. */
  setAllowUserCreation(value: boolean): void

  /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
  setCcEmailsToResponsibleParty(value: boolean): void

  /**
   * Approved Connected Sites relationships for this Partner, in both directions. Empty when this Partner has no
   * connections. Read-only.
   */
  setConnections(value: PartnerConnection.Attributes[]): void

  /** The unique ID of the Partner. */
  setId(value: number): void

  /**
   * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
   * per-user assignment overrides it.
   */
  setAiAssistantPersonalityId(value: number): void

  /** ID of the Workspace associated with this Partner. */
  setWorkspaceId(value: number): void

  /** The name of the Partner. */
  setName(value: string): void

  /** Notes about this Partner. */
  setNotes(value: string): void

  /** Array of User IDs that are Partner Admins for this Partner. */
  setPartnerAdminIds(value: number[]): void

  /** ID of the Partner Channel Template assigned to this Partner. */
  setPartnerChannelTemplateId(value: number): void

  /**
   * This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured.
   * `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot hold
   * users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that is
   * also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together with a
   * `root_folder`.
   */
  setPartnershipRole(value: 'host' | 'guest' | 'host_and_guest'): void

  /** ID of the Group responsible for this Partner. */
  setResponsibleGroupId(value: number): void

  /** ID of the User responsible for this Partner. */
  setResponsibleUserId(value: number): void

  /** The root folder path for this Partner. */
  setRootFolder(value: string): void

  /** Show Partner users a simplified home page built from this Partner's Channels. */
  setShowPartnerChannelHomePage(value: boolean): void

  /**
   * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which
   * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  setTags(value: string): void

  /** Array of User IDs that belong to this Partner. */
  setUserIds(value: number[]): void

  /** Update Partner */
  update(params?: Partner.UpdateParams): Promise<this>

  /** Delete Partner */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Partners */
  static list(params?: Partner.ListParams, options?: Files.RequestOptions): Promise<Partner[]>

  /** Alias of `list()`. */
  static all(params?: Partner.ListParams, options?: Files.RequestOptions): Promise<Partner[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Partner.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Partner>

  /**
   * Show Partner
   * @param id - Partner ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Partner>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Partner>

  /** Create Partner */
  static create(params: Partner.CreateParams, options?: Files.RequestOptions): Promise<Partner>
}

declare namespace Partner {
  /** The fields of `Partner` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
    allow_bypassing_2fa_policies?: boolean | null

    /**
     * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
     * the Partner, User, or Site allowed IP lists.
     */
    allowed_ips?: string | null

    /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
    allow_credential_changes?: boolean | null

    /** Allow Partner Admins to provide GPG keys. */
    allow_providing_gpg_keys?: boolean | null

    /** Allow Partner Admins to create users. */
    allow_user_creation?: boolean | null

    /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
    cc_emails_to_responsible_party?: boolean | null

    /**
     * Approved Connected Sites relationships for this Partner, in both directions. Empty when this Partner has no
     * connections. Read-only.
     */
    connections?: PartnerConnection.Attributes[] | null

    /** The unique ID of the Partner. */
    id?: number | null

    /**
     * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
     * per-user assignment overrides it.
     */
    ai_assistant_personality_id?: number | null

    /** ID of the Workspace associated with this Partner. */
    workspace_id?: number | null

    /** The name of the Partner. */
    name?: string | null

    /** Notes about this Partner. */
    notes?: string | null

    /** Array of User IDs that are Partner Admins for this Partner. */
    partner_admin_ids?: number[] | null

    /** ID of the Partner Channel Template assigned to this Partner. */
    partner_channel_template_id?: number | null

    /**
     * This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured.
     * `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot
     * hold users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that
     * is also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together
     * with a `root_folder`.
     */
    partnership_role?: 'host' | 'guest' | 'host_and_guest' | Files.OtherString | null

    /** ID of the Group responsible for this Partner. */
    responsible_group_id?: number | null

    /** ID of the User responsible for this Partner. */
    responsible_user_id?: number | null

    /** The root folder path for this Partner. */
    root_folder?: string | null

    /** Show Partner users a simplified home page built from this Partner's Channels. */
    show_partner_channel_home_page?: boolean | null

    /**
     * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules,
     * which can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string | null

    /** Array of User IDs that belong to this Partner. */
    user_ids?: number[] | null
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
     * and `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /**
     * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
     * per-user assignment overrides it.
     */
    ai_assistant_personality_id?: number

    /**
     * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
     * the Partner, User, or Site allowed IP lists.
     */
    allowed_ips?: string

    /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
    allow_bypassing_2fa_policies?: boolean

    /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
    allow_credential_changes?: boolean

    /** Allow Partner Admins to provide GPG keys. */
    allow_providing_gpg_keys?: boolean

    /** Allow Partner Admins to create users. */
    allow_user_creation?: boolean

    /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
    cc_emails_to_responsible_party?: boolean

    /** Notes about this Partner. */
    notes?: string

    /** ID of the Partner Channel Template assigned to this Partner. */
    partner_channel_template_id?: number

    /** ID of the Group responsible for this Partner. */
    responsible_group_id?: number

    /** ID of the User responsible for this Partner. */
    responsible_user_id?: number

    /** Show Partner users a simplified home page built from this Partner's Channels. */
    show_partner_channel_home_page?: boolean

    /**
     * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules,
     * which can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string

    /** The name of the Partner. */
    name: string

    /** The root folder path for this Partner. */
    root_folder: string

    /** ID of the Workspace associated with this Partner. */
    workspace_id?: number
  }

  interface UpdateParams {
    /**
     * AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct
     * per-user assignment overrides it.
     */
    ai_assistant_personality_id?: number

    /**
     * A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches
     * the Partner, User, or Site allowed IP lists.
     */
    allowed_ips?: string

    /** Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users. */
    allow_bypassing_2fa_policies?: boolean

    /** Allow Partner Admins to change or reset credentials for users belonging to this Partner. */
    allow_credential_changes?: boolean

    /** Allow Partner Admins to provide GPG keys. */
    allow_providing_gpg_keys?: boolean

    /** Allow Partner Admins to create users. */
    allow_user_creation?: boolean

    /** When `true`, emails sent to Partner users are copied to the responsible User or Group. */
    cc_emails_to_responsible_party?: boolean

    /** Notes about this Partner. */
    notes?: string

    /** ID of the Partner Channel Template assigned to this Partner. */
    partner_channel_template_id?: number

    /** ID of the Group responsible for this Partner. */
    responsible_group_id?: number

    /** ID of the User responsible for this Partner. */
    responsible_user_id?: number

    /** Show Partner users a simplified home page built from this Partner's Channels. */
    show_partner_channel_home_page?: boolean

    /**
     * Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules,
     * which can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string

    /** The name of the Partner. */
    name?: string

    /**
     * This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured.
     * `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot
     * hold users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that
     * is also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together
     * with a `root_folder`.
     */
    partnership_role?: 'host' | 'guest' | 'host_and_guest'

    /** The root folder path for this Partner. */
    root_folder?: string
  }
}

export default Partner
