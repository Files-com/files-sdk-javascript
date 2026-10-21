import Files = require('../Files')

/** A FileAction is an operation status for a copy, move or delete. */
declare class FileAction {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileAction.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileAction.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `path`. */
  isLoaded(): boolean

  /** Status of file operation. */
  readonly status?: string | null

  /**
   * If status is pending, this is the id of the File Migration to check for status updates. Delete actions include it
   * whenever the deletion runs as a File Migration, including while it is processing.
   */
  readonly file_migration_id?: number | null

  /** Status of file operation. */
  getStatus(): string | null | undefined

  /**
   * If status is pending, this is the id of the File Migration to check for status updates. Delete actions include it
   * whenever the deletion runs as a File Migration, including while it is processing.
   */
  getFileMigrationId(): number | null | undefined

  static default: typeof FileAction
}

declare namespace FileAction {
  /** The fields of `FileAction` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Status of file operation. */
    status?: string | null

    /**
     * If status is pending, this is the id of the File Migration to check for status updates. Delete actions include it
     * whenever the deletion runs as a File Migration, including while it is processing.
     */
    file_migration_id?: number | null
  }
}

// The helpers written by hand in FileAction.js, merged into the FileAction declaration above.

interface FileAction {
  /**
   * Waits until the copy, move or deletion this object reports is confirmed complete. Opt in: a copy, move or
   * `beginDelete()` resolves as soon as the API accepts the action, and nothing waits unless this is called; an ordinary
   * `delete()` still resolves on its 204, with no status to wait for, so use `beginDelete()` to wait for a deletion.
   *
   * - With a valid `file_migration_id`, that File Migration is polled, at once and then every `pollIntervalMs`, while it
   *   is `pending` or `processing`, whatever this object's own `status` says, until it is `completed`, which resolves
   *   the wait. `failed` or `cancelled` rejects with a `FilesError` of its `failure_message`, and so does any other
   *   status, the schema's example `complete` included, as one that does not show completion.
   * - Without one, a `status` of exactly `completed` resolves at once, sending nothing: the API completed the action as
   *   it answered. Any other status, or none, cannot be confirmed, and rejects at once with a `FilesError`, as does a
   *   `file_migration_id` that is not a valid ID.
   * - A poll that fails, its retries spent, rejects with its own error. The action is never sent again.
   * - The signal, or `timeoutMs`, stops the wait whenever it comes before the wait has taken a poll's answer, even one
   *   already received: a migration found `completed` after the wait was stopped does not resolve it.
   *
   * Only the errors the wait makes itself carry the action: the `FilesError` of a migration that failed or was
   * cancelled, of a status or answer that cannot confirm completion, and of `timeoutMs` running out, has `fileAction`,
   * this object's attributes, and, once the wait has taken a poll's answer, `fileMigration`, the File Migration's data
   * as last taken. Any other rejection is as it came, with neither: a poll's own failure, such as an authentication or
   * network error, an invalid option's `InvalidParameterError`, and the signal's reason, whatever it is.
   *
   * Completion confirms the API's action or its migration: after a folder on native storage moves, the paths below it
   * can still be updating, with no status the API exposes, so check a particular path before relying on it.
   *
   * Every poll is sent in the context of the request that started the action, its site, credential, workspace and
   * headers, at the host a lockout region mismatch rerouted it to, if any, whatever the settings, global or a client's,
   * have become since; that context is kept privately, never in `attributes` or `options`. A FileAction made with
   * `new FileAction()` polls with its own `options`.
   */
  waitForCompletion(options?: FileAction.WaitOptions): Promise<void>
}

declare namespace FileAction {
  /** How `waitForCompletion()` waits. No setting of the SDK, a client or a request changes. */
  interface WaitOptions {
    /**
     * Stops the wait as soon as it aborts, a poll under way, a poll's answer not yet taken or the wait between polls:
     * it rejects with the signal's reason, unchanged, whatever it is, `null`, `0` and other falsy values included. The
     * action itself goes on.
     */
    signal?: AbortSignal | undefined

    /**
     * The most milliseconds the whole wait may take, after which it rejects with a `FilesError` saying so. Without it,
     * the wait has no deadline: it polls for as long as the migration is `pending` or `processing`, each poll with the
     * ordinary budgets and retries of a request. The action itself goes on either way.
     */
    timeoutMs?: number | undefined

    /** The milliseconds between polls of the File Migration, 1000 by default; more than 0. */
    pollIntervalMs?: number | undefined
  }

  /**
   * What a copy or move helper's raw response has besides its fields: the same wait for the action its `data` reports,
   * as `FileAction.waitForCompletion()`. It is not enumerable, so the response's fields are what they always were.
   */
  interface Waitable {
    waitForCompletion(options?: WaitOptions): Promise<void>
  }
}

export = FileAction
