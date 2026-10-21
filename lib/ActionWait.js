"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.withWait = exports.waitForModel = exports.waitForAction = exports.keepAction = exports.DEFAULT_POLL_INTERVAL_MS = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Api = _interopRequireDefault(require("./Api"));
var errors = _interopRequireWildcard(require("./Errors"));
var _Transfer = require("./Transfer");
var _utils = require("./utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var DEFAULT_POLL_INTERVAL_MS = exports.DEFAULT_POLL_INTERVAL_MS = 1000;

// The largest File Migration ID: the API's IDs are 32-bit integers.
var MAX_MIGRATION_ID = 2147483647;

// What waiting for an action needs, kept for the object that reports the action, a FileAction or a helper's response,
// and by nothing else: { operation, options }, the context the action's request was sent with and the options of its
// later requests (see Api._sendAction). None of it is an attribute, or any other property, of the object, so none of it
// is serialized with it.
var actions = new WeakMap();

// A value, as a message shows it.
var shown = function shown(value) {
  return typeof value === 'string' ? "'".concat(value, "'") : String(value);
};
var isSignal = function isSignal(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.aborted) === 'boolean' && typeof value.addEventListener === 'function';
};

// A number of milliseconds the caller gives, such as timeoutMs: undefined or null for none, otherwise a number greater
// than 0 that a timer can be set for.
var millisecondsOption = function millisecondsOption(name, value) {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0 || value > _Transfer.MAX_TIMER_MS) {
    throw new errors.InvalidParameterError("Bad parameter: ".concat(name, " must be a number of milliseconds greater than 0 and at most ").concat(_Transfer.MAX_TIMER_MS));
  }
  return value;
};

// What a wait that cannot confirm completion rejects with: a FilesError of message, with the action as the API reported
// it, its fileAction, and, once one has been observed, the File Migration's own data, its fileMigration.
var failure = function failure(message, reported, migration) {
  var error = new errors.FilesError(message);
  error.fileAction = reported;
  if (migration !== undefined) {
    error.fileMigration = migration;
  }
  return error;
};

