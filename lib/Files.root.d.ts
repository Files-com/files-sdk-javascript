// The types of the package itself, `files.com` (package.json's `types`): the Files class, which require('files.com'),
// Node.js's `import Files from 'files.com'` and a bundle's ES module (src/Files.js, through `module`) all provide. The
// CommonJS module is also its own `default`, which only files.com/lib/Files declares.
/// <reference types="node" />
import FilesClient = require('./FilesClient')
import Logger = require('./Logger')

/**
 * The Files.com settings every call uses: authentication, site, workspace, logging and network settings. A call's
 * options can override some of them for that call.
 *
 * The package's types are in this class's namespace, such as `Files.RequestOptions`.
 */
declare class Files {
  private constructor()

  /**
   * Creates a client with Files.com settings of its own, logging included: the SDK's defaults, with those of `config`
   * over them. Its settings and headers are copied, so later changes to `config`, or to the global settings, do not
   * change it, and it never uses the global API key, session, workspace or log settings. Its application logger is used,
   * not copied. Throws a `ConfigurationError` for a setting it does not know, or a logger without the four methods.
   */
  static createClient(config?: Files.ClientConfig): FilesClient

  /**
   * Sets the `User-Agent` of the requests made without a client, sent exactly as given. Its default is the SDK's
   * identity, such as `Files.com JavaScript SDK v1.2.3`, which in Node.js one comment of advisory metadata of the
   * platform follows: `Files.com JavaScript SDK v1.2.3 (files-sdk-meta/1; os=windows; runtime=node/22.11.0)`.
   */
  static setUserAgent(value: string): void

  /** The `User-Agent` of the requests made without a client: the one set, or else the default (see `setUserAgent`). */
  static getUserAgent(): string

  /** Sets the API key. `null` removes it. */
  static setApiKey(value: string | null): void

  /** The API key, or undefined (or null) when none is set. */
  static getApiKey(): string | null | undefined

  /**
   * Sets the site's URL, such as `https://MY-SUBDOMAIN.files.com`. By default, `https://app.files.com`. A lockout region
   * mismatch that a request sent to this site with the global API key or session, in the global workspace, follows sets
   * it to the host the API named, as long as the site, that credential and that workspace are still the global ones
   * when the mismatch arrives.
   */
  static setBaseUrl(value: string): void

  static getBaseUrl(): string

  /** Sets the session ID, which is used instead of the API key. `null` removes it. */
  static setSessionId(value: string | null): void

  static getSessionId(): string | null

  /** Sets the workspace that requests act in. `null`, the default, sends no workspace. */
  static setWorkspaceId(value: Files.WorkspaceId | null): void

  static getWorkspaceId(): Files.WorkspaceId | null

  static getLanguage(): string | null

  /** Sets the language, sent as `Accept-Language`, of the API's messages. `null`, the default, sends none. */
  static setLanguage(value: string | null): void

  /** The path of the API on the site, `/api/rest/v1`. */
  static getEndpointPrefix(): string

  /** Sets the most detailed level of messages logged, `Logger.LogLevel.INFO` by default. */
  static setLogLevel(value: Logger.LogLevel): void

  static getLogLevel(): Logger.LogLevel

  /**
   * Sends the SDK's log messages to an application logger instead of the console: each message goes, unchanged, to
   * the method for its level. The log level still decides which messages are sent. `null` (or undefined) sends them to
   * the console again. Throws a `ConfigurationError` if the logger is missing any of the methods.
   */
  static setLogger(value: Files.ApplicationLogger | null | undefined): void

  /** The application logger, or null when messages go to the console. */
  static getLogger(): Files.ApplicationLogger | null

  /** Changes the debugging settings given; the others keep their values. */
  static configureDebugging(options: Files.DebuggingOptions): void

  static shouldDebugRequest(): boolean

  static shouldDebugResponseHeaders(): boolean

  /** Changes the network settings given; the others keep their values. */
  static configureNetwork(options: Files.NetworkOptions): void

  static getMaxNetworkRetries(): number

  static getMinNetworkRetryDelay(): number

  static getMaxNetworkRetryDelay(): number

  static getNetworkTimeout(): number

  static getAutoPaginate(): boolean

  static getFollowRegionMismatch(): boolean

  static getTrustRegionHost(): Files.TrustRegionHost | null | undefined

  /** The HTTP client calls made without a client send their requests with, or undefined (or null) for the SDK's own. */
  static getFetch(): Files.Fetch | null | undefined
}

declare namespace Files {
  /**
   * The options of one call, given as its last argument: `User.list({}, { workspaceId: 0 })`. A model the call returns
   * keeps a copy of them, which its own methods use. Through a client, the copy is taken when the call begins, headers
   * included, and leaves out `signal`; the options never change the client or its other calls.
   */
  interface RequestOptions {
    /** An API key for this call, instead of the configured API key or session. */
    apiKey?: string | null | undefined

    /** A session ID for this call, instead of the configured one. Ignored when `apiKey` is given. */
    sessionId?: string | null | undefined

    /** The same as `sessionId`. */
    session_id?: string | null | undefined

    /**
     * The workspace this call acts in, instead of the configured one. `null` or `undefined` sends no workspace: leave
     * the option out to keep the configured workspace.
     */
    workspaceId?: WorkspaceId | null | undefined

    /** Whether a list method requests every page and returns all of their items, instead of the configured setting. */
    autoPaginate?: boolean | undefined

    /**
     * The client whose settings the call uses instead of the global ones: a client's resources set it, and an item
     * iterator made without one, such as `User.listIterator()`, uses a copy of the global settings taken when it is
     * made. A model the call returns keeps the client, with the call's other options as they were when it began, except
     * `signal`.
     */
    client?: FilesClient | undefined

    /** Headers to send. The SDK's own `User-Agent` and authentication headers take precedence. */
    headers?: HttpHeaders | undefined

    /** The Node.js agent that makes the requests, such as one for a proxy. */
    agent?: Agent | undefined

    /** The same as `agent`. */
    httpAgent?: Agent | undefined

    /** The same as `agent`. */
    httpsAgent?: Agent | undefined

    /**
     * Chooses the agent for each request of the call, redirects included, from its URL; returning nothing uses `agent`.
     * It must return the agent right away, not a Promise. When none of the call's agent options chooses an agent, the
     * client's `getAgentForUrl` and then its `agent` do.
     */
    getAgentForUrl?: AgentForUrl | undefined

