"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.systemClock = exports.startupOption = exports.scopeOf = exports.requestLimiter = exports.processScope = exports.linkedSignal = exports.delay = exports.createProgress = exports.createController = exports.countOption = exports.controllerFor = exports.controlOf = exports.concurrencyOptions = exports.byteBudget = exports.abortReason = exports.TransferJob = exports.TransferControl = exports.POLICIES = exports.MAX_TIMER_MS = exports.MAX_CONCURRENCY = exports.DEFAULT_REQUESTS = exports.DEFAULT_BUFFER_BYTES = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var errors = _interopRequireWildcard(require("./Errors"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable max-classes-per-file */
// The owners shared by uploads (see Upload.js) and downloads (see isomorphic/File.node.js): the concurrency controller
// that measures each transfer's network attempts and chooses how many may run at once; the hard request, byte and file
// budgets that bound them whatever the controller chooses; progress accounting; and the two public objects a caller
// gives transfers, TransferControl, which pauses and resumes them, and TransferJob, a scope in which compatible
// transfers share what their controller learns and one set of budgets.

var MIB = 1024 * 1024;

// The clock every measurement uses: a monotonic one, performance.now(), so that a change of the wall clock never
// changes a measured duration or rate; and the timers that wake waits, which a test can replace with its own.
var systemClock = exports.systemClock = {
  clear: function clear(timer) {
    return clearTimeout(timer);
  },
  now: function now() {
    var _globalThis$performan;
    return typeof ((_globalThis$performan = globalThis.performance) === null || _globalThis$performan === void 0 ? void 0 : _globalThis$performan.now) === 'function' ? globalThis.performance.now() : Date.now();
  },
  schedule: function schedule(callback, ms) {
    return setTimeout(callback, ms);
  }
};

// The JavaScript SDK's concurrency policies, by direction. maximum is the default cap on requests at once, start the
// effective policy start: where an Aggressive upload, a promoted Default upload to S3, every upload to a remote server
// integration or Files Agent and every download begin their ordinary policy. minimum is the lowest target that policy
// shrinks to. An upload to S3 with Default startup warms from one request instead (warm), and a judged window
// delivering fastLinkBytesPerSecond promotes it to start at once; the warm start is S3's alone (see createController()).
// Every window closes once at least windowAttempts attempts, and as many as the target, have been accepted.
var POLICIES = exports.POLICIES = Object.freeze({
  download: Object.freeze({
    fastLinkBytesPerSecond: 96 * MIB,
    maximum: 32,
    minimum: 2,
    start: 8,
    warm: false,
    windowAttempts: 8
  }),
  upload: Object.freeze({
    fastLinkBytesPerSecond: 96 * MIB,
    maximum: 32,
    minimum: 4,
    start: 32,
    warm: true,
    windowAttempts: 8
  })
});

// The ordinary policy's rules, the same for every startup choice. A probe adds GROWTH_STEP requests and is kept on a
// judged window that gains PROBE_GAIN over the level it came from, or withdrawn after two that do not. A transient
// failure shrinks the target by FAILURE_SHRINK and a throttle by THROTTLE_SHRINK, once for the epoch the failed attempt
// began in. A window whose estimated queue exceeds LATENCY_QUEUE_RATIO of the target while its throughput falls below
// its level's shrinks it by LATENCY_SHRINK, and one beyond GROWTH_QUEUE_RATIO of it earns no growth. A window is judged
// only when its attempts filled the target for UTILIZATION of its time.
var GROWTH_STEP = 4;
var PROBE_GAIN = 0.01;
var PROBE_MISSES = 2;
var FAILURE_SHRINK = 0.35;
var THROTTLE_SHRINK = 0.1;
var LATENCY_SHRINK = 0.08;
var LATENCY_QUEUE_RATIO = 1;
var GROWTH_QUEUE_RATIO = 0.64;
var UTILIZATION = 0.75;
var WARM_REST_WINDOWS = 2;
var LEVEL_WINDOWS = 8;
var MAX_DECISIONS = 64;

// The highest concurrency any cap may ask for.
var MAX_CONCURRENCY = exports.MAX_CONCURRENCY = 1024;

// The hard budgets of transfers made without a job: each direction's requests at once, across the process, and the
// bytes of upload parts held at once. A job brings budgets of its own instead.
var DEFAULT_REQUESTS = exports.DEFAULT_REQUESTS = 32;
var DEFAULT_BUFFER_BYTES = exports.DEFAULT_BUFFER_BYTES = 256 * MIB;

// How often a transfer reports its progress, at most, besides its start, pauses and end.
var PROGRESS_INTERVAL_MS = 100;
var STARTUPS = ['default', 'aggressive'];

// What a wait cancelled by signal rejects with: its reason, unchanged, whatever it is; or, when the runtime gives the
// signal none, an Error named AbortError.
var abortReason = exports.abortReason = function abortReason(signal) {
  if (signal.reason !== undefined) {
    return signal.reason;
  }
  var error = new Error('The operation was aborted');
  error.name = 'AbortError';
  return error;
};

// A count a caller gives, such as maxConcurrency: undefined or null for none, otherwise a whole number from 1 to limit.
var countOption = exports.countOption = function countOption(name, value) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.MAX_SAFE_INTEGER;
  if (value === undefined || value === null) {
    return undefined;
  }
  if (!Number.isSafeInteger(value) || value < 1 || value > limit) {
    throw new errors.InvalidParameterError("Bad parameter: ".concat(name, " must be a whole number from 1 to ").concat(limit));
  }
  return value;
};

// An upload's startup choice: 'default' when none is given. Any other value is refused rather than taken for Default.
var startupOption = exports.startupOption = function startupOption(startup) {
  if (startup === undefined || startup === null) {
    return 'default';
  }
  if (!STARTUPS.includes(startup)) {
    throw new errors.InvalidParameterError('Bad parameter: startup must be \'default\' or \'aggressive\'');
  }
  return startup;
};

