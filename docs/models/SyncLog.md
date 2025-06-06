# SyncLog

## Example SyncLog Object

```
{
  "timestamp": "2000-01-01T01:00:00Z",
  "sync_id": 1,
  "external_event_id": 1,
  "error_type": "example",
  "message": "example",
  "operation": "example",
  "path": "example",
  "size": 1,
  "file_type": "example",
  "status": "example"
}
```

* `timestamp` (date-time): Start Time of Action
* `sync_id` (int64): Sync ID
* `external_event_id` (int64): External Event ID
* `error_type` (string): Error type, if applicable
* `message` (string): Message
* `operation` (string): Operation type
* `path` (string): File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
* `size` (int64): File size
* `file_type` (string): File type
* `status` (string): Status

---

## List Sync Logs

```
await SyncLog.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date`, `external_event_id`, `operation`, `status` or `sync_id`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ start_date, end_date ]`, `[ start_date, external_event_id ]`, `[ start_date, operation ]`, `[ start_date, status ]`, `[ start_date, sync_id ]`, `[ end_date, external_event_id ]`, `[ end_date, operation ]`, `[ end_date, status ]`, `[ end_date, sync_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ status, sync_id ]`, `[ start_date, end_date, external_event_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, status ]`, `[ start_date, end_date, sync_id ]`, `[ start_date, external_event_id, operation ]`, `[ start_date, external_event_id, status ]`, `[ start_date, external_event_id, sync_id ]`, `[ start_date, operation, status ]`, `[ start_date, operation, sync_id ]`, `[ start_date, status, sync_id ]`, `[ end_date, external_event_id, operation ]`, `[ end_date, external_event_id, status ]`, `[ end_date, external_event_id, sync_id ]`, `[ end_date, operation, status ]`, `[ end_date, operation, sync_id ]`, `[ end_date, status, sync_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, status, sync_id ]`, `[ operation, status, sync_id ]`, `[ start_date, end_date, external_event_id, operation ]`, `[ start_date, end_date, external_event_id, status ]`, `[ start_date, end_date, external_event_id, sync_id ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, operation, sync_id ]`, `[ start_date, end_date, status, sync_id ]`, `[ start_date, external_event_id, operation, status ]`, `[ start_date, external_event_id, operation, sync_id ]`, `[ start_date, external_event_id, status, sync_id ]`, `[ start_date, operation, status, sync_id ]`, `[ end_date, external_event_id, operation, status ]`, `[ end_date, external_event_id, operation, sync_id ]`, `[ end_date, external_event_id, status, sync_id ]`, `[ end_date, operation, status, sync_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ start_date, end_date, external_event_id, operation, status ]`, `[ start_date, end_date, external_event_id, operation, sync_id ]`, `[ start_date, end_date, external_event_id, status, sync_id ]`, `[ start_date, end_date, operation, status, sync_id ]`, `[ start_date, external_event_id, operation, status, sync_id ]` or `[ end_date, external_event_id, operation, status, sync_id ]`.
* `filter_prefix` (object): If set, return records where the specified field is prefixed by the supplied value. Valid fields are `operation` and `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ start_date, end_date ]`, `[ start_date, external_event_id ]`, `[ start_date, operation ]`, `[ start_date, status ]`, `[ start_date, sync_id ]`, `[ end_date, external_event_id ]`, `[ end_date, operation ]`, `[ end_date, status ]`, `[ end_date, sync_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ status, sync_id ]`, `[ start_date, end_date, external_event_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, status ]`, `[ start_date, end_date, sync_id ]`, `[ start_date, external_event_id, operation ]`, `[ start_date, external_event_id, status ]`, `[ start_date, external_event_id, sync_id ]`, `[ start_date, operation, status ]`, `[ start_date, operation, sync_id ]`, `[ start_date, status, sync_id ]`, `[ end_date, external_event_id, operation ]`, `[ end_date, external_event_id, status ]`, `[ end_date, external_event_id, sync_id ]`, `[ end_date, operation, status ]`, `[ end_date, operation, sync_id ]`, `[ end_date, status, sync_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, status, sync_id ]`, `[ operation, status, sync_id ]`, `[ start_date, end_date, external_event_id, operation ]`, `[ start_date, end_date, external_event_id, status ]`, `[ start_date, end_date, external_event_id, sync_id ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, operation, sync_id ]`, `[ start_date, end_date, status, sync_id ]`, `[ start_date, external_event_id, operation, status ]`, `[ start_date, external_event_id, operation, sync_id ]`, `[ start_date, external_event_id, status, sync_id ]`, `[ start_date, operation, status, sync_id ]`, `[ end_date, external_event_id, operation, status ]`, `[ end_date, external_event_id, operation, sync_id ]`, `[ end_date, external_event_id, status, sync_id ]`, `[ end_date, operation, status, sync_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ start_date, end_date, external_event_id, operation, status ]`, `[ start_date, end_date, external_event_id, operation, sync_id ]`, `[ start_date, end_date, external_event_id, status, sync_id ]`, `[ start_date, end_date, operation, status, sync_id ]`, `[ start_date, external_event_id, operation, status, sync_id ]` or `[ end_date, external_event_id, operation, status, sync_id ]`.
