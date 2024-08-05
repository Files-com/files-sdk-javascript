"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _App;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class App
 */
var App = /*#__PURE__*/(0, _createClass2.default)(function App() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, App);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # The type of the App
  (0, _defineProperty2.default)(this, "getAppType", function () {
    return _this.attributes.app_type;
  });
  // object # Collection of named links to documentation
  (0, _defineProperty2.default)(this, "getDocumentationLinks", function () {
    return _this.attributes.documentation_links;
  });
  // string # Long description for the in-App landing page
  (0, _defineProperty2.default)(this, "getExtendedDescription", function () {
    return _this.attributes.extended_description;
  });
  // string # Long form description of the App
  (0, _defineProperty2.default)(this, "getExtendedDescriptionForMarketingSite", function () {
    return _this.attributes.extended_description_for_marketing_site;
  });
  // string # Link to external homepage
  (0, _defineProperty2.default)(this, "getExternalHomepageUrl", function () {
    return _this.attributes.external_homepage_url;
  });
  // boolean # Is featured on the App listing?
  (0, _defineProperty2.default)(this, "getFeatured", function () {
    return _this.attributes.featured;
  });
  // string # Associated Folder Behavior type, if any
  (0, _defineProperty2.default)(this, "getFolderBehaviorType", function () {
    return _this.attributes.folder_behavior_type;
  });
  // string # App icon
  (0, _defineProperty2.default)(this, "getIconUrl", function () {
    return _this.attributes.icon_url;
  });
  // string # Logo thumbnail for the App
  (0, _defineProperty2.default)(this, "getLogoThumbnailUrl", function () {
    return _this.attributes.logo_thumbnail_url;
  });
  // string # Full size logo for the App
  (0, _defineProperty2.default)(this, "getLogoUrl", function () {
    return _this.attributes.logo_url;
  });
  // string # Marketing introdution of the App
  (0, _defineProperty2.default)(this, "getMarketingIntro", function () {
    return _this.attributes.marketing_intro;
  });
  // string # Marketing video page
  (0, _defineProperty2.default)(this, "getMarketingYoutubeUrl", function () {
    return _this.attributes.marketing_youtube_url;
  });
  // string # Name of the App
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // string # Package manager install command
  (0, _defineProperty2.default)(this, "getPackageManagerInstallCommand", function () {
    return _this.attributes.package_manager_install_command;
  });
  // string # Associated Remote Server type, if any
  (0, _defineProperty2.default)(this, "getRemoteServerType", function () {
    return _this.attributes.remote_server_type;
  });
  // array(string) # Screenshots of the App
  (0, _defineProperty2.default)(this, "getScreenshotListUrls", function () {
    return _this.attributes.screenshot_list_urls;
  });
  // string # Link to SDK installation instructions
  (0, _defineProperty2.default)(this, "getSdkInstallationInstructionsLink", function () {
    return _this.attributes.sdk_installation_instructions_link;
  });
  // string # Short description of the App
  (0, _defineProperty2.default)(this, "getShortDescription", function () {
    return _this.attributes.short_description;
  });
  // string # Associated SSO Strategy type, if any
  (0, _defineProperty2.default)(this, "getSsoStrategyType", function () {
    return _this.attributes.sso_strategy_type;
  });
  // string # Tutorial video page
  (0, _defineProperty2.default)(this, "getTutorialYoutubeUrl", function () {
    return _this.attributes.tutorial_youtube_url;
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
});
_App = App;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name` and `app_type`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and `app_type`. Valid field combinations are `[ name, app_type ]` and `[ app_type, name ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
(0, _defineProperty2.default)(App, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 6:
        _context.next = 8;
        return _Api.default.sendRequest('/apps', 'GET', params, options);
      case 8:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _App(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(App, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _App.list(params, options);
});
var _default = exports.default = App;
module.exports = App;
module.exports.default = App;