    /**
     * The HTTP client that sends the call's requests, redirects and retries included, instead of its client's `fetch`,
     * or, for a call made without a client, the global one (see `NetworkOptions.fetch`). A client never uses the global
     * `fetch`: without one of its own, its calls use the SDK's own HTTP client.
     */
    fetch?: Fetch | undefined

    /**
     * Seconds each attempt of a request may take, instead of the configured `networkTimeout`: one budget, from sending
     * the request, through its redirects, until its response body has been read to its end, whatever its type, a body
     * returned unread as a stream included. An attempt that runs out before its response arrives is retried as a
     * network failure is; one that runs out while its body is read fails with a "Request timed out" `FilesError`. One
     * that runs out before a body returned unread has been read to its end, or cancelled or destroyed by its reader,
     * stops that stream, which fails with that `FilesError`, as the call has already resolved. The empty body of a
     * response without content, a 204, a 205 or one with `Content-Length: 0`, is complete as it arrives: the budget ends
     * with the call. Each retry has a budget of its own, waiting between attempts counts toward none, and nothing limits
     * the call as a whole, which can make several attempts and request several pages. 0 or less waits without a limit.
     */
    timeoutSecs?: number

    /**
     * A signal for the call's requests. Aborting it stops the attempt under way, whether it is waiting for a response
     * or reading one, ends a wait before a retry at once, and starts no further attempt. The call then rejects with the
     * signal's reason, unchanged, or, when the runtime gives the signal none, an `Error` named `AbortError`: not a
     * `FilesError`, so check `signal.aborted`. A failure that ends the call before the signal aborts keeps its own
     * error. Once the call has resolved, aborting it still stops a body returned unread, as a stream, that has not been
     * read to its end, cancelled or destroyed. A WHATWG `ReadableStream` then fails with the signal's reason itself,
     * whatever it is, and its source is cancelled with it. A Node.js stream fails with the reason itself when it is
     * truthy, or else, since a Node.js stream cannot fail with `null`, `false`, `0`, `NaN` or `''`, with an `Error`
     * named `AbortError` whose `cause` is the reason, as Node.js's own `addAbortSignal()` gives. A WHATWG stream whose
     * source has failed first keeps that failure. The empty body of a response without content, a 204, a 205 or one with
     * `Content-Length: 0`, is complete already: the signal is let go of as the call resolves.
     */
    signal?: AbortSignal | undefined

    /** Whether to follow redirects (`'follow'`, the default). With `'error'` or `'manual'`, a redirect is not followed. */
    redirect?: 'error' | 'follow' | 'manual' | undefined

    /** The most redirects to follow, 20 by default. */
    follow?: number | undefined
  }

  /**
   * The settings of a client from `new FilesClient()` or `Files.createClient()`. A setting left out, or given as
   * undefined, has the SDK's default, not the global setting.
   */
  interface ClientConfig extends NetworkOptions {
    /** The API key. A client without one, or a session, makes no authenticated request. */
    apiKey?: string | null | undefined

    /** The site's URL, `https://app.files.com` by default. */
    baseUrl?: string | undefined

    /** A session ID, used instead of the API key. */
    sessionId?: string | null | undefined

    /** The workspace that requests act in. `null`, the default, sends no workspace. */
    workspaceId?: WorkspaceId | null | undefined

    /** The language, sent as `Accept-Language`, of the API's messages. `null`, the default, sends none. */
    language?: string | null | undefined

    /**
     * The `User-Agent` of the client's requests, sent exactly as given; by default, the SDK's own (see
     * `Files.setUserAgent`).
     */
    userAgent?: string | undefined

    /** Headers to send with every request of the client, under a call's own headers. */
    headers?: HttpHeaders | undefined

    /**
     * The Node.js agent that makes the client's requests, such as one for a proxy, when neither a call's own agent
     * options nor the client's `getAgentForUrl` choose one. It is used as given, not copied.
     */
    agent?: Agent | undefined

    /**
     * Chooses the agent for each of the client's requests, redirects included, from its URL, when none of a call's own
     * agent options chooses one; returning nothing uses `agent`. It must return the agent right away, not a Promise.
     */
    getAgentForUrl?: AgentForUrl | undefined

    /** The most detailed level of the client's messages logged, `Logger.LogLevel.INFO` by default. */
    logLevel?: Logger.LogLevel | undefined

    /**
     * The application logger that receives the client's messages, as `Files.setLogger()` takes one. `null`, the
     * default, logs them to the console.
     */
    logger?: ApplicationLogger | null | undefined

    /**
     * Whether to log each of the client's requests' options once more at the DEBUG level, as `Request Options:`, with
     * only the names of its parameters. DEBUG logs every request, its options and body included, either way.
     */
    debugRequest?: boolean | undefined

    /**
     * Kept for compatibility: at the DEBUG level, the headers of every response to the client's requests are logged,
     * whatever this is.
     */
    debugResponseHeaders?: boolean | undefined
  }

  /** The network settings changed by `Files.configureNetwork()`. Times are in seconds. */
  interface NetworkOptions {
    /**
     * The most times a request is retried, 3 by default, whatever its method: after a network failure, an attempt that
     * ran out of time before its response arrived, a 429 Too Many Requests, or a server error other than 501 Not
     * Implemented. Never after the signal aborts, a TLS certificate that fails verification, a URL that cannot be
     * fetched, or the redirect limit, which are the same however often a request is sent; nor when its body, such as a
     * stream already read, cannot be sent again. An opaque failure, such as a browser's network error, is retried as a
     * network failure. A request whose outcome must be known, such as an upload's last, is retried only after a 429 or
     * a failure to reach the server at all, and never once its server has answered, even with a redirect whose target
     * then fails or answers 429. A request sent again after a lockout region mismatch counts as a retry too. A wait
     * longer than a timer can be set for (about 24.8 days) is never shortened: the request is not retried, and fails as
     * its attempt did.
     *
     * Requests to storage, an upload's parts and a File's downloads, are retried by their transfer, separately: after a
     * 429 or 503 Service Unavailable, as soon as its `Retry-After` header, in seconds or as a date, allows, or at once
     * without one, so that the signed URL does not expire meanwhile; after any other transient failure, 100 ms later.
     * Only the failed part is sent again, with the same bytes, and only when its grant allows parallel parts and its
     * `retry_parts` is not `false`, nor once its URL was renewed with a grant that no longer allows it. A download asks
     * again for the bytes not yet delivered (see `File.downloadToFile()`); each part or range counts its own retries,
     * which any byte it gains restores. A request to storage whose signed URL is known to have expired, by its own
     * signature or the API's `expires`, is never sent: neither at first, nor again, nor once its callbacks, such as the
     * agent's choice, have run, nor to a redirect's expired `Location`. A part whose request was answered with such a
     * redirect was sent, and is sent again only as a retry its grant allows, to a renewed grant; otherwise its upload
     * fails with the expired-URL `FilesError`.
     */
    maxNetworkRetries?: number | undefined

