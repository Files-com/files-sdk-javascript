"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.LogLevel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Files = _interopRequireDefault(require("./Files"));

var getLogLevelMethod = function getLogLevelMethod(level) {
  switch (level) {
    case LogLevel.ERROR:
      return 'error';

    case LogLevel.WARN:
      return 'warn';

    case LogLevel.INFO:
      return 'info';

    case LogLevel.DEBUG:
      return 'log';
  }

  return 'log';
};

var LogLevel = function LogLevel() {
  (0, _classCallCheck2.default)(this, LogLevel);
};

exports.LogLevel = LogLevel;
(0, _defineProperty2.default)(LogLevel, "NONE", 0);
(0, _defineProperty2.default)(LogLevel, "ERROR", 1);
(0, _defineProperty2.default)(LogLevel, "WARN", 2);
(0, _defineProperty2.default)(LogLevel, "INFO", 3);
(0, _defineProperty2.default)(LogLevel, "DEBUG", 4);

var Logger = function Logger() {
  (0, _classCallCheck2.default)(this, Logger);
};

(0, _defineProperty2.default)(Logger, "stream", void 0);
(0, _defineProperty2.default)(Logger, "isPaused", false);
(0, _defineProperty2.default)(Logger, "getLogLevelName", function (level) {
  switch (level) {
    case LogLevel.ERROR:
      return 'error';

    case LogLevel.WARN:
      return 'warn';

    case LogLevel.INFO:
      return 'info';

    case LogLevel.DEBUG:
      return 'debug';
  }

  return level;
});
(0, _defineProperty2.default)(Logger, "error", function () {
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }

  Logger.log.apply(Logger, [LogLevel.ERROR].concat(messages));
});
(0, _defineProperty2.default)(Logger, "warn", function () {
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }

  Logger.log.apply(Logger, [LogLevel.WARN].concat(messages));
});
(0, _defineProperty2.default)(Logger, "info", function () {
  for (var _len3 = arguments.length, messages = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    messages[_key3] = arguments[_key3];
  }

  Logger.log.apply(Logger, [LogLevel.INFO].concat(messages));
});
(0, _defineProperty2.default)(Logger, "debug", function () {
  for (var _len4 = arguments.length, messages = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    messages[_key4] = arguments[_key4];
  }

  Logger.log.apply(Logger, [LogLevel.DEBUG].concat(messages));
});
(0, _defineProperty2.default)(Logger, "log", function () {
  var _console;

  var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LogLevel.INFO;

  for (var _len5 = arguments.length, messages = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    messages[_key5 - 1] = arguments[_key5];
  }

  if (Logger.isPaused || messages.length === 0) {
    return;
  }

  if (_Files.default.getLogLevel() < level) {
    return;
  }

  var prefix = "[".concat(Logger.getLogLevelName(level), "]: ");
  var method = getLogLevelMethod(level);

  (_console = console)[method].apply(_console, [prefix].concat(messages));
});
(0, _defineProperty2.default)(Logger, "pause", function () {
  Logger.isPaused = true;
});
(0, _defineProperty2.default)(Logger, "unpause", function () {
  Logger.isPaused = false;
});
var _default = Logger;
exports.default = _default;