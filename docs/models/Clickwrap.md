# Clickwrap

## Example Clickwrap Object

```
{
  "id": 1,
  "name": "Example Site NDA for Files.com Use",
  "body": "[Legal body text]",
  "use_with_users": "example",
  "use_with_bundles": "example",
  "use_with_inboxes": "example"
}
```

* `id` (int64): Clickwrap ID
* `name` (string): Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
* `body` (string): Body text of Clickwrap (supports Markdown formatting).
* `use_with_users` (string): Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.
* `use_with_bundles` (string): Use this Clickwrap for Bundles?
* `use_with_inboxes` (string): Use this Clickwrap for Inboxes?

---

## List Clickwraps

```
await Clickwrap.list({
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show Clickwrap

```
await Clickwrap.find(id)
```


### Parameters

* `id` (int64): Required - Clickwrap ID.

---

## Create Clickwrap

```
await Clickwrap.create({
  'name': "Example Site NDA for Files.com Use",
  'body': "[Legal body text]",
  'use_with_bundles': "example",
  'use_with_inboxes': "example",
  'use_with_users': "example",
})
```


### Parameters

* `name` (string): Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
* `body` (string): Body text of Clickwrap (supports Markdown formatting).
* `use_with_bundles` (string): Use this Clickwrap for Bundles?
* `use_with_inboxes` (string): Use this Clickwrap for Inboxes?
* `use_with_users` (string): Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.

---

## Update Clickwrap

```
const [clickwrap] = await Clickwrap.list()

await clickwrap.update({
  'name': "Example Site NDA for Files.com Use",
  'body': "[Legal body text]",
  'use_with_bundles': "example",
  'use_with_inboxes': "example",
  'use_with_users': "example",
})
```

### Parameters

* `id` (int64): Required - Clickwrap ID.
* `name` (string): Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
* `body` (string): Body text of Clickwrap (supports Markdown formatting).
* `use_with_bundles` (string): Use this Clickwrap for Bundles?
* `use_with_inboxes` (string): Use this Clickwrap for Inboxes?
* `use_with_users` (string): Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.

### Example Response

```json
{
  "id": 1,
  "name": "Example Site NDA for Files.com Use",
  "body": "[Legal body text]",
  "use_with_users": "example",
  "use_with_bundles": "example",
  "use_with_inboxes": "example"
}
```

---

## Delete Clickwrap

```
const [clickwrap] = await Clickwrap.list()

await clickwrap.delete()
```

### Parameters

* `id` (int64): Required - Clickwrap ID.

