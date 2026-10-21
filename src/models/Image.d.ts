import Files from '../Files'

declare class Image {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Image.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Image.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Image name */
  readonly name?: string | null

  /** Image URI */
  readonly uri?: string | null

  /** Image name */
  getName(): string | null | undefined

  /** Image URI */
  getUri(): string | null | undefined
}

declare namespace Image {
  /** The fields of `Image` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Image name */
    name?: string | null

    /** Image URI */
    uri?: string | null
  }
}

export default Image
