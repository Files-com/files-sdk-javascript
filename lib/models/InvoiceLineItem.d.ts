import Files = require('../Files')

/** An InvoiceLineItem is your invoice record. */
declare class InvoiceLineItem {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: InvoiceLineItem.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: InvoiceLineItem.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Invoice Line item Id */
  readonly id?: number | null

  /** Invoice line item amount */
  readonly amount?: Files.DecimalString | null

  /** Invoice line item created at date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Invoice line item description */
  readonly description?: string | null

  /** Invoice line item type */
  readonly type?: 'invoice' | 'invoice_adjustment' | 'usage_overage' | 'user_overage' | 'addon_subscription' | 'misc_fee' | 'usage_overage_adjustment' | 'user_overage_adjustment' | 'addon_subscription_adjustment' | 'misc_fee_adjustment' | 'credit_expiration' | 'user_overage_prepay' | 'user_overage_prepay_adjustment' | 'credit_expiration_adjustment' | 'outbound_connection_overage' | 'outbound_connection_overage_adjustment' | 'files_agent_overage' | 'files_agent_overage_adjustment' | 'automation_and_sync_flows_overage' | 'automation_and_sync_flows_overage_adjustment' | 'transformation_and_ai_credits_usage_overage' | 'transformation_and_ai_credits_usage_overage_adjustment' | 'api_usage_overage' | 'api_usage_overage_adjustment' | Files.OtherString | null

  /** Invoice line item service end date/time */
  readonly service_end_at?: Files.DateTimeString | null

  /** Invoice line item service start date/time */
  readonly service_start_at?: Files.DateTimeString | null

  /** Plan name */
  readonly plan?: string | null

  /** Site name */
  readonly site?: string | null

  /** Prepaid bytes purchased for this invoice line item */
  readonly prepaid_bytes?: number | null

  /** When the prepaid bytes expire */
  readonly prepaid_bytes_expire_at?: Files.DateTimeString | null

  /** Total prepaid bytes used for this invoice line item */
  readonly prepaid_bytes_used?: number | null

  /** Available prepaid bytes for this invoice line item */
  readonly prepaid_bytes_available?: number | null

  /** Invoice Line item Id */
  getId(): number | null | undefined

  /** Invoice line item amount */
  getAmount(): Files.DecimalString | null | undefined

  /** Invoice line item created at date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Invoice line item description */
  getDescription(): string | null | undefined

  /** Invoice line item type */
  getType(): 'invoice' | 'invoice_adjustment' | 'usage_overage' | 'user_overage' | 'addon_subscription' | 'misc_fee' | 'usage_overage_adjustment' | 'user_overage_adjustment' | 'addon_subscription_adjustment' | 'misc_fee_adjustment' | 'credit_expiration' | 'user_overage_prepay' | 'user_overage_prepay_adjustment' | 'credit_expiration_adjustment' | 'outbound_connection_overage' | 'outbound_connection_overage_adjustment' | 'files_agent_overage' | 'files_agent_overage_adjustment' | 'automation_and_sync_flows_overage' | 'automation_and_sync_flows_overage_adjustment' | 'transformation_and_ai_credits_usage_overage' | 'transformation_and_ai_credits_usage_overage_adjustment' | 'api_usage_overage' | 'api_usage_overage_adjustment' | Files.OtherString | null | undefined

  /** Invoice line item service end date/time */
  getServiceEndAt(): Files.DateTimeString | null | undefined

  /** Invoice line item service start date/time */
  getServiceStartAt(): Files.DateTimeString | null | undefined

  /** Plan name */
  getPlan(): string | null | undefined

  /** Site name */
  getSite(): string | null | undefined

  /** Prepaid bytes purchased for this invoice line item */
  getPrepaidBytes(): number | null | undefined

  /** When the prepaid bytes expire */
  getPrepaidBytesExpireAt(): Files.DateTimeString | null | undefined

  /** Total prepaid bytes used for this invoice line item */
  getPrepaidBytesUsed(): number | null | undefined

  /** Available prepaid bytes for this invoice line item */
  getPrepaidBytesAvailable(): number | null | undefined

  static default: typeof InvoiceLineItem
}

declare namespace InvoiceLineItem {
  /** The fields of `InvoiceLineItem` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Invoice Line item Id */
    id?: number | null

    /** Invoice line item amount */
    amount?: Files.DecimalString | null

    /** Invoice line item created at date/time */
    created_at?: Files.DateTimeString | null

    /** Invoice line item description */
    description?: string | null

    /** Invoice line item type */
    type?: 'invoice' | 'invoice_adjustment' | 'usage_overage' | 'user_overage' | 'addon_subscription' | 'misc_fee' | 'usage_overage_adjustment' | 'user_overage_adjustment' | 'addon_subscription_adjustment' | 'misc_fee_adjustment' | 'credit_expiration' | 'user_overage_prepay' | 'user_overage_prepay_adjustment' | 'credit_expiration_adjustment' | 'outbound_connection_overage' | 'outbound_connection_overage_adjustment' | 'files_agent_overage' | 'files_agent_overage_adjustment' | 'automation_and_sync_flows_overage' | 'automation_and_sync_flows_overage_adjustment' | 'transformation_and_ai_credits_usage_overage' | 'transformation_and_ai_credits_usage_overage_adjustment' | 'api_usage_overage' | 'api_usage_overage_adjustment' | Files.OtherString | null

    /** Invoice line item service end date/time */
    service_end_at?: Files.DateTimeString | null

    /** Invoice line item service start date/time */
    service_start_at?: Files.DateTimeString | null

    /** Plan name */
    plan?: string | null

    /** Site name */
    site?: string | null

    /** Prepaid bytes purchased for this invoice line item */
    prepaid_bytes?: number | null

    /** When the prepaid bytes expire */
    prepaid_bytes_expire_at?: Files.DateTimeString | null

    /** Total prepaid bytes used for this invoice line item */
    prepaid_bytes_used?: number | null

    /** Available prepaid bytes for this invoice line item */
    prepaid_bytes_available?: number | null
  }
}

export = InvoiceLineItem
