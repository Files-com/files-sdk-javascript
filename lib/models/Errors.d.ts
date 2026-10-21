import Files = require('../Files')

declare class Errors {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Errors.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Errors.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** A list of fields where errors occur */
  readonly fields?: string[] | null

  /** A list of error messages */
  readonly messages?: string[] | null

  /** A list of fields where errors occur */
  getFields(): string[] | null | undefined

  /** A list of error messages */
  getMessages(): string[] | null | undefined

  static default: typeof Errors
}

declare namespace Errors {
  /** The fields of `Errors` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** A list of fields where errors occur */
    fields?: string[] | null

    /** A list of error messages */
    messages?: string[] | null
  }
}

export = Errors
