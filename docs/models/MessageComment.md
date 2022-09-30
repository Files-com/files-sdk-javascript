# MessageComment

## Example MessageComment Object

```
{
  "id": 1,
  "body": "What a great idea, thank you!",
  "reactions": [
    null
  ]
}
```

* `id` (int64): Message Comment ID
* `body` (string): Comment body.
* `reactions` (array): Reactions to this comment.
* `user_id` (int64): User ID.  Provide a value of `0` to operate the current session's user.

---

## List Message Comments

```
await MessageComment.list({
  'user_id': 1,
  'per_page': 1,
  'message_id': 1,
})
```


### Parameters

* `user_id` (int64): User ID.  Provide a value of `0` to operate the current session's user.
* `cursor` (string): Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via either the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `message_id` (int64): Required - Message comment to return comments for.

---

## Show Message Comment

```
await MessageComment.find(id)
```


### Parameters

* `id` (int64): Required - Message Comment ID.

---

## Create Message Comment

```
await MessageComment.create({
  'user_id': 1,
  'body': "body",
})
```


### Parameters

* `user_id` (int64): User ID.  Provide a value of `0` to operate the current session's user.
* `body` (string): Required - Comment body.

---

## Update Message Comment

```
const [message_comment] = await MessageComment.list()

await message_comment.update({
  'body': "body",
})
```

### Parameters

* `id` (int64): Required - Message Comment ID.
* `body` (string): Required - Comment body.

### Example Response

```json
{
  "id": 1,
  "body": "What a great idea, thank you!",
  "reactions": [
    null
  ]
}
```

---

## Delete Message Comment

```
const [message_comment] = await MessageComment.list()

await message_comment.delete()
```

### Parameters

* `id` (int64): Required - Message Comment ID.

