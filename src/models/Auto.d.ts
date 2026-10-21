import Files from '../Files'

declare class Auto {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Auto.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Auto.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  readonly dynamic?: Files.JsonObject | null

  getDynamic(): Files.JsonObject | null | undefined
}

declare namespace Auto {
  /** The fields of `Auto` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    dynamic?: Files.JsonObject | null
  }
}

export default Auto
