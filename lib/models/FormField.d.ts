import Files = require('../Files')

/** A FormField is a single form field used in Form Field Set. */
declare class FormField {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FormField.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FormField.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Form field id */
  readonly id?: number | null

  /** Label to be displayed */
  readonly label?: string | null

  /** Is this a required field? */
  readonly required?: boolean | null

  /** Help text to be displayed */
  readonly help_text?: string | null

  /** Type of Field */
  readonly field_type?: 'text' | 'text_area' | 'dropdown' | 'radio' | 'date' | Files.OtherString | null

  /** Options to display for radio and dropdown */
  readonly options_for_select?: string[] | null

  /** Default option for radio and dropdown */
  readonly default_option?: string | null

  /** Form field set id */
  readonly form_field_set_id?: number | null

  /** Form field id */
  getId(): number | null | undefined

  /** Label to be displayed */
  getLabel(): string | null | undefined

  /** Is this a required field? */
  getRequired(): boolean | null | undefined

  /** Help text to be displayed */
  getHelpText(): string | null | undefined

  /** Type of Field */
  getFieldType(): 'text' | 'text_area' | 'dropdown' | 'radio' | 'date' | Files.OtherString | null | undefined

  /** Options to display for radio and dropdown */
  getOptionsForSelect(): string[] | null | undefined

  /** Default option for radio and dropdown */
  getDefaultOption(): string | null | undefined

  /** Form field set id */
  getFormFieldSetId(): number | null | undefined

  static default: typeof FormField
}

declare namespace FormField {
  /** The fields of `FormField` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Form field id */
    id?: number | null

    /** Label to be displayed */
    label?: string | null

    /** Is this a required field? */
    required?: boolean | null

    /** Help text to be displayed */
    help_text?: string | null

    /** Type of Field */
    field_type?: 'text' | 'text_area' | 'dropdown' | 'radio' | 'date' | Files.OtherString | null

    /** Options to display for radio and dropdown */
    options_for_select?: string[] | null

    /** Default option for radio and dropdown */
    default_option?: string | null

    /** Form field set id */
    form_field_set_id?: number | null
  }
}

export = FormField
