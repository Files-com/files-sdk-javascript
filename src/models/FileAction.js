/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

/**
 * Class FileAction
 */
class FileAction {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.path

  // Waits until the action this object reports is confirmed complete (see ActionWait.js), with { signal, timeoutMs,
  // pollIntervalMs }: polling its File Migration, when it reports one, until that is completed, in the context of the
  // request that started the action, whatever the settings have become since. Opt in: nothing waits unless this is
  // called. Resolves with nothing; rejects with a FilesError when the action failed, was cancelled, or its completion
  // cannot be confirmed, and with the signal's reason, unchanged, when the signal stops the wait.
  waitForCompletion = async options => {
    const { waitForModel } = require('../ActionWait.js')
    return waitForModel(this, options)
  }

  // Not public: the FileAction an action's request resolves with, data its response's, which keeps what waiting for the
  // action needs, action (see Api._sendAction), privately, out of its attributes and options.
  static _accepted = (data, options, action) => {
    const { keepAction } = require('../ActionWait.js')
    return keepAction(new FileAction(data, options), action)
  }

  // string # Status of file operation.
  getStatus = () => this.attributes.status

  // int64 # If status is pending, this is the id of the File Migration to check for status updates.  Delete actions include it whenever the deletion runs as a File Migration, including while it is processing.
  getFileMigrationId = () => this.attributes.file_migration_id
}

export default FileAction

module.exports = FileAction
module.exports.default = FileAction
