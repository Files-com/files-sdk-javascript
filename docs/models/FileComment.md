# FileComment

## Example FileComment Object

```
{
  "id": 1,
  "body": "What a great file!",
  "reactions": [
    null
  ]
}
```

* `id` (int64): File Comment ID
* `body` (string): Comment body.
* `reactions` (array): Reactions to this comment.
* `path` (string): File path.

---

## List File Comments by path

```
await FileComment.listFor(path, {
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `path` (string): Required - Path to operate on.

---

## Create File Comment

```
await FileComment.create({
  'body': "body",
  'path': "path",
})
```


### Parameters

* `body` (string): Required - Comment body.
* `path` (string): Required - File path.

---

## Update File Comment

```
const [file_comment] = await FileComment.list()

await file_comment.update({
  'body': "body",
})
```

### Parameters

* `id` (int64): Required - File Comment ID.
* `body` (string): Required - Comment body.

### Example Response

```json
{
  "id": 1,
  "body": "What a great file!",
  "reactions": [
    null
  ]
}
```

---

## Delete File Comment

```
const [file_comment] = await FileComment.list()

await file_comment.delete()
```

### Parameters

* `id` (int64): Required - File Comment ID.

