# As2Partner

## Example As2Partner Object

```
{
  "id": 1,
  "as2_station_id": 1,
  "name": "AS2 Partner Name",
  "uri": "example",
  "server_certificate": "require_match",
  "http_auth_username": "username",
  "additional_http_headers": {
    "key": "example value"
  },
  "default_mime_type": "application/octet-stream",
  "mdn_validation_level": "none",
  "signature_validation_level": "normal",
  "enable_dedicated_ips": true,
  "hex_public_certificate_serial": "A5:EB:C1:95:DC:D8:2B:E7",
  "public_certificate": "example",
  "public_certificate_md5": "example",
  "public_certificate_subject": "example",
  "public_certificate_issuer": "example",
  "public_certificate_serial": "example",
  "public_certificate_not_before": "example",
  "public_certificate_not_after": "example"
}
```

* `id` (int64): ID of the AS2 Partner.
* `as2_station_id` (int64): ID of the AS2 Station associated with this partner.
* `name` (string): The partner's formal AS2 name.
* `uri` (string): Public URI where we will send the AS2 messages (via HTTP/HTTPS).
* `server_certificate` (string): Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
* `http_auth_username` (string): Username to send to server for HTTP Authentication.
* `additional_http_headers` (object): Additional HTTP Headers for outgoing message sent to this partner.
* `default_mime_type` (string): Default mime type of the file attached to the encrypted message
* `mdn_validation_level` (string): How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
* `signature_validation_level` (string): Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: Automatically set the correct value for this setting based on next message received.
* `enable_dedicated_ips` (boolean): If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
* `hex_public_certificate_serial` (string): Serial of public certificate used for message security in hex format.
* `public_certificate` (string): Public certificate used for message security.
* `public_certificate_md5` (string): MD5 hash of public certificate used for message security.
* `public_certificate_subject` (string): Subject of public certificate used for message security.
* `public_certificate_issuer` (string): Issuer of public certificate used for message security.
* `public_certificate_serial` (string): Serial of public certificate used for message security.
* `public_certificate_not_before` (string): Not before value of public certificate used for message security.
* `public_certificate_not_after` (string): Not after value of public certificate used for message security.
* `http_auth_password` (string): Password to send to server for HTTP Authentication.

---

## List AS2 Partners

```
await As2Partner.list
```


### Parameters

* `cursor` (string): Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
* `per_page` (int64): Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).

---

## Show AS2 Partner

```
await As2Partner.find(id)
```


### Parameters

* `id` (int64): Required - As2 Partner ID.

---

## Create AS2 Partner

```
await As2Partner.create({
  'enable_dedicated_ips': true,
  'http_auth_username': "username",
  'mdn_validation_level': "none",
  'signature_validation_level': "normal",
  'server_certificate': "require_match",
  'default_mime_type': "application/octet-stream",
  'additional_http_headers': {"key":"example value"},
  'as2_station_id': 1,
  'name': "AS2 Partner Name",
  'uri': "example",
  'public_certificate': "public_certificate",
})
```


### Parameters

* `enable_dedicated_ips` (boolean): If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
* `http_auth_username` (string): Username to send to server for HTTP Authentication.
* `http_auth_password` (string): Password to send to server for HTTP Authentication.
* `mdn_validation_level` (string): How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
* `signature_validation_level` (string): Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: Automatically set the correct value for this setting based on next message received.
* `server_certificate` (string): Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
* `default_mime_type` (string): Default mime type of the file attached to the encrypted message
* `additional_http_headers` (object): Additional HTTP Headers for outgoing message sent to this partner.
* `as2_station_id` (int64): Required - ID of the AS2 Station associated with this partner.
* `name` (string): Required - The partner's formal AS2 name.
* `uri` (string): Required - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
* `public_certificate` (string): Required - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.

---

## Update AS2 Partner

```
const as2_partner = await As2Partner.find(id)

await as2_partner.update({
  'enable_dedicated_ips': true,
  'http_auth_username': "username",
  'mdn_validation_level': "none",
  'signature_validation_level': "normal",
  'server_certificate': "require_match",
  'default_mime_type': "application/octet-stream",
  'additional_http_headers': {"key":"example value"},
  'name': "AS2 Partner Name",
  'uri': "example",
  'public_certificate': "example",
})
```

### Parameters

* `id` (int64): Required - As2 Partner ID.
* `enable_dedicated_ips` (boolean): If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
* `http_auth_username` (string): Username to send to server for HTTP Authentication.
* `http_auth_password` (string): Password to send to server for HTTP Authentication.
* `mdn_validation_level` (string): How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
* `signature_validation_level` (string): Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: Automatically set the correct value for this setting based on next message received.
* `server_certificate` (string): Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
* `default_mime_type` (string): Default mime type of the file attached to the encrypted message
* `additional_http_headers` (object): Additional HTTP Headers for outgoing message sent to this partner.
* `name` (string): The partner's formal AS2 name.
* `uri` (string): Public URI where we will send the AS2 messages (via HTTP/HTTPS).
* `public_certificate` (string): Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.

### Example Response

```json
{
  "id": 1,
  "as2_station_id": 1,
  "name": "AS2 Partner Name",
  "uri": "example",
  "server_certificate": "require_match",
  "http_auth_username": "username",
  "additional_http_headers": {
    "key": "example value"
  },
  "default_mime_type": "application/octet-stream",
  "mdn_validation_level": "none",
  "signature_validation_level": "normal",
  "enable_dedicated_ips": true,
  "hex_public_certificate_serial": "A5:EB:C1:95:DC:D8:2B:E7",
  "public_certificate": "example",
  "public_certificate_md5": "example",
  "public_certificate_subject": "example",
  "public_certificate_issuer": "example",
  "public_certificate_serial": "example",
  "public_certificate_not_before": "example",
  "public_certificate_not_after": "example"
}
```

---

## Delete AS2 Partner

```
const as2_partner = await As2Partner.find(id)

await as2_partner.delete()
```

### Parameters

* `id` (int64): Required - As2 Partner ID.

