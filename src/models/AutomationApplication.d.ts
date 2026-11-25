import Files from '../Files'

declare class AutomationApplication {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationApplication.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationApplication.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Stable application key. */
  readonly key?: string | null

  /** Application display name. */
  readonly name?: string | null

  /** Application branding key. */
  readonly brand?: string | null

  /** Stable application key. */
  getKey(): string | null | undefined

  /** Application display name. */
  getName(): string | null | undefined

  /** Application branding key. */
  getBrand(): string | null | undefined
}

declare namespace AutomationApplication {
  /** The fields of `AutomationApplication` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Stable application key. */
    key?: string | null

    /** Application display name. */
    name?: string | null

    /** Application branding key. */
    brand?: string | null
  }
}

export default AutomationApplication
