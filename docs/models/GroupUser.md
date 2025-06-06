# GroupUser

## Example GroupUser Object

```
{
  "group_name": "My Group",
  "group_id": 1,
  "user_id": 1,
  "admin": true,
  "usernames": "user"
}
```

* `group_name` (string): Group name
* `group_id` (int64): Group ID
* `user_id` (int64): User ID
* `admin` (boolean): Is this user an administrator of this group?
* `usernames` (string): Comma-delimited list of usernames who belong to this group (separated by commas).
* `id` (int64): Group User ID.

---

## List Group Users

```
await GroupUser.list({
  'user_id': 1,
  'group_id': 1,
})
```


### Parameters

* `user_id` (int64): User ID.  If provided, will return group_users of this user.
* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `group_id` (int64): Group ID.  If provided, will return group_users of this group.

---

## Create Group User

```
await GroupUser.create({
  'group_id': 1,
  'user_id': 1,
  'admin': false,
})
```


### Parameters

* `group_id` (int64): Required - Group ID to add user to.
* `user_id` (int64): Required - User ID to add to group.
* `admin` (boolean): Is the user a group administrator?

---

## Update Group User

```
const [group_user] = await GroupUser.list()

await group_user.update({
  'group_id': 1,
  'user_id': 1,
  'admin': false,
})
```

### Parameters

* `id` (int64): Required - Group User ID.
* `group_id` (int64): Required - Group ID to add user to.
* `user_id` (int64): Required - User ID to add to group.
* `admin` (boolean): Is the user a group administrator?

### Example Response

```json
{
  "group_name": "My Group",
  "group_id": 1,
  "user_id": 1,
  "admin": true,
  "usernames": "user"
}
```

---

## Delete Group User

```
const [group_user] = await GroupUser.list()

await group_user.delete({
  'group_id': 1,
  'user_id': 1,
})
```

### Parameters

* `id` (int64): Required - Group User ID.
* `group_id` (int64): Required - Group ID from which to remove user.
* `user_id` (int64): Required - User ID to remove from group.

