import Files from '../Files'

/** A Session is an operation that allows you to make further API calls using our REST API or SDKs as a specific user. */
declare class Session {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Session.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Session.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Session ID */
  readonly id?: string | null

  /** Session language */
  readonly language?: string | null

  /** Is this session read only? */
  readonly read_only?: boolean | null

  /**
   * Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that
   * it is ok to use less secure SSH ciphers for this user.)
   */
  readonly sftp_insecure_ciphers?: boolean | null

  /** Username to sign in as */
  readonly username?: string

  /** Password for sign in */
  readonly password?: string

  /** If this user has a 2FA device, provide its OTP or code here. */
  readonly otp?: string

  /** Identifier for a partially-completed login */
  readonly partial_session_id?: string

  /** Session ID */
  getId(): string | null | undefined

  /** Session language */
  getLanguage(): string | null | undefined

  /** Is this session read only? */
  getReadOnly(): boolean | null | undefined

  /**
   * Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that
   * it is ok to use less secure SSH ciphers for this user.)
   */
  getSftpInsecureCiphers(): boolean | null | undefined

  /** Username to sign in as */
  getUsername(): string | undefined

  /** Password for sign in */
  getPassword(): string | undefined

  /** If this user has a 2FA device, provide its OTP or code here. */
  getOtp(): string | undefined

  /** Identifier for a partially-completed login */
  getPartialSessionId(): string | undefined

  /** Session ID */
  setId(value: string): void

  /** Session language */
  setLanguage(value: string): void

  /** Is this session read only? */
  setReadOnly(value: boolean): void

  /**
   * Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that
   * it is ok to use less secure SSH ciphers for this user.)
   */
  setSftpInsecureCiphers(value: boolean): void

  /** Username to sign in as */
  setUsername(value: string): void

  /** Password for sign in */
  setPassword(value: string): void

  /** If this user has a 2FA device, provide its OTP or code here. */
  setOtp(value: string): void

  /** Identifier for a partially-completed login */
  setPartialSessionId(value: string): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** Create user session (log in) */
  static create(params?: Session.CreateParams, options?: Files.RequestOptions): Promise<Session>

  /** Delete user session (log out) */
  static delete(options?: Files.RequestOptions): Promise<void>

  /** Alias of `delete()`. */
  static destroy(options?: Files.RequestOptions): Promise<void>
}

declare namespace Session {
  /** The fields of `Session` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Session ID */
    id?: string | null

    /** Session language */
    language?: string | null

    /** Is this session read only? */
    read_only?: boolean | null

    /**
     * Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled
     * that it is ok to use less secure SSH ciphers for this user.)
     */
    sftp_insecure_ciphers?: boolean | null

    /** Username to sign in as */
    username?: string

    /** Password for sign in */
    password?: string

    /** If this user has a 2FA device, provide its OTP or code here. */
    otp?: string

    /** Identifier for a partially-completed login */
    partial_session_id?: string
  }

  interface CreateParams {
    /** Username to sign in as */
    username?: string

    /** Password for sign in */
    password?: string

    /** If this user has a 2FA device, provide its OTP or code here. */
    otp?: string

    /** Identifier for a partially-completed login */
    partial_session_id?: string
  }
}

export default Session
