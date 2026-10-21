"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var errors = _interopRequireWildcard(require("./Errors"));
var _utils = require("./utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
var DEFAULT_MAX_BYTES = 64 * 1024 * 1024;
var states = new WeakMap();

// Streams that a request is sending. A stream belongs to one request at a time, from serialization until the request
// ends, so two requests can never both read it.
var reservedStreams = new WeakSet();
var badParameter = function badParameter(message) {
  return new errors.InvalidParameterError("Bad parameter: ".concat(message));
};
var isStream = function isStream(source) {
  return typeof (source === null || source === void 0 ? void 0 : source.read) === 'function' && typeof (source === null || source === void 0 ? void 0 : source.removeListener) === 'function' && typeof (source === null || source === void 0 ? void 0 : source.readableLength) === 'number';
};

// Reads a Buffer view in pieces of at most `size` bytes, without copying it.
var readBytes = function readBytes(bytes) {
  var offset = 0;
  return {
    read: function read(size) {
      if (offset === bytes.length) {
        return null;
      }
      var chunk = bytes.subarray(offset, offset + size);
      offset += chunk.length;
      return chunk;
    },
    release: function release() {}
  };
};

// Borrows a stream for one attempt, from its current position. read(size) takes only bytes the stream has already
// buffered and returns undefined while there are none; onChange is called when that may have changed. It returns null
// at the end of the stream. Nothing is read while waiting, so release() detaches at once and leaves every later chunk
// to the caller. The stream is never closed, rewound or destroyed.
var borrowStream = function borrowStream(state, onChange) {
  var maxBytes = state.maxBytes,
    stream = state.source;
  var failure = null;
  var total = 0;
  var onError = function onError(error) {
    failure = error;
    onChange();
  };
  var listeners = [['close', onChange], ['end', onChange], ['error', onError], ['readable', onChange]];
  listeners.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      event = _ref2[0],
      listener = _ref2[1];
    return stream.on(event, listener);
  });
  return {
    read: function read(size) {
      if (failure) {
        throw failure;
      }
      if (stream.readableObjectMode || stream.readableEncoding) {
        throw badParameter('attachment stream must produce bytes, not objects or strings');
      }
      if (stream.readableEnded) {
        return null;
      }
      if (stream.destroyed) {
        var _stream$errored;
        throw (_stream$errored = stream.errored) !== null && _stream$errored !== void 0 ? _stream$errored : new errors.FilesError('Attachment stream closed before it ended');
      }

      // Bytes past the limit are refused while still buffered, so they stay in the stream.
      var buffered = stream.readableLength;
      if (buffered > maxBytes - total) {
        throw badParameter("attachment stream is larger than its maxBytes of ".concat(maxBytes));
      }
      if (buffered === 0) {
        stream.read(0); // asks the stream for more, or to signal its end, without taking anything
        return undefined;
      }

      // Never more than the stream's own highWaterMark, which a larger read would raise.
      var chunk = stream.read(Math.min(buffered, size, Math.max(stream.readableHighWaterMark, 1)));
      state.consumed = true;
      total += chunk.length;
      return chunk;
    },
    release: function release() {
      return listeners.forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          event = _ref4[0],
          listener = _ref4[1];
        return stream.removeListener(event, listener);
      });
    }
  };
};