    /**
     * Seconds before an API request's first retry, 0.1 by default. Each later retry waits twice as long, up to the
     * maximum: by default 0.1, 0.2 and 0.4 seconds.
     */
    minNetworkRetryDelay?: number | undefined

    /** The most seconds between an API request's retries, 1.5 by default. */
    maxNetworkRetryDelay?: number | undefined

    /**
     * Seconds each attempt of a request may take, 110 by default, enough for 30 to connect and 80 to read: one budget,
     * from sending the request until its response body has been read to its end, a body returned unread as a stream
     * included. Each retry has a budget of its own, and nothing limits a call as a whole. 0 or less waits without a
     * limit. Requests to storage have it too: an upload's parts, and each request of a File's download, through a
     * configured `fetch` or Node.js's `https`, which must read its whole response within it.
     */
    networkTimeout?: number | undefined

    /**
     * The HTTP client that sends requests, in place of the SDK's own (cross-fetch), such as one for a corporate proxy,
     * a custom TLS stack or instrumentation: a function with the signature of the standard `fetch()`, such as Node.js's
     * own `fetch`. It sends the API's requests and requests to storage: an upload's parts and a File's downloads, which
     * then come one response at a time, never split into ranges at once, though a download that breaks asks for the rest
     * of the same version. Without one, a File's downloads use Node.js's `https` with their agent, as before. See
     * `Files.Fetch` for what it receives and returns. `null` or undefined, the default, uses the SDK's own. A
     * `ConfigurationError` is thrown when it is not a function.
     *
     * A client's `fetch` is its own: a client without one uses the SDK's own HTTP client, never the global `fetch` of
     * `Files.configureNetwork()`, which applies only to calls made without a client. A call's own `fetch` comes first.
     */
    fetch?: Fetch | null | undefined

    /** Whether list methods request every page, `true` by default. */
    autoPaginate?: boolean | undefined

    /**
     * Whether a request that the API answers with a lockout region mismatch is sent again, unchanged, to the host the
     * mismatch names, `true` by default. A mismatch is the typed `not-authenticated/lockout-region-mismatch` 403 error,
     * whose host is its `data.host` or else its `X-Files-Host` header, or the legacy plain-text 403, with or without a
     * `Content-Type`, that begins `You have connected to a URL` and names its host in `X-Files-Host`, from the origin
     * the request was sent to, every redirect on the way, if any, within that origin. The request is sent again only
     * to a trusted HTTPS host (see `trustRegionHost`), as a retry within `maxNetworkRetries`, and only when its body can
     * be sent again. With `false`, or when the mismatch is not followed, the call fails with the mismatch's error, whose
     * `regionMismatch` describes it.
     */
    followRegionMismatch?: boolean | undefined

    /**
     * Trusts an HTTPS host outside Files.com for a lockout region mismatch, such as a custom domain: it receives the
     * HTTPS origin the mismatch names and the origin the request was sent to, and returns `true` to send the request's
     * credentials there. It is not asked about `files.com` and its subdomains on the default port, which are trusted
     * without it, or about a host that is not HTTPS, which never is. It must answer at once; an exception it throws
     * fails the call. A `ConfigurationError` is thrown when it is not a function.
     */
    trustRegionHost?: TrustRegionHost | null | undefined
  }

  /**
   * Trusts `origin`, an HTTPS origin outside Files.com that a lockout region mismatch names, for a request sent to
   * `currentOrigin`, by returning `true`.
   */
  type TrustRegionHost = (origin: string, currentOrigin: string) => boolean

  /**
   * A lockout region mismatch that was not followed, as `error.regionMismatch` describes it on the error the call fails
   * with: the typed `not-authenticated/lockout-region-mismatch` error, or a `FilesError` for the legacy plain-text one.
   * An integration that handles mismatches itself can save an approved `origin` and use it as its `baseUrl`.
   */
  interface RegionMismatch {
    /** Whether `origin` is trusted: a Files.com host, or one that `trustRegionHost` trusted. */
    approved: boolean

    /** The origin the request was sent to. */
    from: string

    /** The host as the API named it, in `data.host` or `X-Files-Host`, or `null` when it named none. */
    host: string | null

    /** The HTTPS origin of `host`, such as `https://MY-SUBDOMAIN.files.com`, or `null` when it is not one. */
    origin: string | null

    /**
     * Why the request was not sent there: following is off (`'disabled'`), the host is not trusted, or not HTTPS
     * (`'untrusted-host'`), none is named (`'no-host'`), it is the origin the request was sent to (`'same-host'`), the
     * call's retries are spent (`'retry-budget'`), or its body, such as an attachment stream already read, cannot be
     * sent again (`'body-not-replayable'`).
     */
    reason: 'body-not-replayable' | 'disabled' | 'no-host' | 'retry-budget' | 'same-host' | 'untrusted-host'
  }

  /**
   * The debugging settings changed by `Files.configureDebugging()`. The DEBUG log level alone logs every request, with
   * its method, URL, headers and body, and every response, with its status, headers and any body read as JSON or text,
   * unredacted: credentials and file contents included, as `curl --verbose` would show them. Use it only where that is
   * acceptable. A File's download logs each chunk of its body, with the bytes of the file it holds, as it is read. A
   * body `Api.sendRequest()` returns unread, as a stream, is logged chunk by chunk as its caller reads it, a stream
   * request body as its HTTP client reads it, a byte stream staying a byte stream that BYOB readers can read and given
   * up once it has ended, failed or been cancelled, a body discarded before a retry or drained as it is drained, and a
   * refused response's body, read within 64 KiB, as text. No chunk is copied or held for the log, nothing reads a body
   * ahead of its reader, and below DEBUG nothing is done for any chunk.
   */
  interface DebuggingOptions {
    /**
     * Whether to log each request's options once more at the DEBUG level, as `Request Options:`, with only the names of
     * its parameters.
     */
    debugRequest?: boolean | undefined

    /** Kept for compatibility: each response's status and headers are logged at the DEBUG level whatever this is. */
    debugResponseHeaders?: boolean | undefined
  }

