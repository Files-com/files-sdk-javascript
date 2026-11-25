import Files from '../Files'
import AutomationApplication from './AutomationApplication'

declare class AutomationApplicationAction {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationApplicationAction.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationApplicationAction.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Application that provides the action. */
  readonly application?: AutomationApplication.Attributes | null

  /** Stable action key within the application. */
  readonly key?: string | null

  /** Action display name. */
  readonly name?: string | null

  /** What the action does. */
  readonly description?: string | null

  /** Fingerprint of the action contract shown to the author. */
  readonly fingerprint?: string | null

  /** Normalized input fields. */
  readonly fields?: Files.JsonObject[] | null

  /** Normalized output schema. */
  readonly output?: Files.JsonObject | null

  /** HTTPS origins supported by this action. */
  readonly origins?: string[] | null

  /** Authentication types accepted by this action. */
  readonly authentication?: Files.JsonObject[] | null

  /** Application that provides the action. */
  getApplication(): AutomationApplication.Attributes | null | undefined

  /** Stable action key within the application. */
  getKey(): string | null | undefined

  /** Action display name. */
  getName(): string | null | undefined

  /** What the action does. */
  getDescription(): string | null | undefined

  /** Fingerprint of the action contract shown to the author. */
  getFingerprint(): string | null | undefined

  /** Normalized input fields. */
  getFields(): Files.JsonObject[] | null | undefined

  /** Normalized output schema. */
  getOutput(): Files.JsonObject | null | undefined

  /** HTTPS origins supported by this action. */
  getOrigins(): string[] | null | undefined

  /** Authentication types accepted by this action. */
  getAuthentication(): Files.JsonObject[] | null | undefined
}

declare namespace AutomationApplicationAction {
  /** The fields of `AutomationApplicationAction` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Application that provides the action. */
    application?: AutomationApplication.Attributes | null

    /** Stable action key within the application. */
    key?: string | null

    /** Action display name. */
    name?: string | null

    /** What the action does. */
    description?: string | null

    /** Fingerprint of the action contract shown to the author. */
    fingerprint?: string | null

    /** Normalized input fields. */
    fields?: Files.JsonObject[] | null

    /** Normalized output schema. */
    output?: Files.JsonObject | null

    /** HTTPS origins supported by this action. */
    origins?: string[] | null

    /** Authentication types accepted by this action. */
    authentication?: Files.JsonObject[] | null
  }
}

export default AutomationApplicationAction
