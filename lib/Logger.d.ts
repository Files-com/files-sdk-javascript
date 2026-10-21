/**
 * The SDK's logging. Messages at or above the log level (`Files.setLogLevel()`) go to the application logger set with
 * `Files.setLogger()`, or otherwise to the console, prefixed with their level.
 */
declare class Logger {
  private constructor()

  /** Whether logging is paused: nothing is logged until `unpause()`. */
  static isPaused: boolean

  static pause(): void

  static unpause(): void

  static error(...messages: unknown[]): void

  static warn(...messages: unknown[]): void

  static info(...messages: unknown[]): void

  static debug(...messages: unknown[]): void

  /** Logs the messages at the given level, `LogLevel.INFO` by default, if the log level includes it. */
  static log(level?: Logger.LogLevel, ...messages: unknown[]): void

  /** The console method that writes messages of a level. */
  static getLogLevelMethod(level: Logger.LogLevel): 'error' | 'info' | 'log' | 'warn'

  /** The application logger's method that receives messages of a level. */
  static getApplicationLoggerMethod(level: Logger.LogLevel): 'debug' | 'error' | 'info' | 'warn'

  /** The name of a level, as console messages are prefixed with it; any other value is returned as it is. */
  static getLogLevelName<Level>(level: Level): 'debug' | 'error' | 'info' | 'warn' | Level

  static default: typeof Logger
}

declare namespace Logger {
  /** Log levels, from logging nothing to logging everything. */
  const LogLevel: {
    readonly NONE: 0
    readonly ERROR: 1
    readonly WARN: 2
    readonly INFO: 3
    readonly DEBUG: 4
  }

  type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]
}

export = Logger
