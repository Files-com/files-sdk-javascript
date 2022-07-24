# Clickwrap

## Example Clickwrap Object

```
{
  "id": 1,
  "name": "Example Site NDA for Files.com Use",
  "body": "[Legal body text]",
  "use_with_users": "",
  "use_with_bundles": "",
  "use_with_inboxes": ""
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

* `cursor` (string): Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via either the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
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
  "use_with_users": "",
  "use_with_bundles": "",
  "use_with_inboxes": ""
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

