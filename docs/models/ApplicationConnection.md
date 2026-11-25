# ApplicationConnection

## Example ApplicationConnection Object

```
{
  "id": 1,
  "workspace_id": 1,
  "name": "example",
  "application_key": "example",
  "origin": "example",
  "secret_id": 1,
  "authentication": "example",
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

* `id` (int64): Connection ID.
* `workspace_id` (int64): Workspace that owns this connection.
* `name` (string): Connection display name.
* `application_key` (string): Application key from the Automation applications list.
* `origin` (string): HTTPS origin for this connection.
* `secret_id` (int64): ID of the credential in the Secret Store, if the connection uses a credential.
* `authentication` (object): Current credential type and placement, without the secret value.
* `created_at` (date-time): Time the connection was created.
* `updated_at` (date-time): Time the connection was updated.

---

## List Application Connections

```
await ApplicationConnection.list()
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `application_key`.
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id` and `application_key`. Valid field combinations are `[ workspace_id, application_key ]`.
* `filter_prefix` (object): If set, return records where the specified field is prefixed by the supplied value. Valid fields are `application_key`.

---

## Show Application Connection

```
await ApplicationConnection.find(id)
```


### Parameters

* `id` (int64): Required - Application Connection ID.

---

## Create Application Connection

```
await ApplicationConnection.create({
  'name': "example",
  'secret_id': 1,
  'application_key': "example",
  'origin': "example",
  'workspace_id': 1,
})
```


### Parameters

* `name` (string): Required - Connection display name.
* `secret_id` (int64): ID of the credential in the Secret Store, if the connection uses a credential.
* `application_key` (string): Required - Application key from the Automation applications list.
* `origin` (string): Required - HTTPS origin for this connection.
* `workspace_id` (int64): Workspace that owns this connection.

---

## Update Application Connection

```
const application_connection = await ApplicationConnection.find(id)

await application_connection.update({
  'name': "example",
  'secret_id': 1,
})
```

### Parameters

* `id` (int64): Required - Application Connection ID.
* `name` (string): Connection display name.
* `secret_id` (int64): ID of the credential in the Secret Store, if the connection uses a credential.

### Example Response

```json
{
  "id": 1,
  "workspace_id": 1,
  "name": "example",
  "application_key": "example",
  "origin": "example",
  "secret_id": 1,
  "authentication": "example",
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

---

## Delete Application Connection

```
const application_connection = await ApplicationConnection.find(id)

await application_connection.delete()
```

### Parameters

* `id` (int64): Required - Application Connection ID.