// The File Migration ID the action reports, or null when it reports none. One it reports that is not a valid ID, such as
// a string, 0 or a fraction, is a failure: it is never taken for none.
var migrationIdOf = function migrationIdOf(reported) {
  var id = reported.file_migration_id;
  if (id === undefined || id === null) {
    return null;
  }
  if (!Number.isSafeInteger(id) || id < 1 || id > MAX_MIGRATION_ID) {
    throw failure("The action reports file_migration_id ".concat(shown(id), ", which is not a File Migration ID, so its completion cannot be confirmed"), reported);
  }
  return id;
};

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
var waitForAction = exports.waitForAction = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(attributes, action, options) {
    var _millisecondsOption;
    var _ref2, pollIntervalMs, signal, timeoutMs, interval, timeout, reported, id, observed, timer, timing, stop, _yield$Api$_continueA, operation, response, migration, status, detail;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(options !== undefined && options !== null && !(0, _utils.isObject)(options))) {
            _context.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: options must be of type object, received ".concat(Array.isArray(options) ? 'array' : (0, _typeof2.default)(options)));
        case 1:
          _ref2 = options !== null && options !== void 0 ? options : {}, pollIntervalMs = _ref2.pollIntervalMs, signal = _ref2.signal, timeoutMs = _ref2.timeoutMs;
          if (!(signal !== undefined && signal !== null && !isSignal(signal))) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError('Bad parameter: signal must be an AbortSignal');
        case 2:
          interval = (_millisecondsOption = millisecondsOption('pollIntervalMs', pollIntervalMs)) !== null && _millisecondsOption !== void 0 ? _millisecondsOption : DEFAULT_POLL_INTERVAL_MS;
          timeout = millisecondsOption('timeoutMs', timeoutMs);
          reported = (0, _utils.isObject)(attributes) ? _objectSpread({}, attributes) : {};
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context.next = 3;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 3:
          id = migrationIdOf(reported);
          if (!(id === null)) {
            _context.next = 5;
            break;
          }
          if (!(reported.status === 'completed')) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");
        case 4:
          throw failure("The action's status is ".concat(shown(reported.status), ", and it reports no file_migration_id whose status could confirm its completion"), reported);
        case 5:
          timer = timeout === null ? null : new AbortController();
          timing = timer && setTimeout(function () {
            timer.abort(failure("Waiting for File Migration ".concat(id, " to complete timed out after ").concat(timeout, " ms"), reported, observed));
          }, timeout);
          stop = signal || timer ? (0, _Transfer.linkedSignal)([signal, timer === null || timer === void 0 ? void 0 : timer.signal]) : undefined;
          _context.prev = 6;
        case 7:
          _context.next = 8;
          return _Api.default._continueAction(action, "/file_migrations/".concat(id), stop);
        case 8:
          _yield$Api$_continueA = _context.sent;
          operation = _yield$Api$_continueA.operation;
          response = _yield$Api$_continueA.response;
          action.operation = operation;

          // A stop that came while the poll settled, after its answer arrived, comes first: the caller's signal, aborted by
          // a callback such as a DEBUG logger as the answer was logged, or the timeout running out then. The wait rejects
          // with its reason, unchanged, without taking the answer, completed or not, which it had not read yet.
          if (!(stop !== null && stop !== void 0 && stop.aborted)) {
            _context.next = 9;
            break;
          }
          throw (0, _Transfer.abortReason)(stop);
        case 9:
          migration = response === null || response === void 0 ? void 0 : response.data;
          if ((0, _utils.isObject)(migration)) {
            _context.next = 10;
            break;
          }
          throw failure("The API's answer for File Migration ".concat(id, " is not a File Migration"), reported, migration);
        case 10:
          observed = migration;
          if (!(migration.id !== undefined && migration.id !== null && migration.id !== id)) {
            _context.next = 11;
            break;
          }
          throw failure("The API answered with File Migration ".concat(shown(migration.id), ", not ").concat(id), reported, migration);
        case 11:
          status = migration.status;
          if (!(status === 'completed')) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return");
        case 12:
          if (!(status === 'failed' || status === 'cancelled')) {
            _context.next = 13;
            break;
          }
          detail = typeof migration.failure_message === 'string' && migration.failure_message !== '' ? ": ".concat(migration.failure_message) : '';
          throw failure("File Migration ".concat(id, " ").concat(status).concat(detail), reported, migration);
        case 13:
          if (!(status !== 'pending' && status !== 'processing')) {
            _context.next = 14;
            break;
          }
          throw failure("File Migration ".concat(id, " has status ").concat(shown(status), ", which does not show whether it completed"), reported, migration);
        case 14:
          _context.next = 15;
          return (0, _Transfer.delay)(interval, stop);
        case 15:
          _context.next = 7;
          break;
        case 16:
          _context.prev = 16;
          clearTimeout(timing);
          return _context.finish(16);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6,, 16, 17]]);
  }));
  return function waitForAction(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Keeps action, what waiting for it needs, for target, the FileAction or response that reports it, and gives target.
var keepAction = exports.keepAction = function keepAction(target, action) {
  if (target !== null && (0, _typeof2.default)(target) === 'object' && action) {
    actions.set(target, action);
  }
  return target;
};

// FileAction.waitForCompletion(): the wait for the action a FileAction reports. One the SDK made for an action's
// response waits with that action's own context; any other, such as one made with new FileAction(), with its options.
var waitForModel = exports.waitForModel = function waitForModel(model, options) {
  var _actions$get;
  return waitForAction(model.attributes, (_actions$get = actions.get(model)) !== null && _actions$get !== void 0 ? _actions$get : {
    operation: null,
    options: _objectSpread({}, model.options)
  }, options);
};

// A copy or move helper's response, as it has always been, with waitForCompletion(options), the same wait for the
// action its data reports, as it was when the response arrived. The method is not enumerable, so that the response's own
// fields, what Object.keys() and JSON.stringify() give and its equality to any other response stay as they were.
var withWait = exports.withWait = function withWait(response, action) {
  if (!(0, _utils.isObject)(response) || !Object.isExtensible(response)) {
    return response;
  }
  var attributes = (0, _utils.isObject)(response.data) ? _objectSpread({}, response.data) : {};
  Object.defineProperty(response, 'waitForCompletion', {
    configurable: true,
    value: function value(options) {
      return waitForAction(attributes, action, options);
    },
    writable: true
  });
  return response;
};