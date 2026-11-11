import {
  URL_EXPIRED_RESPONSE_BYTES, getUrlExpiration, isUrlExpired, isUrlExpiredResponse,
} from '../lib/utils/urlExpiration'

// The public module uses only browser globals; no SDK client, Node runtime or credentials are needed.
describe('signed URL expiration', () => {
  const now = Date.parse('2026-11-10T20:03:00Z')

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(now)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it.each([
    ['Files.com', 'X-Files-Date=20261110T200000Z&X-Files-Expires=180'],
    ['S3', 'X-Amz-Date=20261110T200000Z&X-Amz-Expires=180'],
    ['GCS', 'X-Goog-Date=20261110T200000Z&X-Goog-Expires=180'],
    ['Azure', 'sig=test&se=2026-11-10T20%3A03%3A00Z'],
  ])('recognizes %s expiry at the boundary', (_, query) => {
    const url = `https://storage.example/video?${query}`
    expect(getUrlExpiration(url)).toBe(now)
    expect(isUrlExpired(url)).toBe(true)
    expect(isUrlExpired(url, '2026-11-10T20:04:00Z')).toBe(true)
  })

  it('uses the earliest known URL or API expiration, distinguishing future from unknown', () => {
    const url = 'https://storage.example/video?x-files-date=20261110T200000Z&x-files-expires=360'
    expect(getUrlExpiration(url, '2026-11-10T20:02:00Z')).toBe(now - 60000)
    expect(isUrlExpired(url, '2026-11-10T20:02:00Z')).toBe(true)
    expect(getUrlExpiration(url, '2026-11-10T20:10:00Z')).toBe(now + 180000)
    expect(isUrlExpired(url)).toBe(false)
    expect(getUrlExpiration('https://storage.example/video', '2026-11-10T20:02:00Z')).toBe(now - 60000)
    expect(getUrlExpiration(url, 'invalid')).toBe(now + 180000)
  })

  it.each([
    'https://storage.example/video',
    'not a URL',
    'https://storage.example/video?X-Files-Date=invalid&X-Files-Expires=180',
    'https://storage.example/video?X-Amz-Date=20261110T200000Z&X-Amz-Expires=invalid',
    'https://storage.example/video?se=2026-11-10T20%3A00%3A00Z',
  ])('leaves unknown or malformed expiration unknown for %s', url => {
    expect(getUrlExpiration(url)).toBeNull()
    expect(isUrlExpired(url)).toBe(false)
  })
})

// What storage answers when it says the signed URL has expired, however the URL reads, and answers that look alike but
// do not say so.
describe('storage responses that say a signed URL has expired', () => {
  const S3_EXPIRED = '<?xml version="1.0" encoding="UTF-8"?>\n<Error><Code>AccessDenied</Code><Message>Request has expired</Message>'
    + '<X-Amz-Expires>60</X-Amz-Expires><Expires>2026-11-10T20:00:00Z</Expires><ServerTime>2026-11-10T20:03:00Z</ServerTime></Error>'
  const TYPED_JSON = JSON.stringify({ type: 'download_request_expired' })
  const AZURE_EXPIRED = '﻿<?xml version="1.0" encoding="utf-8"?><Error><Code>AuthenticationFailed</Code><Message>Server failed '
    + 'to authenticate the request.</Message><AuthenticationErrorDetail>Signature not valid in the specified time frame: Start '
    + '[Tue, 10 Nov 2026 19:00:00 GMT] - Expiry [Tue, 10 Nov 2026 20:00:00 GMT]</AuthenticationErrorDetail></Error>'

  it.each([
    ['S3\'s Request has expired, as text', 403, S3_EXPIRED],
    ['ExpiredToken, as bytes', 400, Buffer.from('<Error><Code>ExpiredToken</Code><Message>The provided token has expired.</Message></Error>')],
    ['Azure\'s expired signature, as an ArrayBuffer', 403, new Uint8Array(Buffer.from(AZURE_EXPIRED)).buffer],
    ['Files.com\'s download_request_expired', 403, '{"error":"expired","type":"download_request_expired"}'],
    ['Files.com\'s upload_request_expired', 400, Buffer.from('{"type":"upload_request_expired","http-code":"400"}')],
    ['a typed JSON error of exactly the bytes examined', 403, Buffer.from(TYPED_JSON.padEnd(URL_EXPIRED_RESPONSE_BYTES))],
    ['a marker in any case, before a long rest of the body', 403, `<ERROR><MESSAGE>REQUEST HAS EXPIRED</MESSAGE>${' '.repeat(1 << 20)}</ERROR>`],
  ])('recognizes %s', (_, status, body) => {
    expect(isUrlExpiredResponse(status, body)).toBe(true)
  })

  it.each([
    ['a plain AccessDenied', 403, '<Error><Code>AccessDenied</Code><Message>Access Denied</Message></Error>'],
    ['SignatureDoesNotMatch', 403, '<Error><Code>SignatureDoesNotMatch</Code><Message>The request signature we calculated does not match</Message></Error>'],
    ['a message that only says expired', 403, '<Error><Code>AccessDenied</Code><Message>Token expired</Message></Error>'],
    ['another JSON type', 403, '{"type":"not-authenticated/invalid-credentials","error":"expired"}'],
    ['the type below the top level', 403, '{"data":{"type":"download_request_expired"}}'],
    ['a marker in another JSON error', 403, '{"type":"not_authorized","error":"Request has expired"}'],
    ['a marker in another JSON error\'s data', 403, '{"type":"other","data":"<Code>ExpiredToken</Code>"}'],
    ['a marker in a JSON array', 403, '[{"Message":"Request has expired"}]'],
    ['a JSON string of a marker', 403, '"Request has expired"'],
    ['a marker in JSON cut off', 400, '{"type":"other","error":"Signature not valid in the specified time frame'],
    ['a marker in a JSON string cut off', 403, '"Request has expired'],
    ['a typed JSON error one byte longer than the bytes examined', 403, TYPED_JSON.padEnd(URL_EXPIRED_RESPONSE_BYTES + 1)],
    ['a typed JSON error whose body goes on, malformed, past the bytes examined', 403, Buffer.from(`${TYPED_JSON.padEnd(URL_EXPIRED_RESPONSE_BYTES)}<html>trailing</html>`)],
    ['a login page', 403, '<html><body><form action="/login">Sign in</form></body></html>'],
    ['a success', 200, S3_EXPIRED],
    ['another status', 404, S3_EXPIRED],
    ['a marker after the bytes examined', 403, `${' '.repeat(URL_EXPIRED_RESPONSE_BYTES)}${S3_EXPIRED}`],
    ['no body', 403, null],
    ['a body not yet read', 403, { text: () => S3_EXPIRED }],
  ])('does not take %s for expiry', (_, status, body) => {
    expect(isUrlExpiredResponse(status, body)).toBe(false)
  })
})
