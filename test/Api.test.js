import nock from 'nock'

import {
  FilesError,
  NotAuthenticated_LockoutRegionMismatchError,
  NotFound_FolderNotFoundError,
} from '../lib/Errors'
import Files from '../lib/Files'
import ApiKey from '../lib/models/ApiKey'
import Folder from '../lib/models/Folder'

const API_URL = 'http://example.test'
Files.setBaseUrl(API_URL)
Files.setApiKey('test-key')

describe('API client', () => {
  it('lists API keys', () => {
    const params = { user_id: 1 }
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .query(params)
      .reply(200, [{
        id: 1,
        name: 'test1',
      }, {
        id: 2,
        name: 'test2',
      }])

    return ApiKey.list(params)
      .then(items => {
        expect(items.length).toBe(2)
        expect(items[0].name).toBe('test1')
        expect(items[0].id).toBe(1)
        expect(items[1].name).toBe('test2')
        expect(items[1].id).toBe(2)
      })
  })

  it('creates an API key', () => {
    nock(API_URL)
      .post('/api/rest/v1/api_keys')
      .reply(201, {
        id: 123,
        name: 'testing',
      })

    return ApiKey.create({ name: 'testing' })
      .then(apiKey => {
        expect(apiKey.name).toBe('testing')
        expect(apiKey.id).toBe(123)
      })
  })

  it('updates an API key', () => {
    nock(API_URL)
      .patch('/api/rest/v1/api_keys/123', {
        id: 123,
        name: 'testing123',
      })
      .reply(200, {
        id: 123,
        name: 'testing123',
      })

    const apiKey = new ApiKey({ id: 123 })
    apiKey.setName('testing123')
    return apiKey.save()
      .then(() => {
        expect(apiKey.getName()).toBe('testing123')
        expect(apiKey.getId()).toBe(123)
      })
  })

  it('deletes an API key', () => {
    nock(API_URL)
      .delete('/api/rest/v1/api_keys/123')
      .reply(204)

    const apiKey = new ApiKey({ id: 123 })
    return apiKey.delete()
  })

  it('handles empty response', () => {
    const params = { user_id: 1 }
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .query(params)
      .reply(200, [])

    return ApiKey.list(params)
      .then(items => {
        expect(items.length).toBe(0)
      })
  })

  it('handles not found', () => {
    nock(API_URL)
      .get('/api/rest/v1/folders/missing')
      .query(true)
      .reply(404, {
        error: 'Folder missing not found.',
        'http-code': 404,
        title: 'Folder Not Found',
        type: 'not-found/folder-not-found',
      })

    return Folder.listFor('missing')
      .then(() => {
        throw new Error('Missing folder did not throw an error')
      })
      .catch(error => {
        expect(error).toBeInstanceOf(NotFound_FolderNotFoundError)
        expect(error.error).toBe('Folder missing not found.')
        expect(error.httpCode).toBe(404)
        expect(error.title).toBe('Folder Not Found')
        expect(error.type).toBe('not-found/folder-not-found')
      })
  })

  it('handles bad gateway', () => {
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .reply(502, '<html><head><title>502 Bad Gateway</title></head><body><center><h1>502 Bad Gateway</h1></center><hr><center>files.com</center></body></html>')

    return ApiKey.list()
      .then(() => {
        throw new Error('Missing folder did not throw an error')
      })
      .catch(error => {
        expect(error).toBeInstanceOf(FilesError)
        expect(error.code).toBe(502)
      })
  })

  it('handles region mismatch', () => {
    nock(API_URL)
      .get('/api/rest/v1/folders/test')
      .query(true)
      .reply(401, {
        data: {
          host: 'test.host',
        },
        error: 'Your account must login using a different server, test.host.',
        'http-code': 401,
        title: 'Lockout Region Mismatch',
        type: 'not-authenticated/lockout-region-mismatch',
      })

    return Folder.listFor('test')
      .then(() => {
        throw new Error('Missing folder did not throw an error')
      })
      .catch(error => {
        expect(error).toBeInstanceOf(NotAuthenticated_LockoutRegionMismatchError)
        expect(error.error).toBe('Your account must login using a different server, test.host.')
        expect(error.httpCode).toBe(401)
        expect(error.title).toBe('Lockout Region Mismatch')
        expect(error.type).toBe('not-authenticated/lockout-region-mismatch')
        expect(error.data.host).toBe('test.host')
      })
  })
})
