import Files = require('../Files')

/** A ShareGroupMember is a single user record that belongs to a ShareGroup. */
declare class ShareGroupMember {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ShareGroupMember.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ShareGroupMember.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Name of the share group member */
  readonly name?: string | null

  /** Company of the share group member */
  readonly company?: string | null

  /** Email of the share group member */
  readonly email?: string | null

  /** Name of the share group member */
  getName(): string | null | undefined

  /** Company of the share group member */
  getCompany(): string | null | undefined

  /** Email of the share group member */
  getEmail(): string | null | undefined

  static default: typeof ShareGroupMember
}

declare namespace ShareGroupMember {
  /** The fields of `ShareGroupMember` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Name of the share group member */
    name?: string | null

    /** Company of the share group member */
    company?: string | null

    /** Email of the share group member */
    email?: string | null
  }
}

export = ShareGroupMember
