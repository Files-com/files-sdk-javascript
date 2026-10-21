import Files from '../Files'

/** A Preview is an image or PDF preview that is meant to be viewed within the web interface. */
declare class Preview {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Preview.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Preview.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Preview ID */
  readonly id?: number | null

  /** Preview status.  Can be invalid, not_generated, generating, complete, or file_too_large */
  readonly status?: string | null

  /** Link to download preview */
  readonly download_uri?: string | null

  /** Preview type. Can be image, pdf, pdf_native, video, audio, or text */
  readonly type?: string | null

  /** Preview size */
  readonly size?: string | null

  /** Preview ID */
  getId(): number | null | undefined

  /** Preview status.  Can be invalid, not_generated, generating, complete, or file_too_large */
  getStatus(): string | null | undefined

  /** Link to download preview */
  getDownloadUri(): string | null | undefined

  /** Preview type. Can be image, pdf, pdf_native, video, audio, or text */
  getType(): string | null | undefined

  /** Preview size */
  getSize(): string | null | undefined
}

declare namespace Preview {
  /** The fields of `Preview` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Preview ID */
    id?: number | null

    /** Preview status.  Can be invalid, not_generated, generating, complete, or file_too_large */
    status?: string | null

    /** Link to download preview */
    download_uri?: string | null

    /** Preview type. Can be image, pdf, pdf_native, video, audio, or text */
    type?: string | null

    /** Preview size */
    size?: string | null
  }
}

export default Preview
