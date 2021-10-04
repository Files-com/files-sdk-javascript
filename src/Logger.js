class Logger {
  static LogLevel = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
  }

  static getLogLevelMethod = level => {
    switch (level) {
      case Logger.LogLevel.ERROR: return 'error'
      case Logger.LogLevel.WARN: return 'warn'
      case Logger.LogLevel.INFO: return 'info'
      case Logger.LogLevel.DEBUG: return 'log'
    }
  
    return 'log'
  }

  static isPaused = false

  static getLogLevelName = level => {
    switch (level) {
      case LogLevel.ERROR: return 'error'
      case LogLevel.WARN: return 'warn'
      case LogLevel.INFO: return 'info'
      case LogLevel.DEBUG: return 'debug'
    }

    return level
  }

  static error = (...messages) => {
    Logger.log(LogLevel.ERROR, ...messages)
  }

  static warn = (...messages) => {
    Logger.log(LogLevel.WARN, ...messages)
  }

  static info = (...messages) => {
    Logger.log(LogLevel.INFO, ...messages)
  }

  static debug = (...messages) => {
    Logger.log(LogLevel.DEBUG, ...messages)
  }

  static log = (level = LogLevel.INFO, ...messages) => {
    if (Logger.isPaused || messages.length === 0) {
      return
    }

    const Files = require('./Files').default

    if (Files.getLogLevel() < level) {
      return;
    }

    const prefix = `[${Logger.getLogLevelName(level)}]: `
    const method = Logger.getLogLevelMethod(level)
    console[method](prefix, ...messages)
  }

  static pause = () => {
    Logger.isPaused = true
  }

  static unpause = () => {
    Logger.isPaused = false
  }
}

export const LogLevel = Logger.LogLevel

export default Logger
