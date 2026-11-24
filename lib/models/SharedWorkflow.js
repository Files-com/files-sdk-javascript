"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _SharedWorkflow;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

/**
 * Class SharedWorkflow
 */
var SharedWorkflow = /*#__PURE__*/(0, _createClass2.default)(function SharedWorkflow() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, SharedWorkflow);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Shared Workflow ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // string # Name displayed to recipients.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // string # Description displayed to recipients.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  // string # Revision required when submitting a Shared Workflow run.
  (0, _defineProperty2.default)(this, "getSubmissionRevision", function () {
    return _this.attributes.submission_revision;
  });
  // array(object) # Current custom questions in display order.
  (0, _defineProperty2.default)(this, "getFormFields", function () {
    return _this.attributes.form_fields;
  });
  // Run a Shared Workflow
  //
  // Parameters:
  //   submission_revision (required) - string - Revision returned when opening the Shared Workflow.
  //   submission_id (required) - string - Client-generated UUID used to retry the same submission without starting another run.
  //   file_path (required) - string - Path of a file the recipient can read, including a file uploaded to a Snapshot created for this workflow.
  (0, _defineProperty2.default)(this, "runWorkflow", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      AutomationRun,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.submission_revision !== undefined && params.submission_revision !== null && !(0, _utils.isString)(params.submission_revision))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: submission_revision must be of type String, received ".concat((0, _utils.getType)(params.submission_revision)));
        case 4:
          if (!(params.submission_id !== undefined && params.submission_id !== null && !(0, _utils.isString)(params.submission_id))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: submission_id must be of type String, received ".concat((0, _utils.getType)(params.submission_id)));
        case 5:
          if (!(params.file_path !== undefined && params.file_path !== null && !(0, _utils.isString)(params.file_path))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: file_path must be of type String, received ".concat((0, _utils.getType)(params.file_path)));
        case 6:
          if (params.id) {
            _context.next = 8;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 7;
            break;
          }
          params.id = _this.id;
          _context.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 8:
          if (params.submission_revision) {
            _context.next = 10;
            break;
          }
          if (!_this.attributes.submission_revision) {
            _context.next = 9;
            break;
          }
          params.submission_revision = _this.submission_revision;
          _context.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: submission_revision');
        case 10:
          if (params.submission_id) {
            _context.next = 12;
            break;
          }
          if (!_this.attributes.submission_id) {
            _context.next = 11;
            break;
          }
          params.submission_id = _this.submission_id;
          _context.next = 12;
          break;
        case 11:
          throw new errors.MissingParameterError('Parameter missing: submission_id');
        case 12:
          if (params.file_path) {
            _context.next = 14;
            break;
          }
          if (!_this.attributes.file_path) {
            _context.next = 13;
            break;
          }
          params.file_path = _this.file_path;
          _context.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: file_path');
        case 14:
          _context.next = 15;
          return _Api.default.sendRequest("/shared_workflows/".concat(encodeURIComponent(params.id), "/run_workflow"), 'POST', params, _this.options);
        case 15:
          response = _context.sent;
          AutomationRun = require('./AutomationRun.js').default;
          return _context.abrupt("return", new AutomationRun(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_SharedWorkflow = SharedWorkflow;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
(0, _defineProperty2.default)(SharedWorkflow, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context2.next = 3;
        return _Api.default.sendRequest('/shared_workflows', 'GET', params, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _SharedWorkflow(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(SharedWorkflow, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _SharedWorkflow.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(SharedWorkflow, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _SharedWorkflow.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Shared Workflow ID.
(0, _defineProperty2.default)(SharedWorkflow, "find", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
    var params,
      options,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context3.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context3.next = 4;
          return _Api.default.sendRequest("/shared_workflows/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", new _SharedWorkflow(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(SharedWorkflow, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _SharedWorkflow.find(id, params, options);
});
// Parameters:
//   id (required) - int64 - Shared Workflow ID.
//   run_id (required) - int64 - ID of the run returned by the Shared Workflow submission.
(0, _defineProperty2.default)(SharedWorkflow, "findRun", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(id, runId) {
    var params,
      options,
      response,
      AutomationRun,
      _args4 = arguments;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
          if ((0, _utils.isObject)(params)) {
            _context4.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          params.run_id = runId;
          if (params.id) {
            _context4.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (params.run_id) {
            _context4.next = 3;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: run_id');
        case 3:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 4:
          if (!(params.run_id !== undefined && params.run_id !== null && !(0, _utils.isInt)(params.run_id))) {
            _context4.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: run_id must be of type Int, received ".concat((0, _utils.getType)(params.run_id)));
        case 5:
          _context4.next = 6;
          return _Api.default.sendRequest("/shared_workflows/".concat(encodeURIComponent(params.id), "/runs/").concat(encodeURIComponent(params.run_id)), 'GET', params, options);
        case 6:
          response = _context4.sent;
          AutomationRun = require('./AutomationRun.js').default;
          return _context4.abrupt("return", new AutomationRun(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x2, _x3) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = exports.default = SharedWorkflow;
module.exports = SharedWorkflow;
module.exports.default = SharedWorkflow;