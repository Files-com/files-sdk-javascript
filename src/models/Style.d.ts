import Files from '../Files'
import Attachment from '../Attachment'
import Image from './Image'

/** A Style is a custom set of branding that can be applied on a per-folder basis. */
declare class Style {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Style.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Style.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `path`. */
  isLoaded(): boolean

  /** Style ID */
  readonly id?: number | null

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Logo */
  readonly logo?: Image.Attributes | null

  /** URL to open when a public visitor clicks the logo */
  readonly logo_click_href?: string | null

  /** Logo thumbnail */
  readonly thumbnail?: Image.Attributes | null

  /** Logo for custom branding. Required when creating a new style. */
  readonly file?: Attachment

  /** Style ID */
  getId(): number | null | undefined

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Logo */
  getLogo(): Image.Attributes | null | undefined

  /** URL to open when a public visitor clicks the logo */
  getLogoClickHref(): string | null | undefined

  /** Logo thumbnail */
  getThumbnail(): Image.Attributes | null | undefined

  /** Logo for custom branding. Required when creating a new style. */
  getFile(): Attachment | undefined

  /** Style ID */
  setId(value: number): void

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  setPath(value: string): void

  /** Logo */
  setLogo(value: Image.Attributes): void

  /** URL to open when a public visitor clicks the logo */
  setLogoClickHref(value: string): void

  /** Logo thumbnail */
  setThumbnail(value: Image.Attributes): void

  /** Logo for custom branding. Required when creating a new style. */
  setFile(value: Attachment): void

  /** Update Style */
  update(params?: Style.UpdateParams): Promise<this>

  /** Delete Style */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /** Updates this object from its attributes. Its attributes then become those the API returns. */
  save(): Promise<true>

  /**
   * Show Style
   * @param path - Style path.
   */
  static find(path: string, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Style>

  /** Alias of `find()`. */
  static get(path: string, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Style>
}

declare namespace Style {
  /** The fields of `Style` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Style ID */
    id?: number | null

    /**
     * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Logo */
    logo?: Image.Attributes | null

    /** URL to open when a public visitor clicks the logo */
    logo_click_href?: string | null

    /** Logo thumbnail */
    thumbnail?: Image.Attributes | null

    /** Logo for custom branding. Required when creating a new style. */
    file?: Attachment
  }

  interface UpdateParams {
    /** Logo for custom branding. Required when creating a new style. */
    file?: Attachment

    /** URL to open when a public visitor clicks the logo. */
    logo_click_href?: string
  }
}

export default Style
