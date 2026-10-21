# Files.com JavaScript SDK

The Files.com JavaScript SDK provides a direct, high performance integration to Files.com from applications written in JavaScript.

Files.com is the cloud-native, next-gen MFT, SFTP, and secure file-sharing platform that replaces brittle legacy servers with one always-on, secure fabric. Automate mission-critical file flows—across any cloud, protocol, or partner—while supporting human collaboration and eliminating manual work.

With universal SFTP, AS2, HTTPS, and 50+ native connectors backed by military-grade encryption, Files.com unifies governance, visibility, and compliance in a single pane of glass.

The content included here should be enough to get started, but please visit our
[Developer Documentation Website](https://developers.files.com/javascript/) for the complete documentation.

## Node.js Requirements

Version 2 of the `files.com` package requires Node.js 22 or later in the application that runs the SDK. Use a maintained Node.js release with current security patches. Tools that build, bundle or test your application have their own Node.js requirements.

If your application runs on an earlier Node.js version, keep your existing 1.x version of `files.com` until you upgrade Node.js, then move to version 2.

## Application Logger

The SDK writes its log messages to the console by default. To send them to your application's logger instead, pass any object with `error`, `warn`, `info` and `debug` methods to `Files.setLogger`. Each message goes to the method for its level, with the SDK's original values and no `[level]:` prefix. The SDK log level still decides which messages are sent, so debug messages are only sent after you select `LogLevel.DEBUG`.

```javascript
import Files from 'files.com/lib/Files';
import { LogLevel } from 'files.com/lib/Logger';

Files.setLogger(applicationLogger);
Files.setLogLevel(LogLevel.DEBUG);

// Send SDK log messages to the console again.
Files.setLogger(null);
```

`Files.setLogger` throws a `ConfigurationError` if the object is missing any of those methods. The logger is a single global setting for the SDK.

`LogLevel.DEBUG` alone logs every request and response, like `curl --verbose`: each request's method, URL, options, headers and body, and each response's status, headers and any JSON or text body, including retried requests and requests to storage. A File's downloads log each request and each response's status and headers, including range responses that are refused or left unused, and then log each chunk of the body as it is read, with the file bytes it holds (`Response Data (bytes 0-65535): `). Streams are logged as they are consumed, by their own reader, never by a second one: a body that `Api.sendRequest()` returns unread, as a stream, is logged chunk by chunk (`Response Data: `) as you read it; a stream request body (`Request Data: `) as the HTTP client reads it, a byte stream staying a byte stream that a BYOB reader can read, the body's lock released once it has ended, failed or been cancelled; a body discarded before a retry, or drained because nobody needs it, as it is drained; and a refused response's unread body is read as text, at most 64 KiB, and logged before the call fails with the response's own error. No chunk is copied or held for the log, nothing is read ahead of its reader, and below DEBUG nothing is done per chunk. Debug output is unredacted, so it includes API keys, session IDs, signed URLs and file contents: use it only where that exposure is acceptable. `debugResponseHeaders` is kept for compatibility and is no longer needed to log response headers, and `debugRequest` adds a `Request Options:` entry with only the parameter names.

## Clients

`Files.setApiKey()` and the other `Files` methods configure the SDK globally, and static model methods such as `User.list()` use those global settings. To work with more than one API key, site or workspace at a time, create a client with settings of its own, with `new FilesClient(config)` or `Files.createClient(config)`, which makes the same client:

```javascript
import FilesClient from 'files.com/lib/FilesClient.js';

const client = new FilesClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://MY-SUBDOMAIN.files.com',
  workspaceId: 0,
  logger: console, // optional: any object with error, warn, info and debug methods
});

const [user] = await client.users.list({ per_page: 1 });
user.setName('New Name');
await user.save(); // sent with the client's settings
```

- A client starts from the SDK's defaults, not from the global settings, and copies its settings and headers. Changing the object you passed, or the global settings, does not change the client afterwards, and a client without an API key or session never uses the global ones. Both throw a `ConfigurationError` for a setting they do not know, or for a `logger` without `error`, `warn`, `info` and `debug` methods.
- Its resources, such as `client.users` and `client.apiKeys`, offer the models' static methods with the same arguments. A call's options override the client's settings for that call, such as `client.users.list({}, { workspaceId: null })`, without changing the client or its other calls.
- Models that a client's call returns keep the client and a copy of that call's options, taken when the call began, so their own methods and `save()` make their requests as the call did, with the same API key, workspace and headers. Changing your options object afterwards does not change them. The call's `signal` is not kept: it cancels that call alone.
- For each request and redirect, per-call agent options take precedence: `getAgentForUrl`, `agent`, `httpsAgent`, then `httpAgent`. If none selects an agent, the client uses its `getAgentForUrl` callback, then its `agent`. Agents and callbacks are used by reference; `getAgentForUrl` must return synchronously.
- A client logs with its own `logLevel`, `logger`, `debugRequest` and `debugResponseHeaders` settings, which default to those of a fresh SDK (`LogLevel.INFO`, the console, off and off), not to the global ones. At `LogLevel.DEBUG`, each response's status and headers are logged. `Files.setLogLevel()`, `Files.setLogger()` and `Files.configureDebugging()` apply to calls made without a client. `Logger.pause()` pauses every client's messages too.
- `client.files` offers File's static methods and its upload, copy and move helpers, such as `client.files.uploadData()` and `client.files.copyToRemoteServer()`, whose API requests use the client's settings. A File it returns keeps the client, as other models do, for its own methods and downloads. A File's `copyTo()` and `moveTo()` given options of their own use them instead of the File's, as before, but still with the File's client unless the options name another. Through a client, an upload's parts go to storage through the agent the call's options or the client choose and the client's `fetch`, with the call's `signal` and `timeoutSecs` and the client's retry, timeout and log settings. A File's downloads use that agent too, log with the client's log settings, and go through the File's or the client's `fetch` when one is set (see [Retries, timeouts and the HTTP client](#retries-timeouts-and-the-http-client)). None of the client's credentials or headers go to storage. Without a client, uploads and downloads choose their agent as before, and use the global settings.

## Retries, timeouts and the HTTP client

Requests are retried up to `maxNetworkRetries` times, 3 by default, whatever their method: after a network failure, an attempt that ran out of time before its response arrived, a 429 Too Many Requests, or a server error other than 501 Not Implemented. Requests are not retried after the call's `signal` aborts, a TLS certificate fails verification, a URL or a redirect's `Location` cannot be fetched, or the redirect limit is reached, since those fail the same way every time. A body that cannot be sent again, such as a stream already read, is not retried either. A browser's opaque network error is retried as a network failure, since it says no more. Each retry is logged at INFO with its reason, wait and number.

- **API requests** wait `minNetworkRetryDelay`, 0.1 seconds by default, before the first retry, and twice as long before each later one, up to `maxNetworkRetryDelay`, 1.5 seconds by default: 100, 200 and 400 ms with the defaults.
- **Requests to storage**, an upload's parts and a File's downloads, are retried by their transfer, one attempt at a time, so that no retry loop runs inside another. After a 429 or 503 Service Unavailable, they wait as long as `Retry-After` asks (in seconds or as a date), or not at all without one, so that the signed URL does not expire meanwhile, and the transfer's controller admits nothing new until then. After any other transient failure, they wait 100 ms. Only the failed part is sent again, with the same number and bytes, and only when its grant allows parallel parts and its `retry_parts` is not `false`, whether or not the upload sends its parts in parallel; a renewed grant that withdraws it makes the part's failure the upload's. Each part, and each range of a download, counts its own retries, and any byte a download gains restores them. A URL known to have expired is never sent: not for the first time, not after a retry's wait, not once the request's callbacks (the logger, the agent's choice) have run, and never as a redirect's `Location`. Its expiry is known from the part's `expires` or from the URL's own signature: `X-Amz-Date` with `X-Amz-Expires`, `X-Files-Date` with `X-Files-Expires`, `X-Goog-Date` with `X-Goog-Expires`, or Azure's `se`. An upload instead asks for that part's grant again, at most once for its first send and once for each retry, and sends the same bytes to the new URL, calling `determinePartUploadUri` again for it. The part fails, unsent, if that URL has expired too. A part whose request storage answered with a redirect to an expired URL was sent, and may have been stored, though the redirect is never followed: it is sent again, to a renewed grant, only as a retry, counted as one, that its grant allows, and otherwise the upload fails with the expired-URL `FilesError`. A download asks the File's own context for its URL again (see [Downloads](#downloads)); `Api.sendFilePart()` fails without sending it. The check uses this machine's clock.
- **Waits that cannot be scheduled:** a wait longer than a timer allows, about 24.8 days, such as an enormous `Retry-After`, is never shortened. The request is not retried, and fails with its last response or error.
- **Unknown outcomes:** the request that completes an upload is retried only after a 429 or a failure to reach the API at all. After a server error, a broken connection or a timeout, the upload may or may not have completed. The same holds for any failure or 429 after the API answered the request with a redirect. In all of these cases the request is not sent again, and the upload rejects with that error. Check the destination before uploading again.
- **Upload parts' responses:** a part is done, and frees its place among the parts under way, only once its response's body has been read to its end, or stopped by its attempt's budget or the call's `signal`. A part storage has accepted stands whatever becomes of that body, and is never sent again for it.

`networkTimeout`, 110 seconds by default, is one budget for each attempt: it covers connecting, the response's headers and reading its body to the end, a body returned unread as a stream included. This leaves room for 30 seconds to connect and 80 to read. Such a body, from `Api.sendRequest()` or `Api.sendFilePart()`, is a Node.js stream or a WHATWG `ReadableStream`, as your HTTP client gives it, and is read only as you read it. The budget and the call's `signal` stop applying to it once it has been read to its end, has failed, or has been cancelled or destroyed. Until then, the budget stops it with a "Request timed out" `FilesError`, and the call's `signal` with the signal's reason: a WHATWG stream fails with the reason itself, whatever it is, and its source is cancelled with it; a Node.js stream fails with the reason itself when it is truthy, or else, since a Node.js stream cannot fail with `null`, `false`, `0`, `NaN` or `''`, with an `Error` named `AbortError` whose `cause` is the reason, as Node.js's own `addAbortSignal()` gives. A WHATWG stream whose source fails fails with that source's error, even before you read it, and a later abort does not replace it. A WHATWG byte stream stays a byte stream, which BYOB readers can read, and its source is read with a BYOB reader. A response without content, a 204, a 205 or one with `Content-Length: 0`, has nothing more to read: its empty body is still returned, unread, but neither applies to it once the call has resolved, so a call such as a model's `delete()` holds nothing afterwards. Each retry has its own budget, waiting between attempts counts toward none, and nothing limits a call as a whole. `timeoutSecs` changes it for one call, and 0 or less means no limit. An upload's parts have the same budget. So does each request of a File's download, through a configured `fetch` or through Node.js's `https`, which must read its response within it, the File's `timeoutSecs` or else its settings' `networkTimeout`, never extended by what arrives; a response it stops is asked for again from the bytes not yet delivered, as a broken one is. For large files, raise the File's `timeoutSecs` or its client's `networkTimeout`, or set it to 0.

To send requests with an HTTP client of your own, such as one for a corporate proxy, a custom TLS stack or instrumentation, set `fetch` to a function with the signature of the standard `fetch()`, such as Node.js's own `fetch` or a wrapper around it:

```javascript
const client = new FilesClient({
  apiKey: 'YOUR_API_KEY',
  fetch: (url, init) => instrumented(url, init), // or Node.js's own fetch
});

Files.configureNetwork({ fetch }); // for calls made without a client
await User.list({}, { fetch: otherFetch }); // for one call
```

A call's own `fetch` comes first. Otherwise a call made through a client uses the client's `fetch`, or else the SDK's own, cross-fetch: a client never uses the global setting, as it uses none of the global settings. Only a call made without a client uses the global `fetch` from `Files.configureNetwork()`, or else cross-fetch, as before. Your `fetch` sends the API's requests and requests to storage: an upload's parts, and a File's downloads when the File's own options have a `fetch`, or else its client's settings, or, for a File without a client, the global ones. Such a download asks for the whole file in one GET, never split into ranges at once, with `Accept-Encoding: identity` so that the stored bytes arrive as they are; a response that breaks is followed by one for the rest of the same version. Each request is retried as storage's requests are, and read within its attempt's budget. Without a configured `fetch`, a File's downloads use Node.js's `https` with their agent, ranges included, as before.

The SDK still follows redirects, retries, times out and logs each request itself, and chooses its agent, which it passes as `init.agent`; a client that has no use for agents ignores it. Your `fetch` must:

- leave redirects to the SDK: given `redirect: 'manual'`, resolve with the redirect's response and its `Location` instead of following it. The SDK follows each redirect itself, so that the API's credentials and workspace never reach another scheme, host or port. A response your `fetch` reports as `redirected` fails the request.
- send each request once, without retrying it itself. The SDK's retry policy decides what is sent again, such as an upload part that must not be.
- stop the request, and its response's body, once `init.signal` aborts. It aborts when the call's signal does, when the attempt's budget runs out, when a download stops early or fails, or when one of an upload's parts fails, for its other parts still under way.
- send a Node.js stream body, which comes with `duplex: 'half'`.
- reject as Node.js does for a TLS certificate that fails verification, with that `code` on the error or its `cause`, if such failures should not be retried.

A File's download takes a `signal` of its own in its options: models do not keep a call's signal.

## Uploads

Each upload has two forms: the source first, the idiomatic order, and the destination first, as the SDK has always had it. Both stay, with the same behavior; nothing guesses which string is which.

```javascript
await File.upload('local/report.csv', 'reports/report.csv');           // the same as uploadFile('reports/report.csv', 'local/report.csv')
await File.uploadFromData('hello', 'reports/hello.txt');               // uploadData('reports/hello.txt', 'hello')
await File.uploadFromStream(stream, 'reports/big.csv', {}, { size });  // uploadStream('reports/big.csv', stream, {}, { size })
await File.uploadFileToRemoteServer('local/report.csv', 1, 'report.csv'); // uploadToRemoteServer(1, 'report.csv', 'local/report.csv')
await File.uploadFileToRemoteServer('local/reports/report.csv', 1);       // to report.csv at the remote server's root
await client.files.upload('local/report.csv', 'reports/report.csv', { mkdir_parents: true });
```

`uploadFileToRemoteServer()`, `uploadFileToSnapshot()` and `uploadFileToChildSite()` take their destination path after the destination's ID; left out, or `undefined`, it is the source file's own name, at the destination's root. Any path given is used as it is.

An upload follows the [public REST upload guide](https://developers.files.com/rest/files/files/#upload-file-optimized). It begins with `begin_upload`, with the known size and `with_direct_connection_info`, then asks for its parts' grants in batches, ahead of the parts that need them, but never beyond the parts its plan, size or the grant's `available_parts` allow; a grant asked for ahead that fails, or is never used because the source ended, fails nothing, and every request for grants has settled before the upload does. It completes with `action: 'end'`, the upload's `ref` and its exact size, at the path it was started at, and with every part's `ETag` when storage returned them: an upload whose storage returned none completes without them, while one missing some part's `ETag` is refused before it completes. `mkdir_parents`, `with_rename`, `buffered_upload` and `restart` go to `begin_upload`, the others to the completion.

- **Sources.** `upload()` (and `uploadFile()`) opens the file once the upload's file has been admitted (see `maxConcurrentFiles` below) and before it begins, takes its size, reads each part at its own position and closes the file once the upload settles. `uploadFromData()` accepts a string, bytes or an `ArrayBuffer`, or an array of string or byte chunks, all of a known size. Bytes, or an array with byte chunks in it, are copied into memory of the SDK's own during the call itself, so you may change or reuse your buffers, and the array, as soon as it returns; or, when they cannot be copied now (see Buffers below), the call is refused with a `FilesError` before anything is sent. A string, or an array of strings, cannot change: each part is encoded as UTF-8 as it is read, with nothing copied beforehand, from the strings the array held at the call. A stream, or an iterable, is read only as its parts need bytes and never closed, ended or destroyed. Each chunk it gives is taken whole and copied at once, the bytes of the part being read into that part's own buffer and the rest into a copy of the SDK's own for the parts after, so changing a chunk once the upload has taken it changes nothing uploaded, a part sent again included. Its size is unknown unless `options.size` gives it, and an upload of unknown size sends its parts one at a time, in order, finding the end of the stream before asking for a grant it might not need. Transfer-specific options are checked before the source is opened or a request is sent; invalid transfer options reject with an `InvalidParameterError`, having opened nothing, copied nothing and added no listener to a stream. The request options an upload also takes keep their own behavior.
- **Parts.** With a known size and a grant that fixes no length or checksum, the SDK plans the parts: for S3, Files.com's own storage or a customer's bucket, parts of at least 8 MiB, larger to fit 10,000 parts (or a smaller `available_parts`) of at most 5 GiB, so that files over 1 TB fit; for a remote server integration or Files Agent, which the grant's valid `direct_connection_info` identifies, the API's part size, numbered with the URL's `part_number` and `part_offset`, with no 10,000-part limit. Otherwise each part is as large as its grant's `partsize`, and a grant that asks for the whole file sends it in one request.
- **Each part's request** is the grant's: its `http_method`, its exact `headers` and signed URL, never the API's credentials, workspace or your headers, and its bytes as the raw body or, when the grant has form `parameters`, as the last field of a multipart form, with its size and type where the grant's `send` places them. A binding the SDK cannot keep exactly, such as a fixed length that differs from the part's, a form `Content-Type` other than `multipart/form-data`, or one without the boundary the form needs, or two values for one field, refuses the part before anything is sent; a boundary the grant gives is kept. Each grant must keep the upload's `ref` and, when it gives a `path`, the path the upload is for, in its workspace: the one the request acts in (`workspaceId`), or that its path names as a site path (`_/Workspaces/<id>/...`), or, when neither names one, the one the API's first answer names. Within it, the path may be given as is or as the site path, or, with `with_rename`, be the file in the same folder the API renamed it to; every later grant must give that same file, and none another workspace.
- **Parallel parts** go only when the grant allows it (`parallel_parts`) and the size is known. A later grant that no longer allows it makes the rest go one at a time, in order, once the parts already sent have settled.
- **Ending.** Once a part fails or `signal` aborts, nothing more is sent or read, any wait for the stream included, and the upload's other parts still under way are stopped, even without a timeout; no other upload, of its job or not, is. The upload rejects with that first failure, or the signal's reason, unchanged, `null`, `NaN` and other falsy values included, never with the stop, once every part already sent has settled; it never completes. Retries and unknown outcomes are described under [Retries, timeouts and the HTTP client](#retries-timeouts-and-the-http-client); an error that leaves the completion's outcome unknown has `completionUnknown: true`.

## Transfer concurrency

How many part or range requests a transfer has at once is chosen by a concurrency controller that measures them: their accepted bytes, durations and the time the target was in use, with a monotonic clock. A window of attempts is judged only when the requests filled the target for most of it; its throughput, and a queue estimate from how much slower its bytes went than the fastest seen, decide what happens next.

- **Uploads to S3, `startup: 'default'`** (the default): start at one part, and add half again (ceil(n/2)) when a judged window shows no queue, keeping the raise if its second window delivers at least baseline × (1 + 0.5·d/n) with little queueing, or else withdrawing it and resting for two windows. A window of 96 MiB/s or more ends this at once. The warm start ends at the policy start, 32. An upload is to S3, Files.com's own storage or a customer's bucket, unless its first grant identifies a remote server integration or Files Agent.
- **Uploads to S3, `startup: 'aggressive'`**: start at the policy start, 32, at once.
- **Uploads to a remote server integration or Files Agent** have no warm start, whichever startup is chosen: they start at the policy start, 32, at once, and keep a controller of their own, apart from S3 uploads, within a job too.
- **All of them then follow the same ordinary policy and ceiling**: a probe of 4 more requests is kept when a window gains 1% over its level and withdrawn after two that do not; rising queueing with falling throughput backs off by 8%, down to 4 at the least; a transient failure shrinks the target by 35% and a throttle by 10%, once for all the attempts that began before it, and a throttle's `Retry-After` holds back every new admission until it is over. No choice raises the cap: `maxConcurrency` (32 by default, at most 1024), which the policy start never exceeds, and the request budget bound them all, and a grant that does not allow parallel parts sends them one at a time whatever the startup.
- **Downloads** that are split start at 8 ranges, with no warm start, and follow the same ordinary policy, measuring only network time: time spent waiting for the disk or paused is left out.
- **Fixed:** `concurrency: n` fixes an upload's parts at once, still within `maxConcurrency` when that is given too; it cannot be given with `startup`. Transfer-specific options are checked before anything is sent.

The hard budgets are separate from the controller: without a job, every transfer of the process shares 32 storage requests at once in each direction and 256 MiB of upload data, and learns on its own. A request permit is given back while a part waits to be retried, while its buffer stays held, and while a transfer is paused.

```javascript
const job = new Files.TransferJob({ maxConcurrency: 32, maxBufferBytes: 256 * 1024 * 1024, maxConcurrentFiles: 4 });
await Promise.all(paths.map(path => File.upload(path, `reports/${path}`, {}, { job })));
job.snapshot(); // { maxBufferBytes, maxConcurrency, maxConcurrentFiles, controllers: [{ key, target, phase, decisions, ... }] }
```

A `Files.TransferJob` gives the transfers given it as `options.job` budgets of their own, `maxConcurrency` requests at once in each direction (the job's configured limit, 32 by default), `maxBufferBytes` of upload data and `maxConcurrentFiles` files at once (no limit by default), and one controller for each compatible kind of transfer: the same direction, destination kind (S3 or remote), startup and concurrency options. What one file's parts teach it carries over to the next file of the job; separate jobs, and transfers without a job, never share what they learn. A job's budgets cover each transfer method from its call until it settles, an upload's own `begin_upload` and completion requests included. API calls made before a transfer, such as `File.find()` and `file.download()` that give a File its `download_uri`, are not governed by the job: to bound that whole sequence, admit it yourself, for example with a counter of your own around `download()` and `downloadToFile()`.

**Buffers.** `maxBufferBytes` is one ceiling for all the upload data the SDK holds in a job, or, without one, in the process: each byte is admitted against it before it is allocated, whatever holds it.

- **Parts** count from before they are read until they settle: each part's own buffer, unless it is a view of a copy of data in memory, and, for a grant with form fields, the form, made while that buffer still holds the part's bytes, so both count; the form's text is encoded straight into it. A renewed grant's form is made within the earlier form when it has room; one that needs more is given room only at once, within the limit, or else the upload fails with a `FilesError`. A part that does not fit waits for room.
- **Copies of data in memory**, which `uploadFromData()` makes of bytes as it is called, cannot wait: a copy is made only when the upload's file admission is free at once (`maxConcurrentFiles`), so that no upload waits for its file holding room that the uploads already admitted may need, and only when it fits in the room left, or, when it is larger than the whole budget, only while nothing else is held, so that it is held alone. Otherwise the call is refused at once with a `FilesError` saying why, before anything is copied or sent: upload the data once room or a file is free, or give it as a string, a stream or a file. Strings need no copy, and wait for their file as any upload does. A copy is held, its parts views of it, from the call until the upload settles.
- **The rest of a stream's chunk** beyond the part being read must be copied the moment the stream gives the chunk, before its size can be known. Each part read from a stream is admitted with room besides for such a rest, within the limit: the largest chunk the stream has given so far, or, before any, its buffer's `highWaterMark` for a stream of bytes. A rest larger than that room is admitted at once when it fits within the limit, or, beyond it, only while nothing but that upload's own bytes is held, as for a chunk larger than the whole budget given to an upload alone. Otherwise the upload fails with a `FilesError` before the rest is copied; the chunk it took from the stream is not kept. Give the stream in smaller chunks, or the budget more room, if that happens. A stream is read only while no other upload is beyond the limit, and the parts that then take their bytes from a rest held beyond it are admitted one at a time. Looking ahead for a stream's end takes nothing from it.

So the SDK holds at most `maxBufferBytes` of upload data, except that one upload at a time may hold more, and only while it holds the budget alone: a copy larger than the whole budget; the rest of a stream chunk, with the one part reading from it; or a part that, with its upload's own copy or chunk rest, could never fit within the whole budget, admitted only once nothing but that is held. No other part goes beyond the limit: it waits for room. Should every byte held belong to uploads waiting for room, each for room another holds, so that none could go on, the last of them to ask is refused with a `FilesError`, and its upload fails and gives its room back, rather than the budget going beyond its limit. A whole file the API asks for in one request, without a known size, holds the whole budget while it is read and fails the upload when its source is larger than half of it (give its `size` instead). An upload releases everything it holds, its file admission included, however it settles. `maxBufferBytes` covers uploads only; downloads are bounded as [Downloads](#downloads) says.

## Progress, pause and resume

```javascript
const control = new Files.TransferControl();
const onProgress = ({ bytesTransferred, totalBytes, bytesPerSecond, state }) => render(bytesTransferred, totalBytes, bytesPerSecond, state);
const upload = File.upload('local/big.iso', 'images/big.iso', {}, { control, onProgress });
control.pause();  // no new part is sent or read; parts already on the wire finish
control.resume(); // goes on where it stopped, with the same ref and the parts already stored
await upload;
```

`onProgress` receives `{ direction, bytesTransferred, bytesSent, totalBytes, bytesPerSecond, elapsedMs, state }` as the transfer starts, at most every 100 ms as bytes count, and once as it ends. `bytesTransferred` counts each byte once, when storage has accepted its part or the download's destination has it; `bytesSent` also counts parts sent again and download bytes received but not delivered. `elapsedMs` and `bytesPerSecond` use a monotonic clock and leave out the time paused. An error `onProgress` throws while the transfer runs fails it; one from the last report is ignored.

A `Files.TransferControl` pauses and resumes every transfer given it as `options.control`. Paused, a transfer sends no new request and reads no further; a request waiting for admission gives back its permit and waits, and one whose URL was being given again, or whose callbacks were running, is not sent once they find it paused. A download's request through a configured `fetch`, and each redirect of it, is checked again as it is handed to the `fetch`, once its callbacks, such as its logging and the agent's choice for its URL, have run: paused then, it waits until resumed, within its attempt's `timeoutSecs` budget, and stopped, it is not sent. A download delivers nothing more while paused, not even a chunk that arrived as it was paused: that chunk waits, and is delivered once resumed. It keeps every part stored, byte written and its upload's `ref`. Pausing is not cancelling: only the transfer's `signal` cancels it. A paused download's responses are left unread, so a long pause can make storage or a `timeoutSecs` budget end them; the download then asks again for the bytes it has not had.

## Downloads

`file.downloadToFile(path, options)`, `file.downloadToStream(writable, options)` and `file.downloadToString(options)` take `{ signal, onProgress, control, job, maxConcurrency }`. A download's `maxConcurrency` (32 by default) bounds all its storage requests at once, its first response included; the job's, or the process's, request limit bounds them too.

- **Whole response first.** The download asks for the whole file. A response other than 200 fails it with an error whose `status` is that status, none of its body written, unless a retry may answer it (a 429, 503 or other server error). A response from the Files.com web app, with an `X-Files-Frontend-App` header, is refused with a `FilesError` before any of its body reaches the file, stream or string, and so is any range response that has one.
- **Resuming.** When the response declares the file's size, a strong `ETag` and no content coding, a download that breaks asks for the rest of that same version with `Range` and `If-Match`, from the first byte not yet delivered, and accepts only exactly that range: a stream never gets a byte twice. A response of another version starts over from the first byte a file or string, which the SDK can reset, and fails a stream that already has bytes. Without such a response, only a file or a string downloads again from the first byte, and a stream that has had bytes fails.
- **Expired URLs.** A URL known to have expired by its own signature is never sent: not first, and not once a request's callbacks, its log and agent choice, have run, which all run before the last check of its stop, pause and expiry, with nothing between that check and the request. A File with a `path` gets it again from its own context, as its `download()` does: the File's options, client, credentials and workspace, with the download's `signal`, and each request goes through the agent chosen for the URL it is actually sent to. A split's range whose URL was being given again when the split ended is not sent; a renewal nothing waits for any more is stopped, and the download settles, or gets its URL again, only once that renewal's call has settled. Getting it again for a request that sent nothing is not a retry, even with `maxNetworkRetries: 0`, but stops after two renewals without a byte delivered; a redirect to an expired URL, after a request was sent, counts as a retry. A File made from a URL alone fails with the expired-URL `FilesError`. Any other refusal, such as a 403 for a URL not known to have expired, is not renewed.
- **Ranges to disk.** A file of at least 16 MiB downloaded to disk through Node's own `https.Agent` with no `maxSockets` or `maxTotalSockets` limit, as https's global agent is by default, can come in 8 MiB ranges at once: a request for the second range probes the split while the first response waits unread, and only when it answers 206 Partial Content with exactly that range of the same version within two seconds, intact, is the download split. The probe is sent only when the download's `maxConcurrency`, its first response counted, leaves room for it, so a download allowed one request is never split. The first response then gives the first range and is stopped, the probe gives the second, and each other range is asked for once the controller admits it and a request permit, the job's or process's and the download's own, is free. A range that breaks is asked for again from its first byte not yet written. Otherwise the first response gives the whole file. With any other agent, or through a configured `fetch`, the file comes one response at a time. Every request goes to storage through the download's agent with no headers but a range's `Range` and `If-Match`, never the client's credentials or headers. Through https's global agent as Node gives it, with no `highWaterMark`, `readableHighWaterMark` or `writableHighWaterMark` in its options, these requests ask any socket the agent creates for them for a `highWaterMark` of 4 MiB, without changing the agent: a backpressure threshold for that socket's buffering, not a maximum. A socket the agent already holds, or one of another agent, keeps its own.
- **Destinations.** A file is opened, and so emptied, only once the download's file has been admitted (`maxConcurrentFiles`), before anything is asked for: a download waiting for its admission, or cancelled before it is opened, even right after the call or as its admission is granted, leaves the file as it was. It is replaced, written in batches of 1 MiB at each byte's own position, and closed before the promise settles and before its admission is given back; it is not flushed to storage. A stream is written as fast as it takes the bytes, waiting for it to drain when it asks to, a wait the download's `signal` ends, ended once they all are and closed if it has `close()`; a failed download closes or destroys it. Only the stream's finish after the download has ended it completes the download: a stream another ends before then takes no more bytes, and the download fails with the first failure that follows, such as the stream's own close or the refusal of the next byte; such a stream completes it only when it had every byte already and has neither closed nor failed. An error the stream's `end()` throws fails the download with that error. A download that fails, or is cancelled, stops every request it has under way, one still waiting for its response included, and the promise settles once every request has closed and every renewal of its URL has settled, with its first failure, even when that came while the last bytes were being written.
- **Memory.** `maxBufferBytes` does not apply to downloads, no download option sets a byte limit, and the SDK states no fixed number of bytes a download may hold, as much of it is the transport's. What it does bound is how many responses it holds bytes for: each request keeps its permits, the job's or process's request limit (`maxConcurrency`, 32 per direction by default) and the download's own, from being sent until it has closed and every byte read from it has been written to the destination, a file's final batch included, or given up. So no more responses than that limit have bytes the SDK holds for them at once, however many files are under way. For each such response:
  - **The SDK's own staging** for a file is less than 1 MiB of earlier chunks, held to be written together, besides the latest chunk, kept as the transport gave it, not copied: its size, and the memory behind a chunk that is part of a larger buffer, are the transport's. A chunk that arrives while paused is held, alone, until resumed.
  - **The transport's own buffering**, the response's and its socket's, or a configured `fetch`'s body and its conversion to a Node.js stream, is as large as that transport lets it be. A `highWaterMark`, the SDK's 4 MiB for sockets of https's global agent included, is a threshold at which it stops reading ahead, not a maximum.
  - **A stream destination** is given no more once its `write()` returns `false` until it drains or the download stops; what it holds is its own, and its `highWaterMark` is a threshold too, which the latest chunk may pass.
  - **Retries.** What the SDK staged from a response is written, or given up, before that response's permits are given back, and so before a retry's request can take them; nothing of it waits for the retry. What the destination already has stays: bytes written to a file or stream, and a string's chunks, which a restart from the first byte empties.
  - **A string download** holds the whole file, which is what it returns: a copy of each chunk as it comes, then, at the end, one buffer of them all and the string decoded from it, together about twice the file's size beside the string.

## Lists, one item at a time

A list method such as `User.list()` requests every page and resolves to all of their items, unless `autoPaginate` is off. A list that pages with a cursor also has an iterator, such as `User.listIterator()` or `Folder.listForIterator()`. It takes the same arguments, gives the items one at a time, and requests a page only when its items are needed:

```javascript
for await (const user of client.users.listIterator({ per_page: 100 })) {
  if (user.getUsername() === 'admin') break; // no further page is requested
}
```

- Nothing is requested before the first item is asked for. The next page is requested only once every item of the current one has been taken, and only the current page is kept.
- The params, options and settings are taken when the iterator is created. The params are copied with their plain objects and arrays at every depth, such as a `sort_by` or `filter` map; options such as agents and functions are kept as given. The settings are a client's settings, or, for an iterator such as `User.listIterator()` made without a client, a copy of the global settings as they are then. Changing your objects or the global settings afterwards changes no page. Every page uses those settings and options, and the models keep them as the models of any client call do, including their API key, base URL and workspace; the `signal` is not kept by the models, and changing one model's headers changes no other page.
- The list method checks the params, exactly as for a list call, when the first item is asked for: params it rejects, such as an array given in their place, make that first `next()` fail before any request.
- Leaving the loop, or calling `return()`, requests nothing more. Once `options.signal` has aborted, the next `next()` rejects with the signal's reason, unchanged, even for the rest of a page already received, which is then dropped, and no further page is requested; a page request already under way is cancelled, without a retry. The iteration is then over, and later `next()` and `return()` calls report it done. An iteration that has already ended stays done when the signal aborts afterwards.
- `next()` calls are answered one at a time, in the order made. A failed request, or a page that gives back the cursor it was requested with, ends the iteration with an error.

## Waiting for copies, moves and deletions

A File's `copy()`, `move()` and `beginDelete()` resolve as soon as the API accepts them, as they always have, and the work may go on in the background. They are the File's own methods, made with its client and options, on a File a call returned or one made for a path. To wait for the work, opt in with `waitForCompletion()`, on the `FileAction` they return, or on the raw response of a copy or move helper:

```javascript
const reports = new File({ path: 'reports/2026' }, { client });
const copied = await reports.copy({ destination: 'archive/2026' });
await copied.waitForCompletion(); // resolves once the copy is confirmed complete

const deleting = await new File({ path: 'old-reports' }, { client }).beginDelete({ recursive: true });
await deleting.waitForCompletion({ timeoutMs: 10 * 60 * 1000, pollIntervalMs: 5000, signal });

const moved = await file.moveToRemoteServer(1, 'backup/report.csv'); // the API's response, as before
await moved.waitForCompletion();
```

- An action that reports a valid `file_migration_id` is waited for by polling that File Migration, at once and then every `pollIntervalMs` (1000 by default), while it is `pending` or `processing`, until it is `completed`. `failed` or `cancelled` rejects with a `FilesError` of its `failure_message`, and any other status, the schema's example `complete` included, rejects too: only `completed` is completion. An action that reports no migration has completed only when its own status is exactly `completed`, which resolves at once; any other status, or a `file_migration_id` that is not a valid ID, rejects at once. These `FilesError`s, and a timeout's, are the wait's own: they have `fileAction`, the action as reported, and, once the wait has taken a poll's answer, `fileMigration`, the migration as last taken. Anything else rejects as it came, without them: a poll's own failure, such as an authentication or network error, an invalid option's `InvalidParameterError`, and the signal's reason.
- Completion confirms the API's action or its migration. After a folder on native storage moves, the paths below it can still be updating, and the API exposes no status for that: check a particular path before relying on it.
- There is no deadline unless you give `timeoutMs`, which rejects with a `FilesError` once it runs out; each poll keeps the ordinary request budgets and retries. `signal` stops the wait at once, a poll under way, a poll's answer not yet taken, or the wait between polls, and it rejects with the signal's reason, unchanged, falsy values included: a migration found `completed` after the wait was stopped, such as by a logger aborting as that answer is logged, does not resolve it. Neither stops the action itself, which goes on.
- Every poll is sent in the context of the request that started the action: its site, API key or session, workspace and headers, at the host a lockout region mismatch rerouted it to, if any, whatever the client's or the global settings have become since. That context is kept privately, never in the model's `attributes` or `options`, nor in the response's fields. The wait never uses the signal of the call that started the action, even when the `FileAction` keeps it among the options of the File it came from: the wait takes its own.
- An ordinary `delete()` still resolves on its 204, with nothing to wait for: use `beginDelete()` when you need to know a deletion has finished.

## Files.com paths as native file handles and directories

`client.fs` offers Node.js's `fs/promises` conventions over a client's Files.com paths, so code written for Node.js's own file handles and directories can work on Files.com by using it instead of `fs.promises`:

```javascript
const handle = await client.fs.open('reports/daily.csv', 'r+');
const { bytesRead } = await handle.read(buffer, 0, 64, null); // from the handle's position, as Node.js reads
await handle.write('total', 0);                                // published to Files.com before it resolves
await handle.close();

for await (const entry of await client.fs.opendir('reports')) {
  console.log(entry.parentPath, entry.name, entry.isDirectory());
}
```

A file handle has `FileHandle`'s methods, results and lifecycle: positions, encodings, vectors, truncation, streams and `close()`. Each change uploads the whole file and resolves only once that upload has completed, and `open(path, 'w')` creates or empties the file before it resolves. A directory lists its entries a page at a time through the lazy Folder listing, as `Dir` does. The append flags (`'a'` and its kin, `O_APPEND`, and so `appendFile()` of a path with its default flag), exclusive creation, a mode for a file a call creates, owners and times, physical syncs and synchronous calls reject with a `NotImplementedError` before anything is changed; `appendFile()` given a supported non-append flag, such as `'r+'`, follows that flag, and a mode with flags that do not create the file is ignored, as Node.js ignores it. Node.js only. See [docs/Filesystem.md](docs/Filesystem.md) for every method and what each guarantees.

## Lockout region mismatch

A site pinned to a region or cipher can answer a request that reached it through another edge with a lockout region mismatch: the typed `not-authenticated/lockout-region-mismatch` 403 error, or the legacy plain-text 403, with or without a `Content-Type`, that begins `You have connected to a URL` and names the host in its `X-Files-Host` header. The SDK then sends the same request again, with its method, path, query, body, headers and credentials, to the host the mismatch names: the error's `data.host`, or else its `X-Files-Host` header.

- Only the API's own answer counts: a mismatch from the origin the request was sent to, after any redirects within that origin. Another 403, a mismatch received after a redirect to another origin, even one that later led back to the original origin without the credentials, and requests outside the API, such as an upload's parts, are never sent elsewhere.
- By default, the request is sent again only to an HTTPS Files.com host: `files.com` or one of its subdomains, on the default port. To trust a custom domain, set `trustRegionHost` to a function that receives the HTTPS origin the mismatch names and the origin the request was sent to, and returns `true` to trust it; it is not asked about Files.com hosts or about a host that is not HTTPS, which is never trusted. To handle mismatches yourself, set `followRegionMismatch: false`. Both are settings of a client, or of `Files.configureNetwork()`.
- Sending the request again counts as a retry: it shares `maxNetworkRetries` with the retries after network failures, so with `maxNetworkRetries: 0` no mismatch is followed, and it has a timeout budget of its own. Once the call's `signal` has aborted, nothing is sent again and the call rejects with the signal's reason. A body that cannot be read again, such as an attachment stream already read, is not sent again either.
- A list keeps, for every page, the context its first request was sent with: its site, headers, API key or session and workspace, whatever the client or global settings become in the meantime, even while that request is being prepared or logged. A mismatch, whichever page it answers, moves only the list's site, to the named host, for that page and every later one. A list's pages, and an iterator's, therefore all come in one context, and no cursor goes anywhere but the list's own site or the host a mismatch named. A new call uses the settings as they are when it is made.
- A request sent to its client's site with the client's own API key or session, in the client's own workspace, moves that client to the named host, and one sent with the global ones moves the global settings, as long as those settings still have that site, that credential and that workspace when the mismatch arrives: their later requests go there at once, and `getBaseUrl()` returns it. Any other request moves only its own operation: a call given an API key, session or `workspaceId` of its own, one that sends no credential, such as creating a session, and one whose settings were changed while it was under way. No other client changes.
- A mismatch that is not followed fails the call with its error, whose `regionMismatch` describes it: `host`, as the API named it, or `null`; `origin`, the HTTPS origin made of it, or `null`; `from`, the origin the request was sent to; `approved`, whether that host is trusted; and `reason`, which is `'disabled'`, `'untrusted-host'`, `'no-host'`, `'same-host'`, `'retry-budget'` or `'body-not-replayable'`. An integration that handles mismatches itself can save an approved `origin` in its own settings and use it as its `baseUrl` from then on, so that later requests avoid the mismatch.

```javascript
const client = new FilesClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://files.example.com',
  trustRegionHost: origin => origin === 'https://files-eu.example.com',
});
```

## Attachments

Some API parameters take a file, such as `attachment_file` when creating a behavior. Pass the file as an `Attachment`. The SDK sends it inside the request's JSON body as a file object with `encoded_content` and, when given, `filename` and `type`, alongside the request's other parameters, which are sent unchanged.

```javascript
import { readFile } from 'node:fs/promises';
import Attachment from 'files.com/lib/Attachment';
import Behavior from 'files.com/lib/models/Behavior';

const behavior = await Behavior.create({
  path: 'invoices',
  behavior: 'watermark',
  value: { gravity: 'SouthEast', max_height_or_width: 20, transparency: 25 },
  attachment_file: new Attachment(await readFile('watermark.png'), { filename: 'watermark.png', type: 'image/png' }),
});
```

`new Attachment(source, { filename, type, maxBytes })` accepts a `Buffer` or other `Uint8Array`, or a Node.js `Readable` stream of bytes, such as one from `fs.createReadStream`. A string is never treated as a file path. `filename` and `type` are sent exactly as given.

- **Limits:** `maxBytes` limits each attachment and defaults to 64 MiB (`Attachment.DEFAULT_MAX_BYTES`), so a request sends at most the sum of its attachments' limits. A `Buffer` over its limit is refused when the `Attachment` is created. A stream is refused as soon as the bytes it has ready would pass its limit; those bytes are not read. The file is read and encoded at most 48 KiB at a time and is never held as one Base64 string, so encoding itself needs well under 1 MiB of memory. That figure does not include your source and its buffers, or the JSON of the request's other parameters.
- **Ownership:** The source still belongs to you. The SDK does not copy a `Buffer` or `Uint8Array`, so leave its bytes unchanged until the request finishes. A stream is read from its current position, only while its request is sending it, and only bytes the stream already has ready; the SDK never leaves a read waiting. When the request ends, by a response, an error or a timeout, the SDK stops reading at once, so every later chunk stays in the stream for you. The SDK never closes, rewinds or destroys a stream. Bytes it read before a request failed are not put back.
- **One request at a time:** A stream belongs to a single request from the moment the request is made until it ends. Another request with the same stream throws an `InvalidParameterError` before anything is sent. Once any of a stream has been read, its `Attachment` cannot be sent again; a stream that was never read can be sent by a later request.
- **Retries:** A request whose attachments are all `Buffer` or `Uint8Array` sources is retried after a network error like any other request, with the same bytes. A stream can be read only once, so after a request has read any of it, a network error is not retried and the request fails with that error. To try again, create a new stream and `Attachment`.
- **Early answers:** If the server answers before the whole body is sent, the SDK stops sending at once and leaves the rest of the stream unread. It reads the whole answer and returns it, then closes that request's connection itself, so a half-sent request is never left open or reused, even with a keep-alive agent.
- **Errors:** An invalid source, filename, type or limit throws an `InvalidParameterError` before anything is read. A stream that fails, or passes its limit, while the request is being sent ends the request with a `FilesError` carrying the stream's error message.
- **Transfer:** A body whose attachments are all `Buffer` or `Uint8Array` sources is sent with its exact `Content-Length`; a body with a stream is sent with chunked transfer encoding. As with other streamed request bodies, a redirect other than 303 See Other is not followed.

Attachments require Node.js 22 or later and its `Readable` streams; they are not supported in browsers.

## Introduction

The Files.com JavaScript SDK provides convenient access to all aspects of Files.com from applications written in JavaScript.

This includes directly working with files and folders as well as performing management tasks such as adding/removing users, onboarding counterparties, retrieving information about automations and more.

The JavaScript SDK uses the Files.com RESTful APIs via the HTTPS protocol (port 443) to securely communicate and transfer files so no firewall changes should be required in order to allow connectivity to Files.com.

### JavaScript is a Core Focus at Files.com

This SDK is used internally by several Files.com integrations that we maintain, and we work hard to ensure that it is always up to date and performant.

It is also a very popular choice for Files.com customers looking to integrate with Files.com.

### Installation

To install the package, use `yarn` or `npm`:

```shell
yarn add files.com
```

or

```shell
npm install files.com
```

### Usage

#### Import and Initialize

```js
import Files from "files.com/lib/Files.js";
```

##### `require()` vs. `import`

The examples provided in the documentation here use the newer ES6 `import` syntax. To
instead use the older CommonJS module syntax with `require()`, ensure that `.default`
is included. For example:

```js
const Files = require("files.com/lib/Files.js").default;
const User = require("files.com/lib/models/User.js").default;

// destructure to directly assign a named export
const { LogLevel } = require("files.com/lib/Logger.js").default;
```

Explore the [files-sdk-javascript](https://github.com/Files-com/files-sdk-javascript) code on GitHub.

### Getting Support

The Files.com Support team provides official support for all of our official Files.com integration tools.

To initiate a support conversation, you can send an [Authenticated Support Request](https://www.files.com/docs/overview/requesting-support) or simply send an E-Mail to support@files.com.

## Authentication

There are two ways to authenticate: API Key authentication and Session-based authentication.

### Authenticate with an API Key

Authenticating with an API key is the recommended authentication method for most scenarios, and is
the method used in the examples on this site.

To use an API Key, first generate an API key from the [web
interface](https://www.files.com/docs/sdk-and-apis/api-keys) or [via the API or an
SDK](https://developers.files.com/javascript/resources/developers/api-keys).

Note that when using a user-specific API key, if the user is an administrator, you will have full
access to the entire API. If the user is not an administrator, you will only be able to access files
that user can access, and no access will be granted to site administration functions in the API.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

Files.setApiKey('YOUR_API_KEY');

try {
  // Alternatively, you can specify the API key on a per-object basis in the second parameter to a model constructor.
  const user = new User(params, { apiKey: 'YOUR_API_KEY' });

  // You may also specify the API key on a per-request basis in the final parameter to static methods.
  await User.find(id, params, { apiKey: 'YOUR_API_KEY' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

Don't forget to replace the placeholder, `YOUR_API_KEY`, with your actual API key.

### Authenticate with a Session

You can also authenticate by creating a user session using the username and
password of an active user. If the user is an administrator, the session will have full access to
all capabilities of Files.com. Sessions created from regular user accounts will only be able to access files that
user can access, and no access will be granted to site administration functions.

Sessions use the exact same session timeout settings as web interface sessions. When a
session times out, simply create a new session and resume where you left off. This process is not
automatically handled by our SDKs because we do not want to store password information in memory without
your explicit consent.

#### Logging In

To create a session, the `create` method is called on the `Session` object with the user's username and
password.

This returns a session object that can be used to authenticate SDK method calls.

```javascript title="Example Request"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  const session = await Session.create({ username: 'motor', password: 'vroom' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

#### Using a Session

Once a session has been created, you can store the session globally, use the session per object, or use the session per request to authenticate SDK operations.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

// You may set the returned session ID to be used by default for subsequent requests.
Files.setSessionId(session.id);

try {
  // Alternatively, you can specify the session ID on a per-object basis in the second parameter to a model constructor.
  const user = new User(params, { session_id: session.id });

  // You may also specify the session ID on a per-request basis in the final parameter to static methods.
  await User.find(id, params, { session_id: session.id });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

The `sessionId` option is also supported. An explicit per-request or per-object
`apiKey` takes precedence over session authentication. Otherwise, a session takes
precedence over the globally configured API key.

#### Logging Out

User sessions can be ended calling the `destroy` method on the `session` object.

```javascript title="Example Request"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  await Session.destroy();
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Configuration

Global configuration is performed by calling methods on the `Files` object.

### Configuration Options

#### Base URL

Set this to the full https:// URL of your Files.com subdomain (e.g. `https://MY-SUBDOMAIN.files.com`).
This is not required in most cases, but one benefit of setting it is that it ensures that authentication failures will be logged to your site's API logs.  Without setting this, we won't know which site to associate the authentication failure with, and it won't be logged to your site's API logs.
This is always required if your site is configured to disable global acceleration.
This can also be set to use a mock server in development or CI.

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.setBaseUrl("https://MY-SUBDOMAIN.files.com");
```

#### Log Level

Supported values:

* LogLevel.NONE
* LogLevel.ERROR
* LogLevel.WARN
* LogLevel.INFO (default)
* LogLevel.DEBUG

```javascript title="Example setting"
import Files from 'files.com/lib/Files';
import { LogLevel } from 'files.com/lib/Logger';

Files.setLogLevel(LogLevel.INFO);
```

#### Debugging

Enable debug logging of API requests and/or response headers. Both settings default to `false`.

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.configureDebugging({
  debugRequest: true,
  debugResponseHeaders: true,
});
```

#### Network Settings

`networkTimeout` (in seconds, 110 by default) limits each attempt of a request as one budget, from sending it until its
response body has been read to its end; 0 or less sets no limit. An attempt that runs out of time before its response
arrives is retried like a network failure, up to `maxNetworkRetries`, and one whose body stops arriving fails with a
"Request timed out" `FilesError`. Each retry has a budget of its own, and the wait between attempts counts toward none.
Nothing limits a call as a whole: give it a `signal` in its options, such as `AbortSignal.timeout(milliseconds)`, for
that.

Aborting a call's `signal` stops its requests at once, a wait before a retry included, and starts no further attempt.
The call rejects with the signal's reason, unchanged, or, when the runtime gives none, an `Error` named `AbortError`.

A body that a call returns unread, as a stream, stays within its attempt until it has been read to its end: if the
budget runs out, or the signal is aborted, before then, the call has already resolved, so the stream is stopped and
fails with an error instead.

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.configureNetwork({
  // max retries (default: 3)
  maxNetworkRetries: 3,

  // minimum delay in seconds before retrying (default: 0.1)
  minNetworkRetryDelay: 0.1,

  // max delay in seconds before retrying (default: 1.5)
  maxNetworkRetryDelay: 1.5,

  // network timeout in seconds (default: 110.0)
  networkTimeout: 110.0,

  // auto-fetch all pages when results span multiple pages (default: `true`)
  autoPaginate: true,
});
```

## Sort and Filter

Several of the Files.com API resources have list operations that return multiple instances of the
resource. The List operations can be sorted and filtered.

### Sorting

To sort the returned data, pass in the ```sort_by``` method argument.

Each resource supports a unique set of valid sort fields and can only be sorted by one field at a
time.

The argument value is a Javascript object that has a property of the resource field name sort on and
a value of either ```"asc"``` or ```"desc"``` to specify the sort order.

#### Special note about the List Folder Endpoint

For historical reasons, and to maintain compatibility
with a variety of other cloud-based MFT and EFSS services, Folders will always be listed before Files
when listing a Folder.  This applies regardless of the sorting parameters you provide.  These *will* be
used, after the initial sort application of Folders before Files.

```javascript title="Sort Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users, sorted by username in ascending order.
  const users = await User.list({
    sort_by: { username: "asc" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

### Filtering

Filters apply selection criteria to the underlying query that returns the results. They can be
applied individually or combined with other filters, and the resulting data can be sorted by a
single field.

Each resource supports a unique set of valid filter fields, filter combinations, and combinations of
filters and sort fields.

The passed in argument value is a Javascript object that has a property of the resource field name
to filter on and a passed in value to use in the filter comparison.

#### Filter Types

| Filter | Type | Description |
| --------- | --------- | --------- |
| `filter` | Exact | Find resources that have an exact field value match to a passed in value. (i.e., FIELD_VALUE = PASS_IN_VALUE). |
| `filter_prefix` | Pattern | Find resources where the specified field is prefixed by the supplied value. This is applicable to values that are strings. |
| `filter_gt` | Range | Find resources that have a field value that is greater than the passed in value.  (i.e., FIELD_VALUE > PASS_IN_VALUE). |
| `filter_gteq` | Range | Find resources that have a field value that is greater than or equal to the passed in value.  (i.e., FIELD_VALUE >=  PASS_IN_VALUE). |
| `filter_lt` | Range | Find resources that have a field value that is less than the passed in value.  (i.e., FIELD_VALUE < PASS_IN_VALUE). |
| `filter_lteq` | Range | Find resources that have a field value that is less than or equal to the passed in value.  (i.e., FIELD_VALUE \<= PASS_IN_VALUE). |

```javascript title="Exact Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users who are not site admins.
  const users = await User.list({
    filter: { not_site_admin: true }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Range Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users who have logged in on or after 2024-01-01.
  const users = await User.list({
    filter_gteq: { last_login_at: "2024-01-01" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Pattern Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users whose usernames start with 'test'.
  const users = await User.list({
    filter_prefix: { username: "test" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Combination Filter with Sort Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users whose usernames start with 'test' and are not site admins, sorted by last login date.
  const users = await User.list({
    filter_prefix: { username: "test" },
    filter: { not_site_admin: true },
    sort_by: { last_login_at: "asc" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Paths

Files.com preserves the spelling of file and folder paths while comparing them using shared case and Unicode rules. Use the SDK comparison helpers when matching paths locally.
<div></div>

### Capitalization

Files.com uses case-insensitive path matching based on its fixed Unicode comparison map.

For example, the following paths have the same comparison key:

| Path Variant                          | Comparison Key              |
|---------------------------------------|------------------------------|
| `Documents/Reports/Q1.pdf`            | `documents/reports/q1.pdf`  |
| `documents/reports/q1.PDF`            | `documents/reports/q1.pdf`  |
| `DOCUMENTS/REPORTS/Q1.PDF`            | `documents/reports/q1.pdf`  |

This behavior applies across:
- API requests
- Folder and file lookup operations
- Automations and workflows

See also: [Case Sensitivity Documentation](https://www.files.com/docs/files-and-folders/case-sensitivity/)

The `pathNormalizer.same` function in the Files.com SDK is designed to help you determine if two paths on
your native file system would be considered the same on Files.com. This is particularly important
when handling errors related to duplicate file names and when developing tools for folder
synchronization.

```javascript title="Compare Case-Insensitive Files and Paths"
import { pathNormalizer } from 'files.com/lib/utils';

if (pathNormalizer.same('Fïłèńämê.Txt', 'filename.txt')) {
  // the paths are the same
}
```

### Slashes

Use `/` between folder and file names, without leading or trailing slashes. SDK normalization helpers convert backslashes to `/`, remove duplicate separators, and discard exact `.` and `..` components. Discarding `..` leaves the preceding folder name intact.

| Input | Normalized path |
|-------|-----------------|
| `folder/subfolder/file.txt` | `folder/subfolder/file.txt` |
| `/folder/subfolder/file.txt` | `folder/subfolder/file.txt` |
| `folder/subfolder/file.txt/` | `folder/subfolder/file.txt` |
| `//folder//file.txt` | `folder/file.txt` |
| `folder/../file.txt` | `folder/file.txt` |

<div></div>

### Unicode and Path Comparison

Files.com compares paths using a fixed mapping shared by the server and SDKs. It treats case and many accent differences as equivalent: `Résumé.txt` and `resume.txt` identify the same file, as do `q` followed by a combining acute accent and `q`. The mapping also handles other equivalences, such as Hiragana and Katakana. Lowercasing or applying a standard Unicode normalization form alone does not reproduce these rules.

SDK comparison helpers normalize path separators and dot segments, then apply the bundled [versioned comparison map](https://github.com/Files-com/files-sdk-javascript/blob/master/shared/path_comparison.json). The [shared examples](https://github.com/Files-com/files-sdk-javascript/blob/master/shared/comparison_examples.json) give exact comparison results for integrations that implement their own matching. The map uses hexadecimal Unicode scalar values as keys: a missing entry preserves the character, an empty replacement removes it, and other replacements may contain several characters. Apply each replacement once without normalizing or lowercasing the result again.

Use comparison results only for matching. Send the original path spelling in API requests and preserve it for display and local filenames; comparison results can have a different spelling or length.

Trailing whitespace is significant for comparison. `report.txt` and `report.txt ` are different file paths, and SDK helpers preserve spaces, tabs, and newlines. Folder names cannot end in whitespace. See [Unicode Normalization](https://www.files.com/docs/files-and-folders/file-system-semantics/unicode-normalization) for the complete path rules.

<div></div>

## Workspaces

A Workspace groups files, users, groups, Partners, integrations, and workflows within a Files.com Site. An integration can provision a Workspace for a department or project and delegate its operation to a team without making that team Site Administrators. Every Site has a Default Workspace, with ID `0`; additional Workspaces have their own IDs and root folders.

Account membership, request context, and permission grants serve different purposes. Creating an account in a Workspace determines where it belongs. Selecting a Workspace determines which resources a request operates on. A permission grant determines what the caller can do there. Selecting a Workspace never grants access to it.

### Accounts and Administrative Access

A user's or group's `workspace_id` identifies the Workspace the account belongs to. Accounts belonging to a Custom Workspace stay within it. Default Workspace users and groups can receive permissions in one or more Custom Workspaces while keeping their existing accounts in Workspace `0`.

| Account | Workspace Administrator assignment | Scope |
| --- | --- | --- |
| User belonging to a Custom Workspace | Set the user's `workspace_admin` to `true`. | That user's own Custom Workspace. |
| Default Workspace user | Create an `admin` Permission for the user on a Custom Workspace's root folder. | Each Custom Workspace with a root grant. |
| Default Workspace group | Create an `admin` Permission for the group on a Custom Workspace's root folder. | Every member inherits administration of each Workspace with a root grant. |

`workspace_admin` is not a summary of a user's effective administrative access. A Default Workspace user can administer a Custom Workspace through a direct or group root grant while their `workspace_admin` remains `false`. Groups have no `workspace_admin` field. See [Users](https://developers.files.com/javascript/resources/user-accounts/users) and [Groups](https://developers.files.com/javascript/resources/user-accounts/groups) for account fields.

An `admin` grant on the **Custom Workspace root** provides full Workspace Administrator authority over its files, users, groups, Partners, workflows, and integrations. An `admin` grant on a subfolder provides Folder Admin authority over that folder and its descendants; it does not provide Workspace administration. Other permission levels provide their corresponding folder access without Workspace administration. [Permissions](https://developers.files.com/javascript/resources/user-accounts/permissions) defines the levels.

Site Administrators manage cross-Workspace assignments to Default Workspace accounts. Workspace Administrators manage accounts and permissions within their own scope. Site Administrators retain access to every Workspace; adding a Workspace grant does not narrow Site Administrator authority. The [product documentation](https://www.files.com/docs/workspaces/workspace-administrators) explains the administrator's operational scope and site-wide controls.

### Request Context and API Keys

You can include the `X-Files-Workspace-Id` REST header to select a Workspace for a request. SDK request options and CLI configuration send that same selection. When a Workspace is selected, Workspace-scoped resources are listed, created, and changed within that context, and ordinary paths are relative to its root.

A resource's `workspace_id` request field describes the resource's Workspace membership. It is separate from the SDK's Workspace request option or REST header. Creating a Workspace-scoped resource in a Custom Workspace defaults its `workspace_id` to the selected Workspace; a mismatching membership value is rejected with `not-authorized/insufficient-permission-for-params`.

Selecting another Workspace with an API key requires a **Full Access key created in the Default Workspace**. A user key follows that user's current access, including group permissions. A site-wide Full Access key created in the Default Workspace has Site Administrator authority in every Workspace. A Files Only key stays in its creation Workspace, even if its user has cross-Workspace access. Any key created in a Custom Workspace stays within that Workspace. Selecting another context with these confined keys is rejected with `bad-request/invalid-workspace-id-header`.

An account belonging to a Custom Workspace is scoped there when it authenticates normally. For a Default Workspace user, explicitly select the intended Workspace for an integration rather than relying on an interactive login preference. [API Keys](https://developers.files.com/javascript/resources/developers/api-keys) and [Authentication](https://developers.files.com/javascript/overview/authentication) cover credentials.

The Files.com JavaScript SDK supports workspace scoping by using the `Files.setWorkspaceId` configuration method. Scope a single request by passing `workspaceId` in the request options.

The adjacent scoping example uses a credential authorized for the selected Workspace. A group member uses their own Full Access user key from the Default Workspace; the Site Administrator credential used to assign the grant is not needed for their day-to-day work.

```javascript title="Example Request"
import Folder from "files.com/lib/models/Folder"
import Files from "files.com"

Files.setWorkspaceId(123)

Folder.listFor("/", {}, { workspaceId: 456 })
```

### Delegating a Workspace to an Existing Group

An operations team already represented by a Default Workspace group can administer a Custom Workspace through one root Permission. The group and its members stay in the Default Workspace, so the same team can receive different access in other Workspaces.

First retrieve the target [Workspace](https://developers.files.com/javascript/resources/settings/workspaces) and [Group](https://developers.files.com/javascript/resources/user-accounts/groups) IDs as a Site Administrator in Workspace `0`. The examples use Workspace `123`, group `456`, and member user `789`; replace them with your own IDs. Confirm that the group belongs to Workspace `0` and that the intended user is a member.

Create the Permission using a Default Workspace Full Access site-wide key or a Full Access user key belonging to a Site Administrator. Keep the request context at `0` and use the qualified root path `_/Workspaces/123`. Set `group_id` to the group's ID, `permission` to `admin`, and `recursive` to `true`. Save the returned Permission `id` for later removal. For an individual Default Workspace user, use `user_id` instead of `group_id`.

For a Default Workspace group, a Site Administrator can also select Workspace `123` and use an empty `path` to grant access to its root. The qualified path in Workspace `0` works for both Default Workspace users and groups and keeps the account scope and target Workspace explicit. Appending a subfolder to the path would grant Folder Admin access instead of Workspace Administrator authority.

After the grant, make a request as the member, using their own credential with Workspace `123` selected, such as listing that Workspace's root folder. That member can work with the Workspace's files and perform Workspace Administrator operations, such as managing its users, Partners, and integrations. A Site Administrator's successful request does not establish that the member has the intended access.

```javascript title="Grant group administration"
import Files from 'files.com'
import Permission from 'files.com/lib/models/Permission.js'

Files.setWorkspaceId(0)
const grant = await Permission.create({
  path: '_/Workspaces/123',
  group_id: 456,
  permission: 'admin',
  recursive: true,
}, { workspaceId: 0 })
console.log(grant.id)
```

### Permission Inspection and Removal

List the member's Permissions with `user_id` and `include_groups=true` to include grants inherited through group membership. Listing only direct user grants can miss the Permission that provides Workspace administration. In Workspace `0`, the Custom Workspace root appears as `_/Workspaces/123`; in Workspace `123`, paths are relative to that root. Inspect the root path and `permission=admin`, rather than treating the user's `workspace_admin` field as their effective administrative access.

Permission lists show individual grants, rather than a single flag for effective administrative access. Membership in several groups combines their access. A Permission using `group_ids` instead of `group_id` requires membership in all the specified groups; it is not a shorthand for assigning the same grant to several independent groups.

Removing a member ends access received through that group. Deleting the root Permission ends the group's Workspace Administrator grant for every member. These changes leave independent direct and other group grants in place, so review all applicable grants when withdrawing access. Default Workspace user API keys follow those permission changes without being recreated.

Group membership maintained through SCIM follows the same rule. A Group Admin allowed to add members can give those users the group's existing Workspace Administrator access. Choose who manages the group with that authority in mind.

Delete the Permission by its returned `id` as the Site Administrator in Workspace `0`. The removal examples use Permission ID `9001`; replace it with the ID returned by your create request. Permissions are created and deleted, rather than updated in place. If narrower folder access is still needed, assign it explicitly; deleting a broad grant does not restore narrower grants it previously replaced.

```javascript title="Inspect member grants and remove the group grant"
const grants = await Permission.list(
  { user_id: '789', include_groups: true }, { workspaceId: 0 }
)
await new Permission({ id: 9001 }, { workspaceId: 0 }).delete()
```

## Foreign Language Support

The Files.com Javascript SDK supports localized responses by using the `Files.setLanguage()` configuration method.
When configured, this guides the API in selecting a preferred language for applicable response content.

Language support currently applies to select human-facing fields only, such as notification messages
and error descriptions.

If the specified language is not supported or the value is omitted, the API defaults to English.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';

Files.setLanguage('es');
```

## Errors

The Files.com JavaScript SDK will return errors by raising exceptions. There are many exception classes defined in the Files SDK that correspond
to specific errors.

The raised exceptions come from two categories:

1.  SDK Exceptions - errors that originate within the SDK
2.  API Exceptions - errors that occur due to the response from the Files.com API.  These errors are grouped into common error types.

There are several types of exceptions within each category.  Exception classes indicate different types of errors and are named in a
fashion that describe the general premise of the originating error.  More details can be found in the exception object message using the
`message` attribute.

Use standard Javascript exception handling to detect and deal with errors.  It is generally recommended to catch specific errors first, then
catch the general `FilesError` exception as a catch-all.

```javascript title="Example Error Handling"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  const session = await Session.create({ username: 'USERNAME', password: 'BADPASSWORD' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

### Error Types

#### SDK Errors

SDK errors are general errors that occur within the SDK code.  These errors generate exceptions.  Each of these
exception classes inherit from a standard `FilesError` base class.

```javascript title="Example SDK Exception Class Inheritance Structure"
import * as FilesErrors from 'files.com/lib/Errors'

FilesErrors.ConfigurationError ->
FilesErrors.FilesError ->
Error
```
##### SDK Exception Classes

| Exception Class Name| Description |
| --------------- | ------------ |
| `ConfigurationError`| Invalid SDK configuration parameters |
| `EmptyPropertyError`| Missing a required property |
| `InvalidParameterError`| A passed in parameter is invalid |
| `MissingParameterError`| A method parameter is missing |
| `NotImplementedError`| The called method has not be implemented by the SDK |

#### API Errors

API errors are errors returned by the Files.com API.  Each exception class inherits from an error group base class.
The error group base class indicates a particular type of error.

```javascript title="Example API Exception Class Inheritance Structure"
import * as FilesErrors from 'files.com/lib/Errors'

FilesErrors.NotAuthorized_FolderAdminPermissionRequiredError ->
FilesErrors.NotAuthorizedError ->
FilesErrors.FilesApiError  ->
FilesErrors.FilesError  ->
Error
```
##### API Exception Classes

| Exception Class Name | Error Group |
| --------- | --------- |
|     `BadRequest_AgentUpgradeRequiredError`|  `BadRequestError` |
|     `BadRequest_AttachmentTooLargeError`|  `BadRequestError` |
|     `BadRequest_CannotDownloadDirectoryError`|  `BadRequestError` |
|     `BadRequest_CantMoveWithMultipleLocationsError`|  `BadRequestError` |
|     `BadRequest_DatetimeParseError`|  `BadRequestError` |
|     `BadRequest_DestinationSameError`|  `BadRequestError` |
|     `BadRequest_DestinationSiteMismatchError`|  `BadRequestError` |
|     `BadRequest_DoesNotSupportSortingError`|  `BadRequestError` |
|     `BadRequest_FolderMustNotBeAFileError`|  `BadRequestError` |
|     `BadRequest_FoldersNotAllowedError`|  `BadRequestError` |
|     `BadRequest_InternalGeneralErrorError`|  `BadRequestError` |
|     `BadRequest_InvalidBodyError`|  `BadRequestError` |
|     `BadRequest_InvalidCursorError`|  `BadRequestError` |
|     `BadRequest_InvalidCursorTypeForSortError`|  `BadRequestError` |
|     `BadRequest_InvalidEtagsError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterAliasCombinationError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterFieldError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamFormatError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamValueError`|  `BadRequestError` |
|     `BadRequest_InvalidInputEncodingError`|  `BadRequestError` |
|     `BadRequest_InvalidInterfaceError`|  `BadRequestError` |
|     `BadRequest_InvalidOauthProviderError`|  `BadRequestError` |
|     `BadRequest_InvalidPathError`|  `BadRequestError` |
|     `BadRequest_InvalidReturnToUrlError`|  `BadRequestError` |
|     `BadRequest_InvalidSearchQueryError`|  `BadRequestError` |
|     `BadRequest_InvalidSortFieldError`|  `BadRequestError` |
|     `BadRequest_InvalidSortFilterCombinationError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadOffsetError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadPartGapError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadPartSizeError`|  `BadRequestError` |
|     `BadRequest_InvalidWorkspaceIdHeaderError`|  `BadRequestError` |
|     `BadRequest_MethodNotAllowedError`|  `BadRequestError` |
|     `BadRequest_MultipleSortParamsNotAllowedError`|  `BadRequestError` |
|     `BadRequest_NoValidInputParamsError`|  `BadRequestError` |
|     `BadRequest_OffsetUploadNotAllowedWithMalwareScanningError`|  `BadRequestError` |
|     `BadRequest_PartNumberTooLargeError`|  `BadRequestError` |
|     `BadRequest_PathCannotHaveTrailingWhitespaceError`|  `BadRequestError` |
|     `BadRequest_ReauthenticationNeededFieldsError`|  `BadRequestError` |
|     `BadRequest_RequestBodyTooLargeError`|  `BadRequestError` |
|     `BadRequest_RequestParamsContainInvalidCharacterError`|  `BadRequestError` |
|     `BadRequest_RequestParamsInvalidError`|  `BadRequestError` |
|     `BadRequest_RequestParamsRequiredError`|  `BadRequestError` |
|     `BadRequest_SearchAllOnChildPathError`|  `BadRequestError` |
|     `BadRequest_UnrecognizedSortIndexError`|  `BadRequestError` |
|     `BadRequest_UnsupportedCurrencyError`|  `BadRequestError` |
|     `BadRequest_UnsupportedHttpResponseFormatError`|  `BadRequestError` |
|     `BadRequest_UnsupportedMediaTypeError`|  `BadRequestError` |
|     `BadRequest_UserIdInvalidError`|  `BadRequestError` |
|     `BadRequest_UserIdOnUserEndpointError`|  `BadRequestError` |
|     `BadRequest_UserRequiredError`|  `BadRequestError` |
|     `NotAuthenticated_AdditionalAuthenticationRequiredError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_ApiKeySessionsNotSupportedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_AuthenticationRequiredError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_BundleRegistrationCodeFailedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InboxRegistrationCodeFailedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidCredentialsError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidOauthError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidOrExpiredCodeError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidSessionError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidUsernameOrPasswordError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_LockedOutError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_LockoutRegionMismatchError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_OneTimePasswordIncorrectError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_TwoFactorAuthenticationErrorError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_TwoFactorAuthenticationSetupExpiredError`|  `NotAuthenticatedError` |
|     `NotAuthorized_ApiKeyIsDisabledError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyIsPathRestrictedError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForDesktopAppError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForFileOperationsError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForMobileAppError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForOfficeIntegrationError`|  `NotAuthorizedError` |
|     `NotAuthorized_BillingInformationHiddenError`|  `NotAuthorizedError` |
|     `NotAuthorized_BillingPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_BundleMaximumUsesReachedError`|  `NotAuthorizedError` |
|     `NotAuthorized_BundlePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_CannotAdministerHigherLevelUserError`|  `NotAuthorizedError` |
|     `NotAuthorized_CannotLoginWhileUsingKeyError`|  `NotAuthorizedError` |
|     `NotAuthorized_CantActForOtherUserError`|  `NotAuthorizedError` |
|     `NotAuthorized_ContactAdminForPasswordChangeHelpError`|  `NotAuthorizedError` |
|     `NotAuthorized_FilesAgentFailedAuthorizationError`|  `NotAuthorizedError` |
|     `NotAuthorized_FolderAdminOrBillingPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_FolderAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_FullPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_HistoryPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_InAppAiAssistantUnavailableError`|  `NotAuthorizedError` |
|     `NotAuthorized_InsufficientPermissionForParamsError`|  `NotAuthorizedError` |
|     `NotAuthorized_InsufficientPermissionForSiteError`|  `NotAuthorizedError` |
|     `NotAuthorized_MoverAccessDeniedError`|  `NotAuthorizedError` |
|     `NotAuthorized_MoverPackageRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_MustAuthenticateWithApiKeyError`|  `NotAuthorizedError` |
|     `NotAuthorized_NeedAdminPermissionForInboxError`|  `NotAuthorizedError` |
|     `NotAuthorized_NonAdminsMustQueryByFolderOrPathError`|  `NotAuthorizedError` |
|     `NotAuthorized_NotAllowedToCreateBundleError`|  `NotAuthorizedError` |
|     `NotAuthorized_NotEnqueuableSyncError`|  `NotAuthorizedError` |
|     `NotAuthorized_PasswordChangeNotRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_PasswordChangeRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_PaymentMethodErrorError`|  `NotAuthorizedError` |
|     `NotAuthorized_PreviewOnlyPermissionCannotDownloadError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReadOnlySessionError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReadPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationFailedError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationFailedFinalError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationNeededActionError`|  `NotAuthorizedError` |
|     `NotAuthorized_RecaptchaFailedError`|  `NotAuthorizedError` |
|     `NotAuthorized_RemoteDesktopDebugLoggingDisabledError`|  `NotAuthorizedError` |
|     `NotAuthorized_RootFolderBehaviorSiteAdminRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_RootFolderBehaviorSkipSiteAdminRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SelfManagedRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminOrPartnerAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminOrWorkspaceAdminOrFolderAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminOrWorkspaceAdminOrPartnerAdminOrFolderAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminOrWorkspaceAdminOrPartnerAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminOrWorkspaceAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteFilesAreImmutableError`|  `NotAuthorizedError` |
|     `NotAuthorized_TwoFactorAuthenticationRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_UserIdWithoutSiteAdminError`|  `NotAuthorizedError` |
|     `NotAuthorized_WriteAndBundlePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_WritePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotFound_ApiKeyNotFoundError`|  `NotFoundError` |
|     `NotFound_BundlePathNotFoundError`|  `NotFoundError` |
|     `NotFound_BundleRegistrationNotFoundError`|  `NotFoundError` |
|     `NotFound_CodeNotFoundError`|  `NotFoundError` |
|     `NotFound_FileNotFoundError`|  `NotFoundError` |
|     `NotFound_FileUploadNotFoundError`|  `NotFoundError` |
|     `NotFound_GroupNotFoundError`|  `NotFoundError` |
|     `NotFound_InboxNotFoundError`|  `NotFoundError` |
|     `NotFound_NestedNotFoundError`|  `NotFoundError` |
|     `NotFound_PlanNotFoundError`|  `NotFoundError` |
|     `NotFound_SiteNotFoundError`|  `NotFoundError` |
|     `NotFound_UserNotFoundError`|  `NotFoundError` |
|     `ProcessingFailure_AgentPushUpdateBlockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_AgentUnavailableError`|  `ProcessingFailureError` |
|     `ProcessingFailure_AiTaskCannotBeRunManuallyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_AlreadyCompletedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_AutomationCannotBeRunManuallyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BehaviorNotAllowedOnRemoteServerError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BufferedUploadDisabledForThisDestinationError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BundleOnlyAllowsPreviewsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BundleOperationRequiresSubfolderError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ConfigurationLockedPathError`|  `ProcessingFailureError` |
|     `ProcessingFailure_CouldNotCreateParentError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationExistsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationFolderLimitedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationParentConflictError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationParentDoesNotExistError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExceededRuntimeLimitError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpectationAlreadyHasOpenWindowError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpectationNotManualTriggerError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpiredPrivateKeyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpiredPublicKeyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExportFailureError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExportNotReadyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FailedToChangePasswordError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileNotUploadedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FilePendingProcessingError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileProcessingErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileTooBigToDecryptError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileTooBigToEncryptError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileUploadedToWrongRegionError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FilenameTooLongError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FolderLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FolderNotEmptyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_HistoryUnavailableError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidBundleCodeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidFileTypeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidFilenameError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidPriorityColorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidRangeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidSiteError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidZipFileError`|  `ProcessingFailureError` |
|     `ProcessingFailure_MetadataNotSupportedOnRemotesError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ModelSaveErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_MultipleProcessingErrorsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_PathTooLongError`|  `ProcessingFailureError` |
|     `ProcessingFailure_RecipientAlreadySharedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_RemoteEntryReadOnlyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_RemoteServerErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ResourceBelongsToParentSiteError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ResourceLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_SubfolderLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_SyncInProgressError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationGeneralErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationMethodUnsupportedErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError`|  `ProcessingFailureError` |
|     `ProcessingFailure_UpdatesNotAllowedForRemotesError`|  `ProcessingFailureError` |
|     `RateLimited_DuplicateShareRecipientError`|  `RateLimitedError` |
|     `RateLimited_ReauthenticationRateLimitedError`|  `RateLimitedError` |
|     `RateLimited_TooManyConcurrentLoginsError`|  `RateLimitedError` |
|     `RateLimited_TooManyConcurrentRequestsError`|  `RateLimitedError` |
|     `RateLimited_TooManyLoginAttemptsError`|  `RateLimitedError` |
|     `RateLimited_TooManyRequestsError`|  `RateLimitedError` |
|     `RateLimited_TooManySharesError`|  `RateLimitedError` |
|     `ServiceUnavailable_AutomationsUnavailableError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_LockOperationBusyError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_MigrationInProgressError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_SearchUnavailableError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_SiteDisabledError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_UploadsUnavailableError`|  `ServiceUnavailableError` |
|     `SiteConfiguration_AccountAlreadyExistsError`|  `SiteConfigurationError` |
|     `SiteConfiguration_AccountOverdueError`|  `SiteConfigurationError` |
|     `SiteConfiguration_NoAccountForSiteError`|  `SiteConfigurationError` |
|     `SiteConfiguration_SiteWasRemovedError`|  `SiteConfigurationError` |
|     `SiteConfiguration_TrialExpiredError`|  `SiteConfigurationError` |
|     `SiteConfiguration_TrialLockedError`|  `SiteConfigurationError` |
|     `SiteConfiguration_UserRequestsEnabledRequiredError`|  `SiteConfigurationError` |

## Pagination

Certain API operations return lists of objects. When the number of objects in the list is large,
the API will paginate the results.

The Files.com JavaScript SDK automatically paginates through lists of objects by default.

```javascript title="Example Request" hasDataFormatSelector
import File from 'files.com/lib/models/File';
import * as FilesErrors from 'files.com/lib/Errors';

Files.configureNetwork({
  // true by default
  autoPaginate: true,
});

try {
  const files = await Folder.listFor(path, {
    search: "some-partial-filename",
  });
  for (const file of files) {
    // Operate on file
  }
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Mock Server

Files.com publishes a mock Files.com API server, which is useful for testing your use of the Files.com
SDKs and other direct integrations against the Files.com API in an integration test environment.
It never checks credentials: send any placeholder API key, such as `YOUR_API_KEY`, and never use
real Files.com credentials with it.

The server has two modes, chosen when it starts:

* **Legacy mode** (the default) checks required parameters and parameter types, then returns a fixed
  example response for each API endpoint. It does not maintain state and it does not deeply inspect
  your submissions for correctness, which makes it useful for testing basic network operations and
  JSON encoding for your SDK or API client.
* **Simulation mode** keeps records, files and folders in memory, so a test can create, list, update
  and delete resources, upload a file and download the same bytes, and make chosen requests fail,
  stall or lose their connection on purpose. Requests it does not simulate fail with a clear error
  instead of returning an example response.

### Quick Start with Docker

With [Docker](https://docs.docker.com/get-docker/) installed, start the published image from
[Docker Hub](https://hub.docker.com/r/filescom/files-mock-server) with the command shown. It runs
legacy mode at `http://127.0.0.1:4041`, reachable from your machine only: point your integration's
Files.com API base URL there and use a placeholder API key. Stop it with Ctrl+C; `--rm` removes its
container.

The published image is built for `linux/amd64` only, so the command asks for that platform;
without it, Docker on a machine of another architecture, such as an Apple silicon Mac, looks for
an image the tag does not have. The `latest` tag moves to whichever server was published last,
and `--pull=always` fetches it again each time, so it need not include simulation mode. To run
simulation mode, build the image from the source as below.

```shell title="Start the Mock Server with Docker"
docker run --platform linux/amd64 --rm --pull=always -p 127.0.0.1:4041:4041 filescom/files-mock-server:latest

## In another terminal, with a placeholder API key:
curl -H "X-FilesAPI-Key: YOUR_API_KEY" http://127.0.0.1:4041/api/rest/v1/users
```

### Simulation Mode in Docker

To run exactly the server the source's README describes, simulation mode included, build the image
from a checkout of the source on [GitHub](https://github.com/Files-com/files-mock-server) and run
it by the image ID you record with your test results. Only `linux/amd64` builds of the source have
been checked, so both commands ask for that platform.

Simulation mode listens only on loopback unless told otherwise, so the command binds it to the
container's interfaces with `-b tcp://0.0.0.0:4041` and publishes the port on your machine's
loopback address only. `FILES_MOCK_TRANSFER_ORIGIN` tells it the address your tests use, so the
upload and download URLs it returns point at the published port.

Simulation mode keeps its state only in the server process. Its control endpoints under
`/__files_mock/v1` report when the server is ready, reset it with your fixtures, add fault rules
and return the journal of the requests it received. It refuses work over its limits instead of
truncating it. The README in the source describes all of these, the operations it simulates and
how to configure its limits.

```shell title="Simulation Mode from the Source"
## In a checkout of the source:
docker build --platform linux/amd64 -t files-mock-server:local .
image=$(docker image inspect --format '{{.Id}}' files-mock-server:local)
echo "$image"   # record this ID with your test results
docker run --platform linux/amd64 --rm -e FILES_MOCK_MODE=simulation \
  -e FILES_MOCK_TRANSFER_ORIGIN=http://127.0.0.1:40410 \
  -p 127.0.0.1:40410:4041 "$image" -b tcp://0.0.0.0:4041

## In another terminal:
curl http://127.0.0.1:40410/__files_mock/v1/ready
```

### From the Source with Ruby

Start the server from its source with Ruby and Bundler. `FILES_MOCK_MODE` is read once at startup:
leaving it unset or setting it to `legacy` starts legacy mode, `simulation` starts simulation mode,
and any other value stops startup with an error. Legacy mode listens on port 4041 on all IPv4
interfaces, and simulation mode on `127.0.0.1:4041`.

```shell title="Start the Mock Server with Ruby"
bundle install

## Legacy mode
bundle exec puma

## Simulation mode
FILES_MOCK_MODE=simulation bundle exec puma
```

## TypeScript

The `files.com` package includes TypeScript declarations for all of its models, the upload and download helpers,
`Attachment`, errors, `Logger`, `Api` and the `Files` settings. No separate types package is needed.

Use TypeScript 5.9 or later. The declarations are written for the strictest settings, including
`exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`, without `skipLibCheck`. They use Node.js's own types from
`@types/node`, which the package depends on (version 22.20.2 or later, so an application's own `@types/node` of such a
version is shared rather than duplicated).

Each model's types are in a namespace of the same name: `User.CreateParams`, `User.ListParams` and `User.Attributes`,
for example. Types shared by the whole SDK, such as `Files.RequestOptions` and `Files.DecimalString`, are in the
`Files` namespace.

```typescript title="Example"
import Files from 'files.com';
import User from 'files.com/lib/models/User.js';

Files.setApiKey('YOUR_API_KEY');

const params: User.CreateParams = { username: 'alice', name: 'Alice' };
const user = await User.create(params);
```

### Importing

In an ES module (`"module": "nodenext"`), import each class by its default export, and give deep imports their `.js`
extension. The package root, `files.com`, is the `Files` class; models, `Attachment` and the other modules have their
own paths. `Errors` has a named export for each error class, and `Logger` a named `LogLevel`. `files.com/index.js`
has named `Attachment`, `Files` and `Logger` exports.

From CommonJS, `import User = require('files.com/lib/models/User')` returns the class, as `require()` does, and so does
its `.default`. Default imports such as `import User from 'files.com/lib/models/User'` need `esModuleInterop`, which
TypeScript 7 always enables.

With `"moduleResolution": "bundler"`, the declarations of `files.com/src/...` paths, which the package's `module` field
points bundlers to, describe ES modules, and those of `files.com/lib/...` paths CommonJS modules. Only the CommonJS
modules make each class its own `.default`, so the package root's types, which serve every route to it, leave that
out: use the class itself, or `files.com/lib/Files` for the CommonJS module's exact types.

TypeScript accepts a named import of a CommonJS class's static method, such as `import { list } from
'files.com/lib/models/User.js'` or `import { setApiKey } from 'files.com'`, but Node.js provides none, and neither
does a bundle's package root: call it on the class instead. Named imports of types, such as
`import type { RequestOptions } from 'files.com'`, work everywhere.

```typescript title="Example"
import Files from 'files.com';
import Attachment from 'files.com/lib/Attachment.js';
import * as FilesErrors from 'files.com/lib/Errors.js';
import { LogLevel } from 'files.com/lib/Logger.js';
import File from 'files.com/lib/models/File.js';
```

### Models and Absent Values

The API does not say which fields it always returns, or which can be null. So every field of a model can be missing
(`undefined`) and every field the API returns can also be `null`: `user.getName()` is a `string | null | undefined`.
The same holds for the fields of an object nested in a model, such as an invoice's line items, which are plain objects
rather than models.

A model's state is its `attributes`. Setters such as `user.setName()`, updates and `save()` change it, and getters read
it. Each attribute in the state can also be read as a property of its name, such as `user.name`, which always agrees
with the getter; these properties are read-only, so use the setter. A name the model uses for a method keeps that use.
Fields the API returns that the SDK does not know yet are in `attributes` as `unknown`.

`update()` resolves with the same object, now holding what the API returned, and `save()` resolves with `true`. A
model's own methods, such as `update()` and `delete()`, take only their parameters: they use the options the model was
created with, which it keeps as `options`.

```typescript title="Example"
import User from 'files.com/lib/models/User.js';

const user = await User.find(1);
const displayName = user.getName() ?? user.getUsername() ?? 'unknown';

user.setName('Alice');
await user.save();
console.log(user.name); // 'Alice', once the API has returned it
```

### Values

Decimal amounts, such as an invoice's `amount`, are strings of type `Files.DecimalString` (`'10.50'`), exactly as
the API sends them, so that no precision is lost: convert them with a decimal library, or `Number()` when a
floating-point number is precise enough. Dates and times are ISO 8601 strings of type `Files.DateTimeString`, not
`Date` objects. Other numbers are JavaScript numbers.

A parameter with a list of values accepts only those. A field the API returns with a list of values can also hold
values added later, so its type includes `Files.OtherString`: handle unknown values.

Structured values, such as a behavior's `value` or an automation's `definition`, have types of their own, such as
`Behavior.Value`, following the JSON Schema the API publishes.

The API's schema currently describes some decimal parameters as numbers: `min_free_cpu` and `min_free_mem` of a
`RemoteMountBackend` are sent as numbers, although the API returns them as decimal strings.

```typescript title="Example"
import Files from 'files.com';
import Invoice from 'files.com/lib/models/Invoice.js';

// Invoice.list() returns account line items.
const items = await Invoice.list();
const amounts: Files.DecimalString[] = items.flatMap(item => item.getAmount() ?? []);
```

### Parameters and Options

A static method takes its path arguments and primary key first, then the parameters it requires besides them, then
the options of the call: `User.find(1, {}, { workspaceId: 0 })` rather than `User.find(1, { workspaceId: 0 })`. A
misspelled parameter or option is an error. A model's own methods take its primary key, and any other required value,
from its attributes when not given.

The options of one call, `Files.RequestOptions`, include credentials, headers, agents, `autoPaginate` and
`timeoutSecs`. `workspaceId: null` or `workspaceId: undefined` sends no workspace; leave the option out to keep the
configured one.

`timeoutSecs`, like the configured `networkTimeout`, limits each attempt of a request as one budget: from sending it,
through its redirects, until its response body has been read to its end, whatever the body's type, a body returned
unread as a stream included: read such a stream within the budget. If the budget runs out before it has been read to
its end, the stream is stopped and fails with an error, as the call has already resolved. Each retry has a budget of
its own, waiting between attempts counts toward none, and nothing limits the call as a whole, which can make several
attempts and request several pages. Leave `timeoutSecs` out, rather than giving it as `undefined`, to keep the
configured timeout.

Aborting the call's `signal` stops its requests at once, a wait before a retry included. The call then rejects with
the signal's reason, unchanged, or, when the runtime gives none, an `Error` named `AbortError`: not a `FilesError`, so
check `signal.aborted`. Once the call has resolved, aborting the signal still stops a body returned unread that has not
been read to its end: that stream fails with an error.

A list method, such as `User.list()`, resolves with an array: every page's items, or only the first page's with
`autoPaginate: false`.

Failures are not limited to `FilesError`s, such as a download's errors: catch errors as `unknown` and narrow them.

```typescript title="Example"
import * as FilesErrors from 'files.com/lib/Errors.js';
import User from 'files.com/lib/models/User.js';

try {
  const firstPage = await User.list({ per_page: 100 }, { autoPaginate: false });
  console.log(firstPage.length);
} catch (error) {
  if (error instanceof FilesErrors.NotAuthenticatedError) {
    console.error(error.title);
  } else {
    throw error;
  }
}
```

### Attachments and Logging

A file parameter, such as a behavior's `attachment_file`, takes an `Attachment` of a `Buffer` or other `Uint8Array`,
or of a Node.js `Readable` stream (`Attachment.Source`), with its `filename`, `type` and `maxBytes` options
(`Attachment.Options`). Only an `Attachment` made with its class is sent as a file: not the bytes themselves, and not
an object with the same fields.

`Files.setLogger()` takes any object with `error`, `warn`, `info` and `debug` methods (`Files.ApplicationLogger`),
or `null` to log to the console again.

```typescript title="Example (not available in browser)"
import { readFile } from 'node:fs/promises';
import Files from 'files.com';
import Attachment from 'files.com/lib/Attachment.js';
import Behavior from 'files.com/lib/models/Behavior.js';

Files.setLogger(console);

const behavior = await Behavior.create({
  path: 'invoices',
  behavior: 'watermark',
  value: { gravity: 'SouthEast', max_height_or_width: 20, transparency: 25 },
  attachment_file: new Attachment(await readFile('watermark.png'), { filename: 'watermark.png', type: 'image/png' }),
});
```

### File Transfers

`File.uploadData()` accepts a string, a `Buffer`, a Node.js readable stream, or an iterable or async iterable of
string or `Uint8Array` chunks. A bare `Uint8Array` is not accepted: wrap it, as `[bytes]` or `Buffer.from(bytes)`.
`uploadStream()` takes a Node.js readable stream, which the SDK does not close. A `determinePartUploadUri` option must
return the part's URL synchronously.

Uploads resolve with the uploaded `File`. Copy and move helpers, such as `copyTo()`, resolve with the API's response,
of type `File.ActionResponse`, whose `data` describes the operation.

Disk and stream transfers, `uploadFile()`, `downloadToFile()`, `downloadToStream()` and `downloadToString()`, work in
Node.js only; their types do not change in a browser, where they reject with a `NotImplementedError`. Downloads take
only their destination. `downloadToStream()` takes any writable Node.js stream, and ends it when the download completes.

```typescript title="Example (not available in browser)"
import { createWriteStream } from 'node:fs';
import File from 'files.com/lib/models/File.js';

const file = await File.uploadData('reports/today.csv', Buffer.from('a,b\n'), { mkdir_parents: true });
await file.downloadToStream(createWriteStream('today.csv'));
```
