# Lock

## Example Lock Object

```
{
  "path": "locked_file",
  "timeout": 1,
  "depth": "infinity",
  "recursive": true,
  "owner": "user",
  "scope": "shared",
  "exclusive": false,
  "token": "17c54824e9931a4688ca032d03f6663c",
  "type": "write",
  "allow_access_by_any_user": false,
  "user_id": 1,
  "username": ""
}
```

* `path` (string): Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
* `timeout` (int64): Lock timeout in seconds
* `depth` (string): 
* `recursive` (boolean): Does lock apply to subfolders?
* `owner` (string): Arbitrary descriptive label for the lock. Does not change the lock creator or permissions.
* `scope` (string): 
* `exclusive` (boolean): Is lock exclusive?
* `token` (string): Lock token.  Use to release lock.
* `type` (string): 
* `allow_access_by_any_user` (boolean): Can lock be modified by users other than its creator?
* `user_id` (int64): Lock creator user ID
* `username` (string): Lock creator username
* `expected_token` (string): Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to refresh, or a different value to replace.

---

## List Locks by Path

```
await Lock.listFor(path, {
  'include_children': false,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `path` (string): Required - Path to operate on.
* `include_children` (boolean): Include locks from children objects?

---

## Create Lock

```
await Lock.create(path, {
  'token': "17c54824e9931a4688ca032d03f6663c",
  'allow_access_by_any_user': false,
  'exclusive': false,
  'recursive': true,
  'owner': "user",
  'timeout': 1,
})
```


### Parameters

* `path` (string): Required - Path
* `token` (string): Lock token. With expected_token, use the same value to refresh or a different value to replace the existing token.
* `expected_token` (string): Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to refresh, or a different value to replace.
* `allow_access_by_any_user` (boolean): Can lock be modified by users other than its creator?
* `exclusive` (boolean): Is lock exclusive?
* `recursive` (boolean): Does lock apply to subfolders?
* `owner` (string): Arbitrary descriptive label for the lock. Does not change the lock creator or permissions.
* `timeout` (int64): Lock timeout in seconds

---

## Delete Lock

```
const [lock] = await Lock.list()

await lock.delete({
  'token': "token",
})
```

### Parameters

* `path` (string): Required - Path
* `token` (string): Required - Lock token

