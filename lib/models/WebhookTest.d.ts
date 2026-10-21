import Files = require('../Files')
import Auto = require('./Auto')

/** A WebhookTest is an object that can be sent to your Webhook endpoint for connection and response tests. */
declare class WebhookTest {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: WebhookTest.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: WebhookTest.Attributes & Files.UnknownFields

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

  /** The success status of the webhook test */
  readonly success?: boolean | null

  /** URL for testing the webhook. */
  readonly url?: string

  /** HTTP method(GET or POST). */
  readonly method?: string

  /** HTTP encoding method.  Can be JSON, XML, or RAW (form data). */
  readonly encoding?: string

  /** Additional request headers. */
  readonly headers?: Files.JsonObject

  /** Additional body parameters. */
  readonly body?: Files.JsonObject

  /** raw body text */
  readonly raw_body?: string

  /** Send the file data as the request body? */
  readonly file_as_body?: boolean

  /** Send the file data as a named parameter in the request POST body */
  readonly file_form_field?: string

  /** action for test body */
  readonly action?: string

  /** Use dedicated IPs for sending the webhook? */
  readonly use_dedicated_ips?: boolean

  /** Status HTTP code */
  getCode(): number | null | undefined

  /** Error message */
  getMessage(): string | null | undefined

  /** Status message */
  getStatus(): string | null | undefined

  /** Additional data */
  getData(): Auto.Attributes | null | undefined

  /** The success status of the webhook test */
  getSuccess(): boolean | null | undefined

  /** URL for testing the webhook. */
  getUrl(): string | undefined

  /** HTTP method(GET or POST). */
  getMethod(): string | undefined

  /** HTTP encoding method.  Can be JSON, XML, or RAW (form data). */
  getEncoding(): string | undefined

  /** Additional request headers. */
  getHeaders(): Files.JsonObject | undefined

  /** Additional body parameters. */
  getBody(): Files.JsonObject | undefined

  /** raw body text */
  getRawBody(): string | undefined

  /** Send the file data as the request body? */
  getFileAsBody(): boolean | undefined

  /** Send the file data as a named parameter in the request POST body */
  getFileFormField(): string | undefined

  /** action for test body */
  getAction(): string | undefined

  /** Use dedicated IPs for sending the webhook? */
  getUseDedicatedIps(): boolean | undefined

  /** Status HTTP code */
  setCode(value: number): void

  /** Error message */
  setMessage(value: string): void

  /** Status message */
  setStatus(value: string): void

  /** Additional data */
  setData(value: Auto.Attributes): void

  /** The success status of the webhook test */
  setSuccess(value: boolean): void

  /** URL for testing the webhook. */
  setUrl(value: string): void

  /** HTTP method(GET or POST). */
  setMethod(value: string): void

  /** HTTP encoding method.  Can be JSON, XML, or RAW (form data). */
  setEncoding(value: string): void

  /** Additional request headers. */
  setHeaders(value: Files.JsonObject): void

  /** Additional body parameters. */
  setBody(value: Files.JsonObject): void

  /** raw body text */
  setRawBody(value: string): void

  /** Send the file data as the request body? */
  setFileAsBody(value: boolean): void

  /** Send the file data as a named parameter in the request POST body */
  setFileFormField(value: string): void

  /** action for test body */
  setAction(value: string): void

  /** Use dedicated IPs for sending the webhook? */
  setUseDedicatedIps(value: boolean): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** Create Webhook Test */
  static create(params: WebhookTest.CreateParams, options?: Files.RequestOptions): Promise<WebhookTest>

  static default: typeof WebhookTest
}

declare namespace WebhookTest {
  /** The fields of `WebhookTest` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Status HTTP code */
    code?: number | null

    /** Error message */
    message?: string | null

    /** Status message */
    status?: string | null

    /** Additional data */
    data?: Auto.Attributes | null

    /** The success status of the webhook test */
    success?: boolean | null

    /** URL for testing the webhook. */
    url?: string

    /** HTTP method(GET or POST). */
    method?: string

    /** HTTP encoding method.  Can be JSON, XML, or RAW (form data). */
    encoding?: string

    /** Additional request headers. */
    headers?: Files.JsonObject

    /** Additional body parameters. */
    body?: Files.JsonObject

    /** raw body text */
    raw_body?: string

    /** Send the file data as the request body? */
    file_as_body?: boolean

    /** Send the file data as a named parameter in the request POST body */
    file_form_field?: string

    /** action for test body */
    action?: string

    /** Use dedicated IPs for sending the webhook? */
    use_dedicated_ips?: boolean
  }

  interface CreateParams {
    /** URL for testing the webhook. */
    url: string

    /** HTTP method(GET or POST). */
    method?: string

    /** HTTP encoding method.  Can be JSON, XML, or RAW (form data). */
    encoding?: string

    /** Additional request headers. */
    headers?: Files.JsonObject

    /** Additional body parameters. */
    body?: Files.JsonObject

    /** raw body text */
    raw_body?: string

    /** Send the file data as the request body? */
    file_as_body?: boolean

    /** Send the file data as a named parameter in the request POST body */
    file_form_field?: string

    /** action for test body */
    action?: string

    /** Use dedicated IPs for sending the webhook? */
    use_dedicated_ips?: boolean
  }
}

export = WebhookTest