  /**
   * An application logger for `Files.setLogger()`, such as `console` or one of a logging library: any object with
   * these four methods. Each receives the SDK's original message values, without a level prefix.
   */
  interface ApplicationLogger {
    error(...messages: unknown[]): void

    warn(...messages: unknown[]): void

    info(...messages: unknown[]): void

    debug(...messages: unknown[]): void
  }

  /** A response, as `Api.sendRequest()` and the copy and move helpers of `File` return it. */
  interface ApiResponse<T = unknown> {
    /** The body: parsed JSON, text, or for other content types the unread body. */
    data: T

    /** The response headers, with lowercase names. */
    headers: HttpHeaders

    /** The status text. */
    reason: string

    status: number

    /** With `autoPaginate`, how many requests a response of several pages took. */
    autoPaginateRequests?: number
  }

  /**
   * Pauses and resumes the transfers it is given as `options.control`, uploads and downloads alike. Paused, a transfer
   * sends no new request, part or range, and reads no further from its source or responses; requests already on the
   * wire finish, and a request still waiting for admission gives back its permit and waits. It keeps every part sent,
   * byte written and its upload's `ref`, and resumes where it stopped. Pausing is not cancelling: only a transfer's
   * `signal` cancels it, and a paused transfer can still fail, such as when a `timeoutSecs` budget runs out while its
   * response is left unread. One control can govern several transfers at once.
   */
  class TransferControl {
    constructor()

    /** Whether the control is paused. */
    readonly paused: boolean

    /** Pauses every transfer given this control. Pausing a paused control does nothing. */
    pause(): void

    /** Resumes every transfer given this control. Resuming a running control does nothing. */
    resume(): void
  }

  /**
   * A scope for the transfers of one job, given to each of them as `options.job`. Its compatible transfers, of the same
   * direction, destination kind, startup and concurrency options, share one concurrency controller, so that what one
   * file's requests teach it carries over to the next file; and every transfer of the job shares its budgets. Transfers
   * without a job learn on their own and share only the process's budgets: 32 requests at once in each direction and
   * 256 MiB of upload data, with no limit on files. A job's budgets cover the transfer methods given it, from their
   * call until they settle, the upload's own API requests, begin_upload and its completion, included; API calls made
   * before them, such as the `File.find()` and `download()` that give a File its `download_uri`, are not, and a caller
   * that needs a limit on that whole sequence admits it itself.
   */
  class TransferJob {
    /** Throws an `InvalidParameterError` when a count is not a whole number in its range. */
    constructor(options?: TransferJobOptions)

    /** The job's budgets and each of its controllers' current state, with its recent decisions. */
    snapshot(): TransferJobSnapshot
  }

  interface TransferJobOptions {
    /**
     * Requests to storage the job's transfers have at once in each direction, 32 by default; at most 1024. A hard
     * budget, apart from each transfer's own `maxConcurrency`. A download's request keeps its place in it until it has
     * closed and every byte read from it has been written to its destination, a final batch included, so that it bounds
     * how many responses a download holds bytes for (see `File.downloadToFile()`).
     */
    maxConcurrency?: number | undefined

    /**
     * Bytes of upload data the SDK holds at once for the job's uploads, 256 MiB by default: one ceiling for the parts
     * read and not yet settled, the forms they are sent in, made while their bytes are held, the SDK's copies of bytes
     * given to `uploadData()`, and the rest of a stream's chunk, copied as the stream gives it, each counted before it is
     * allocated. A part that does not fit waits for room; a copy of `uploadData()`'s bytes, which cannot wait, is made
     * only when its upload's file admission is free at once and it fits, or, larger than the whole budget, only while
     * nothing else is held, and otherwise the call rejects with a `FilesError` before anything is copied or sent. The rest
     * of a stream's chunk, whose size cannot be known before the stream gives it, is copied within room its part was
     * admitted with besides (the largest chunk the stream has given so far), or room that fits at once; otherwise the
     * upload fails with a `FilesError` before the rest is copied. Only one upload at a time may hold more than the
     * budget, and only while nothing but its own bytes is held: a copy larger than the whole budget; the rest of a
     * stream's chunk, while no other upload reads its stream; or a part that, with that upload's own copy or chunk rest,
     * could never fit within the whole budget. Should every byte held belong to uploads waiting for room another holds,
     * so that none could go on, the last of them to ask is refused with a `FilesError` rather than the budget going
     * beyond its limit.
     * A whole file the API asks for in one request without a known size holds the whole budget while it is read, and may
     * fill at most half of it. Downloads do not count against it (see `File.downloadToFile()`).
     */
    maxBufferBytes?: number | undefined

    /** Files transferring at once, uploads and downloads together; no limit by default. */
    maxConcurrentFiles?: number | undefined
  }

  interface TransferJobSnapshot {
    /** The job's configured budget of upload data, in bytes (see `TransferJobOptions`): its limit, not the bytes held now. */
    maxBufferBytes: number

    /** The job's configured budget of requests to storage at once in each direction: its limit, not the requests now. */
    maxConcurrency: number

    /** The job's configured limit of files transferring at once, `Infinity` when there is none: not the files now. */
    maxConcurrentFiles: number

    /** One for each compatible set of the job's transfers, by key: direction, destination, startup and cap. */
    controllers: Array<TransferControllerSnapshot & { key: string }>
  }

  /** A concurrency controller's state, as `TransferJob.snapshot()` gives it. */
  interface TransferControllerSnapshot {
    /** Bytes of the attempts it has accepted. */
    acceptedBytes: number

    /** Attempts admitted and not yet settled. */
    admitted: number

    /** Milliseconds left of a throttle's cooldown, during which nothing new is admitted. */
    cooldownMs: number

    /**
     * Its most recent decisions, at most 64, oldest first: `at`, when it was made, in milliseconds of the monotonic clock
     * every measurement uses (`performance.now()`), not a date; `decision`, its name, such as `'WarmStartRaised'`;
     * `target`, the target it left; and the measurements that led to it, such as the judged window's throughput in bytes
     * per second.
     */
    decisions: Array<{ at: number; decision: string; target: number; [measurement: string]: unknown }>

    direction: 'download' | 'upload'

    /** How many backoffs it has made: failures of attempts begun before the last count once. */
    epoch: number

    /** Attempts on the network now. */
    inFlight: number

    /**
     * The most attempts it ever admits at once: the transfer's `maxConcurrency`, or else its fixed `concurrency`, or else
     * the policy's maximum, 32, and never above 1024. The job's or the process's request budget can still hold it lower.
     */
    maximum: number

