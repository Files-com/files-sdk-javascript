import { getUrlExpiration, isUrlExpired } from '../lib/utils/urlExpiration'

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
