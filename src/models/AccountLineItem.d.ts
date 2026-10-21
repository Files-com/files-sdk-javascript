import Files from '../Files'
import InvoiceLineItem from './InvoiceLineItem'
import PaymentLineItem from './PaymentLineItem'

/** An AccountLineItem is a single line item in the accounting ledger for a billing account. */
declare class AccountLineItem {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AccountLineItem.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AccountLineItem.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Line item Id */
  readonly id?: number | null

  /** Line item amount */
  readonly amount?: Files.DecimalString | null

  /** Line item balance */
  readonly balance?: Files.DecimalString | null

  /** Line item created at */
  readonly created_at?: Files.DateTimeString | null

  /** Line item currency */
  readonly currency?: string | null

  /** Line item download uri */
  readonly download_uri?: string | null

  /** Associated invoice line items */
  readonly invoice_line_items?: InvoiceLineItem.Attributes[] | null

  /** Line item payment method */
  readonly method?: string | null

  /** Associated payment line items */
  readonly payment_line_items?: PaymentLineItem.Attributes[] | null

  /** Date/time payment was reversed if applicable */
  readonly payment_reversed_at?: Files.DateTimeString | null

  /** Type of payment if applicable */
  readonly payment_type?: string | null

  /** Site name this line item is for */
  readonly site_name?: string | null

  /** Type of line item, either payment or invoice */
  readonly type?: string | null

  /** Line item Id */
  getId(): number | null | undefined

  /** Line item amount */
  getAmount(): Files.DecimalString | null | undefined

  /** Line item balance */
  getBalance(): Files.DecimalString | null | undefined

  /** Line item created at */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Line item currency */
  getCurrency(): string | null | undefined

  /** Line item download uri */
  getDownloadUri(): string | null | undefined

  /** Associated invoice line items */
  getInvoiceLineItems(): InvoiceLineItem.Attributes[] | null | undefined

  /** Line item payment method */
  getMethod(): string | null | undefined

  /** Associated payment line items */
  getPaymentLineItems(): PaymentLineItem.Attributes[] | null | undefined

  /** Date/time payment was reversed if applicable */
  getPaymentReversedAt(): Files.DateTimeString | null | undefined

  /** Type of payment if applicable */
  getPaymentType(): string | null | undefined

  /** Site name this line item is for */
  getSiteName(): string | null | undefined

  /** Type of line item, either payment or invoice */
  getType(): string | null | undefined
}

declare namespace AccountLineItem {
  /** The fields of `AccountLineItem` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Line item Id */
    id?: number | null

    /** Line item amount */
    amount?: Files.DecimalString | null

    /** Line item balance */
    balance?: Files.DecimalString | null

    /** Line item created at */
    created_at?: Files.DateTimeString | null

    /** Line item currency */
    currency?: string | null

    /** Line item download uri */
    download_uri?: string | null

    /** Associated invoice line items */
    invoice_line_items?: InvoiceLineItem.Attributes[] | null

    /** Line item payment method */
    method?: string | null

    /** Associated payment line items */
    payment_line_items?: PaymentLineItem.Attributes[] | null

    /** Date/time payment was reversed if applicable */
    payment_reversed_at?: Files.DateTimeString | null

    /** Type of payment if applicable */
    payment_type?: string | null

    /** Site name this line item is for */
    site_name?: string | null

    /** Type of line item, either payment or invoice */
    type?: string | null
  }
}

export default AccountLineItem
