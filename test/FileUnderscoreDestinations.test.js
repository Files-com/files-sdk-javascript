import nock from 'nock'

import File from '../lib/models/File'
import Files from '../lib/Files'

const API_URL = 'http://example.test'
Files.setBaseUrl(API_URL)
Files.setApiKey('test-key')

describe('File underscore destinations', () => {
  it('copies to a remote server underscore destination', async () => {
    const remoteFile = new File({ path: 'source.txt' })

    nock(API_URL)
      .post('/api/rest/v1/file_actions/copy/source.txt', body =>
        body.destination === '_/RemoteServers/42/remote/path/to/file.txt' && body.overwrite === true)
      .reply(200, { id: 1 })

    await remoteFile.copyToRemoteServer(42, '/../../remote\\path//./to/file.txt', { overwrite: true })
  })
})
