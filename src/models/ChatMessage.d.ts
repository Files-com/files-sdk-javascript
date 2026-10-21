import Files from '../Files'

/**
 * A ChatMessage represents one message within a ChatSession, which is a conversation with the Files.com AI Assistant.
 */
declare class ChatMessage {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ChatMessage.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ChatMessage.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Chat Message ID. */
  readonly id?: number | null

  /** Message role. */
  readonly role?: string | null

  /** Message content. */
  readonly content?: string | null

  /** Message creation date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Chat Message ID. */
  getId(): number | null | undefined

  /** Message role. */
  getRole(): string | null | undefined

  /** Message content. */
  getContent(): string | null | undefined

  /** Message creation date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined
}

declare namespace ChatMessage {
  /** The fields of `ChatMessage` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Chat Message ID. */
    id?: number | null

    /** Message role. */
    role?: string | null

    /** Message content. */
    content?: string | null

    /** Message creation date/time. */
    created_at?: Files.DateTimeString | null
  }
}

export default ChatMessage
