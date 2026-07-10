# IntegrationCentricProfile

## Example IntegrationCentricProfile Object

```
{
  "id": 1,
  "name": "Business Systems Onboarding",
  "workspace_id": 1,
  "use_for_all_users": true,
  "expected_remote_servers": [
    "example"
  ]
}
```

* `id` (int64): Integration Centric Profile ID
* `name` (string): Profile name
* `workspace_id` (int64): Workspace ID
* `use_for_all_users` (boolean): Whether this profile applies to all users in the Workspace by default
* `expected_remote_servers` (array(object)): Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.

---

## List Integration Centric Profiles

```
await IntegrationCentricProfile.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `name`.
* `filter` (object): If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.

---

## Show Integration Centric Profile

```
await IntegrationCentricProfile.find(id)
```


### Parameters

* `id` (int64): Required - Integration Centric Profile ID.

---

## Create Integration Centric Profile

```
await IntegrationCentricProfile.create({
  'name': "Business Systems Onboarding",
  'expected_remote_servers': ["example"],
  'workspace_id': 1,
  'use_for_all_users': false,
})
```


### Parameters

* `name` (string): Required - Profile name
* `expected_remote_servers` (array(object)): Required - Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.
* `workspace_id` (int64): Workspace ID
* `use_for_all_users` (boolean): Whether this profile applies to all users in the Workspace by default

---

## Update Integration Centric Profile

```
const integration_centric_profile = await IntegrationCentricProfile.find(id)

await integration_centric_profile.update({
  'name': "Business Systems Onboarding",
  'workspace_id': 1,
  'expected_remote_servers': ["example"],
  'use_for_all_users': false,
})
```

### Parameters

* `id` (int64): Required - Integration Centric Profile ID.
* `name` (string): Profile name
* `workspace_id` (int64): Workspace ID
* `expected_remote_servers` (array(object)): Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.
* `use_for_all_users` (boolean): Whether this profile applies to all users in the Workspace by default

### Example Response

```json
{
  "id": 1,
  "name": "Business Systems Onboarding",
  "workspace_id": 1,
  "use_for_all_users": true,
  "expected_remote_servers": [
    "example"
  ]
}
```

---

## Delete Integration Centric Profile

```
const integration_centric_profile = await IntegrationCentricProfile.find(id)

await integration_centric_profile.delete()
```

### Parameters

* `id` (int64): Required - Integration Centric Profile ID.

