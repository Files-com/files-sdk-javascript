class Logger {
  /* eslint-disable sort-keys */
  static LogLevel = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
  }
  /* eslint-enable sort-keys */

  static getLogLevelMethod = level => {
    switch (level) {
      case Logger.LogLevel.ERROR: return 'error'
      case Logger.LogLevel.WARN: return 'warn'
      case Logger.LogLevel.INFO: return 'info'
      case Logger.LogLevel.DEBUG: return 'log'
      default: return 'log'
    }
  }

  static isPaused = false

  static getLogLevelName = level => {
    switch (level) {
      case Logger.LogLevel.ERROR: return 'error'
      case Logger.LogLevel.WARN: return 'warn'
      case Logger.LogLevel.INFO: return 'info'
      case Logger.LogLevel.DEBUG: return 'debug'
      default: return level
    }
  }

  static error = (...messages) => {
    Logger.log(Logger.LogLevel.ERROR, ...messages)
  }

  static warn = (...messages) => {
    Logger.log(Logger.LogLevel.WARN, ...messages)
  }

  static info = (...messages) => {
    Logger.log(Logger.LogLevel.INFO, ...messages)
  }

  static debug = (...messages) => {
    Logger.log(Logger.LogLevel.DEBUG, ...messages)
  }

  static log = (level = Logger.LogLevel.INFO, ...messages) => {
    if (Logger.isPaused || messages.length === 0) {
      return
    }

    const Files = require('./Files').default

    if (Files.getLogLevel() < level) {
      return
    }

    const prefix = `[${Logger.getLogLevelName(level)}]: `
    const method = Logger.getLogLevelMethod(level)
    console[method](prefix, ...messages) // eslint-disable-line no-console
  }

  static pause = () => {
    Logger.isPaused = true
  }

  static unpause = () => {
    Logger.isPaused = false
  }
}

export const { LogLevel } = Logger

export default Logger

module.exports = Logger
module.exports.default = Logger