    /**
     * The lowest target its ordinary policy backs off to, within `maximum`. A Default upload to S3's warm start begins
     * below it, at one.
     */
    minimum: number

    /** The highest target it has had. */
    peakTarget: number

    /**
     * `'warm'` while a Default upload to S3's warm start raises its target from one, `'steady'` under the ordinary
     * adaptive policy, and `'fixed'` for a fixed `concurrency`, which nothing changes. An upload to a remote server
     * integration or Files Agent is never `'warm'`.
     */
    phase: 'fixed' | 'steady' | 'warm'

    /**
     * The policy start, where an Aggressive upload, a promoted Default upload to S3, every upload to a remote server
     * integration or Files Agent and every download begin.
     */
    start: number

    /**
     * The startup chosen for it (see `File.UploadOptions.startup`), `'default'` or `'aggressive'`, as chosen whatever
     * the destination, an explicit `'aggressive'` for an upload to a remote server integration or Files Agent included;
     * or `'fixed'` for a fixed `concurrency`. It records that choice, and implies no warm start: `phase` shows whether
     * the controller is warming, which only a Default upload to S3 does.
     */
    startup: 'aggressive' | 'default' | 'fixed'

    /** How many attempts it admits at once now. */
    target: number
  }

  /**
   * A transfer's progress, as `onProgress` receives it: once as it starts, at most every 100 ms as bytes count, and once
   * as it ends, completed or failed. An error `onProgress` throws while the transfer runs fails it; one thrown by the
   * last report, once its outcome is settled, is ignored.
   */
  interface TransferProgress {
    direction: 'download' | 'upload'

    /**
     * Bytes done, each counted once: an upload's parts storage has accepted, or a download's bytes its destination has
     * been given. A download that has to start over from its first byte counts again from 0.
     */
    bytesTransferred: number

    /** Bytes sent, an upload's parts sent again included, or a download's bytes received, those discarded included. */
    bytesSent: number

    /** The transfer's size, when known, or `null`. */
    totalBytes: number | null

    /**
     * Average bytes per second: `bytesTransferred * 1000 / elapsedMs`, or 0 when no time has elapsed; paused time is
     * excluded.
     */
    bytesPerSecond: number

    /** Milliseconds since the transfer started, by a monotonic clock, leaving out the time it was paused. */
    elapsedMs: number

    state: 'completed' | 'failed' | 'paused' | 'running'
  }

  /**
   * A client's Files.com filesystem, `client.fs`: Node.js's `fs/promises` conventions over the paths of the client's
   * site and workspace, with the client's settings. Port code that reads, writes and lists with Node.js's own file
   * handles and directories by using these instead:
   *
   * ```js
   * const handle = await client.fs.open('reports/daily.csv', 'r+')
   * const { bytesRead } = await handle.read(Buffer.alloc(16), 0, 16, null)
   * await handle.write('total', 0)      // published to Files.com before it resolves
   * await handle.close()
   *
   * for await (const entry of await client.fs.opendir('reports')) {
   *   console.log(entry.name, entry.isDirectory())
   * }
   * ```
   *
   * Paths are Files.com paths, sent as given: never resolved against the local working directory, nor replaced by
   * the paths the API returns. A path that the API reports is not there (`not-found/file-not-found` or
   * `not-found/folder-not-found`) fails with `ENOENT`, whose `cause` is the SDK's error, unchanged; any other failure,
   * one of authentication or routing included, is the SDK's own error. What the API has no primitive for, such as file
   * modes for a file a call creates, the append flags or exclusive creation, rejects with a `NotImplementedError` before
   * anything is changed. A `signal` given to `readFile()`, `writeFile()` or `appendFile()` stops all of that call's
   * work, its metadata request, download, local read or write and uploads alike, and the call rejects with the signal's
   * reason, unchanged, whatever it is, `null` and `0` included.
   *
   * Node.js only: in a browser, every method rejects with a `NotImplementedError`.
   */
  interface Filesystem {
    /**
     * Opens a Files.com file, as `fs/promises`'s `open()` does: `'r'` (the default) and `'r+'` open an existing file,
     * failing with `ENOENT` when it is not there; `'w'` and `'w+'` create it or empty it, which is published before the
     * handle is given. A directory fails with `EISDIR`. A number of `fs.constants`' `O_RDONLY`, `O_WRONLY`, `O_RDWR`,
     * `O_CREAT` and `O_TRUNC` opens it the same way; any other bit, one beyond 32 bits included, is refused. Appending
     * (`'a'`, `O_APPEND`), exclusive creation (`'wx'`, `O_EXCL`), synchronous modes (`'rs+'`, `O_SYNC`) and a `mode`
     * for a file it creates reject with a `NotImplementedError` before anything is sent: the API has no atomic append or
     * create-if-absent, and no modes. A `mode` with flags that do not create the file is ignored, as Node.js ignores it.
     */
    open(path: RemotePath, flags?: 'r' | 'r+' | null, mode?: FileMode | null): Promise<RemoteFileHandle>
    open(path: RemotePath, flags: 'w' | 'w+', mode?: null): Promise<RemoteFileHandle>
    open(path: RemotePath, flags: number, mode?: FileMode | null): Promise<RemoteFileHandle>
    open(path: RemotePath, flags?: OpenFlags | null, mode?: null): Promise<RemoteFileHandle>

    /**
     * The whole file, as `fs/promises`'s `readFile()` gives it: a Buffer, or a string in `encoding`. A handle is read
     * from its position. `signal` stops it, rejecting with the signal's reason, unchanged. A read that fails rejects
     * with its own failure, even when closing the path's handle then fails too.
     */
    readFile(path: RemotePath | RemoteFileHandle, options?: { encoding?: null; flag?: OpenFlags; signal?: AbortSignal } | null): Promise<Buffer>
    readFile(path: RemotePath | RemoteFileHandle, options: { encoding: BufferEncoding; flag?: OpenFlags; signal?: AbortSignal } | BufferEncoding): Promise<string>

    /**
     * Writes data to the file, as `fs/promises`'s `writeFile()` does, and resolves once it has been published. With
     * `'w'`, the default, the file is replaced with one upload of the whole data, and left as it was when the data
     * cannot be read. A flag that does not create the file, such as `'r+'`, writes into the existing file, and its
     * `mode` is ignored. A handle is written at its position. `flush: true` rejects with a `NotImplementedError`.
     */
    writeFile(path: RemotePath | RemoteFileHandle, data: FileData, options?: WriteFileOptions | BufferEncoding | null): Promise<void>

