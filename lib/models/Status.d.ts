import Files = require('../Files')
import Auto = require('./Auto')
import Errors = require('./Errors')

declare class Status {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Status.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Status.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Status HTTP code */
  readonly code?: number | null

  /** Error message */
  readonly message?: string | null

  /** Status message */
  readonly status?: string | null

  /** Additional data */
  readonly data?: Auto.Attributes | null

  /** A list of api errors */
  readonly errors?: Errors.Attributes[] | null

  /** Required Clickwrap id */
  readonly clickwrap_id?: number | null

  /** Required Clickwrap body */
  readonly clickwrap_body?: string | null

  /** Status HTTP code */
  getCode(): number | null | undefined

  /** Error message */
  getMessage(): string | null | undefined

  /** Status message */
  getStatus(): string | null | undefined

  /** Additional data */
  getData(): Auto.Attributes | null | undefined

  /** A list of api errors */
  getErrors(): Errors.Attributes[] | null | undefined

  /** Required Clickwrap id */
  getClickwrapId(): number | null | undefined

  /** Required Clickwrap body */
  getClickwrapBody(): string | null | undefined

  static default: typeof Status
}

declare namespace Status {
  /** The fields of `Status` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Status HTTP code */
    code?: number | null

    /** Error message */
    message?: string | null

    /** Status message */
    status?: string | null

    /** Additional data */
    data?: Auto.Attributes | null

    /** A list of api errors */
    errors?: Errors.Attributes[] | null

    /** Required Clickwrap id */
    clickwrap_id?: number | null

    /** Required Clickwrap body */
    clickwrap_body?: string | null
  }
}

export = Status
