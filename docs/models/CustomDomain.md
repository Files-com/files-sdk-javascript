# CustomDomain

## Example CustomDomain Object

```
{
  "id": 1,
  "domain": "files.example.com",
  "destination": "site_alias",
  "dns_status": "correct",
  "ssl_certificate_id": 1,
  "brick_managed": true,
  "folder_behavior_id": 1,
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

* `id` (int64): Custom Domain ID.
* `domain` (string): Customer-owned domain name.
* `destination` (string): Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
* `dns_status` (string): Current DNS verification status.
* `ssl_certificate_id` (int64): Current SSL certificate ID.
* `brick_managed` (boolean): Is this domain's SSL certificate automatically managed and renewed by Files.com?
* `folder_behavior_id` (int64): Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
* `created_at` (date-time): When this Custom Domain was created.
* `updated_at` (date-time): When this Custom Domain was last updated.

---

## List Custom Domains

```
await CustomDomain.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
* `sort_by` (object): If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `id`.

---

## Show Custom Domain

```
await CustomDomain.find(id)
```


### Parameters

* `id` (int64): Required - Custom Domain ID.

---

## Create Custom Domain

```
await CustomDomain.create({
  'destination': "site_alias",
  'folder_behavior_id': 1,
  'ssl_certificate_id': 1,
  'domain': "files.example.com",
})
```


### Parameters

* `destination` (string): Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
* `folder_behavior_id` (int64): Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
* `ssl_certificate_id` (int64): Current SSL certificate ID.
* `domain` (string): Required - Customer-owned domain name.

---

## Update Custom Domain

```
const custom_domain = await CustomDomain.find(id)

await custom_domain.update({
  'destination': "site_alias",
  'folder_behavior_id': 1,
  'ssl_certificate_id': 1,
  'domain': "files.example.com",
})
```

### Parameters

* `id` (int64): Required - Custom Domain ID.
* `destination` (string): Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
* `folder_behavior_id` (int64): Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
* `ssl_certificate_id` (int64): Current SSL certificate ID.
* `domain` (string): Customer-owned domain name.

### Example Response

```json
{
  "id": 1,
  "domain": "files.example.com",
  "destination": "site_alias",
  "dns_status": "correct",
  "ssl_certificate_id": 1,
  "brick_managed": true,
  "folder_behavior_id": 1,
  "created_at": "2000-01-01T01:00:00Z",
  "updated_at": "2000-01-01T01:00:00Z"
}
```

---

## Delete Custom Domain

```
const custom_domain = await CustomDomain.find(id)

await custom_domain.delete()
```

### Parameters

* `id` (int64): Required - Custom Domain ID.