    /**
     * Uses the same write path as `writeFile()` with default flag `'a'`, which is unsupported: it rejects with a
     * `NotImplementedError` before anything is sent, as the API has no atomic append, so a write to the end could lose
     * another writer's data. A supported non-append flag, such as `'r+'` or `'w'`, follows that flag's behavior.
     * Through a file handle, it writes at the handle's current position.
     */
    appendFile(path: RemotePath | RemoteFileHandle, data: FileData, options?: WriteFileOptions | BufferEncoding | null): Promise<void>

    /**
     * Opens a Files.com directory, as `fs/promises`'s `opendir()` does, once its metadata shows it is one: `ENOENT`
     * when it is not there, `ENOTDIR` when it is a file. `bufferSize`, when given, is how many entries each page of the
     * listing has; `recursive` lists the directories within too, after the entries of the one before.
     */
    opendir(path: RemotePath, options?: OpenDirOptions & { encoding?: BufferEncoding | null }): Promise<RemoteDir<string>>
    opendir(path: RemotePath, options: OpenDirOptions & { encoding: 'buffer' }): Promise<RemoteDir<Buffer>>

    /**
     * The names of a directory's entries, or with `withFileTypes` the entries themselves, as `fs/promises`'s
     * `readdir()` gives them: listed with `opendir()` and read to the end. With `recursive`, a name is the entry's path
     * from the directory.
     */
    readdir(path: RemotePath, options?: { encoding?: BufferEncoding | null; withFileTypes?: false; recursive?: boolean } | BufferEncoding | null): Promise<string[]>
    readdir(path: RemotePath, options: { encoding: 'buffer'; withFileTypes?: false; recursive?: boolean } | 'buffer'): Promise<Buffer[]>
    readdir(path: RemotePath, options: { encoding?: BufferEncoding | null; withFileTypes: true; recursive?: boolean }): Promise<Array<RemoteDirent<string>>>
    readdir(path: RemotePath, options: { encoding: 'buffer'; withFileTypes: true; recursive?: boolean }): Promise<Array<RemoteDirent<Buffer>>>

    /** The path's stats, from its metadata (see `RemoteStats`). */
    stat(path: RemotePath, options?: { bigint?: false }): Promise<RemoteStats>
    stat(path: RemotePath, options: { bigint: true }): Promise<RemoteBigIntStats>
  }

  /** A Files.com path, as a string or the bytes of its UTF-8. A URL, which could name a local file, is refused. */
  type RemotePath = string | Uint8Array

  /** The flags `client.fs.open()` supports, or a number of `fs.constants`' `O_` flags (see `Filesystem.open()`). */
  type OpenFlags = 'r' | 'r+' | 'w' | 'w+' | number

  /**
   * A file mode, as Node.js takes one. Files.com paths have none: a mode is refused for a file a call creates, and
   * ignored, as Node.js ignores it, with flags that do not create the file.
   */
  type FileMode = number | string

  /** What `writeFile()` writes: text, bytes, or an iterable, async iterable or stream of them. */
  type FileData = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | NodeJS.ReadableStream

  /**
   * The options of `writeFile()` and `appendFile()`: with a flag that creates the file, `'w'` by default, no mode; with
   * one that does not, such as `'r+'`, or a number of `O_` flags, a mode, which is ignored unless those flags create the
   * file, when it is refused.
   */
  type WriteFileOptions = CreatingWriteFileOptions | ExistingWriteFileOptions

  interface WriteFileOptionsBase {
    encoding?: BufferEncoding | null

    /**
     * Stops the write, its metadata request, download, local write and uploads alike, rejecting with the signal's
     * reason, unchanged. A write stopped before it was published leaves the remote file as it was.
     */
    signal?: AbortSignal

    /** Not supported: the SDK cannot confirm that a write has reached a physical device. */
    flush?: false
  }

  interface CreatingWriteFileOptions extends WriteFileOptionsBase {
    /** `'w'` by default for `writeFile()`; `'a'`, `appendFile()`'s default, is not supported. */
    flag?: 'w' | 'w+' | 'a'

    /** Not supported for a file the call creates: Files.com paths have no modes. */
    mode?: null
  }

  interface ExistingWriteFileOptions extends WriteFileOptionsBase {
    /** A flag that does not create the file, or a number of `O_` flags. */
    flag: 'r' | 'r+' | number

    /** Ignored, as Node.js ignores it, unless numeric flags create the file, when it is refused. */
    mode?: FileMode | null
  }

  interface OpenDirOptions {
    /** How many entries each page of the listing has (`per_page`); the API's own page size when left out. */
    bufferSize?: number

    /** Whether to list the directories within too. */
    recursive?: boolean
  }

  /**
   * A Files.com file open for reading, writing or both, as Node.js's `FileHandle` gives a local file, by
   * `client.fs.open()`. Its methods, their arguments and results are `FileHandle`'s: positions, the handle's own
   * position, encodings, vectors and truncation work exactly as theirs, on a stage of the file the handle keeps on local
   * disk, in a directory of its own. An existing file is downloaded to it when the handle first reads or writes it.
   *
   * Every change, `write()`, `writev()`, `writeFile()`, `appendFile()` and `truncate()`, uploads the whole stage to
   * Files.com and resolves only once that upload has completed; `writev()`, as Node.js's, may write fewer bytes than it
   * was given, which its `bytesWritten` says. A write stream writes each batch of chunks to its end, publishing each
   * write, before the batch's callback, failing should a write fail or write nothing more, so `'finish'` means every
   * chunk has been written and published. Nothing is ever published at `close()`, nor anything remote deleted. Calls
   * run one at a time, in the order made. A change that fails, locally or remotely, fails the handle: every later call
   * rejects with that first failure, as `close()` does once it has released the stage, and nothing the failed change
   * left in the stage is ever published. Only a `write()`, `writev()` or `truncate()` whose arguments Node.js refuses
   * before touching the stage leaves the handle as it was. A `signal` given to `readFile()`, `writeFile()` or
   * `appendFile()` stops that call's download, local read or write and upload, which then rejects with the signal's
   * reason, unchanged, rather than Node.js's own `AbortError`. A read stream, destroyed by its `signal` or otherwise,
   * stops its own reads and download alone (see `createReadStream()`).
   *
   * `close()` waits for the calls made before it, refuses those made after it (`EBADF`), closes and removes the stage,
   * emits `'close'`, and resolves at once when the handle has closed already. `fd` has no value: the stage's
   * descriptor is never exposed. `chmod()`, `chown()`, `utimes()`, `sync()` and `datasync()` reject with a
   * `NotImplementedError`, changing nothing.
   */
  interface RemoteFileHandle extends NodeJS.EventEmitter {
    /** Reading it throws a `NotImplementedError`: a Files.com file has no descriptor of this process. */
    readonly fd: never

