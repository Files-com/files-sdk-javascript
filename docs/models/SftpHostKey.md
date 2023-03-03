# SftpHostKey

## Example SftpHostKey Object

```
{
  "id": 1,
  "name": "example",
  "fingerprint_md5": "example",
  "fingerprint_sha256": "example"
}
```

* `id` (int64): Sftp Host Key ID
* `name` (string): The friendly name of this SFTP Host Key.
* `fingerprint_md5` (string): MD5 Fingerpint of the public key
* `fingerprint_sha256` (string): SHA256 Fingerpint of the public key
* `private_key` (string): The private key data.

---

## List Sftp Host Keys

```
await SftpHostKey.list({
  'per_page': 1,
})
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show Sftp Host Key

```
await SftpHostKey.find(id)
```


### Parameters

* `id` (int64): Required - Sftp Host Key ID.

---

## Create Sftp Host Key

```
await SftpHostKey.create({
  'name': "example",
})
```


### Parameters

* `name` (string): The friendly name of this SFTP Host Key.
* `private_key` (string): The private key data.

---

## Update Sftp Host Key

```
const [sftp_host_key] = await SftpHostKey.list()

await sftp_host_key.update({
  'name': "example",
})
```

### Parameters

* `id` (int64): Required - Sftp Host Key ID.
* `name` (string): The friendly name of this SFTP Host Key.
* `private_key` (string): The private key data.

### Example Response

```json
{
  "id": 1,
  "name": "example",
  "fingerprint_md5": "example",
  "fingerprint_sha256": "example"
}
```

---

## Delete Sftp Host Key

```
const [sftp_host_key] = await SftpHostKey.list()

await sftp_host_key.delete()
```

### Parameters

* `id` (int64): Required - Sftp Host Key ID.

