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
