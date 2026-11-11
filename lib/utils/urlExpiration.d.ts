/**
 * Earliest known expiration from Files.com, S3, GCS or Azure URL parameters and an optional API ISO date-time.
 * Returns epoch milliseconds, or null for unknown/malformed expiration information.
 * Does not validate authorization, verify signatures, send requests or renew URLs.
 */
export declare function getUrlExpiration(url: string, expires?: string): number | null

/**
 * Whether the known expiration is at or before Date.now(), using the local clock.
 * False for an unknown expiration does not establish that a URL is valid or never expires.
 */
export declare function isUrlExpired(url: string, expires?: string): boolean

/** The most leading bytes of a response body that isUrlExpiredResponse() examines: 4096. */
export declare const URL_EXPIRED_RESPONSE_BYTES: 4096

/**
 * Whether a failed storage response says its signed URL has expired, even when the URL's own expiration is unknown or
 * still ahead by the local clock. True only for status 400 or 403 whose whole body, of at most
 * URL_EXPIRED_RESPONSE_BYTES bytes (UTF-8 for a string), is a JSON object whose top-level type is
 * download_request_expired or upload_request_expired; or whose first URL_EXPIRED_RESPONSE_BYTES bytes, not starting as
 * JSON, have S3's "Request has expired", the XML Code ExpiredToken (Amazon, Google Cloud Storage) or Azure's "Signature
 * not valid in the specified time frame", in any case. A body that starts as JSON, an object, array or string, is
 * judged only whole, by that type: a marker inside it, or a longer or malformed body, is not expiry. Any other status
 * or body, such as a plain AccessDenied 403 or SignatureDoesNotMatch, is false. Pass a body already read: this neither
 * reads nor keeps a stream, sends requests or renews URLs.
 */
export declare function isUrlExpiredResponse(
  status: number,
  body: string | ArrayBuffer | ArrayBufferView | null | undefined,
): boolean
