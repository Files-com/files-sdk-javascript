# SettingsChange

## Example SettingsChange Object

```
{
  "api_key_id": 1,
  "changes": [
    "example"
  ],
  "created_at": "2000-01-01T01:00:00Z",
  "user_id": 1,
  "user_is_files_support": true,
  "user_is_from_parent_site": true,
  "username": "some_user"
}
```

* `api_key_id` (int64): The API key id responsible for this change.
* `changes` (array(string)): Markdown-formatted change messages.
* `created_at` (date-time): The time this change was made.
* `user_id` (int64): The user id responsible for this change.
* `user_is_files_support` (boolean): true if this change was performed by Files.com support.
* `user_is_from_parent_site` (boolean): true if this change was performed by a user on a parent site.
* `username` (string): The username of the user responsible for this change.

---

## List Settings Changes

```
await SettingsChange.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`, `api_key_id` or `user_id`.
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
