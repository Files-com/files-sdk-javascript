import nock from 'nock'

import Api from '../lib/Api'
import Files from '../lib/Files'

const API_URL = 'http://example.test'
Files.setBaseUrl(API_URL)
Files.setApiKey('test-key')

describe('Decimal contract', () => {
  it('serializes decimal strings and double numbers in JSON bodies', async () => {
    nock(API_URL)
      .post('/api/rest/v1/api_keys', body => {
        // Decimals should be passed as strings, doubles as numbers.
        return typeof body.amount === 'string' && typeof body.ratio === 'number'
      })
      .reply(200, { id: 1 })

    await Api.sendRequest('/api_keys', 'POST', { amount: '1.23', ratio: 1.23 })
  })
})
