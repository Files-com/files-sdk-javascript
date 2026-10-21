# FileAction

A File's `copy()`, `move()` or `beginDelete()` resolves with its FileAction as soon as the API accepts the action. They are the File's own methods, made with its client and options. To wait for the action itself, opt in with `waitForCompletion()`:

```
const action = await new File({ path: 'reports/2026' }, { client }).copy({ destination: 'archive/2026' })
await action.waitForCompletion({ timeoutMs: 600000, pollIntervalMs: 5000, signal })
```

The raw response of a copy or move helper, such as `file.copyTo()` or `File.moveToRemoteServer()`, has the same `waitForCompletion()`, without any change to its fields.

* With a valid `file_migration_id`, that File Migration is polled, at once and then every `pollIntervalMs` (1000 by default), while it is `pending` or `processing`, until it is `completed`. Without one, only a `status` of exactly `completed` resolves, at once.
* `failed`, `cancelled`, any other status (the schema's example `complete` included), a missing status and a `file_migration_id` that is not a valid ID reject with a `FilesError` the wait makes itself, as does `timeoutMs` running out. Only these have `fileAction` and, once the wait has taken a poll's answer, `fileMigration`.
* A poll's own failure, an invalid option's `InvalidParameterError` and the `signal`'s reason reject as they came. The signal stops the wait whenever it comes before the wait has taken a poll's answer, even a `completed` one already received.
* There is no deadline unless you give `timeoutMs`. Neither `timeoutMs` nor `signal` cancels the action, which goes on.
* Every poll uses the context of the request that started the action: its site, credential, workspace and headers, whatever the settings have become since.
* Completion confirms the API's action or its File Migration. After a folder on native storage moves, the paths below it can still be updating, with no status to poll: check a particular path before relying on it. An ordinary `delete()` resolves on its 204; use `beginDelete()` to wait for a deletion.
## Example FileAction Object

```
{
  "status": "pending",
  "file_migration_id": 1
}
```

* `status` (string): Status of file operation.
* `file_migration_id` (int64): If status is pending, this is the id of the File Migration to check for status updates.  Delete actions include it whenever the deletion runs as a File Migration, including while it is processing.
