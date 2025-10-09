# Partner

## Example Partner Object

```
{
  "allow_bypassing_2fa_policies": true,
  "allow_credential_changes": true,
  "allow_user_creation": true,
  "id": 1,
  "name": "Acme Corp",
  "notes": "This is a note about the partner.",
  "root_folder": "/AcmeCorp"
}
```

* `allow_bypassing_2fa_policies` (boolean): Allow users created under this Partner to bypass Two-Factor Authentication policies.
* `allow_credential_changes` (boolean): Allow Partner Admins to change or reset credentials for users belonging to this Partner.
* `allow_user_creation` (boolean): Allow Partner Admins to create users.
* `id` (int64): The unique ID of the Partner.
* `name` (string): The name of the Partner.
* `notes` (string): Notes about this Partner.
* `root_folder` (string): The root folder path for this Partner.

---

## List Partners

```
await Partner.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`.

---

## Show Partner

```
await Partner.find(id)
```


### Parameters

* `id` (int64): Required - Partner ID.

---

## Create Partner

```
await Partner.create({
  'allow_bypassing_2fa_policies': false,
  'allow_credential_changes': false,
  'allow_user_creation': false,
  'name': "Acme Corp",
  'notes': "This is a note about the partner.",
  'root_folder': "/AcmeCorp",
})
```


### Parameters

* `allow_bypassing_2fa_policies` (boolean): Allow users created under this Partner to bypass Two-Factor Authentication policies.
* `allow_credential_changes` (boolean): Allow Partner Admins to change or reset credentials for users belonging to this Partner.
* `allow_user_creation` (boolean): Allow Partner Admins to create users.
* `name` (string): The name of the Partner.
* `notes` (string): Notes about this Partner.
* `root_folder` (string): The root folder path for this Partner.

---

## Update Partner

```
const partner = await Partner.find(id)

await partner.update({
  'allow_bypassing_2fa_policies': false,
  'allow_credential_changes': false,
  'allow_user_creation': false,
  'name': "Acme Corp",
  'notes': "This is a note about the partner.",
  'root_folder': "/AcmeCorp",
})
```

### Parameters

* `id` (int64): Required - Partner ID.
* `allow_bypassing_2fa_policies` (boolean): Allow users created under this Partner to bypass Two-Factor Authentication policies.
* `allow_credential_changes` (boolean): Allow Partner Admins to change or reset credentials for users belonging to this Partner.
* `allow_user_creation` (boolean): Allow Partner Admins to create users.
* `name` (string): The name of the Partner.
* `notes` (string): Notes about this Partner.
* `root_folder` (string): The root folder path for this Partner.

### Example Response

```json
{
  "allow_bypassing_2fa_policies": true,
  "allow_credential_changes": true,
  "allow_user_creation": true,
  "id": 1,
  "name": "Acme Corp",
  "notes": "This is a note about the partner.",
  "root_folder": "/AcmeCorp"
}
```

---

## Delete Partner

```
const partner = await Partner.find(id)

await partner.delete()
```

### Parameters

* `id` (int64): Required - Partner ID.

