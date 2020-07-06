const openDiskFileReadStream = sourceFilePath => {
  const fs = require('fs')
  return fs.createReadStream(sourceFilePath)
}

const openDiskFileWriteStream = destination => {
  const fs = require('fs')
  return fs.createWriteStream(destination)
}

const saveUrlToStream = async (url, stream) => new Promise((resolve, reject) => {
  const https = require('https')

  https.get(url, response => {
    response.pipe(stream)

    stream.on('finish', resolve)
  })
  .on('error', error => {
    reject(error)
  })
})

const saveUrlToFile = async (url, destinationPath) => {
  const stream = openDiskFileWriteStream(destinationPath)
  await saveUrlToStream(url, stream)
  stream.close()
}

export {
  openDiskFileReadStream,
  openDiskFileWriteStream,
  saveUrlToFile,
  saveUrlToStream,
}