// A transfer's concurrency options, checked as a whole before anything is sent, whether or not the transfer turns out
// to run in parallel: concurrency, a fixed count, and maxConcurrency, a cap, each a whole number from 1 to
// MAX_CONCURRENCY, and startup, which cannot be chosen with a fixed concurrency. A fixed concurrency above the cap is
// not a conflict: it runs at the cap (see createController()). Resolves them as { fixed, maximum, startup }.
var concurrencyOptions = exports.concurrencyOptions = function concurrencyOptions(_ref) {
  var _countOption;
  var concurrency = _ref.concurrency,
    maxConcurrency = _ref.maxConcurrency,
    startup = _ref.startup;
  var fixed = (_countOption = countOption('concurrency', concurrency, MAX_CONCURRENCY)) !== null && _countOption !== void 0 ? _countOption : null;
  var maximum = countOption('maxConcurrency', maxConcurrency, MAX_CONCURRENCY);
  var chosenStartup = startupOption(startup);
  if (fixed !== null && startup !== undefined && startup !== null) {
    throw new errors.InvalidParameterError('Bad parameter: startup cannot be chosen with a fixed concurrency');
  }
  return {
    fixed: fixed,
    maximum: maximum,
    startup: chosenStartup
  };
};

// The longest wait a timer can be set for, in Node.js and browsers alike. A transfer never shortens a longer wait,
// such as a Retry-After of weeks: it fails instead (see Upload.js and isomorphic/File.node.js).
var MAX_TIMER_MS = exports.MAX_TIMER_MS = 2147483647;

// Waits in its turn, first come first served: resolves once pump() grants the entry, or rejects with signal's reason
// when it aborts first, leaving the queue as though it had never waited, or with the error pump() refuses it with,
// having taken it from the queue.
var waitInTurn = function waitInTurn(waiting, signal, pump) {
  var fields = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Promise(function (resolve, reject) {
    if (signal !== null && signal !== void 0 && signal.aborted) {
      reject(abortReason(signal));
      return;
    }
    var entry = _objectSpread({}, fields);
    var onAbort = function onAbort() {
      var index = waiting.indexOf(entry);
      if (index !== -1) {
        waiting.splice(index, 1);
        reject(abortReason(signal));
        pump();
      }
    };
    entry.grant = function () {
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
      resolve();
    };
    entry.refuse = function (error) {
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
      reject(error);
    };
    signal === null || signal === void 0 || signal.addEventListener('abort', onAbort, {
      once: true
    });
    waiting.push(entry);
    pump();
  });
};

// A hard limit of limit holders at once, granted in the order they ask. Infinity for none.
var requestLimiter = exports.requestLimiter = function requestLimiter(limit) {
  var active = 0;
  var waiting = [];
  var pump = function pump() {
    while (waiting.length > 0 && active < limit) {
      active += 1;
      waiting.shift().grant();
    }
  };
  return {
    acquire: function acquire(signal) {
      return waitInTurn(waiting, signal, pump);
    },
    get active() {
      return active;
    },
    limit: limit,
    release: function release() {
      active -= 1;
      pump();
    },
    // Takes a place at once, if one is free and nobody waits for one, without waiting: whether it did.
    tryAcquire: function tryAcquire() {
      if (waiting.length > 0 || active >= limit) {
        return false;
      }
      active += 1;
      return true;
    }
  };
};

// A signal that aborts as soon as any of signals does, with its reason.
var linkedSignal = exports.linkedSignal = function linkedSignal(signals) {
  var given = signals.filter(Boolean);
  if (typeof AbortSignal.any === 'function') {
    return AbortSignal.any(given);
  }
  var controller = new AbortController();
  var aborted = given.find(function (signal) {
    return signal.aborted;
  });
  if (aborted) {
    controller.abort(aborted.reason);
  } else {
    given.forEach(function (signal) {
      return signal.addEventListener('abort', function () {
        return controller.abort(signal.reason);
      }, {
        once: true
      });
    });
  }
  return controller.signal;
};

