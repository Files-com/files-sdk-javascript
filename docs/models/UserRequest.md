# UserRequest

## Example UserRequest Object

```
{
  "id": 1,
  "name": "John Doe",
  "email": "example",
  "details": "Changed Departments"
}
```

* `id` (int64): ID
* `name` (string): User's full name
* `email` (email): User email address
* `details` (string): Details of the user's request

---

## List User Requests

```
await UserRequest.list({
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show User Request

```
await UserRequest.find(id)
```


### Parameters

* `id` (int64): Required - User Request ID.

---

## Create User Request

```
await UserRequest.create({
  'name': "name",
  'email': "email",
  'details': "details",
})
```


### Parameters

* `name` (string): Required - Name of user requested
* `email` (string): Required - Email of user requested
* `details` (string): Required - Details of the user request

---

## Delete User Request

```
const [user_request] = await UserRequest.list()

await user_request.delete()
```

### Parameters

* `id` (int64): Required - User Request ID.