// A file sent with an API request as an `encoded_content` file object, with an optional filename and media type.
// The source is either a Buffer or other Uint8Array, which is sent as it is and can be sent again when the request is
// retried, or a Node.js Readable stream of bytes, which is read once from its current position. The caller keeps
// ownership of the source: the SDK does not copy a Buffer up front, and does not close, rewind or destroy a stream.
var Attachment = /*#__PURE__*/function () {
  function Attachment(source) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      filename = _ref5.filename,
      type = _ref5.type,
      _ref5$maxBytes = _ref5.maxBytes,
      maxBytes = _ref5$maxBytes === void 0 ? DEFAULT_MAX_BYTES : _ref5$maxBytes;
    (0, _classCallCheck2.default)(this, Attachment);
    if (filename !== undefined && filename !== null && typeof filename !== 'string') {
      throw badParameter("attachment filename must be of type String, received ".concat((0, _utils.getType)(filename)));
    }
    if (type !== undefined && type !== null && typeof type !== 'string') {
      throw badParameter("attachment type must be of type String, received ".concat((0, _utils.getType)(type)));
    }
    if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
      throw badParameter('attachment maxBytes must be a positive integer');
    }
    var state = {
      consumed: false,
      filename: filename !== null && filename !== void 0 ? filename : undefined,
      maxBytes: maxBytes,
      source: source,
      type: type !== null && type !== void 0 ? type : undefined
    };
    if (source instanceof Uint8Array) {
      if (source.byteLength > maxBytes) {
        throw badParameter("attachment is ".concat(source.byteLength, " bytes, larger than its maxBytes of ").concat(maxBytes));
      }
      state.bytes = Buffer.from(source.buffer, source.byteOffset, source.byteLength);
    } else if (isStream(source)) {
      if (source.readableObjectMode || source.readableEncoding) {
        throw badParameter('attachment stream must produce bytes, not objects or strings');
      }
      if (source.destroyed) {
        throw badParameter('attachment stream has already been destroyed');
      }
    } else {
      throw badParameter("attachment source must be a Buffer, Uint8Array or readable stream, received ".concat((0, _utils.getType)(source)));
    }
    states.set(this, state);
  }
  return (0, _createClass2.default)(Attachment, [{
    key: "source",
    get: function get() {
      return states.get(this).source;
    }
  }, {
    key: "filename",
    get: function get() {
      return states.get(this).filename;
    }
  }, {
    key: "type",
    get: function get() {
      return states.get(this).type;
    }
  }, {
    key: "maxBytes",
    get: function get() {
      return states.get(this).maxBytes;
    }

    // The number of bytes sent from a Buffer or Uint8Array, or null for a stream, whose length is known only once read.
  }, {
    key: "byteLength",
    get: function get() {
      var _states$get$bytes$len, _states$get$bytes;
      return (_states$get$bytes$len = (_states$get$bytes = states.get(this).bytes) === null || _states$get$bytes === void 0 ? void 0 : _states$get$bytes.length) !== null && _states$get$bytes$len !== void 0 ? _states$get$bytes$len : null;
    }

    // A Buffer or Uint8Array can be sent again on a retry; a stream can be read only once.
  }, {
    key: "isReplayable",
    get: function get() {
      return Boolean(states.get(this).bytes);
    }

    // Whether any of this attachment's stream has been read.
  }, {
    key: "_consumed",
    get: function get() {
      return states.get(this).consumed;
    }

    // Internal: claims the source for one request, synchronously, before anything is sent. A stream can be claimed by
    // one request at a time and never again once read; a Buffer or Uint8Array can be sent by any number of requests.
  }, {
    key: "_reserve",
    value: function _reserve() {
      var _states$get = states.get(this),
        bytes = _states$get.bytes,
        consumed = _states$get.consumed,
        source = _states$get.source;
      if (bytes) {
        return;
      }
      if (consumed || reservedStreams.has(source)) {
        throw badParameter('an attachment stream can be sent only once');
      }
      reservedStreams.add(source);
    }

    // Internal: ends a request's claim. A stream that was never read can then be sent by another request.
  }, {
    key: "_release",
    value: function _release() {
      var _states$get2 = states.get(this),
        bytes = _states$get2.bytes,
        source = _states$get2.source;
      if (!bytes) {
        reservedStreams.delete(source);
      }
    }

    // Internal: reads the source for one attempt of the request that reserved it.
  }, {
    key: "_borrow",
    value: function _borrow(onChange) {
      var state = states.get(this);
      return state.bytes ? readBytes(state.bytes) : borrowStream(state, onChange);
    }
  }]);
}();
(0, _defineProperty2.default)(Attachment, "DEFAULT_MAX_BYTES", DEFAULT_MAX_BYTES);
var _default = exports.default = Attachment;
module.exports = Attachment;
module.exports.default = Attachment;