// Waits ms, or rejects with signal's reason as soon as it aborts.
var delay = exports.delay = function delay(ms, signal) {
  return new Promise(function (resolve, reject) {
    if (signal !== null && signal !== void 0 && signal.aborted) {
      reject(abortReason(signal));
      return;
    }
    var timer = null;
    var onAbort = function onAbort() {
      clearTimeout(timer);
      reject(abortReason(signal));
    };
    timer = setTimeout(function () {
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal === null || signal === void 0 || signal.addEventListener('abort', onAbort, {
      once: true
    });
  });
};

// A budget of limit bytes held at once, each request admitted before the bytes it is for are allocated, by owner, an
// upload, or else by a request of its own. It is one ceiling for everything its owners hold.
//
// acquire(bytes, signal, own, owner) waits in turn: it is granted, in the order asked, once the bytes fit within the
// limit; a request for nothing at once; and, out of turn, a request of an owner that holds own bytes, when it fits. own
// counts the bytes the owner holds that it alone can give back, and only by going on, such as its copy of data in memory
// or the rest of a stream's chunk copied as it was taken (see Upload.js). What must be allocated at once or not at all
// never waits: admitWithin(bytes, owner) admits bytes only within the limit, or, when they are more than the whole
// budget, only while nothing else is held, so that they are held alone; and admitNow(bytes, owner, own), for the rest of
// a stream's chunk, which must be copied as it is taken, whatever its size, admits them within the limit, or else
// beyond it only while nothing is held but owner's own bytes, own of them, so that owner then holds the budget alone.
// Either admits nothing otherwise, and its caller refuses what it was for.
//
// Beyond its limit, the budget holds the allocations of only one owner at a time, the one that took it there, and is
// open only to that owner until it is back within its limit. An owner that might need to go beyond it, such as a reader
// about to take a stream's chunk whose size it cannot know beforehand, waits with whenOpen(owner, own, signal), holding
// own bytes meanwhile, until the budget is open to it. A request that does not fit is never granted beyond the limit but
// when every byte held belongs to owners waiting for the budget, so that nothing held could be given back otherwise, and
// then only: the request of the owner already beyond the limit, if it waits; or else one that could never fit within
// the limit, its owner's own bytes and it together more than the whole budget, once nothing but those own bytes is
// held, as a request larger than the whole budget is once nothing is held. Any other request waits for room. When
// neither is so, and none of the owners waiting could ever go on, each waiting for bytes another holds, the budget
// refuses, rather than go beyond its limit, the request of the last of them to ask that holds bytes of its own, with a
// FilesError, before anything is allocated for it, so that its upload fails and gives those bytes back. So no owner
// waits forever for bytes others hold while they wait for it, and the budget holds at most its limit, beyond which
// only one owner's allocations, and only as those exceptions allow.
var byteBudget = exports.byteBudget = function byteBudget(limit) {
  var held = 0;
  var beyond = null;
  var waiting = [];
  var parked = [];
  var fits = function fits(bytes) {
    return bytes === 0 || held + bytes <= limit;
  };
  var isOpen = function isOpen(owner) {
    return beyond === null || beyond === owner;
  };
  var take = function take(bytes, owner) {
    held += bytes;
    if (held > limit && beyond === null) {
      beyond = owner;
    }
  };

  // The bytes held by owners waiting, which none of them gives back until it has been admitted.
  var blocked = function blocked() {
    return [].concat(waiting, parked).reduce(function (total, entry) {
      return total + entry.own;
    }, 0);
  };
  var grant = function grant(index) {
    var _waiting$splice = waiting.splice(index, 1),
      _waiting$splice2 = (0, _slicedToArray2.default)(_waiting$splice, 1),
      entry = _waiting$splice2[0];
    take(entry.bytes, entry.owner);
    entry.grant();
  };

  // Refuses the request of the last owner waiting that holds bytes of its own, if any.
  var refuseLast = function refuseLast() {
    var index = waiting.length - 1;
    while (index >= 0 && waiting[index].own === 0) {
      index -= 1;
    }
    if (index !== -1) {
      var _waiting$splice3 = waiting.splice(index, 1),
        _waiting$splice4 = (0, _slicedToArray2.default)(_waiting$splice3, 1),
        entry = _waiting$splice4[0];
      entry.refuse(new errors.FilesError("The buffer budget of ".concat(limit, " bytes (maxBufferBytes) cannot admit the ").concat(entry.bytes, " bytes an upload needs beside the ").concat(entry.own, " it holds: the rest is held by uploads waiting for room as well, none of which could go on without going beyond it. Upload it again once room is free, or give the budget more room")));
    }
  };
  var pump = function pump() {
    while (waiting.length > 0 && fits(waiting[0].bytes)) {
      grant(0);
    }

    // Out of turn: a request for nothing, and one whose owner holds bytes of its own, when it fits.
    var index = 1;
    while (index < waiting.length) {
      var entry = waiting[index];
      if ((entry.own > 0 || entry.bytes === 0) && fits(entry.bytes)) {
        grant(index);
      } else {
        index += 1;
      }
    }

    // When nothing held can be given back but by an owner waiting for the budget: beyond the limit, only the owner
    // already beyond it, or a request that could never fit within it, alone; otherwise a refusal. Owners parked while
    // another is beyond the limit are opened below, once it no longer is, and go on.
    if (waiting.length > 0 && held <= blocked()) {
      if (beyond !== null) {
        var beyondOwner = waiting.findIndex(function (entry) {
          return entry.owner === beyond;
        });
        if (beyondOwner !== -1) {
          grant(beyondOwner);
        }
      } else if (parked.length === 0) {
        var neverFits = waiting.findIndex(function (entry) {
          return entry.own + entry.bytes > limit && held <= entry.own;
        });
        if (neverFits !== -1) {
          grant(neverFits);
        } else {
          refuseLast();
        }
      }
    }
    parked.filter(function (entry) {
      return isOpen(entry.owner);
    }).forEach(function (entry) {
      return entry.open();
    });
  };
  return {
    acquire: function acquire(bytes, signal) {
      var own = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var owner = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return waitInTurn(waiting, signal, pump, {
        bytes: bytes,
        own: own,
        owner: owner !== null && owner !== void 0 ? owner : {}
      });
    },
    admitNow: function admitNow(bytes, owner) {
      var own = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (!fits(bytes) && !(held <= own && isOpen(owner))) {
        return false;
      }
      take(bytes, owner);
      return true;
    },
    admitWithin: function admitWithin(bytes, owner) {
      if (!fits(bytes) && held > 0) {
        return false;
      }
      take(bytes, owner);
      return true;
    },
    get held() {
      return held;
    },
    isOpen: isOpen,
    limit: limit,
    release: function release(bytes) {
      held -= bytes;
      if (held <= limit) {
        beyond = null;
      }
      pump();
    },
    whenOpen: function whenOpen(owner, own, signal) {
      return new Promise(function (resolve, reject) {
        if (signal !== null && signal !== void 0 && signal.aborted) {
          reject(abortReason(signal));
          return;
        }
        if (isOpen(owner)) {
          resolve();
          return;
        }
        var entry = {
          own: own,
          owner: owner
        };
        var leave = function leave() {
          parked.splice(parked.indexOf(entry), 1);
          signal === null || signal === void 0 || signal.removeEventListener('abort', entry.abort);
        };
        entry.open = function () {
          leave();
          resolve();
        };
        entry.abort = function () {
          leave();
          reject(abortReason(signal));
          pump();
        };
        signal === null || signal === void 0 || signal.addEventListener('abort', entry.abort, {
          once: true
        });
        parked.push(entry);
        pump();
      });
    }
  };
};

// The concurrency controller of a transfer, or of the compatible transfers of a job, in one direction. It decides the
// target: how many attempts may be admitted at once. admit(signal) resolves, in turn, with an attempt once fewer than
// the target are admitted and no throttle's cooldown is under way; the attempt holds its place until it is settled.
// attempt.start() marks the start of its request on the network, once any hard budget has granted it; attempt.accept(
// bytes) settles it as accepted, attempt.fail({ throttled, retryAfterMs }) as a transient failure or throttle, and
// attempt.abandon() with no evidence at all, as for a cancellation or a failure of the source. A retry is a new
// attempt, admitted again: no attempt keeps its place through a retry's wait.
//
// fixed, when given, is a fixed target, which nothing changes. Otherwise the controller adapts within maximum, from
// the direction's policy start. Only an upload whose destination is 's3', as its first grant identified it (see
// Upload.js), with Default startup, warms from one instead (see the README's Transfer concurrency): an upload to a
// remote server integration or Files Agent ('remote'), and any controller given no destination, begin the same ordinary
// policy at its start, whatever their startup. maximum, when given, caps either: a fixed target above it is maximum,
// so that maxConcurrency bounds a transfer's requests whether its concurrency is fixed or adaptive. Every decision is
// recorded for snapshot(), with the measurements that led to it.
var createController = exports.createController = function createController(_ref2) {
  var _ref3;
  var _ref2$clock = _ref2.clock,
    clock = _ref2$clock === void 0 ? systemClock : _ref2$clock,
    _ref2$destination = _ref2.destination,
    destination = _ref2$destination === void 0 ? null : _ref2$destination,
    direction = _ref2.direction,
    _ref2$fixed = _ref2.fixed,
    fixed = _ref2$fixed === void 0 ? null : _ref2$fixed,
    maximum = _ref2.maximum,
    _ref2$startup = _ref2.startup,
    startup = _ref2$startup === void 0 ? 'default' : _ref2$startup;
  var policy = POLICIES[direction];
  var max = Math.min((_ref3 = maximum !== null && maximum !== void 0 ? maximum : fixed) !== null && _ref3 !== void 0 ? _ref3 : policy.maximum, MAX_CONCURRENCY);
  var start = Math.min(policy.start, max);
  var min = Math.min(policy.minimum, max);
  var warms = fixed === null && policy.warm && destination === 's3' && startup === 'default' && start > 1;
  var phase = 'steady';
  var target = start;
  if (fixed !== null) {
    phase = 'fixed';
    target = Math.min(fixed, max);
  } else if (warms) {
    phase = 'warm';
    target = 1;
  }
  var admitted = 0;
  var inFlight = 0;
  var epoch = 0;
  var cooldownUntil = -Infinity;
  var acceptedBytes = 0;
  var peakTarget = target;
  var lowestSecondsPerByte = null;
  var measuring = null;
  var wakeTimer = null;
  var decisions = [];
  var waiting = [];
  var warm = {
    afterRest: false,
    probe: null,
    rest: 0,
    stage: 'connecting'
  };
  var steady = {
    hold: 0,
    level: [],
    probe: null
  };
  var decide = function decide(decision) {
    var measured = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    decisions.push(_objectSpread({
      at: clock.now(),
      decision: decision,
      target: target
    }, measured));
    if (decisions.length > MAX_DECISIONS) {
      decisions.shift();
    }
  };

  // Adds the time since the window's last event to its integrals: attempts in flight over time, and the time during
  // which they filled the target.
  var integrate = function integrate(at) {
    if (!measuring) {
      return;
    }
    var elapsed = at - measuring.lastAt;
    if (elapsed > 0) {
      measuring.integral += inFlight * elapsed;
      if (inFlight >= target) {
        measuring.fullTime += elapsed;
      }
    }
    measuring.lastAt = at;
  };
  var openWindow = function openWindow(at) {
    measuring = {
      attempts: 0,
      bytes: 0,
      durationSum: 0,
      fullTime: 0,
      integral: 0,
      lastAt: at,
      openedAt: at
    };
  };
  var pump = function pump() {};

  // Wakes the queue once a throttle's cooldown is over: a wait longer than a timer allows is made of several, each
  // admitting nothing until the cooldown is over. The timer is set only while an attempt waits, and cleared as soon as
  // none does, so that a cooldown no one waits for keeps no timer, and the process, alive; the cooldown itself stays,
  // for whatever is admitted next.
  var wake = function wake(ms) {
    if (wakeTimer === null) {
      wakeTimer = clock.schedule(function () {
        wakeTimer = null;
        pump();
      }, Math.min(MAX_TIMER_MS, Math.max(0, ms)));
    }
  };
  var stopWaking = function stopWaking() {
    if (wakeTimer !== null) {
      clock.clear(wakeTimer);
      wakeTimer = null;
    }
  };
  pump = function pump() {
    var at = clock.now();
    while (waiting.length > 0 && admitted < target) {
      if (at < cooldownUntil) {
        wake(cooldownUntil - at);
        return;
      }
      admitted += 1;
      waiting.shift().grant();
    }
    if (waiting.length === 0) {
      stopWaking();
    }
  };
  var setTarget = function setTarget(next, at) {
    integrate(at);
    target = Math.max(1, Math.min(next, max));
    peakTarget = Math.max(peakTarget, target);
    pump();
  };

  // A smaller target, at least one fewer than the current one, but never below floor.
  var shrunk = function shrunk(ratio, floor) {
    return Math.max(floor, Math.min(target - 1, Math.floor(target * (1 - ratio))));
  };
  var restWarm = function restWarm(decision, measured) {
    warm.stage = 'resting';
    warm.rest = WARM_REST_WINDOWS;
    warm.afterRest = true;
    warm.probe = null;
    decide(decision, measured);
  };
  var promote = function promote(decision, measured, at) {
    phase = 'steady';
    warm.probe = null;
    steady.level = [];
    steady.probe = null;
    steady.hold = 0;
    setTarget(start, at);
    openWindow(at);
    decide(decision, measured);
  };
  var raiseWarm = function raiseWarm(added, baseline, at) {
    warm.probe = {
      added: added,
      baseline: baseline,
      from: target,
      settling: true
    };
    warm.stage = 'probing';
    warm.afterRest = false;
    setTarget(Math.min(start, target + added), at);
  };

  // Default startup: from one, each successful probe adds about half again, and one after a rest. A raise from n by d
  // is kept on its second judged window if that delivers at least baseline * (1 + 0.5 * d / n) with a queue estimate
  // below 0.5 * d; otherwise the target returns to n and rests for two judged windows, the last of which is the next
  // baseline. The first judged window at one warms its connection only. Reaching the policy start, or a judged window
  // reaching the fast-link rate, ends the warm start.
  var judgeWarm = function judgeWarm(measured, at) {
    if (measured.throughput >= policy.fastLinkBytesPerSecond) {
      promote('WarmStartFastLink', measured, at);
      return;
    }
    if (warm.stage === 'connecting') {
      warm.stage = 'baseline';
      decide('WarmStartConnecting', measured);
      return;
    }
    if (warm.stage === 'resting') {
      warm.rest -= 1;
      if (warm.rest > 0) {
        decide('WarmStartResting', measured);
        return;
      }
      warm.stage = 'baseline';
    }
    if (warm.stage === 'baseline') {
      var _added = warm.afterRest ? 1 : Math.ceil(target / 2);
      if (measured.queue >= 0.5 * _added) {
        restWarm('WarmStartQueued', measured);
        return;
      }
      raiseWarm(_added, measured.throughput, at);
      decide('WarmStartRaised', measured);
      return;
    }
    if (warm.probe.settling) {
      warm.probe.settling = false;
      decide('WarmStartSettling', measured);
      return;
    }
    var _warm$probe = warm.probe,
      added = _warm$probe.added,
      baseline = _warm$probe.baseline,
      from = _warm$probe.from;
    var required = baseline * (1 + 0.5 * added / from);
    if (measured.throughput >= required && measured.queue < 0.5 * added) {
      if (target >= start) {
        promote('WarmStartReachedStart', measured, at);
        return;
      }
      raiseWarm(Math.ceil(target / 2), measured.throughput, at);
      decide('WarmStartRaised', measured);
      return;
    }
    setTarget(from, at);
    epoch += 1;
    restWarm('WarmStartWithdrawn', _objectSpread(_objectSpread({}, measured), {}, {
      required: required
    }));
  };

  // The ordinary policy: a probe adds GROWTH_STEP and is kept on a window gaining PROBE_GAIN over its level, withdrawn
  // after PROBE_MISSES that do not, holding growth for a window after. Rising queueing with falling throughput backs
  // the target off.
  var judgeSteady = function judgeSteady(measured, at) {
    if (steady.probe) {
      if (measured.throughput >= steady.probe.baseline * (1 + PROBE_GAIN)) {
        steady.probe = null;
        steady.level = [measured.throughput];
        decide('ProbeKept', measured);
        return;
      }
      steady.probe.misses += 1;
      if (steady.probe.misses >= PROBE_MISSES) {
        setTarget(steady.probe.from, at);
        steady.probe = null;
        steady.level = [];
        steady.hold = 1;
        decide('ProbeWithdrawn', measured);
      }
      return;
    }
    steady.level.push(measured.throughput);
    if (steady.level.length > LEVEL_WINDOWS) {
      steady.level.shift();
    }
    var levelMean = steady.level.reduce(function (total, rate) {
      return total + rate;
    }, 0) / steady.level.length;
    if (measured.queue > LATENCY_QUEUE_RATIO * target && steady.level.length > 1 && measured.throughput < levelMean) {
      setTarget(shrunk(LATENCY_SHRINK, min), at);
      steady.level = [];
      decide('LatencyBackoff', measured);
      return;
    }
    if (steady.hold > 0) {
      steady.hold -= 1;
      decide('Holding', measured);
      return;
    }
    if (target >= max) {
      return;
    }
    if (measured.queue > GROWTH_QUEUE_RATIO * target) {
      decide('GrowthQueued', measured);
      return;
    }
    steady.probe = {
      baseline: levelMean,
      from: target,
      misses: 0
    };
    setTarget(target + GROWTH_STEP, at);
    decide('ProbeRaised', measured);
  };

  // Closes the window once it holds enough accepted attempts, the policy's windowAttempts and as many as the target,
  // in the warm start as after it, over at least their mean duration, and judges it. Only a window judged, its attempts
  // having filled the target for enough of its time, can lower the seconds per byte that every later window's queue is
  // estimated from: a window that did not, recorded as not measured, leaves that reference as it was, so that neither a
  // few unusually fast attempts nor a sparse window can set it.
  var closeWindow = function closeWindow(at) {
    var needed = Math.max(policy.windowAttempts, target);
    var elapsed = at - measuring.openedAt;
    if (measuring.attempts < needed || elapsed <= 0 || elapsed < measuring.durationSum / measuring.attempts) {
      return;
    }
    integrate(at);
    var secondsPerByte = measuring.durationSum / 1000 / measuring.bytes;
    var averageInFlight = measuring.integral / elapsed;
    var utilization = measuring.fullTime / elapsed;
    var judged = utilization >= UTILIZATION;
    if (judged) {
      lowestSecondsPerByte = lowestSecondsPerByte === null ? secondsPerByte : Math.min(lowestSecondsPerByte, secondsPerByte);
    }
    var reference = lowestSecondsPerByte !== null && lowestSecondsPerByte !== void 0 ? lowestSecondsPerByte : secondsPerByte;
    var measured = {
      averageInFlight: averageInFlight,
      queue: Math.max(0, averageInFlight * (1 - reference / secondsPerByte)),
      throughput: measuring.bytes * 1000 / elapsed,
      utilization: utilization
    };
    openWindow(at);
    if (!judged) {
      decide('WindowNotMeasured', measured);
      return;
    }
    if (phase === 'warm') {
      judgeWarm(measured, at);
    } else {
      judgeSteady(measured, at);
    }
  };
  var attemptOf = function attemptOf() {
    var attemptEpoch = epoch;
    var startedAt = null;
    var settled = false;

    // Settles the attempt once, giving the time it did so, or null when it already has been.
    var settle = function settle() {
      if (settled) {
        return null;
      }
      settled = true;
      var at = clock.now();
      integrate(at);
      admitted -= 1;
      if (startedAt !== null) {
        inFlight -= 1;
      }
      return at;
    };
    return {
      abandon: function abandon() {
        if (settle() !== null) {
          pump();
        }
      },
      // excludedMs is time within the attempt spent on anything but the network, such as waiting for writes to a
      // download's destination, which its duration leaves out.
      accept: function accept(bytes) {
        var excludedMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var at = settle();
        if (at === null) {
          return;
        }
        acceptedBytes += bytes;

        // A completion during a throttle's cooldown measures no current capacity.
        if (phase !== 'fixed' && startedAt !== null && bytes > 0 && measuring && at >= cooldownUntil) {
          measuring.attempts += 1;
          measuring.bytes += bytes;
          measuring.durationSum += Math.max(0, at - startedAt - excludedMs);
          closeWindow(at);
        }
        pump();
      },
      // Every consequence of the failure, its throttle's cooldown included, is in place before anything waiting is
      // admitted, so that no attempt is granted in the moment between. A throttle's cooldown holds back every new
      // admission, of a fixed target as well, until retryAfterMs has passed; its owner refuses a wait no timer can be
      // set for before it gets here.
      fail: function fail() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$retryAfterMs = _ref4.retryAfterMs,
          retryAfterMs = _ref4$retryAfterMs === void 0 ? 0 : _ref4$retryAfterMs,
          _ref4$throttled = _ref4.throttled,
          throttled = _ref4$throttled === void 0 ? false : _ref4$throttled;
        var at = settle();
        if (at === null) {
          return;
        }
        if (throttled) {
          var waitMs = Number.isFinite(retryAfterMs) ? Math.max(0, retryAfterMs) : 0;
          cooldownUntil = Math.max(cooldownUntil, at + waitMs);
        }
        if (phase !== 'fixed') {
          var backsOff = attemptEpoch === epoch;
          if (backsOff) {
            integrate(at);
            target = Math.max(1, Math.min(shrunk(throttled ? THROTTLE_SHRINK : FAILURE_SHRINK, phase === 'warm' ? 1 : min), max));
            epoch += 1;
            steady.probe = null;
            steady.level = [];
            decide(throttled ? 'ThrottleBackoff' : 'FailureBackoff');
          }
          if (phase === 'warm') {
            restWarm('WarmStartFailureRest');
          }
          if (backsOff || throttled) {
            openWindow(at);
          }
        }
        pump();
      },
      start: function start() {
        if (startedAt !== null || settled) {
          return;
        }
        var at = clock.now();
        if (!measuring) {
          openWindow(at);
        }
        integrate(at);
        startedAt = at;
        inFlight += 1;
      }
    };
  };
  return {
    admit: function () {
      var _admit = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(signal) {
        return _regenerator.default.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 1;
              return waitInTurn(waiting, signal, pump);
            case 1:
              return _context.abrupt("return", attemptOf());
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function admit(_x) {
        return _admit.apply(this, arguments);
      }
      return admit;
    }(),
    snapshot: function snapshot() {
      return {
        acceptedBytes: acceptedBytes,
        admitted: admitted,
        cooldownMs: Math.max(0, cooldownUntil - clock.now()),
        decisions: decisions.map(function (decision) {
          return _objectSpread({}, decision);
        }),
        direction: direction,
        epoch: epoch,
        inFlight: inFlight,
        maximum: max,
        minimum: min,
        peakTarget: peakTarget,
        phase: phase,
        start: start,
        startup: fixed === null ? startup : 'fixed',
        target: target
      };
    },
    get target() {
      return target;
    }
  };
};

// A transfer's progress: bytesTransferred counts each accepted upload part, or each byte delivered to a download's
// destination, once; bytesSent also counts upload bytes sent again, or download bytes received but then discarded.
// elapsedMs and bytesPerSecond use the monotonic clock and leave out the time control was paused. onProgress, if
// given, receives a snapshot as the transfer starts, at most every PROGRESS_INTERVAL_MS as bytes count, and once as it
// ends; an error it throws while the transfer runs fails the transfer, while one thrown by that last report, once the
// transfer's outcome is settled, is ignored.
var createProgress = exports.createProgress = function createProgress(_ref5) {
  var _ref5$clock = _ref5.clock,
    clock = _ref5$clock === void 0 ? systemClock : _ref5$clock,
    control = _ref5.control,
    direction = _ref5.direction,
    onProgress = _ref5.onProgress,
    _ref5$totalBytes = _ref5.totalBytes,
    totalBytes = _ref5$totalBytes === void 0 ? null : _ref5$totalBytes;
  var startedAt = clock.now();
  var pausedBefore = control ? control._pausedMs(startedAt) : 0;
  var bytesTransferred = 0;
  var bytesSent = 0;
  var state = 'running';
  var lastReport = -Infinity;
  var total = totalBytes;
  var snapshot = function snapshot() {
    var at = clock.now();
    var paused = control ? control._pausedMs(at) - pausedBefore : 0;
    var elapsedMs = Math.max(0, at - startedAt - paused);
    return {
      bytesPerSecond: elapsedMs > 0 ? bytesTransferred * 1000 / elapsedMs : 0,
      bytesSent: bytesSent,
      bytesTransferred: bytesTransferred,
      direction: direction,
      elapsedMs: elapsedMs,
      state: state === 'running' && control !== null && control !== void 0 && control.paused ? 'paused' : state,
      totalBytes: total
    };
  };
  var report = function report(always) {
    if (typeof onProgress !== 'function') {
      return;
    }
    var at = clock.now();
    if (!always && at - lastReport < PROGRESS_INTERVAL_MS) {
      return;
    }
    lastReport = at;
    onProgress(snapshot());
  };
  return {
    // Counts bytes accepted or delivered once.
    accepted: function accepted(bytes) {
      bytesTransferred += bytes;
      report(false);
    },
    // Ends the transfer's progress, once, as 'completed' or 'failed', with a last report, which cannot change the
    // transfer's outcome.
    finish: function finish(outcome) {
      if (state !== 'running') {
        return;
      }
      state = outcome;
      try {
        report(true);
      } catch (_unused) {
        // The transfer has its outcome already.
      }
    },
    // Discards what a whole download delivered, when it starts again from its first byte (see File.node.js).
    reset: function reset() {
      bytesTransferred = 0;
      report(true);
    },
    sent: function sent(bytes) {
      bytesSent += bytes;
    },
    // The transfer's size, once a download's response declares it: a number of bytes, or null while unknown.
    setTotal: function setTotal(bytes) {
      total = bytes;
    },
    snapshot: snapshot,
    start: function start() {
      return report(true);
    }
  };
};

/**
 * Pauses and resumes the transfers it is given (`options.control`). Paused, a transfer starts no new request and reads
 * no further, while the requests already under way finish; it keeps every part sent, offset written and its upload's
 * `ref`, and resumes where it stopped. Pausing is not cancelling: only a transfer's `signal` cancels it. One control can
 * govern several transfers at once.
 */
var _clock = /*#__PURE__*/new WeakMap();
var _paused = /*#__PURE__*/new WeakMap();
var _pausedSince = /*#__PURE__*/new WeakMap();
var _pausedTotal = /*#__PURE__*/new WeakMap();
var _waiting = /*#__PURE__*/new WeakMap();
var _sharedPaused = /*#__PURE__*/new WeakMap();
var TransferControl = exports.TransferControl = /*#__PURE__*/function () {
  function TransferControl() {
    var clock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : systemClock;
    (0, _classCallCheck2.default)(this, TransferControl);
    _classPrivateFieldInitSpec(this, _clock, void 0);
    _classPrivateFieldInitSpec(this, _paused, false);
    _classPrivateFieldInitSpec(this, _pausedSince, 0);
    _classPrivateFieldInitSpec(this, _pausedTotal, 0);
    _classPrivateFieldInitSpec(this, _waiting, new Set());
    _classPrivateFieldInitSpec(this, _sharedPaused, null);
    _classPrivateFieldSet(_clock, this, clock);
  }
  return (0, _createClass2.default)(TransferControl, [{
    key: "paused",
    get: function get() {
      return _classPrivateFieldGet(_paused, this);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!_classPrivateFieldGet(_paused, this)) {
        _classPrivateFieldSet(_paused, this, true);
        _classPrivateFieldSet(_pausedSince, this, _classPrivateFieldGet(_clock, this).now());
        if (_classPrivateFieldGet(_sharedPaused, this) !== null) {
          Atomics.store(_classPrivateFieldGet(_sharedPaused, this), 0, 1);
        }
      }
    }
  }, {
    key: "resume",
    value: function resume() {
      if (_classPrivateFieldGet(_paused, this)) {
        _classPrivateFieldSet(_paused, this, false);
        _classPrivateFieldSet(_pausedTotal, this, _classPrivateFieldGet(_pausedTotal, this) + (_classPrivateFieldGet(_clock, this).now() - _classPrivateFieldGet(_pausedSince, this)));
        if (_classPrivateFieldGet(_sharedPaused, this) !== null) {
          Atomics.store(_classPrivateFieldGet(_sharedPaused, this), 0, 0);
        }
        var waiting = (0, _toConsumableArray2.default)(_classPrivateFieldGet(_waiting, this));
        _classPrivateFieldGet(_waiting, this).clear();
        waiting.forEach(function (entry) {
          return entry.resolve();
        });
      }
    }

    // Not public: whether this control is paused, for another thread to read, as the one element of an Int32Array in
    // memory threads share: 1 while paused, 0 while running, set before pause() or resume() returns. A download's thread
    // reads it (see isomorphic/DownloadWorkers.node.js). It is made only once a download thread first asks for it.
  }, {
    key: "_pausedFlag",
    value: function _pausedFlag() {
      if (_classPrivateFieldGet(_sharedPaused, this) === null) {
        _classPrivateFieldSet(_sharedPaused, this, new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)));
        Atomics.store(_classPrivateFieldGet(_sharedPaused, this), 0, _classPrivateFieldGet(_paused, this) ? 1 : 0);
      }
      return _classPrivateFieldGet(_sharedPaused, this);
    }

    // Not public: how long this control has been paused, in all, by the time at.
  }, {
    key: "_pausedMs",
    value: function _pausedMs(at) {
      return _classPrivateFieldGet(_pausedTotal, this) + (_classPrivateFieldGet(_paused, this) ? at - _classPrivateFieldGet(_pausedSince, this) : 0);
    }

    // Not public: resolves once this control is not paused, at once when it is not; rejects with signal's reason when
    // it aborts first.
  }, {
    key: "_whenRunning",
    value: function _whenRunning(signal) {
      var _this = this;
      if (!_classPrivateFieldGet(_paused, this)) {
        return Promise.resolve();
      }
      return new Promise(function (resolve, reject) {
        if (signal !== null && signal !== void 0 && signal.aborted) {
          reject(abortReason(signal));
          return;
        }
        var entry = {};
        var onAbort = function onAbort() {
          _classPrivateFieldGet(_waiting, _this).delete(entry);
          reject(abortReason(signal));
        };
        entry.resolve = function () {
          signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
          resolve();
        };
        signal === null || signal === void 0 || signal.addEventListener('abort', onAbort, {
          once: true
        });
        _classPrivateFieldGet(_waiting, _this).add(entry);
      });
    }
  }]);
}(); // The hard budgets of a scope: its requests at once in each direction; buffers, the one budget of bufferBytes for all
// the upload data the SDK holds (see byteBudget and Upload.js); and the files it transfers at once; and, for a job, the
// controllers its compatible transfers share.
var createScope = function createScope(_ref6) {
  var bufferBytes = _ref6.bufferBytes,
    files = _ref6.files,
    requests = _ref6.requests,
    shared = _ref6.shared;
  var controllers = new Map();
  return {
    buffers: byteBudget(bufferBytes),
    // The controller for key: the job's one, made by make() the first time, or, outside a job, a new one each time.
    controllerFor: function controllerFor(key, make) {
      if (!shared) {
        return make();
      }
      if (!controllers.has(key)) {
        controllers.set(key, make());
      }
      return controllers.get(key);
    },
    controllers: controllers,
    files: requestLimiter(files),
    requests: {
      download: requestLimiter(requests),
      upload: requestLimiter(requests)
    }
  };
};

