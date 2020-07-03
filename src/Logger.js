import Files from './Files'

const getLogLevelMethod = level => {
  switch (level) {
    case LogLevel.ERROR: return 'error'
    case LogLevel.WARN: return 'warn'
    case LogLevel.INFO: return 'info'
    case LogLevel.DEBUG: return 'log'
  }

  return 'log'
}

class LogLevel {
  static NONE = 0
  static ERROR = 1
  static WARN = 2
  static INFO = 3
  static DEBUG = 4
}

class Logger {
  static stream
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

    if (Files.getLogLevel() < level) {
      return;
    }

    const prefix = `[${Logger.getLogLevelName(level)}]: `
    const method = getLogLevelMethod(level)
    console[method](prefix, ...messages)
  }

  static pause = () => {
    Logger.isPaused = true
  }

  static unpause = () => {
    Logger.isPaused = false
  }
}

export {
  LogLevel,
}

export default Logger
