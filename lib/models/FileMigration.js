"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class FileMigration
 */
var FileMigration = function FileMigration() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, FileMigration);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "getDestPath", function () {
    return _this.attributes.dest_path;
  });
  (0, _defineProperty2.default)(this, "getFilesMoved", function () {
    return _this.attributes.files_moved;
  });
  (0, _defineProperty2.default)(this, "getFilesTotal", function () {
    return _this.attributes.files_total;
  });
  (0, _defineProperty2.default)(this, "getOperation", function () {
    return _this.attributes.operation;
  });
  (0, _defineProperty2.default)(this, "getRegion", function () {
    return _this.attributes.region;
  });
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
};

(0, _defineProperty2.default)(FileMigration, "find", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
    var params,
        options,
        response,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context.next = 7;
              break;
            }

            throw new Error('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context.next = 9;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context.next = 11;
            return _Api.default.sendRequest("/file_migrations/".concat(params['id']), 'GET', params, options);

          case 11:
            response = _context.sent;
            return _context.abrupt("return", new FileMigration(response === null || response === void 0 ? void 0 : response.data, options));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(FileMigration, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return FileMigration.find(id, params, options);
});
var _default = FileMigration;
exports.default = _default;