/// <reference types="node" />
import Files = require('./Files')

/**
 * Requests to the Files.com API, for an operation the models do not provide. Authentication, workspace, retries,
 * timeouts and lockout region mismatches (see `Files.NetworkOptions.followRegionMismatch`) work as for the models'
 * methods.
 */
declare class Api {
  private constructor()

  /**
   * Sends a request to the API, or to another site when `path` is a URL. Parameters are sent as a query string for
   * GET and as a JSON body otherwise, with each `Attachment` in them as a file object. With `autoPaginate`, a list's
   * following pages are requested too, with its first request's headers and credential, at its site or the host a
   * lockout region mismatch named, whatever the settings become, and their data joined. The response data is whatever
   * the API returned: check it before use.
   */
  static sendRequest(path: string, verb: string, params?: object | null, options?: Files.RequestOptions): Promise<Files.ApiResponse>

  /**
   * Sends one part of an upload to the URL its negotiation returned, as a request to storage: with only the headers
   * given, never the site's authentication or workspace, and never elsewhere for a lockout region mismatch. It is
   * retried as storage's requests are (see `Files.NetworkOptions.maxNetworkRetries`), with the same body, unless that
   * is a stream, which is sent only once. A URL known, by this machine's clock, to have expired by its own signature,
   * such as S3's `X-Amz-Date` and `X-Amz-Expires`, is never sent, at first or once a retry's wait is over: the call
   * fails instead. With a `client`, its
   * retry, timeout, log and `fetch` settings apply, but none of its credentials or headers; without one, the global
   * settings'.
   */
  static sendFilePart(externalUrl: string, verb: string, data: Api.FilePartData, options?: Api.FilePartOptions): Promise<Files.ApiResponse>

  static default: typeof Api
}

declare namespace Api {
  /** The body of an upload part. */
  type FilePartData = string | Uint8Array | ArrayBuffer | NodeJS.ReadableStream

  /** The options that apply to a request outside the site. */
  type FilePartOptions = Pick<Files.RequestOptions, 'agent' | 'client' | 'fetch' | 'follow' | 'getAgentForUrl' | 'headers' | 'httpAgent' | 'httpsAgent' | 'redirect' | 'signal' | 'timeoutSecs'>
}

export = Api
