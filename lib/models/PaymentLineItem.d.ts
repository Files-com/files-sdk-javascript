import Files = require('../Files')

/** A PaymentLineItem is your payment information. */
declare class PaymentLineItem {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PaymentLineItem.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PaymentLineItem.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Payment line item amount */
  readonly amount?: Files.DecimalString | null

  /** Payment line item created at date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Invoice ID */
  readonly invoice_id?: number | null

  /** Payment ID */
  readonly payment_id?: number | null

  /** Payment line item amount */
  getAmount(): Files.DecimalString | null | undefined

  /** Payment line item created at date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Invoice ID */
  getInvoiceId(): number | null | undefined

  /** Payment ID */
  getPaymentId(): number | null | undefined

  static default: typeof PaymentLineItem
}

declare namespace PaymentLineItem {
  /** The fields of `PaymentLineItem` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Payment line item amount */
    amount?: Files.DecimalString | null

    /** Payment line item created at date/time */
    created_at?: Files.DateTimeString | null

    /** Invoice ID */
    invoice_id?: number | null

    /** Payment ID */
    payment_id?: number | null
  }
}

export = PaymentLineItem
