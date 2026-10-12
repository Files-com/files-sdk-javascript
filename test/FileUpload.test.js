import nock from 'nock'

import Files from '../lib/Files'
import File from '../lib/models/File'

const API_URL = 'http://example.test'
const STORAGE_URL = 'https://storage.example.test'
const DESTINATION = 'reports/daily.csv'
const DATA = 'date,total\n2026-10-12,3\n'

// The value a request header was sent with. Nock gives a header as its string or as an array of the values it was sent
// with; one value is that value, while no value or several stay an array, so that a missing or repeated header still
// differs from the value expected.
const headerValue = header => (Array.isArray(header) && header.length === 1 ? header[0] : header)

// Stands in for the API's upload requests and for the storage an upload part's URL signs. Records the path, action,
// part, ref and Files.com headers of each API request, and the body and any Files.com headers of each stored part. Every
// upload part the API answers with reports partPath as its path.
const serveUploads = partPath => {
  const apiRequests = []
  const storedParts = []

  nock(API_URL)
    .persist()
    .post(/^\/api\/rest\/v1\/files\//)
    .reply(function answerUploadRequest(uri, { action, part, ref }) {
      apiRequests.push({
        action,
        key: headerValue(this.req.headers['x-filesapi-key']),
        part,
        path: decodeURIComponent(uri.replace('/api/rest/v1/files/', '')),
        ref,
        workspace: headerValue(this.req.headers['x-files-workspace-id']),
      })

      if (action === 'end') {
        return [201, { path: DESTINATION, size: DATA.length, type: 'file' }]
      }

      return [200, {
        partsize: 5242880,
        path: partPath,
        ref: 'upload-ref',
        upload_uri: `${STORAGE_URL}/part-${part ?? 1}?X-Amz-Signature=signed`,
      }]
    })

  nock(STORAGE_URL)
    .persist()
    .put(/^\/part-/)
    .query(true)
    .reply(function storePart(uri, body) {
      storedParts.push({ body, filesHeaders: Object.keys(this.req.headers).filter(name => name.startsWith('x-files')) })
      return [200]
    })

  return { apiRequests, storedParts }
}

describe('File uploads', () => {
  // Only the stand-in answers, and a request it does not expect fails at once instead of being retried.
  beforeEach(() => {
    nock.disableNetConnect()
    Files.setBaseUrl(API_URL)
    Files.setApiKey('api-key')
    Files.configureNetwork({ maxNetworkRetries: 0 })
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.setApiKey(null)
    Files.configureNetwork({ maxNetworkRetries: 3 })
  })

  // With an API key that belongs to a workspace, no workspace is configured, and the API can report an upload part's
  // path as the site path of the workspace's file.
  it('ends an upload at the path it was started at, not at the path its upload part reports', async () => {
    const { apiRequests, storedParts } = serveUploads(`_/Workspaces/311/${DESTINATION}`)

    const file = await File.uploadData(DESTINATION, DATA)

    const request = { key: 'api-key', path: DESTINATION }
    expect(apiRequests).toEqual([
      { ...request, action: 'put' },
      {
        ...request,
        action: 'put',
        part: 1,
        ref: 'upload-ref',
      },
      { ...request, action: 'end', ref: 'upload-ref' },
    ])

    expect(storedParts).toEqual([{ body: DATA, filesHeaders: [] }])
    expect(file).toBeInstanceOf(File)
    expect(file.getPath()).toBe(DESTINATION)
  })

  it('sends the workspace a call is made in with every request of its upload, and no Files.com headers to storage', async () => {
    const { apiRequests, storedParts } = serveUploads(DESTINATION)

    await File.uploadData(DESTINATION, DATA, {}, { workspaceId: 311 })

    const request = { key: 'api-key', path: DESTINATION, workspace: '311' }
    expect(apiRequests).toEqual([
      { ...request, action: 'put' },
      {
        ...request,
        action: 'put',
        part: 1,
        ref: 'upload-ref',
      },
      { ...request, action: 'end', ref: 'upload-ref' },
    ])

    expect(storedParts).toEqual([{ body: DATA, filesHeaders: [] }])
  })
})