    appendFile(data: FileData, options?: { encoding?: BufferEncoding | null; signal?: AbortSignal } | BufferEncoding | null): Promise<void>

    chmod(mode: string | number): Promise<never>

    chown(uid: number, gid: number): Promise<never>

    close(): Promise<void>

    /**
     * A stream of the file from `start`, when given, to `end`, inclusive, leaving the handle's position as it was; or
     * else from the handle's position, moving it. It closes the handle when it ends, unless `autoClose` is `false`.
     *
     * Destroyed, by its `signal` or in any other way, its reader's `destroy(error)` included, it stops its own work, its
     * reads of the file and the download one of them makes, and nothing else the handle was asked: a read still waiting
     * for the handle's earlier calls stops when its turn comes. Its destruction settles, failing with its first failure,
     * only once that work has stopped: with `autoClose`, it then closes the handle, which waits for the handle's other
     * calls as `close()` always does; with `autoClose: false`, the handle stays usable, and a download it stopped is made
     * again by the handle's next call that needs it.
     */
    createReadStream(options?: RemoteReadStreamOptions | BufferEncoding): import('stream').Readable & { bytesRead: number }

    /**
     * A stream that writes to the file at `start`, when given, or else at the handle's position. Each batch of chunks
     * is written to its end and published before its callback: a write of only part of it is followed by one of the
     * rest, and one that writes nothing more, or fails, fails the stream. It closes the handle when it finishes, unless
     * `autoClose` is `false`.
     */
    createWriteStream(options?: RemoteWriteStreamOptions | BufferEncoding): import('stream').Writable & { bytesWritten: number }

    datasync(): Promise<never>

    read<T extends NodeJS.ArrayBufferView>(buffer: T, offset?: number | null, length?: number | null, position?: number | bigint | null): Promise<{ bytesRead: number; buffer: T }>
    read<T extends NodeJS.ArrayBufferView>(buffer: T, options?: { offset?: number; length?: number; position?: number | bigint | null }): Promise<{ bytesRead: number; buffer: T }>
    read<T extends NodeJS.ArrayBufferView = Buffer>(options?: { buffer?: T; offset?: number; length?: number; position?: number | bigint | null }): Promise<{ bytesRead: number; buffer: T }>

    /** A byte stream of the file from the handle's position. The handle is locked while it is read. */
    readableWebStream(options?: { type?: 'bytes' }): import('stream/web').ReadableStream<Uint8Array>

    readFile(options?: { encoding?: null; signal?: AbortSignal } | null): Promise<Buffer>
    readFile(options: { encoding: BufferEncoding; signal?: AbortSignal } | BufferEncoding): Promise<string>

    readLines(options?: RemoteReadStreamOptions): import('readline').Interface

    readv<T extends readonly NodeJS.ArrayBufferView[]>(buffers: T, position?: number | null): Promise<{ bytesRead: number; buffers: T }>

    /** The remote file's stats, as the API has them once every change before has been published (see `RemoteStats`). */
    stat(options?: { bigint?: false }): Promise<RemoteStats>
    stat(options: { bigint: true }): Promise<RemoteBigIntStats>

    sync(): Promise<never>

    truncate(len?: number): Promise<void>

    utimes(atime: string | number | Date, mtime: string | number | Date): Promise<never>

    write<T extends NodeJS.ArrayBufferView>(buffer: T, offset?: number | null, length?: number | null, position?: number | null): Promise<{ bytesWritten: number; buffer: T }>
    write<T extends NodeJS.ArrayBufferView>(buffer: T, options?: { offset?: number; length?: number; position?: number | null }): Promise<{ bytesWritten: number; buffer: T }>
    write(data: string, position?: number | null, encoding?: BufferEncoding | null): Promise<{ bytesWritten: number; buffer: string }>

    writeFile(data: FileData, options?: { encoding?: BufferEncoding | null; signal?: AbortSignal } | BufferEncoding | null): Promise<void>

    writev<T extends readonly NodeJS.ArrayBufferView[]>(buffers: T, position?: number | null): Promise<{ bytesWritten: number; buffers: T }>

    [Symbol.asyncDispose](): Promise<void>
  }

  interface RemoteReadStreamOptions {
    encoding?: BufferEncoding | null
    autoClose?: boolean
    emitClose?: boolean
    start?: number
    end?: number
    highWaterMark?: number

    /**
     * Destroys the stream once it aborts, as the SDK's other Node.js streams fail: with the signal's reason itself when
     * it is truthy, an `Error` with its own identity included, or else, since a Node.js stream cannot fail with `null`,
     * `false`, `0`, `NaN` or `''`, with an `Error` named `AbortError`, code `ABORT_ERR`, whose `cause` is the reason. The
     * stream then stops its own reads of the file, its download included, as its destruction in any other way, such as
     * its reader's `destroy(error)`, does too. The stream lets go of the signal once it settles.
     */
    signal?: AbortSignal
  }

  interface RemoteWriteStreamOptions {
    encoding?: BufferEncoding | null
    autoClose?: boolean
    emitClose?: boolean
    start?: number
    highWaterMark?: number

    /** Not supported: the SDK cannot confirm that a write has reached a physical device. */
    flush?: false
  }

  /**
   * A Files.com directory, as Node.js's `Dir` gives a local one, by `client.fs.opendir()`. Its entries come from the
   * client's lazy listing (GET /folders/{path}), which holds one page at a time and requests the next only once the
   * page before has been read. `read()` gives them one at a time, by promise or callback, and `null` once there are no
   * more; `for await` reads them, and closes the directory however the loop ends. Reads and `close()` run one at a
   * time, in the order made; `close()` waits for a read under way, then requests nothing more. Once closed, `read()` and
   * `close()` fail with `ERR_DIR_CLOSED`. `readSync()` throws a `NotImplementedError`: listing takes network requests.
   */
  interface RemoteDir<Name extends string | Buffer = string> extends AsyncIterable<RemoteDirent<Name>> {
    /** The path as it was given to `opendir()`. */
    readonly path: string

    read(): Promise<RemoteDirent<Name> | null>
    read(callback: (error: Error | null, entry: RemoteDirent<Name> | null) => void): void

    readSync(): never

