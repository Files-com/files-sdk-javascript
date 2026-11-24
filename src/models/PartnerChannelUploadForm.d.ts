import Files from '../Files'

/** A Partner Channel Upload Form attaches a Form Field Set to one From Partner upload destination. */
declare class PartnerChannelUploadForm {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PartnerChannelUploadForm.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PartnerChannelUploadForm.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * Upload destination path relative to the From Partner folder. Must be a configured leaf managed folder path, or an
   * empty string for the From Partner folder when no managed folders are configured. This must be slash-delimited, but
   * it must neither start nor end with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /**
   * ID of the Form Field Set answered for uploads to this destination. Must be in the same Workspace and contain at
   * least one custom field.
   */
  readonly form_field_set_id?: number | null

  /**
   * Upload destination path relative to the From Partner folder. Must be a configured leaf managed folder path, or an
   * empty string for the From Partner folder when no managed folders are configured. This must be slash-delimited, but
   * it must neither start nor end with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /**
   * ID of the Form Field Set answered for uploads to this destination. Must be in the same Workspace and contain at
   * least one custom field.
   */
  getFormFieldSetId(): number | null | undefined
}

declare namespace PartnerChannelUploadForm {
  /** The fields of `PartnerChannelUploadForm` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Upload destination path relative to the From Partner folder. Must be a configured leaf managed folder path, or an
     * empty string for the From Partner folder when no managed folders are configured. This must be slash-delimited,
     * but it must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /**
     * ID of the Form Field Set answered for uploads to this destination. Must be in the same Workspace and contain at
     * least one custom field.
     */
    form_field_set_id?: number | null
  }
}

export default PartnerChannelUploadForm
