# UserLifecycleRule

## Example UserLifecycleRule Object

```
{
  "id": 1,
  "authentication_method": "password",
  "inactivity_days": 12,
  "include_folder_admins": true,
  "include_site_admins": true,
  "action": "disable",
  "user_state": "inactive",
  "name": "password specific rules",
  "site_id": 1
}
```

* `id` (int64): User Lifecycle Rule ID
* `authentication_method` (string): User authentication method for the rule
* `inactivity_days` (int64): Number of days of inactivity before the rule applies
* `include_folder_admins` (boolean): Include folder admins in the rule
* `include_site_admins` (boolean): Include site admins in the rule
* `action` (string): Action to take on inactive users (disable or delete)
* `user_state` (string): State of the users to apply the rule to (inactive or disabled)
* `name` (string): User Lifecycle Rule name
* `site_id` (int64): Site ID

---

## List User Lifecycle Rules

```
await UserLifecycleRule.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show User Lifecycle Rule

```
await UserLifecycleRule.find(id)
```


### Parameters

* `id` (int64): Required - User Lifecycle Rule ID.

---

## Create User Lifecycle Rule

```
await UserLifecycleRule.create({
  'authentication_method': "password",
  'inactivity_days': 12,
  'include_site_admins': true,
  'include_folder_admins': true,
  'user_state': "inactive",
  'name': "password specific rules",
})
```


### Parameters

* `action` (string): Action to take on inactive users (disable or delete)
* `authentication_method` (string): User authentication method for the rule
* `inactivity_days` (int64): Number of days of inactivity before the rule applies
* `include_site_admins` (boolean): Include site admins in the rule
* `include_folder_admins` (boolean): Include folder admins in the rule
* `user_state` (string): State of the users to apply the rule to (inactive or disabled)
* `name` (string): User Lifecycle Rule name

---

## Update User Lifecycle Rule

```
const user_lifecycle_rule = await UserLifecycleRule.find(id)

await user_lifecycle_rule.update({
  'authentication_method': "password",
  'inactivity_days': 12,
  'include_site_admins': true,
  'include_folder_admins': true,
  'user_state': "inactive",
  'name': "password specific rules",
})
```

### Parameters

* `id` (int64): Required - User Lifecycle Rule ID.
* `action` (string): Action to take on inactive users (disable or delete)
* `authentication_method` (string): User authentication method for the rule
* `inactivity_days` (int64): Number of days of inactivity before the rule applies
* `include_site_admins` (boolean): Include site admins in the rule
* `include_folder_admins` (boolean): Include folder admins in the rule
* `user_state` (string): State of the users to apply the rule to (inactive or disabled)
* `name` (string): User Lifecycle Rule name

### Example Response

```json
{
  "id": 1,
  "authentication_method": "password",
  "inactivity_days": 12,
  "include_folder_admins": true,
  "include_site_admins": true,
  "action": "disable",
  "user_state": "inactive",
  "name": "password specific rules",
  "site_id": 1
}
```

---

## Delete User Lifecycle Rule

```
const user_lifecycle_rule = await UserLifecycleRule.find(id)

await user_lifecycle_rule.delete()
```

### Parameters

* `id` (int64): Required - User Lifecycle Rule ID.

