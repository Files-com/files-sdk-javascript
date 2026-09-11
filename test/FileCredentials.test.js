import Api from '../lib/Api'
import File from '../lib/models/File'

describe('File credentials', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('uses the File options for copyTo and moveTo by default', async () => {
    const options = {
      apiKey: 'scoped-key',
      sessionId: 'scoped-session',
      workspaceId: 456,
    }

    const file = new File({ path: 'source.txt' }, options)
    const sendRequest = jest.spyOn(Api, 'sendRequest').mockResolvedValue({ data: {} })

    await file.copyTo('copied.txt')
    await file.moveTo('moved.txt')

    expect(sendRequest).toHaveBeenNthCalledWith(
      1,
      '/file_actions/copy/source.txt',
      'POST',
      { destination: 'copied.txt' },
      options,
    )

    expect(sendRequest).toHaveBeenNthCalledWith(
      2,
      '/file_actions/move/source.txt',
      'POST',
      { destination: 'moved.txt' },
      options,
    )
  })
})
