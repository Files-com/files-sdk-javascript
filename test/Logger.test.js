import { ConfigurationError } from '../lib/Errors'
import Files from '../lib/Files'
import Logger, { LogLevel } from '../lib/Logger'

class RecordingLogger {
  entries = []

  error(...messages) { this.entries.push(['error', ...messages]) }

  warn(...messages) { this.entries.push(['warn', ...messages]) }

  info(...messages) { this.entries.push(['info', ...messages]) }

  debug(...messages) { this.entries.push(['debug', ...messages]) }
}

describe('Logger', () => {
  let originalLogLevel
  let originalLogger
  let consoleSpies

  beforeEach(() => {
    originalLogLevel = Files.getLogLevel()
    originalLogger = Files.getLogger()
    consoleSpies = Object.fromEntries(
      ['error', 'warn', 'info', 'log'].map(method => [method, jest.spyOn(console, method).mockImplementation(() => {})]),
    )
  })

  afterEach(() => {
    Logger.unpause()
    Files.setLogger(originalLogger)
    Files.setLogLevel(originalLogLevel)
    jest.restoreAllMocks()
  })

  it('routes SDK logs to a supplied application logger within the log level and returns to the console on reset', () => {
    const applicationLogger = new RecordingLogger()
    const detail = { code: 1 }

    expect(() => Files.setLogger({ info: () => {} })).toThrow(ConfigurationError)
    expect(Files.getLogger()).toBeNull()

    Files.setLogger(applicationLogger)
    Files.setLogLevel(LogLevel.INFO)
    Logger.error('error message', detail)
    Logger.warn('warn message')
    Logger.info('info message')
    Logger.debug('debug message below the level')

    Files.setLogLevel(LogLevel.DEBUG)
    Logger.debug('debug message', 'second value')

    Logger.pause()
    Logger.info('paused message')
    Logger.unpause()

    expect(applicationLogger.entries).toEqual([
      ['error', 'error message', detail],
      ['warn', 'warn message'],
      ['info', 'info message'],
      ['debug', 'debug message', 'second value'],
    ])

    expect(Object.values(consoleSpies).every(spy => spy.mock.calls.length === 0)).toBe(true)

    Files.setLogger(null)
    Logger.debug('console message')

    expect(Files.getLogger()).toBeNull()
    expect(consoleSpies.log).toHaveBeenCalledWith('[debug]: ', 'console message')
    expect(applicationLogger.entries).toHaveLength(4)
  })
})