// The scope of every transfer made without a job.
var processScope = exports.processScope = createScope({
  bufferBytes: DEFAULT_BUFFER_BYTES,
  files: Infinity,
  requests: DEFAULT_REQUESTS,
  shared: false
});

/**
 * A scope for the transfers of one job, given to each of them as `options.job`. Its compatible transfers (the same
 * direction, destination kind, startup and concurrency settings) share one concurrency controller, so that what one
 * file's requests teach it carries over to the next, and every transfer of the job shares its budgets:
 * `maxConcurrency` requests at once in each direction (32 by default); `maxBufferBytes` bytes of upload data held at
 * once (256 MiB by default), parts, forms and copies of data alike, beyond which only one upload goes at a time, and
 * only as the README's Buffers section says; and `maxConcurrentFiles` files transferring at once (no limit by
 * default). Downloads are bounded by their requests, not by `maxBufferBytes`. Transfers without a job learn on their
 * own and share only the process's budgets.
 */
var _options = /*#__PURE__*/new WeakMap();
var _scope = /*#__PURE__*/new WeakMap();
var TransferJob = exports.TransferJob = /*#__PURE__*/function () {
  function TransferJob() {
    var _countOption2, _countOption3, _countOption4;
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      maxBufferBytes = _ref7.maxBufferBytes,
      maxConcurrency = _ref7.maxConcurrency,
      maxConcurrentFiles = _ref7.maxConcurrentFiles;
    (0, _classCallCheck2.default)(this, TransferJob);
    _classPrivateFieldInitSpec(this, _options, void 0);
    _classPrivateFieldInitSpec(this, _scope, void 0);
    _classPrivateFieldSet(_options, this, {
      maxBufferBytes: (_countOption2 = countOption('maxBufferBytes', maxBufferBytes)) !== null && _countOption2 !== void 0 ? _countOption2 : DEFAULT_BUFFER_BYTES,
      maxConcurrency: (_countOption3 = countOption('maxConcurrency', maxConcurrency, MAX_CONCURRENCY)) !== null && _countOption3 !== void 0 ? _countOption3 : DEFAULT_REQUESTS,
      maxConcurrentFiles: (_countOption4 = countOption('maxConcurrentFiles', maxConcurrentFiles)) !== null && _countOption4 !== void 0 ? _countOption4 : Infinity
    });
    _classPrivateFieldSet(_scope, this, createScope({
      bufferBytes: _classPrivateFieldGet(_options, this).maxBufferBytes,
      files: _classPrivateFieldGet(_options, this).maxConcurrentFiles,
      requests: _classPrivateFieldGet(_options, this).maxConcurrency,
      shared: true
    }));
  }

  /** The job's budgets, and each of its controllers' current state and recent decisions. */
  return (0, _createClass2.default)(TransferJob, [{
    key: "snapshot",
    value: function snapshot() {
      return _objectSpread(_objectSpread({}, _classPrivateFieldGet(_options, this)), {}, {
        controllers: (0, _toConsumableArray2.default)(_classPrivateFieldGet(_scope, this).controllers.entries()).map(function (_ref8) {
          var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
            key = _ref9[0],
            controller = _ref9[1];
          return _objectSpread({
            key: key
          }, controller.snapshot());
        })
      });
    }

    // Not public: the job's scope (see createScope).
  }, {
    key: "_scope",
    value: function (_scope2) {
      function _scope() {
        return _scope2.apply(this, arguments);
      }
      _scope.toString = function () {
        return _scope2.toString();
      };
      return _scope;
    }(function () {
      return _classPrivateFieldGet(_scope, this);
    })
  }]);
}(); // The scope of a transfer given job, if any: the job's, or the process's.
var scopeOf = exports.scopeOf = function scopeOf(job) {
  if (job === undefined || job === null) {
    return processScope;
  }
  if (!(job instanceof TransferJob)) {
    throw new errors.InvalidParameterError('Bad parameter: job must be a Files.TransferJob');
  }
  return job._scope();
};

