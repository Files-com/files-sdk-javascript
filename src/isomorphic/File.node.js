const openDiskFileReadStream = sourceFilePath => {
  const fs = require('fs')
  return fs.createReadStream(sourceFilePath)
}

const openDiskFileWriteStream = destination => {
  const fs = require('fs')
  return fs.createWriteStream(destination)
}

// The download takes over the stream: a complete response ends it, then it is closed if it has a close
// method. A failed download stops the request and closes the stream, or destroys a stream without a close
// method rather than ending it as though the download completed. The first outcome is final. Errors from
// releasing the stream afterwards, thrown or reported before the stream emits 'close', cannot change it or
// become uncaught; the stream still delivers reported errors to the caller's own 'error' listeners.
const saveUrlToStream = async (url, stream) => new Promise((resolve, reject) => {
  const https = require('https')
  let request = null
  let response = null
  let settled = false

  const attempt = release => {
    try {
      release()
    } catch (releaseError) {
      // The download has already settled, so a failure to release cannot replace its outcome.
    }
  }

  const settle = error => {
    if (settled) {
      return
    }

    settled = true

    if (!error) {
      resolve()
      attempt(() => {
        if (typeof stream.close === 'function') {
          stream.close()
        }
      })

      return
    }

    reject(error)

    // Stop the transfer before releasing the stream, each step on its own so one failure cannot skip the rest.
    if (response) {
      attempt(() => response.unpipe(stream))
    }

    if (request) {
      attempt(() => request.destroy())
    }

    attempt(() => {
      if (typeof stream.close === 'function') {
        stream.close()
      } else if (typeof stream.destroy === 'function') {
        stream.destroy()
      }
    })
  }

  const onFinish = () => settle()
  const onClose = () => {
    settle(new Error('Download destination closed before the download finished'))
    // 'close' is the stream's last event, so the listeners have nothing left to observe.
    stream.removeListener('error', settle)
    stream.removeListener('finish', onFinish)
  }

  stream.on('error', settle)
  stream.once('finish', onFinish)
  stream.once('close', onClose)

  try {
    request = https.get(url, res => {
      response = res
      // Before Node 16 an interrupted response emits 'aborted' without an error, and through Node 12 it then
      // ends normally. Node 6 can also emit 'aborted' after a complete response, so check completeness.
      response.on('aborted', () => {
        if (!response.complete) {
          settle(new Error('Download response ended before it was complete'))
        }
      })

      response.on('error', settle)
      response.pipe(stream)
    })
  } catch (error) {
    settle(error)
    return
  }

  request.on('error', settle)
})

const saveUrlToString = async url => new Promise((resolve, reject) => {
  const https = require('https')

  https.get(url, response => {
    const chunks = []
    response.on('data', chunk => chunks.push(Buffer.from(chunk)))
    response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
    .on('error', error => {
      reject(error)
    })
})

const saveUrlToFile = async (url, destinationPath) => {
  const stream = openDiskFileWriteStream(destinationPath)
  await saveUrlToStream(url, stream)
}

export {
  openDiskFileReadStream,
  openDiskFileWriteStream,
  saveUrlToFile,
  saveUrlToStream,
  saveUrlToString,
}
