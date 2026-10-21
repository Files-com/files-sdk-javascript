import Api from './Api'
import * as errors from './Errors'
import {
  MAX_TIMER_MS, abortReason, delay, linkedSignal,
} from './Transfer'
import { isObject } from './utils'

// The one opt-in wait for a copy, move or deletion the API has accepted: FileAction.waitForCompletion(), and the same
// method of a copy or move helper's raw response. It resolves only once the action is confirmed complete: by the File
// Migration the API reports for it, polled until its status is completed, or, when the API reports no migration, by
// the action's own status of completed. Nothing else is ever taken for completion. It confirms the API's action or
// migration only: after a folder on native storage moves, the paths below it can still be updating, and the API exposes
// no status for that.
//
// The wait has no deadline of its own: it polls for as long as the migration is pending or processing, unless the
// caller gives a timeout. Each poll is an ordinary request, with its own attempt budgets and retries. Stopping the wait,
// by the caller's signal or its timeout, stops only the wait, never the action, which goes on in the background.

// The wait between polls of a File Migration, unless the caller chooses another.
const DEFAULT_POLL_INTERVAL_MS = 1000

// The largest File Migration ID: the API's IDs are 32-bit integers.
const MAX_MIGRATION_ID = 2147483647

// What waiting for an action needs, kept for the object that reports the action, a FileAction or a helper's response,
// and by nothing else: { operation, options }, the context the action's request was sent with and the options of its
// later requests (see Api._sendAction). None of it is an attribute, or any other property, of the object, so none of it
// is serialized with it.
const actions = new WeakMap()

// A value, as a message shows it.
const shown = value => (typeof value === 'string' ? `'${value}'` : String(value))

const isSignal = value => typeof value?.aborted === 'boolean' && typeof value.addEventListener === 'function'

// A number of milliseconds the caller gives, such as timeoutMs: undefined or null for none, otherwise a number greater
// than 0 that a timer can be set for.
const millisecondsOption = (name, value) => {
  if (value === undefined || value === null) {
    return null
  }

  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0 || value > MAX_TIMER_MS) {
    throw new errors.InvalidParameterError(`Bad parameter: ${name} must be a number of milliseconds greater than 0 and at most ${MAX_TIMER_MS}`)
  }

  return value
}

// What a wait that cannot confirm completion rejects with: a FilesError of message, with the action as the API reported
// it, its fileAction, and, once one has been observed, the File Migration's own data, its fileMigration.
const failure = (message, reported, migration) => {
  const error = new errors.FilesError(message)
  error.fileAction = reported

  if (migration !== undefined) {
    error.fileMigration = migration
  }

  return error
}

// The File Migration ID the action reports, or null when it reports none. One it reports that is not a valid ID, such as
// a string, 0 or a fraction, is a failure: it is never taken for none.
const migrationIdOf = reported => {
  const id = reported.file_migration_id

  if (id === undefined || id === null) {
    return null
  }

  if (!Number.isSafeInteger(id) || id < 1 || id > MAX_MIGRATION_ID) {
    throw failure(`The action reports file_migration_id ${shown(id)}, which is not a File Migration ID, so its completion cannot be confirmed`, reported)
  }

  return id
}