// A transfer's control, if any, checked.
var controlOf = exports.controlOf = function controlOf(control) {
  if (control === undefined || control === null) {
    return null;
  }
  if (!(control instanceof TransferControl)) {
    throw new errors.InvalidParameterError('Bad parameter: control must be a Files.TransferControl');
  }
  return control;
};

// The controller of one transfer in direction, within scope: fixed when concurrency is given, otherwise adaptive with
// startup, warming from one only for an upload to S3 (see createController()); either way within maxConcurrency, when
// given, so that a fixed concurrency above it runs at maxConcurrency. A job's compatible transfers, of the same
// destination too, share one; any other transfer has its own.
var controllerFor = exports.controllerFor = function controllerFor(scope, _ref0) {
  var clock = _ref0.clock,
    concurrency = _ref0.concurrency,
    _ref0$destination = _ref0.destination,
    destination = _ref0$destination === void 0 ? 'storage' : _ref0$destination,
    direction = _ref0.direction,
    maxConcurrency = _ref0.maxConcurrency,
    startup = _ref0.startup;
  var _concurrencyOptions = concurrencyOptions({
      concurrency: concurrency,
      maxConcurrency: maxConcurrency,
      startup: startup
    }),
    fixed = _concurrencyOptions.fixed,
    maximum = _concurrencyOptions.maximum,
    chosenStartup = _concurrencyOptions.startup;
  var key = [direction, destination, fixed === null ? chosenStartup : "fixed ".concat(fixed), maximum !== null && maximum !== void 0 ? maximum : 'default'].join(' ');
  return scope.controllerFor(key, function () {
    return createController({
      clock: clock,
      destination: destination,
      direction: direction,
      fixed: fixed,
      maximum: maximum,
      startup: chosenStartup
    });
  });
};