    close(): Promise<void>
    close(callback: (error: Error | null) => void): void

    /** Closes the directory at once; throws `ERR_DIR_CONCURRENT_OPERATION` while a read or close is under way. */
    closeSync(): void

    [Symbol.asyncIterator](): AsyncIterableIterator<RemoteDirent<Name>>

    [Symbol.asyncDispose](): Promise<void>

    [Symbol.dispose](): void
  }

  /**
   * An entry of a Files.com directory, as Node.js's `Dirent` gives one: its `name`, from the API's `display_name`, and
   * `parentPath`, the path of the directory it is in, as it was given, never one the API returns. A file or a directory
   * is all a Files.com path can be, so the other type predicates are `false`.
   */
  interface RemoteDirent<Name extends string | Buffer = string> {
    readonly name: Name

    readonly parentPath: string

    isBlockDevice(): boolean

    isCharacterDevice(): boolean

    isDirectory(): boolean

    isFIFO(): boolean

    isFile(): boolean

    isSocket(): boolean

    isSymbolicLink(): boolean
  }

  /**
   * The stats of a Files.com path, as Node.js's `stat()` gives a local path's, with what the API reports and nothing
   * else: its `size`, its modification time on the server, `mtime`, and its creation time, `birthtime`, each absent when
   * the API gives none. The API has no device, inode, mode, link count, owner, block size or count, or access and change
   * times, so those fields are never there. A file or a directory is all a Files.com path can be.
   */
  interface RemoteStats {
    size?: number

    mtime?: Date

    mtimeMs?: number

    birthtime?: Date

    birthtimeMs?: number

    isBlockDevice(): boolean

    isCharacterDevice(): boolean

    isDirectory(): boolean

    isFIFO(): boolean

    isFile(): boolean

    isSocket(): boolean

    isSymbolicLink(): boolean
  }

  /** `RemoteStats` with `bigint: true`: its numbers are bigints, with times in nanoseconds beside. */
  interface RemoteBigIntStats extends Omit<RemoteStats, 'birthtimeMs' | 'mtimeMs' | 'size'> {
    size?: bigint

    mtimeMs?: bigint

    mtimeNs?: bigint

    birthtimeMs?: bigint

    birthtimeNs?: bigint
  }

  /**
   * A decimal number as the API sends it, such as `'10.50'`: a string, so that no precision is lost. Convert it with
   * a decimal library, or `Number()` when a floating-point number is precise enough.
   */
  type DecimalString = string

  /** A date and time in ISO 8601 format, such as `'2000-01-01T01:00:00Z'`: a string, not a `Date`. */
  type DateTimeString = string

  /** Another value of a field whose known values are listed, since the API can add more. */
  type OtherString = string & {}

  /** Any JSON value. */
  type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject

  /** A JSON object. */
  interface JsonObject {
    [key: string]: JsonValue
  }

  /** The parameters of a method that has none besides its arguments: no key is accepted. */
  type NoParams = { readonly [key: string]: never }

  /** Fields of a model that this SDK does not know. */
  type UnknownFields = { [field: string]: unknown }

  /** HTTP headers by name. */
  type HttpHeaders = { [name: string]: string }

  type WorkspaceId = number | string

  /** A Node.js HTTP or HTTPS agent. */
  type Agent = import('http').Agent

  /** Chooses the agent for a request from its URL, synchronously. */
  type AgentForUrl = (url: string) => Agent | false | null | undefined

  /**
   * An HTTP client for `NetworkOptions.fetch`, with the signature of the standard `fetch()`: it sends one request to
   * `url` and resolves with its response, as soon as its headers have arrived, or rejects when the request fails.
   *
   * - It must send the request as `init` describes, and leave redirects to the SDK: given `redirect: 'manual'`, it
   *   resolves with a redirect's 3xx response and its `Location`, never following it, so that the SDK, which follows
   *   each redirect itself, never sends credentials to another origin. A response it reports as `redirected` fails the
   *   request.
   * - It must stop the request, and the body of its response, once `init.signal` aborts. The SDK aborts it when the
   *   call's signal does, when the attempt's `networkTimeout` runs out, which covers the response's body too, when a
   *   download stops early, such as when its destination fails, and when one of an upload's parts fails, for its other
   *   parts still under way.
   * - It must send each request once: the SDK retries each request itself, within `maxNetworkRetries`, as its policy
   *   allows, so that an upload part that may not be sent again never is, and a retry it made itself would be hidden.
   * - The SDK still chooses each request's agent, given as `init.agent`, which a client that has no use for agents,
   *   such as Node.js's own `fetch`, ignores; and it logs and times out each request itself.
   * - A rejection whose `code`, or its `cause`'s, is one Node.js gives a TLS certificate that failed verification is
   *   never retried.
   * - A File's download asks for the file's bytes as stored, with `Accept-Encoding: identity` (and cross-fetch's
   *   `compress: false`); a client that decodes a content coding anyway delivers the decoded bytes.
   */
  type Fetch = (url: string, init: FetchInit) => Promise<FetchResponse>

  /** The request a `Fetch` sends. */
  interface FetchInit {
    method: string

    /** The request's headers: never the API's credentials or workspace once a redirect leads to another origin. */
    headers: HttpHeaders

    /**
     * The body, if any: a string, bytes, or a Node.js readable stream, which is sent with `duplex: 'half'` as Node.js's
     * own `fetch` needs. It is typed `any` so that the standard `fetch()`, whose body types differ by runtime, is a
     * `Fetch` as it is.
     */
    body?: any

    duplex?: 'half'

    /** Always `'manual'` when the SDK follows redirects, or `'error'` or `'manual'` as the call's options ask. */
    redirect: 'error' | 'manual'

    /** Aborts once the request is to stop: see `Fetch`. */
    signal: AbortSignal

    /** The agent the SDK chose for the request's URL, if any. */
    agent?: Agent | undefined
  }

  /** The response a `Fetch` resolves with, as the standard `fetch()` gives it. */
  interface FetchResponse {
    readonly status: number

    readonly statusText: string

    readonly ok: boolean

    /** Whether the client followed a redirect itself, which fails the request. */
    readonly redirected?: boolean

    readonly headers: {
      get(name: string): string | null
      entries(): Iterable<[string, string]>
    }

    /** The body as a stream: a Node.js readable stream, or a WHATWG `ReadableStream`; or null. */
    readonly body: unknown

    json(): Promise<unknown>

    text(): Promise<string>

    formData?(): Promise<unknown>
  }
}

export = Files