// Waits for the action whose attributes the API reported, with what action keeps (see Api._sendAction). options:
// { signal, timeoutMs, pollIntervalMs }.
//
// - A valid file_migration_id is polled (GET /file_migrations/{id}), at once and then every pollIntervalMs (1000 by
//   default) while it is pending or processing, whatever the action's own status says, until it is completed, which
//   resolves the wait. Failed or cancelled rejects with a FilesError of its failure_message; any other status, the
//   schema's example 'complete' included, rejects too, as one that does not show completion.
// - Without one, an action whose status is exactly 'completed' has completed, and the wait resolves, sending nothing.
//   Any other status, or none, cannot be observed, and rejects at once.
// - A poll's own failure rejects with that failure, unchanged. Nothing is ever sent again for the action itself.
// - signal stops the wait as soon as it aborts, a poll under way, a poll's answer not yet taken, or the wait between
//   polls, and it rejects with the signal's reason, unchanged, whatever it is, falsy values included. timeoutMs, when
//   given, bounds the whole wait the same way: it rejects then with a FilesError saying so. Whichever stops the wait
//   first is its outcome. Neither changes any setting, nor cancels the action.
//
// Only the FilesErrors the wait makes itself, for a migration that failed or was cancelled, an answer or status that
// cannot confirm completion, or its timeout, have fileAction and, once observed, fileMigration (see failure()). A poll's
// failure, an invalid option's InvalidParameterError and a signal's reason reject as they are.
//
// Every poll is sent with the action's own context: the site, credential, workspace and headers its request was sent
// with, at the host a lockout region mismatch rerouted it to, if any, whatever the settings have become since; and its
// settings, its client's or a copy of the global ones taken as it was sent.
const waitForAction = async (attributes, action, options) => {
  if (options !== undefined && options !== null && !isObject(options)) {
    throw new errors.InvalidParameterError(`Bad parameter: options must be of type object, received ${Array.isArray(options) ? 'array' : typeof options}`)
  }

  const { pollIntervalMs, signal, timeoutMs } = options ?? {}

  if (signal !== undefined && signal !== null && !isSignal(signal)) {
    throw new errors.InvalidParameterError('Bad parameter: signal must be an AbortSignal')
  }

  const interval = millisecondsOption('pollIntervalMs', pollIntervalMs) ?? DEFAULT_POLL_INTERVAL_MS
  const timeout = millisecondsOption('timeoutMs', timeoutMs)
  const reported = isObject(attributes) ? { ...attributes } : {}

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  const id = migrationIdOf(reported)

  if (id === null) {
    if (reported.status === 'completed') {
      return
    }

    throw failure(`The action's status is ${shown(reported.status)}, and it reports no file_migration_id whose status could confirm its completion`, reported)
  }

  let observed
  const timer = timeout === null ? null : new AbortController()
  const timing = timer && setTimeout(() => {
    timer.abort(failure(`Waiting for File Migration ${id} to complete timed out after ${timeout} ms`, reported, observed))
  }, timeout)

  const stop = signal || timer ? linkedSignal([signal, timer?.signal]) : undefined

  try {
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const { operation, response } = await Api._continueAction(action, `/file_migrations/${id}`, stop)
      action.operation = operation

      // A stop that came while the poll settled, after its answer arrived, comes first: the caller's signal, aborted by
      // a callback such as a DEBUG logger as the answer was logged, or the timeout running out then. The wait rejects
      // with its reason, unchanged, without taking the answer, completed or not, which it had not read yet.
      if (stop?.aborted) {
        throw abortReason(stop)
      }

      const migration = response?.data

      if (!isObject(migration)) {
        throw failure(`The API's answer for File Migration ${id} is not a File Migration`, reported, migration)
      }

      observed = migration

      if (migration.id !== undefined && migration.id !== null && migration.id !== id) {
        throw failure(`The API answered with File Migration ${shown(migration.id)}, not ${id}`, reported, migration)
      }

      const { status } = migration

      if (status === 'completed') {
        return
      }

      if (status === 'failed' || status === 'cancelled') {
        const detail = typeof migration.failure_message === 'string' && migration.failure_message !== ''
          ? `: ${migration.failure_message}`
          : ''

        throw failure(`File Migration ${id} ${status}${detail}`, reported, migration)
      }

      if (status !== 'pending' && status !== 'processing') {
        throw failure(`File Migration ${id} has status ${shown(status)}, which does not show whether it completed`, reported, migration)
      }

      // eslint-disable-next-line no-await-in-loop
      await delay(interval, stop)
    }
  } finally {
    clearTimeout(timing)
  }
}

// Keeps action, what waiting for it needs, for target, the FileAction or response that reports it, and gives target.
const keepAction = (target, action) => {
  if (target !== null && typeof target === 'object' && action) {
    actions.set(target, action)
  }

  return target
}

// FileAction.waitForCompletion(): the wait for the action a FileAction reports. One the SDK made for an action's
// response waits with that action's own context; any other, such as one made with new FileAction(), with its options.
const waitForModel = (model, options) => waitForAction(
  model.attributes,
  actions.get(model) ?? { operation: null, options: { ...model.options } },
  options,
)

// A copy or move helper's response, as it has always been, with waitForCompletion(options), the same wait for the
// action its data reports, as it was when the response arrived. The method is not enumerable, so that the response's own
// fields, what Object.keys() and JSON.stringify() give and its equality to any other response stay as they were.
const withWait = (response, action) => {
  if (!isObject(response) || !Object.isExtensible(response)) {
    return response
  }

  const attributes = isObject(response.data) ? { ...response.data } : {}

  Object.defineProperty(response, 'waitForCompletion', {
    configurable: true,
    value: options => waitForAction(attributes, action, options),
    writable: true,
  })

  return response
}

export {
  DEFAULT_POLL_INTERVAL_MS,
  keepAction,
  waitForAction,
  waitForModel,
  withWait,
}
