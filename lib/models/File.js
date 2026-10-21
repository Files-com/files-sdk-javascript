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
var _readableStream = _interopRequireDefault(require("readable-stream"));
var _safeBuffer = require("safe-buffer");
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _File;
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
 * Class File
 */
var File = /*#__PURE__*/(0, _createClass2.default)(function File() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, File);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "downloadToStream", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(writableStream, options) {
      var downloadUri, _require, downloadUrlToStream;
      return _regenerator.default.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context.next = 1;
              break;
            }
            throw new errors.NotImplementedError('Stream downloads are only available in a NodeJS environment');
          case 1:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context.next = 2;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 2:
            _require = require('../isomorphic/File.node.js'), downloadUrlToStream = _require.downloadUrlToStream;
            return _context.abrupt("return", downloadUrlToStream(writableStream, File._downloadSettingsOf(_this, downloadUri, options)));
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "downloadToString", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(options) {
      var downloadUri, _require2, downloadUrlToString;
      return _regenerator.default.wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context2.next = 1;
              break;
            }
            throw new errors.NotImplementedError('String downloads are only available in a NodeJS environment');
          case 1:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context2.next = 2;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 2:
            _require2 = require('../isomorphic/File.node.js'), downloadUrlToString = _require2.downloadUrlToString;
            return _context2.abrupt("return", downloadUrlToString(File._downloadSettingsOf(_this, downloadUri, options)));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "downloadToFile", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(destinationPath, options) {
      var downloadUri, _require3, downloadUrlToFile;
      return _regenerator.default.wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context3.next = 1;
              break;
            }
            throw new errors.NotImplementedError('Disk file downloads are only available in a NodeJS environment');
          case 1:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context3.next = 2;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 2:
            _require3 = require('../isomorphic/File.node.js'), downloadUrlToFile = _require3.downloadUrlToFile;
            return _context3.abrupt("return", downloadUrlToFile(destinationPath, File._downloadSettingsOf(_this, downloadUri, options)));
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyTo", /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(destinationFilePath) {
      var options,
        params,
        _args4 = arguments;
      return _regenerator.default.wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _this.options;
            params = {
              destination: destinationFilePath
            };
            return _context4.abrupt("return", File._actionResponse("/file_actions/copy/".concat(encodeURIComponent(_this.path)), params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyToRemoteServer", /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(remoteServerId, destinationPath) {
      var params,
        options,
        _args5 = arguments;
      return _regenerator.default.wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : _this.options;
            return _context5.abrupt("return", File.copyToRemoteServer(_this.path, remoteServerId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x7, _x8) {
      return _ref7.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyToSnapshot", /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(snapshotId, destinationPath) {
      var params,
        options,
        _args6 = arguments;
      return _regenerator.default.wrap(function (_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : _this.options;
            return _context6.abrupt("return", File.copyToSnapshot(_this.path, snapshotId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x9, _x0) {
      return _ref8.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyToChildSite", /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(siteId, destinationPath) {
      var params,
        options,
        _args7 = arguments;
      return _regenerator.default.wrap(function (_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
            options = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : _this.options;
            return _context7.abrupt("return", File.copyToChildSite(_this.path, siteId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x1, _x10) {
      return _ref9.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveTo", /*#__PURE__*/function () {
    var _ref0 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(destinationFilePath) {
      var options,
        params,
        _args8 = arguments;
      return _regenerator.default.wrap(function (_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : _this.options;
            params = {
              destination: destinationFilePath
            };
            return _context8.abrupt("return", File._actionResponse("/file_actions/move/".concat(encodeURIComponent(_this.path)), params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function (_x11) {
      return _ref0.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveToRemoteServer", /*#__PURE__*/function () {
    var _ref1 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9(remoteServerId, destinationPath) {
      var params,
        options,
        _args9 = arguments;
      return _regenerator.default.wrap(function (_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
            options = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : _this.options;
            return _context9.abrupt("return", File.moveToRemoteServer(_this.path, remoteServerId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function (_x12, _x13) {
      return _ref1.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveToSnapshot", /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee0(snapshotId, destinationPath) {
      var params,
        options,
        _args0 = arguments;
      return _regenerator.default.wrap(function (_context0) {
        while (1) switch (_context0.prev = _context0.next) {
          case 0:
            params = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : {};
            options = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : _this.options;
            return _context0.abrupt("return", File.moveToSnapshot(_this.path, snapshotId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context0.stop();
        }
      }, _callee0);
    }));
    return function (_x14, _x15) {
      return _ref10.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveToChildSite", /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee1(siteId, destinationPath) {
      var params,
        options,
        _args1 = arguments;
      return _regenerator.default.wrap(function (_context1) {
        while (1) switch (_context1.prev = _context1.next) {
          case 0:
            params = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : {};
            options = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : _this.options;
            return _context1.abrupt("return", File.moveToChildSite(_this.path, siteId, destinationPath, params, File._keepClient(_this, options)));
          case 1:
          case "end":
            return _context1.stop();
        }
      }, _callee1);
    }));
    return function (_x16, _x17) {
      return _ref11.apply(this, arguments);
    };
  }());
  // string # File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // int64 # User ID of the User who created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedById", function () {
    return _this.attributes.created_by_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedById", function (value) {
    _this.attributes.created_by_id = value;
    exposeAttributes(_this, ['created_by_id']);
  });
  // int64 # ID of the API key that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByApiKeyId", function () {
    return _this.attributes.created_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByApiKeyId", function (value) {
    _this.attributes.created_by_api_key_id = value;
    exposeAttributes(_this, ['created_by_api_key_id']);
  });
  // int64 # ID of the AS2 Incoming Message that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAs2IncomingMessageId", function () {
    return _this.attributes.created_by_as2_incoming_message_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAs2IncomingMessageId", function (value) {
    _this.attributes.created_by_as2_incoming_message_id = value;
    exposeAttributes(_this, ['created_by_as2_incoming_message_id']);
  });
  // int64 # ID of the Automation that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAutomationId", function () {
    return _this.attributes.created_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAutomationId", function (value) {
    _this.attributes.created_by_automation_id = value;
    exposeAttributes(_this, ['created_by_automation_id']);
  });
  // int64 # ID of the Bundle Registration that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByBundleRegistrationId", function () {
    return _this.attributes.created_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByBundleRegistrationId", function (value) {
    _this.attributes.created_by_bundle_registration_id = value;
    exposeAttributes(_this, ['created_by_bundle_registration_id']);
  });
  // int64 # ID of the Inbox that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByInboxId", function () {
    return _this.attributes.created_by_inbox_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByInboxId", function (value) {
    _this.attributes.created_by_inbox_id = value;
    exposeAttributes(_this, ['created_by_inbox_id']);
  });
  // int64 # ID of the Remote Server that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByRemoteServerId", function () {
    return _this.attributes.created_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByRemoteServerId", function (value) {
    _this.attributes.created_by_remote_server_id = value;
    exposeAttributes(_this, ['created_by_remote_server_id']);
  });
  // int64 # ID of the Sync that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedBySyncId", function () {
    return _this.attributes.created_by_sync_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedBySyncId", function (value) {
    _this.attributes.created_by_sync_id = value;
    exposeAttributes(_this, ['created_by_sync_id']);
  });
  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  (0, _defineProperty2.default)(this, "getCustomMetadata", function () {
    return _this.attributes.custom_metadata;
  });
  (0, _defineProperty2.default)(this, "setCustomMetadata", function (value) {
    _this.attributes.custom_metadata = value;
    exposeAttributes(_this, ['custom_metadata']);
  });
  // string # File/Folder display name
  (0, _defineProperty2.default)(this, "getDisplayName", function () {
    return _this.attributes.display_name;
  });
  (0, _defineProperty2.default)(this, "setDisplayName", function (value) {
    _this.attributes.display_name = value;
    exposeAttributes(_this, ['display_name']);
  });
  // string # Type: `directory` or `file`.
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
    exposeAttributes(_this, ['type']);
  });
  // int64 # File/Folder size
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  (0, _defineProperty2.default)(this, "setSize", function (value) {
    _this.attributes.size = value;
    exposeAttributes(_this, ['size']);
  });
  // date-time # File created date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // int64 # User ID of the User who last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedById", function () {
    return _this.attributes.last_modified_by_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedById", function (value) {
    _this.attributes.last_modified_by_id = value;
    exposeAttributes(_this, ['last_modified_by_id']);
  });
  // int64 # ID of the API key that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByApiKeyId", function () {
    return _this.attributes.last_modified_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByApiKeyId", function (value) {
    _this.attributes.last_modified_by_api_key_id = value;
    exposeAttributes(_this, ['last_modified_by_api_key_id']);
  });
  // int64 # ID of the Automation that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByAutomationId", function () {
    return _this.attributes.last_modified_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByAutomationId", function (value) {
    _this.attributes.last_modified_by_automation_id = value;
    exposeAttributes(_this, ['last_modified_by_automation_id']);
  });
  // int64 # ID of the Bundle Registration that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByBundleRegistrationId", function () {
    return _this.attributes.last_modified_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByBundleRegistrationId", function (value) {
    _this.attributes.last_modified_by_bundle_registration_id = value;
    exposeAttributes(_this, ['last_modified_by_bundle_registration_id']);
  });
  // int64 # ID of the Remote Server that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByRemoteServerId", function () {
    return _this.attributes.last_modified_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByRemoteServerId", function (value) {
    _this.attributes.last_modified_by_remote_server_id = value;
    exposeAttributes(_this, ['last_modified_by_remote_server_id']);
  });
  // int64 # ID of the Sync that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedBySyncId", function () {
    return _this.attributes.last_modified_by_sync_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedBySyncId", function (value) {
    _this.attributes.last_modified_by_sync_id = value;
    exposeAttributes(_this, ['last_modified_by_sync_id']);
  });
  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  (0, _defineProperty2.default)(this, "getMtime", function () {
    return _this.attributes.mtime;
  });
  (0, _defineProperty2.default)(this, "setMtime", function (value) {
    _this.attributes.mtime = value;
    exposeAttributes(_this, ['mtime']);
  });
  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  (0, _defineProperty2.default)(this, "getProvidedMtime", function () {
    return _this.attributes.provided_mtime;
  });
  (0, _defineProperty2.default)(this, "setProvidedMtime", function (value) {
    _this.attributes.provided_mtime = value;
    exposeAttributes(_this, ['provided_mtime']);
  });
  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getCrc32", function () {
    return _this.attributes.crc32;
  });
  (0, _defineProperty2.default)(this, "setCrc32", function (value) {
    _this.attributes.crc32 = value;
    exposeAttributes(_this, ['crc32']);
  });
  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getMd5", function () {
    return _this.attributes.md5;
  });
  (0, _defineProperty2.default)(this, "setMd5", function (value) {
    _this.attributes.md5 = value;
    exposeAttributes(_this, ['md5']);
  });
  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha1", function () {
    return _this.attributes.sha1;
  });
  (0, _defineProperty2.default)(this, "setSha1", function (value) {
    _this.attributes.sha1 = value;
    exposeAttributes(_this, ['sha1']);
  });
  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha256", function () {
    return _this.attributes.sha256;
  });
  (0, _defineProperty2.default)(this, "setSha256", function (value) {
    _this.attributes.sha256 = value;
    exposeAttributes(_this, ['sha256']);
  });
  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  (0, _defineProperty2.default)(this, "getMimeType", function () {
    return _this.attributes.mime_type;
  });
  (0, _defineProperty2.default)(this, "setMimeType", function (value) {
    _this.attributes.mime_type = value;
    exposeAttributes(_this, ['mime_type']);
  });
  // string # Region location
  (0, _defineProperty2.default)(this, "getRegion", function () {
    return _this.attributes.region;
  });
  (0, _defineProperty2.default)(this, "setRegion", function (value) {
    _this.attributes.region = value;
    exposeAttributes(_this, ['region']);
  });
  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
    exposeAttributes(_this, ['permissions']);
  });
  // boolean # Are subfolders locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getSubfoldersLocked", function () {
    return _this.attributes.subfolders_locked;
  });
  (0, _defineProperty2.default)(this, "setSubfoldersLocked", function (value) {
    _this.attributes.subfolders_locked = value;
    exposeAttributes(_this, ['subfolders_locked']);
  });
  // boolean # Is this folder locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getIsLocked", function () {
    return _this.attributes.is_locked;
  });
  (0, _defineProperty2.default)(this, "setIsLocked", function (value) {
    _this.attributes.is_locked = value;
    exposeAttributes(_this, ['is_locked']);
  });
  // string # Link to download file. Provided only in response to a download request.
  (0, _defineProperty2.default)(this, "getDownloadUri", function () {
    return _this.attributes.download_uri;
  });
  (0, _defineProperty2.default)(this, "setDownloadUri", function (value) {
    _this.attributes.download_uri = value;
    exposeAttributes(_this, ['download_uri']);
  });
  // DirectConnectionInfo # Optional direct connection information for direct Agent transfer attempts
  (0, _defineProperty2.default)(this, "getDirectConnectionInfo", function () {
    return _this.attributes.direct_connection_info;
  });
  (0, _defineProperty2.default)(this, "setDirectConnectionInfo", function (value) {
    _this.attributes.direct_connection_info = value;
    exposeAttributes(_this, ['direct_connection_info']);
  });
  // string # Bookmark/priority color of file/folder
  (0, _defineProperty2.default)(this, "getPriorityColor", function () {
    return _this.attributes.priority_color;
  });
  (0, _defineProperty2.default)(this, "setPriorityColor", function (value) {
    _this.attributes.priority_color = value;
    exposeAttributes(_this, ['priority_color']);
  });
  // int64 # File preview ID
  (0, _defineProperty2.default)(this, "getPreviewId", function () {
    return _this.attributes.preview_id;
  });
  (0, _defineProperty2.default)(this, "setPreviewId", function (value) {
    _this.attributes.preview_id = value;
    exposeAttributes(_this, ['preview_id']);
  });
  // Preview # File preview
  (0, _defineProperty2.default)(this, "getPreview", function () {
    return _this.attributes.preview;
  });
  (0, _defineProperty2.default)(this, "setPreview", function (value) {
    _this.attributes.preview = value;
    exposeAttributes(_this, ['preview']);
  });
  // string # The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
    exposeAttributes(_this, ['action']);
  });
  // int64 # Length of file.
  (0, _defineProperty2.default)(this, "getLength", function () {
    return _this.attributes.length;
  });
  (0, _defineProperty2.default)(this, "setLength", function (value) {
    _this.attributes.length = value;
    exposeAttributes(_this, ['length']);
  });
  // boolean # Create parent directories if they do not exist?
  (0, _defineProperty2.default)(this, "getMkdirParents", function () {
    return _this.attributes.mkdir_parents;
  });
  (0, _defineProperty2.default)(this, "setMkdirParents", function (value) {
    _this.attributes.mkdir_parents = value;
    exposeAttributes(_this, ['mkdir_parents']);
  });
  // int64 # Part if uploading a part.
  (0, _defineProperty2.default)(this, "getPart", function () {
    return _this.attributes.part;
  });
  (0, _defineProperty2.default)(this, "setPart", function (value) {
    _this.attributes.part = value;
    exposeAttributes(_this, ['part']);
  });
  // int64 # How many parts to fetch?
  (0, _defineProperty2.default)(this, "getParts", function () {
    return _this.attributes.parts;
  });
  (0, _defineProperty2.default)(this, "setParts", function (value) {
    _this.attributes.parts = value;
    exposeAttributes(_this, ['parts']);
  });
  // string #
  (0, _defineProperty2.default)(this, "getRef", function () {
    return _this.attributes.ref;
  });
  (0, _defineProperty2.default)(this, "setRef", function (value) {
    _this.attributes.ref = value;
    exposeAttributes(_this, ['ref']);
  });
  // int64 # File byte offset to restart from.
  (0, _defineProperty2.default)(this, "getRestart", function () {
    return _this.attributes.restart;
  });
  (0, _defineProperty2.default)(this, "setRestart", function (value) {
    _this.attributes.restart = value;
    exposeAttributes(_this, ['restart']);
  });
  // boolean # If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
  (0, _defineProperty2.default)(this, "getCopyBehaviors", function () {
    return _this.attributes.copy_behaviors;
  });
  (0, _defineProperty2.default)(this, "setCopyBehaviors", function (value) {
    _this.attributes.copy_behaviors = value;
    exposeAttributes(_this, ['copy_behaviors']);
  });
  // string # If copying folder, copy just the structure?
  (0, _defineProperty2.default)(this, "getStructure", function () {
    return _this.attributes.structure;
  });
  (0, _defineProperty2.default)(this, "setStructure", function (value) {
    _this.attributes.structure = value;
    exposeAttributes(_this, ['structure']);
  });
  // boolean # Allow file rename instead of overwrite?
  (0, _defineProperty2.default)(this, "getWithRename", function () {
    return _this.attributes.with_rename;
  });
  (0, _defineProperty2.default)(this, "setWithRename", function (value) {
    _this.attributes.with_rename = value;
    exposeAttributes(_this, ['with_rename']);
  });
  // boolean # If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  (0, _defineProperty2.default)(this, "getBufferedUpload", function () {
    return _this.attributes.buffered_upload;
  });
  (0, _defineProperty2.default)(this, "setBufferedUpload", function (value) {
    _this.attributes.buffered_upload = value;
    exposeAttributes(_this, ['buffered_upload']);
  });
  // boolean # Include optional direct connection information for a direct Agent transfer attempt?
  (0, _defineProperty2.default)(this, "getWithDirectConnectionInfo", function () {
    return _this.attributes.with_direct_connection_info;
  });
  (0, _defineProperty2.default)(this, "setWithDirectConnectionInfo", function (value) {
    _this.attributes.with_direct_connection_info = value;
    exposeAttributes(_this, ['with_direct_connection_info']);
  });
  // Download File
  //
  // Parameters:
  //   action - string - Can be blank, `redirect` or `stat`.  If set to `stat`, we will return file information but without a download URL, and without logging a download.  If set to `redirect` we will serve a 302 redirect directly to the file.  This is used for integrations with Zapier, and is not recommended for most integrations.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  //   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
  (0, _defineProperty2.default)(this, "download", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee10() {
    var params,
      response,
      _args10 = arguments;
    return _regenerator.default.wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          params = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
          if (_this.attributes.path) {
            _context10.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context10.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context10.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.action !== undefined && params.action !== null && !(0, _utils.isString)(params.action))) {
            _context10.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 4:
          if (!(params.preview_size !== undefined && params.preview_size !== null && !(0, _utils.isString)(params.preview_size))) {
            _context10.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 5:
          if (!((0, _utils.isArray)(params.with_previews) || (0, _utils.isObject)(params.with_previews))) {
            _context10.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_previews must be of type Boolean, received ".concat((0, _utils.getType)(params.with_previews)));
        case 6:
          if (!((0, _utils.isArray)(params.with_priority_color) || (0, _utils.isObject)(params.with_priority_color))) {
            _context10.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_priority_color must be of type Boolean, received ".concat((0, _utils.getType)(params.with_priority_color)));
        case 7:
          if (!((0, _utils.isArray)(params.with_direct_connection_info) || (0, _utils.isObject)(params.with_direct_connection_info))) {
            _context10.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_direct_connection_info must be of type Boolean, received ".concat((0, _utils.getType)(params.with_direct_connection_info)));
        case 8:
          if (params.path) {
            _context10.next = 10;
            break;
          }
          if (!_this.attributes.path) {
            _context10.next = 9;
            break;
          }
          params.path = _this.path;
          _context10.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 10:
          _context10.next = 11;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'GET', params, _this.options);
        case 11:
          response = _context10.sent;
          return _context10.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  // Parameters:
  //   custom_metadata - object - Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee11() {
    var params,
      response,
      _args11 = arguments;
    return _regenerator.default.wrap(function (_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          params = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
          if (_this.attributes.path) {
            _context11.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context11.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context11.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.provided_mtime !== undefined && params.provided_mtime !== null && !(0, _utils.isString)(params.provided_mtime))) {
            _context11.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 4:
          if (!(params.priority_color !== undefined && params.priority_color !== null && !(0, _utils.isString)(params.priority_color))) {
            _context11.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: priority_color must be of type String, received ".concat((0, _utils.getType)(params.priority_color)));
        case 5:
          if (params.path) {
            _context11.next = 7;
            break;
          }
          if (!_this.attributes.path) {
            _context11.next = 6;
            break;
          }
          params.path = _this.path;
          _context11.next = 7;
          break;
        case 6:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          _context11.next = 8;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'PATCH', params, _this.options);
        case 8:
          response = _context11.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context11.abrupt("return", _this);
        case 9:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee12() {
    var params,
      _args12 = arguments;
    return _regenerator.default.wrap(function (_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          params = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : {};
          if (_this.attributes.path) {
            _context12.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context12.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context12.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
            _context12.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
        case 4:
          if (params.path) {
            _context12.next = 6;
            break;
          }
          if (!_this.attributes.path) {
            _context12.next = 5;
            break;
          }
          params.path = _this.path;
          _context12.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 6:
          _context12.next = 7;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'DELETE', params, _this.options);
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  // List the contents of a ZIP file
  (0, _defineProperty2.default)(this, "zipListContents", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee13() {
    var _response$data;
    var params,
      response,
      ZipListEntry,
      _args13 = arguments;
    return _regenerator.default.wrap(function (_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          params = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {};
          if (_this.attributes.path) {
            _context13.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context13.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context13.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (params.path) {
            _context13.next = 5;
            break;
          }
          if (!_this.attributes.path) {
            _context13.next = 4;
            break;
          }
          params.path = _this.path;
          _context13.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 5:
          _context13.next = 6;
          return _Api.default.sendRequest("/file_actions/zip_list/".concat(encodeURIComponent(params.path)), 'GET', params, _this.options);
        case 6:
          response = _context13.sent;
          ZipListEntry = require('./ZipListEntry.js').default;
          return _context13.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new ZipListEntry(obj, _this.options);
          })) || []);
        case 7:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
  // Delete File/Folder and return its File Action.  A pending or processing deletion continues in the background after this returns; check its File Migration for completion.  Waiting for the File Migration does not cancel the deletion
  //
  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  (0, _defineProperty2.default)(this, "beginDelete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee14() {
    var params,
      _yield$Api$_sendActio,
      sentAction,
      response,
      FileAction,
      _args14 = arguments;
    return _regenerator.default.wrap(function (_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          params = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : {};
          if (_this.attributes.path) {
            _context14.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context14.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context14.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
            _context14.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
        case 4:
          if (params.path) {
            _context14.next = 6;
            break;
          }
          if (!_this.attributes.path) {
            _context14.next = 5;
            break;
          }
          params.path = _this.path;
          _context14.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 6:
          _context14.next = 7;
          return _Api.default._sendAction("/file_actions/delete/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 7:
          _yield$Api$_sendActio = _context14.sent;
          sentAction = _yield$Api$_sendActio.action;
          response = _yield$Api$_sendActio.response;
          FileAction = require('./FileAction.js').default;
          return _context14.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 8:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  })));
  // Copy File/Folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   copy_behaviors - boolean - If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
  //   structure - boolean - Copy structure only?
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  (0, _defineProperty2.default)(this, "copy", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee15() {
    var params,
      _yield$Api$_sendActio2,
      sentAction,
      response,
      FileAction,
      _args15 = arguments;
    return _regenerator.default.wrap(function (_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          params = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : {};
          if (_this.attributes.path) {
            _context15.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context15.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context15.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context15.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!((0, _utils.isArray)(params.copy_behaviors) || (0, _utils.isObject)(params.copy_behaviors))) {
            _context15.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: copy_behaviors must be of type Boolean, received ".concat((0, _utils.getType)(params.copy_behaviors)));
        case 5:
          if (!((0, _utils.isArray)(params.structure) || (0, _utils.isObject)(params.structure))) {
            _context15.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: structure must be of type Boolean, received ".concat((0, _utils.getType)(params.structure)));
        case 6:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context15.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 7:
          if (params.path) {
            _context15.next = 9;
            break;
          }
          if (!_this.attributes.path) {
            _context15.next = 8;
            break;
          }
          params.path = _this.path;
          _context15.next = 9;
          break;
        case 8:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 9:
          if (params.destination) {
            _context15.next = 11;
            break;
          }
          if (!_this.attributes.destination) {
            _context15.next = 10;
            break;
          }
          params.destination = _this.destination;
          _context15.next = 11;
          break;
        case 10:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 11:
          _context15.next = 12;
          return _Api.default._sendAction("/file_actions/copy/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 12:
          _yield$Api$_sendActio2 = _context15.sent;
          sentAction = _yield$Api$_sendActio2.action;
          response = _yield$Api$_sendActio2.response;
          FileAction = require('./FileAction.js').default;
          return _context15.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  })));
  // Move File/Folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  (0, _defineProperty2.default)(this, "move", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee16() {
    var params,
      _yield$Api$_sendActio3,
      sentAction,
      response,
      FileAction,
      _args16 = arguments;
    return _regenerator.default.wrap(function (_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          params = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : {};
          if (_this.attributes.path) {
            _context16.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context16.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context16.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context16.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context16.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 5:
          if (params.path) {
            _context16.next = 7;
            break;
          }
          if (!_this.attributes.path) {
            _context16.next = 6;
            break;
          }
          params.path = _this.path;
          _context16.next = 7;
          break;
        case 6:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (params.destination) {
            _context16.next = 9;
            break;
          }
          if (!_this.attributes.destination) {
            _context16.next = 8;
            break;
          }
          params.destination = _this.destination;
          _context16.next = 9;
          break;
        case 8:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 9:
          _context16.next = 10;
          return _Api.default._sendAction("/file_actions/move/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 10:
          _yield$Api$_sendActio3 = _context16.sent;
          sentAction = _yield$Api$_sendActio3.action;
          response = _yield$Api$_sendActio3.response;
          FileAction = require('./FileAction.js').default;
          return _context16.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  })));
  // Transform a file and save the output to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the transformed output.
  //   transform_type (required) - string - Transform type. Supported values are `image_convert`, `document_convert`, and `files_transform_script_execute`.
  //   target_format (required) - string - Destination format to create.
  //   script - string - Files TransformScript source. Required when transform_type is `files_transform_script_execute`.
  //   width - int64 - Maximum output width for image_convert.
  //   height - int64 - Maximum output height for image_convert.
  //   overwrite - boolean - Overwrite existing file in the destination?
  (0, _defineProperty2.default)(this, "transform", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee17() {
    var params,
      _yield$Api$_sendActio4,
      sentAction,
      response,
      FileAction,
      _args17 = arguments;
    return _regenerator.default.wrap(function (_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          params = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : {};
          if (_this.attributes.path) {
            _context17.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context17.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context17.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context17.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!(params.transform_type !== undefined && params.transform_type !== null && !(0, _utils.isString)(params.transform_type))) {
            _context17.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: transform_type must be of type String, received ".concat((0, _utils.getType)(params.transform_type)));
        case 5:
          if (!(params.target_format !== undefined && params.target_format !== null && !(0, _utils.isString)(params.target_format))) {
            _context17.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: target_format must be of type String, received ".concat((0, _utils.getType)(params.target_format)));
        case 6:
          if (!(params.script !== undefined && params.script !== null && !(0, _utils.isString)(params.script))) {
            _context17.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: script must be of type String, received ".concat((0, _utils.getType)(params.script)));
        case 7:
          if (!(params.width !== undefined && params.width !== null && !(0, _utils.isInt)(params.width))) {
            _context17.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: width must be of type Int, received ".concat((0, _utils.getType)(params.width)));
        case 8:
          if (!(params.height !== undefined && params.height !== null && !(0, _utils.isInt)(params.height))) {
            _context17.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: height must be of type Int, received ".concat((0, _utils.getType)(params.height)));
        case 9:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context17.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 10:
          if (params.path) {
            _context17.next = 12;
            break;
          }
          if (!_this.attributes.path) {
            _context17.next = 11;
            break;
          }
          params.path = _this.path;
          _context17.next = 12;
          break;
        case 11:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 12:
          if (params.destination) {
            _context17.next = 14;
            break;
          }
          if (!_this.attributes.destination) {
            _context17.next = 13;
            break;
          }
          params.destination = _this.destination;
          _context17.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 14:
          if (params.transform_type) {
            _context17.next = 16;
            break;
          }
          if (!_this.attributes.transform_type) {
            _context17.next = 15;
            break;
          }
          params.transform_type = _this.transform_type;
          _context17.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: transform_type');
        case 16:
          if (params.target_format) {
            _context17.next = 18;
            break;
          }
          if (!_this.attributes.target_format) {
            _context17.next = 17;
            break;
          }
          params.target_format = _this.target_format;
          _context17.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: target_format');
        case 18:
          _context17.next = 19;
          return _Api.default._sendAction("/file_actions/transform/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 19:
          _yield$Api$_sendActio4 = _context17.sent;
          sentAction = _yield$Api$_sendActio4.action;
          response = _yield$Api$_sendActio4.response;
          FileAction = require('./FileAction.js').default;
          return _context17.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 20:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  })));
  // Decrypt a GPG-encrypted file and save it to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the decrypted file.
  //   gpg_key_ids - array(int64) - GPG Key IDs to decrypt with. If omitted, every accessible private GPG key in the source workspace is used.
  //   gpg_key_partner_id - int64 - Partner ID whose GPG keys should be used for decryption.
  //   use_all_private_keys - boolean - Use every accessible private GPG key in the source workspace for decryption.
  //   ignore_mdc_error - boolean - Ignore errors from the MDC (modification detection code) check.
  //   overwrite - boolean - Overwrite existing file in the destination?
  (0, _defineProperty2.default)(this, "gpgDecrypt", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee18() {
    var params,
      _yield$Api$_sendActio5,
      sentAction,
      response,
      FileAction,
      _args18 = arguments;
    return _regenerator.default.wrap(function (_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          params = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : {};
          if (_this.attributes.path) {
            _context18.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context18.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context18.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context18.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!(params.gpg_key_ids !== undefined && params.gpg_key_ids !== null && !(0, _utils.isArray)(params.gpg_key_ids))) {
            _context18.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: gpg_key_ids must be of type Array, received ".concat((0, _utils.getType)(params.gpg_key_ids)));
        case 5:
          if (!(params.gpg_key_partner_id !== undefined && params.gpg_key_partner_id !== null && !(0, _utils.isInt)(params.gpg_key_partner_id))) {
            _context18.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: gpg_key_partner_id must be of type Int, received ".concat((0, _utils.getType)(params.gpg_key_partner_id)));
        case 6:
          if (!((0, _utils.isArray)(params.use_all_private_keys) || (0, _utils.isObject)(params.use_all_private_keys))) {
            _context18.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: use_all_private_keys must be of type Boolean, received ".concat((0, _utils.getType)(params.use_all_private_keys)));
        case 7:
          if (!((0, _utils.isArray)(params.ignore_mdc_error) || (0, _utils.isObject)(params.ignore_mdc_error))) {
            _context18.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ignore_mdc_error must be of type Boolean, received ".concat((0, _utils.getType)(params.ignore_mdc_error)));
        case 8:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context18.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 9:
          if (params.path) {
            _context18.next = 11;
            break;
          }
          if (!_this.attributes.path) {
            _context18.next = 10;
            break;
          }
          params.path = _this.path;
          _context18.next = 11;
          break;
        case 10:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 11:
          if (params.destination) {
            _context18.next = 13;
            break;
          }
          if (!_this.attributes.destination) {
            _context18.next = 12;
            break;
          }
          params.destination = _this.destination;
          _context18.next = 13;
          break;
        case 12:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 13:
          _context18.next = 14;
          return _Api.default._sendAction("/file_actions/gpg_decrypt/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 14:
          _yield$Api$_sendActio5 = _context18.sent;
          sentAction = _yield$Api$_sendActio5.action;
          response = _yield$Api$_sendActio5.response;
          FileAction = require('./FileAction.js').default;
          return _context18.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 15:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  })));
  // Encrypt a file with GPG and save it to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the encrypted file.
  //   gpg_key_ids - array(int64) - GPG Key IDs to encrypt with.
  //   gpg_key_partner_id - int64 - Partner ID whose GPG keys should be used for encryption.
  //   signing_key_id - int64 - Optional GPG Key ID to sign with.
  //   armor - boolean - Output ASCII-armored encrypted data.
  //   overwrite - boolean - Overwrite existing file in the destination?
  (0, _defineProperty2.default)(this, "gpgEncrypt", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee19() {
    var params,
      _yield$Api$_sendActio6,
      sentAction,
      response,
      FileAction,
      _args19 = arguments;
    return _regenerator.default.wrap(function (_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          params = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : {};
          if (_this.attributes.path) {
            _context19.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context19.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context19.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context19.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!(params.gpg_key_ids !== undefined && params.gpg_key_ids !== null && !(0, _utils.isArray)(params.gpg_key_ids))) {
            _context19.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: gpg_key_ids must be of type Array, received ".concat((0, _utils.getType)(params.gpg_key_ids)));
        case 5:
          if (!(params.gpg_key_partner_id !== undefined && params.gpg_key_partner_id !== null && !(0, _utils.isInt)(params.gpg_key_partner_id))) {
            _context19.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: gpg_key_partner_id must be of type Int, received ".concat((0, _utils.getType)(params.gpg_key_partner_id)));
        case 6:
          if (!(params.signing_key_id !== undefined && params.signing_key_id !== null && !(0, _utils.isInt)(params.signing_key_id))) {
            _context19.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: signing_key_id must be of type Int, received ".concat((0, _utils.getType)(params.signing_key_id)));
        case 7:
          if (!((0, _utils.isArray)(params.armor) || (0, _utils.isObject)(params.armor))) {
            _context19.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: armor must be of type Boolean, received ".concat((0, _utils.getType)(params.armor)));
        case 8:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context19.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 9:
          if (params.path) {
            _context19.next = 11;
            break;
          }
          if (!_this.attributes.path) {
            _context19.next = 10;
            break;
          }
          params.path = _this.path;
          _context19.next = 11;
          break;
        case 10:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 11:
          if (params.destination) {
            _context19.next = 13;
            break;
          }
          if (!_this.attributes.destination) {
            _context19.next = 12;
            break;
          }
          params.destination = _this.destination;
          _context19.next = 13;
          break;
        case 12:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 13:
          _context19.next = 14;
          return _Api.default._sendAction("/file_actions/gpg_encrypt/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 14:
          _yield$Api$_sendActio6 = _context19.sent;
          sentAction = _yield$Api$_sendActio6.action;
          response = _yield$Api$_sendActio6.response;
          FileAction = require('./FileAction.js').default;
          return _context19.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 15:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  })));
  // Extract a ZIP file to a destination folder
  //
  // Parameters:
  //   destination (required) - string - Destination folder path for extracted files.
  //   filename - string - Optional single entry filename to extract.
  //   overwrite - boolean - Overwrite existing files in the destination?
  (0, _defineProperty2.default)(this, "unzip", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee20() {
    var params,
      _yield$Api$_sendActio7,
      sentAction,
      response,
      FileAction,
      _args20 = arguments;
    return _regenerator.default.wrap(function (_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          params = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : {};
          if (_this.attributes.path) {
            _context20.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context20.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context20.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
            _context20.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (!(params.filename !== undefined && params.filename !== null && !(0, _utils.isString)(params.filename))) {
            _context20.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filename must be of type String, received ".concat((0, _utils.getType)(params.filename)));
        case 5:
          if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
            _context20.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
        case 6:
          if (params.path) {
            _context20.next = 8;
            break;
          }
          if (!_this.attributes.path) {
            _context20.next = 7;
            break;
          }
          params.path = _this.path;
          _context20.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 8:
          if (params.destination) {
            _context20.next = 10;
            break;
          }
          if (!_this.attributes.destination) {
            _context20.next = 9;
            break;
          }
          params.destination = _this.destination;
          _context20.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 10:
          _context20.next = 11;
          return _Api.default._sendAction('/file_actions/unzip', 'POST', params, _this.options);
        case 11:
          _yield$Api$_sendActio7 = _context20.sent;
          sentAction = _yield$Api$_sendActio7.action;
          response = _yield$Api$_sendActio7.response;
          FileAction = require('./FileAction.js').default;
          return _context20.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, _this.options, sentAction));
        case 12:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  })));
  // Begin File Upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Total bytes of file being uploaded (include bytes being retained if appending/restarting).
  //   with_rename - boolean - Allow file rename instead of overwrite?
  //   buffered_upload - boolean - If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  //   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
  (0, _defineProperty2.default)(this, "beginUpload", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee21() {
    var _response$data2;
    var params,
      response,
      FileUploadPart,
      _args21 = arguments;
    return _regenerator.default.wrap(function (_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          params = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : {};
          if (_this.attributes.path) {
            _context21.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context21.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context21.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!((0, _utils.isArray)(params.mkdir_parents) || (0, _utils.isObject)(params.mkdir_parents))) {
            _context21.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: mkdir_parents must be of type Boolean, received ".concat((0, _utils.getType)(params.mkdir_parents)));
        case 4:
          if (!(params.part !== undefined && params.part !== null && !(0, _utils.isInt)(params.part))) {
            _context21.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 5:
          if (!(params.parts !== undefined && params.parts !== null && !(0, _utils.isInt)(params.parts))) {
            _context21.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 6:
          if (!(params.ref !== undefined && params.ref !== null && !(0, _utils.isString)(params.ref))) {
            _context21.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 7:
          if (!(params.restart !== undefined && params.restart !== null && !(0, _utils.isInt)(params.restart))) {
            _context21.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 8:
          if (!(params.size !== undefined && params.size !== null && !(0, _utils.isInt)(params.size))) {
            _context21.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 9:
          if (!((0, _utils.isArray)(params.with_rename) || (0, _utils.isObject)(params.with_rename))) {
            _context21.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_rename must be of type Boolean, received ".concat((0, _utils.getType)(params.with_rename)));
        case 10:
          if (!((0, _utils.isArray)(params.buffered_upload) || (0, _utils.isObject)(params.buffered_upload))) {
            _context21.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: buffered_upload must be of type Boolean, received ".concat((0, _utils.getType)(params.buffered_upload)));
        case 11:
          if (!((0, _utils.isArray)(params.with_direct_connection_info) || (0, _utils.isObject)(params.with_direct_connection_info))) {
            _context21.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_direct_connection_info must be of type Boolean, received ".concat((0, _utils.getType)(params.with_direct_connection_info)));
        case 12:
          if (params.path) {
            _context21.next = 14;
            break;
          }
          if (!_this.attributes.path) {
            _context21.next = 13;
            break;
          }
          params.path = _this.path;
          _context21.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 14:
          _context21.next = 15;
          return _Api.default.sendRequest("/file_actions/begin_upload/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 15:
          response = _context21.sent;
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context21.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
            return new FileUploadPart(obj, _this.options);
          })) || []);
        case 16:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  })));
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee22() {
    var newObject;
    return _regenerator.default.wrap(function (_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 1;
          return File.create(_this.attributes.path, _this.attributes, _this.options);
        case 1:
          newObject = _context22.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context22.abrupt("return", true);
        case 2:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, _options);
});
_File = File;
(0, _defineProperty2.default)(File, "_underscoreDestinationPath", function (root, id) {
  var relativePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return _utils.pathNormalizer.normalize("_/".concat(root, "/").concat(id, "/").concat(relativePath || ''));
});
// The agent for an upload part's request to storage at url, the only option that goes with it. Through a client,
// it is the one the options choose as for an API request, their getAgentForUrl, agent, httpsAgent and httpAgent in
// turn, then the client's getAgentForUrl and agent. Without a client, it is the one getAgentForUrl or agent gives,
// as before.
(0, _defineProperty2.default)(File, "_storageAgent", function (url, options) {
  var _options$getAgentForU2, _options$client$_agen;
  if (!options.client) {
    var _options$getAgentForU;
    return ((_options$getAgentForU = options.getAgentForUrl) === null || _options$getAgentForU === void 0 ? void 0 : _options$getAgentForU.call(options, url)) || (options === null || options === void 0 ? void 0 : options.agent);
  }
  return ((_options$getAgentForU2 = options.getAgentForUrl) === null || _options$getAgentForU2 === void 0 ? void 0 : _options$getAgentForU2.call(options, url)) || options.agent || options.httpsAgent || options.httpAgent || ((_options$client$_agen = options.client._agentChooser()) === null || _options$client$_agen === void 0 ? void 0 : _options$client$_agen(url)) || undefined;
});
// The agent for a download from url: for a File from a client, the one its options or client choose, as for an upload
// part. Any other File gives none, and so downloads as it always has.
(0, _defineProperty2.default)(File, "_downloadAgent", function (file, url) {
  return file.options.client ? _File._storageAgent(url, file.options) : undefined;
});
// Whether a File's downloads ask an agent chooser for each URL (see _downloadAgent): only a File from a client can, and
// does when its options give a getAgentForUrl, agent, httpsAgent or httpAgent, or its client a getAgentForUrl or an
// agent, even a chooser that chooses none for a URL. Judged from those settings as they are now, calling neither a
// chooser nor a getter: a setting a getter gives counts as given, and so does a client that is not a FilesClient.
(0, _defineProperty2.default)(File, "_choosesDownloadAgent", function (file) {
  var settingOf = function settingOf(holder, name) {
    for (var owner = holder; owner !== null && owner !== undefined; owner = Object.getPrototypeOf(owner)) {
      var descriptor = Object.getOwnPropertyDescriptor(owner, name);
      if (descriptor) {
        return 'value' in descriptor ? {
          value: descriptor.value
        } : {
          getter: true
        };
      }
    }
    return {
      value: undefined
    };
  };
  var client = settingOf(file.options, 'client');
  if (client.getter) {
    return true;
  }
  if (!client.value) {
    return false;
  }
  var given = function given(name) {
    var setting = settingOf(file.options, name);
    return setting.getter === true || Boolean(setting.value);
  };
  if (['getAgentForUrl', 'agent', 'httpsAgent', 'httpAgent'].some(given)) {
    return true;
  }
  var FilesClient = require('../FilesClient.js').default;
  return !(client.value instanceof FilesClient) || client.value._agentChooser() !== undefined;
});
// The settings a File's downloads use: its client's, or else the global ones.
(0, _defineProperty2.default)(File, "_downloadSettings", function (file) {
  var _file$options$client, _file$options;
  return (_file$options$client = (_file$options = file.options) === null || _file$options === void 0 ? void 0 : _file$options.client) !== null && _file$options$client !== void 0 ? _file$options$client : require('../Files.js').default;
});
// Where a File's downloads log their requests, responses and the bytes they read, at DEBUG, with its settings' log
// level and logger; and whether DEBUG is on for them as a download begins, so that below it nothing is done for each
// chunk read.
(0, _defineProperty2.default)(File, "_downloadLog", function (file) {
  var Logger = require('../Logger.js').default;
  var config = _File._downloadSettings(file);
  return {
    debug: function debug() {
      for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }
      return Logger._log.apply(Logger, [config, Logger.LogLevel.DEBUG].concat(messages));
    },
    enabled: !Logger.isPaused && config.getLogLevel() >= Logger.LogLevel.DEBUG
  };
});
// Whether a File's downloads go through a configured HTTP client: its own options' fetch, or else its settings'.
// Without one, they go through Node.js's https (see File.node.js).
(0, _defineProperty2.default)(File, "_downloadsThroughFetch", function (file) {
  var _file$options$fetch, _file$options2;
  return Boolean((_file$options$fetch = (_file$options2 = file.options) === null || _file$options2 === void 0 ? void 0 : _file$options2.fetch) !== null && _file$options$fetch !== void 0 ? _file$options$fetch : _File._downloadSettings(file).getFetch());
});
// How a File's download from storage sends each request through its configured HTTP client: open(url, headers, stop,
// agent, whenSendable) sends it through the SDK's request path, as one attempt whose retries the download owns, with
// agent, the File's agent for that URL (see _downloadAgent), which the download has chosen already, before it last
// checked the request could be sent, none included, and asked again of nothing; a redirect's URL has the File's agent
// for it chosen as the redirect is followed. whenSendable(url, signal), the download's own, decides whether each
// request, a redirect's included, goes now, once every callback of its send has run, in the same turn as it is handed
// to the fetch (see Api._downloadGate). It goes with the File's fetch,
// timeoutSecs and settings, stopped by the download's own signal, or else the File's, or by stop, the request's own,
// and only the headers given, asking for the file's bytes as they are stored, with no content coding (see
// Api._openStorageDownload).
(0, _defineProperty2.default)(File, "_openDownload", function (file, signal) {
  return function (url, headers, stop, agent, whenSendable) {
    var _require4 = require('../isomorphic/File.node.js'),
      nodeReadableOf = _require4.nodeReadableOf;
    var _require5 = require('../Transfer.js'),
      linkedSignal = _require5.linkedSignal;
    var storageOptions = _File._storageOptions(file.options);
    var stoppedBy = [signal !== null && signal !== void 0 ? signal : storageOptions.signal, stop].filter(Boolean);
    var options = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, storageOptions), {}, (0, _defineProperty2.default)({}, _Api.default._downloadAgents, function (requestUrl) {
      return requestUrl === url ? agent : _File._downloadAgent(file, requestUrl);
    }), whenSendable ? (0, _defineProperty2.default)({}, _Api.default._downloadGate, whenSendable) : {}), stoppedBy.length > 0 ? {
      signal: linkedSignal(stoppedBy)
    } : {}), {}, {
      // cross-fetch's own option: the body as it was sent, not decoded.
      compress: false
    });
    return _Api.default._openStorageDownload(url, options, _objectSpread({
      'Accept-Encoding': 'identity'
    }, headers), nodeReadableOf, {
      attemptOnly: true
    });
  };
});
// How a File's download gives its URL again once that has expired: as the File's own download() does, with the
// File's options, its client, credentials, workspace and headers included, and the download's signal, as
// download_uri. A File without a path, such as one made from a download URL alone, cannot.
(0, _defineProperty2.default)(File, "_renewDownload", function (file) {
  if (!file.attributes.path) {
    return null;
  }
  return /*#__PURE__*/function () {
    var _ref26 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee23(signal) {
      var _response$data$downlo, _response$data3;
      var response;
      return _regenerator.default.wrap(function (_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 1;
            return _Api.default.sendRequest("/files/".concat(encodeURIComponent(file.attributes.path)), 'GET', {}, _objectSpread(_objectSpread({}, file.options), signal ? {
              signal: signal
            } : {}));
          case 1:
            response = _context23.sent;
            return _context23.abrupt("return", (_response$data$downlo = response === null || response === void 0 || (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.download_uri) !== null && _response$data$downlo !== void 0 ? _response$data$downlo : null);
          case 2:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    }));
    return function (_x18) {
      return _ref26.apply(this, arguments);
    };
  }();
});
// Everything a download of a File from url takes (see File.node.js): the agent of a request to each URL it is sent
// to, renewed ones included, and whether an agent chooser is asked for it; its log, retries, transport and renewal;
// the budget of each of its requests, the File's timeoutSecs or else its settings' networkTimeout, as for any request;
// and the download's own options.
(0, _defineProperty2.default)(File, "_downloadSettingsOf", function (file, url, options) {
  var _file$options$timeout, _file$options3;
  return {
    agentFor: function agentFor(requestUrl) {
      return _File._downloadAgent(file, requestUrl);
    },
    choosesAgent: function choosesAgent() {
      return _File._choosesDownloadAgent(file);
    },
    log: _File._downloadLog(file),
    maxRetries: _File._downloadSettings(file).getMaxNetworkRetries(),
    openFetch: _File._downloadsThroughFetch(file) ? _File._openDownload(file, options === null || options === void 0 ? void 0 : options.signal) : null,
    options: options !== null && options !== void 0 ? options : {},
    renew: _File._renewDownload(file),
    timeoutSecs: (_file$options$timeout = (_file$options3 = file.options) === null || _file$options3 === void 0 ? void 0 : _file$options3.timeoutSecs) !== null && _file$options$timeout !== void 0 ? _file$options$timeout : _File._downloadSettings(file).getNetworkTimeout(),
    url: url
  };
});
// What the upload's owner (see Upload.js) takes of the File model: the agent of a part's request to storage at url,
// as for an API request (see _storageAgent); the File an upload resolves with, which keeps the upload's options as a
// static method's model does, its client but not its signal; the FileUploadPart determinePartUploadUri receives; and
// the options of a part's request (see _storageOptions).
(0, _defineProperty2.default)(File, "_uploadHooks", {
  agentFor: function agentFor(url, options) {
    return _File._storageAgent(url, options);
  },
  makeFile: function makeFile(data, options) {
    return new _File(data, retainedOptions(options));
  },
  makeUploadPart: function makeUploadPart(data) {
    var FileUploadPart = require('./FileUploadPart.js').default;
    return new FileUploadPart(data);
  },
  storageOptionsOf: function storageOptionsOf(options) {
    return _File._storageOptions(options);
  }
});
// Uploads the source openSource(admission) gives (see Upload.js) to destinationPath, with params and options, its file
// name in a form being the destination's. The upload checks its options before it opens the source, in the same turn
// as the call, so that a bad option opens nothing and data in memory is copied, or refused, before its caller can
// change it; and it owns the source from then on, closing it, a file on disk included, once it has settled. A
// failure of the SDK's own rejects as it is; any other, such as the source's, as a FilesError of its message, as an
// upload's failures always have; a cancelled upload rejects with its signal's reason itself.
(0, _defineProperty2.default)(File, "_upload", /*#__PURE__*/function () {
  var _ref27 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee24(destinationPath, openSource, params, options) {
    var signal, _require6, uploadSource, _t;
    return _regenerator.default.wrap(function (_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          signal = options === null || options === void 0 ? void 0 : options.signal;
          _context24.prev = 1;
          _require6 = require('../Upload.js'), uploadSource = _require6.uploadSource;
          _context24.next = 2;
          return uploadSource({
            destinationPath: destinationPath,
            fileName: "".concat(destinationPath !== null && destinationPath !== void 0 ? destinationPath : '').split('/').pop() || 'file',
            hooks: _File._uploadHooks,
            open: openSource,
            options: options,
            params: params
          });
        case 2:
          return _context24.abrupt("return", _context24.sent);
        case 3:
          _context24.prev = 3;
          _t = _context24["catch"](1);
          if (!(_File._isCancellation(signal, _t) || _t instanceof errors.FilesError)) {
            _context24.next = 4;
            break;
          }
          throw _t;
        case 4:
          errors.handleErrorResponse(_t);
          return _context24.abrupt("return", null);
        case 5:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[1, 3]]);
  }));
  return function (_x19, _x20, _x21, _x22) {
    return _ref27.apply(this, arguments);
  };
}());
// The options of an upload's requests to storage: its signal, timeoutSecs, fetch and client, whose network and log
// settings apply, but none of its credentials, headers or other options. A request's agent is chosen for its URL (see
// _storageAgent).
(0, _defineProperty2.default)(File, "_storageOptions", function (options) {
  return Object.fromEntries(['client', 'fetch', 'signal', 'timeoutSecs'].filter(function (name) {
    return options[name] !== undefined && options[name] !== null;
  }).map(function (name) {
    return [name, options[name]];
  }));
});
// The options of a File's own copy or move: options given to the call replace the File's, as they always have, but a
// File from a client keeps that client when the options give none (leave it out, or undefined or null), so its
// requests never use the global settings. A client the options give is used instead, with only those options.
(0, _defineProperty2.default)(File, "_keepClient", function (file, options) {
  var originClient = file.options.client;
  var givenClient = options === null || options === void 0 ? void 0 : options.client;
  if (originClient === undefined || originClient === null || givenClient !== undefined && givenClient !== null) {
    return options;
  }
  return _objectSpread(_objectSpread({}, options), {}, {
    client: originClient
  });
});
// Sends a copy or move to path, with params and options, and resolves with the API's response, as the copy and move
// helpers always have, its fields unchanged, with waitForCompletion() besides (see ActionWait.js), which waits for that
// action in the context its request was sent with (see Api._sendAction).
(0, _defineProperty2.default)(File, "_actionResponse", /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee25(path, params, options) {
    var _yield$Api$_sendActio8, action, response, _require7, withWait;
    return _regenerator.default.wrap(function (_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 1;
          return _Api.default._sendAction(path, 'POST', params, options);
        case 1:
          _yield$Api$_sendActio8 = _context25.sent;
          action = _yield$Api$_sendActio8.action;
          response = _yield$Api$_sendActio8.response;
          _require7 = require('../ActionWait.js'), withWait = _require7.withWait;
          return _context25.abrupt("return", withWait(response, action));
        case 2:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return function (_x23, _x24, _x25) {
    return _ref28.apply(this, arguments);
  };
}());
// Whether error is what an upload cancelled by its signal fails with: the signal's reason itself, whatever it is, falsy
// values and NaN included, which only Object.is() finds equal to itself; or, when the runtime gives the signal no
// reason, an AbortError.
(0, _defineProperty2.default)(File, "_isCancellation", function (signal, error) {
  return (signal === null || signal === void 0 ? void 0 : signal.aborted) === true && (Object.is(error, signal.reason) || signal.reason === undefined && error instanceof Error && error.name === 'AbortError');
});
// The name of the file at sourceFilePath, its last segment, by forward or back slashes: the destination of an upload
// to an external destination given none.
(0, _defineProperty2.default)(File, "_sourceFileName", function (sourceFilePath) {
  var _split$filter$pop;
  return (_split$filter$pop = "".concat(sourceFilePath).split(/[\\/]/).filter(function (segment) {
    return segment !== '';
  }).pop()) !== null && _split$filter$pop !== void 0 ? _split$filter$pop : '';
});
/**
 * Uploads the file at sourceFilePath on disk to destinationPath: the source first, then where it goes. Node.js only.
 * @note see File.uploadFile() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "upload", /*#__PURE__*/function () {
  var _ref29 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee26(sourceFilePath, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          return _context26.abrupt("return", _File.uploadFile(destinationPath, sourceFilePath, params, options));
        case 1:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return function (_x26, _x27, _x28, _x29) {
    return _ref29.apply(this, arguments);
  };
}());
/**
 * Uploads data, a string, bytes, a stream or an iterable of chunks, to destinationPath: the source first.
 * @note see File.uploadData() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "uploadFromData", /*#__PURE__*/function () {
  var _ref30 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee27(data, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          return _context27.abrupt("return", _File.uploadData(destinationPath, data, params, options));
        case 1:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return function (_x30, _x31, _x32, _x33) {
    return _ref30.apply(this, arguments);
  };
}());
/**
 * Uploads what readableStream yields to destinationPath: the source first.
 * @note see File.uploadStream() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "uploadFromStream", /*#__PURE__*/function () {
  var _ref31 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee28(readableStream, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          return _context28.abrupt("return", _File.uploadStream(destinationPath, readableStream, params, options));
        case 1:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return function (_x34, _x35, _x36, _x37) {
    return _ref31.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadToRemoteServer", /*#__PURE__*/function () {
  var _ref32 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee29(remoteServerId, destinationPath, sourceFilePath, params, options) {
    return _regenerator.default.wrap(function (_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          return _context29.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context29.stop();
      }
    }, _callee29);
  }));
  return function (_x38, _x39, _x40, _x41, _x42) {
    return _ref32.apply(this, arguments);
  };
}());
/**
 * Uploads the file at sourceFilePath on disk to destinationPath in a Remote Server: the source first.
 * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
 * Node.js only.
 * @note see File.uploadFile() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "uploadFileToRemoteServer", /*#__PURE__*/function () {
  var _ref33 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee30(sourceFilePath, remoteServerId, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          return _context30.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath === undefined ? _File._sourceFileName(sourceFilePath) : destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return function (_x43, _x44, _x45, _x46, _x47) {
    return _ref33.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadToSnapshot", /*#__PURE__*/function () {
  var _ref34 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee31(snapshotId, destinationPath, sourceFilePath, params, options) {
    return _regenerator.default.wrap(function (_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          return _context31.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context31.stop();
      }
    }, _callee31);
  }));
  return function (_x48, _x49, _x50, _x51, _x52) {
    return _ref34.apply(this, arguments);
  };
}());
/**
 * Uploads the file at sourceFilePath on disk to destinationPath in a Snapshot: the source first.
 * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
 * Node.js only.
 * @note see File.uploadFile() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "uploadFileToSnapshot", /*#__PURE__*/function () {
  var _ref35 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee32(sourceFilePath, snapshotId, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          return _context32.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath === undefined ? _File._sourceFileName(sourceFilePath) : destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context32.stop();
      }
    }, _callee32);
  }));
  return function (_x53, _x54, _x55, _x56, _x57) {
    return _ref35.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadToChildSite", /*#__PURE__*/function () {
  var _ref36 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee33(siteId, destinationPath, sourceFilePath, params, options) {
    return _regenerator.default.wrap(function (_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          return _context33.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('Sites', siteId, destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context33.stop();
      }
    }, _callee33);
  }));
  return function (_x58, _x59, _x60, _x61, _x62) {
    return _ref36.apply(this, arguments);
  };
}());
/**
 * Uploads the file at sourceFilePath on disk to destinationPath in a Child Site: the source first.
 * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
 * Node.js only.
 * @note see File.uploadFile() and File.UploadParams for the supported params
 */
(0, _defineProperty2.default)(File, "uploadFileToChildSite", /*#__PURE__*/function () {
  var _ref37 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee34(sourceFilePath, siteId, destinationPath, params, options) {
    return _regenerator.default.wrap(function (_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          return _context34.abrupt("return", _File.uploadFile(_File._underscoreDestinationPath('Sites', siteId, destinationPath === undefined ? _File._sourceFileName(sourceFilePath) : destinationPath), sourceFilePath, params, options));
        case 1:
        case "end":
          return _context34.stop();
      }
    }, _callee34);
  }));
  return function (_x63, _x64, _x65, _x66, _x67) {
    return _ref37.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "copyToRemoteServer", /*#__PURE__*/function () {
  var _ref38 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee35(path, remoteServerId, destinationPath) {
    var params,
      options,
      _args35 = arguments;
    return _regenerator.default.wrap(function (_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          params = _args35.length > 3 && _args35[3] !== undefined ? _args35[3] : {};
          options = _args35.length > 4 && _args35[4] !== undefined ? _args35[4] : {};
          return _context35.abrupt("return", _File._actionResponse("/file_actions/copy/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context35.stop();
      }
    }, _callee35);
  }));
  return function (_x68, _x69, _x70) {
    return _ref38.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "moveToRemoteServer", /*#__PURE__*/function () {
  var _ref39 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee36(path, remoteServerId, destinationPath) {
    var params,
      options,
      _args36 = arguments;
    return _regenerator.default.wrap(function (_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          params = _args36.length > 3 && _args36[3] !== undefined ? _args36[3] : {};
          options = _args36.length > 4 && _args36[4] !== undefined ? _args36[4] : {};
          return _context36.abrupt("return", _File._actionResponse("/file_actions/move/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context36.stop();
      }
    }, _callee36);
  }));
  return function (_x71, _x72, _x73) {
    return _ref39.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "copyToSnapshot", /*#__PURE__*/function () {
  var _ref40 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee37(path, snapshotId, destinationPath) {
    var params,
      options,
      _args37 = arguments;
    return _regenerator.default.wrap(function (_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          params = _args37.length > 3 && _args37[3] !== undefined ? _args37[3] : {};
          options = _args37.length > 4 && _args37[4] !== undefined ? _args37[4] : {};
          return _context37.abrupt("return", _File._actionResponse("/file_actions/copy/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context37.stop();
      }
    }, _callee37);
  }));
  return function (_x74, _x75, _x76) {
    return _ref40.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "moveToSnapshot", /*#__PURE__*/function () {
  var _ref41 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee38(path, snapshotId, destinationPath) {
    var params,
      options,
      _args38 = arguments;
    return _regenerator.default.wrap(function (_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          params = _args38.length > 3 && _args38[3] !== undefined ? _args38[3] : {};
          options = _args38.length > 4 && _args38[4] !== undefined ? _args38[4] : {};
          return _context38.abrupt("return", _File._actionResponse("/file_actions/move/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context38.stop();
      }
    }, _callee38);
  }));
  return function (_x77, _x78, _x79) {
    return _ref41.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "copyToChildSite", /*#__PURE__*/function () {
  var _ref42 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee39(path, siteId, destinationPath) {
    var params,
      options,
      _args39 = arguments;
    return _regenerator.default.wrap(function (_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          params = _args39.length > 3 && _args39[3] !== undefined ? _args39[3] : {};
          options = _args39.length > 4 && _args39[4] !== undefined ? _args39[4] : {};
          return _context39.abrupt("return", _File._actionResponse("/file_actions/copy/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('Sites', siteId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context39.stop();
      }
    }, _callee39);
  }));
  return function (_x80, _x81, _x82) {
    return _ref42.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "moveToChildSite", /*#__PURE__*/function () {
  var _ref43 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee40(path, siteId, destinationPath) {
    var params,
      options,
      _args40 = arguments;
    return _regenerator.default.wrap(function (_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          params = _args40.length > 3 && _args40[3] !== undefined ? _args40[3] : {};
          options = _args40.length > 4 && _args40[4] !== undefined ? _args40[4] : {};
          return _context40.abrupt("return", _File._actionResponse("/file_actions/move/".concat(encodeURIComponent(path)), _objectSpread(_objectSpread({}, params || {}), {}, {
            destination: _File._underscoreDestinationPath('Sites', siteId, destinationPath)
          }), options));
        case 1:
        case "end":
          return _context40.stop();
      }
    }, _callee40);
  }));
  return function (_x83, _x84, _x85) {
    return _ref43.apply(this, arguments);
  };
}());
/**
 * Uploads what readableStream yields to destinationPath (see Upload.js). The stream stays its caller's: it is read
 * only as the upload needs its bytes, and never closed or destroyed. Each chunk is copied as the upload takes it, so
 * that changing it afterwards changes nothing that is uploaded.
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadStream", /*#__PURE__*/function () {
  var _ref44 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee41(destinationPath, readableStream, params, options) {
    return _regenerator.default.wrap(function (_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          return _context41.abrupt("return", _File._upload(destinationPath, function (admission) {
            var _require8 = require('../Upload.js'),
              streamSource = _require8.streamSource;
            return streamSource(readableStream, {
              admission: admission
            });
          }, params, options));
        case 1:
        case "end":
          return _context41.stop();
      }
    }, _callee41);
  }));
  return function (_x86, _x87, _x88, _x89) {
    return _ref44.apply(this, arguments);
  };
}());
/**
 * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadData", /*#__PURE__*/function () {
  var _ref45 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee42(destinationPath, data, params, options) {
    var given;
    return _regenerator.default.wrap(function (_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          if (data) {
            _context42.next = 1;
            break;
          }
          throw new errors.MissingParameterError('Upload data was not provided');
        case 1:
          // An ArrayBuffer is uploaded as its bytes, as a view of it is.
          given = data instanceof ArrayBuffer ? _safeBuffer.Buffer.from(data) : data; // Bytes in memory are copied as the upload opens them, in this call, or refused (see Upload.js).
          return _context42.abrupt("return", _File._upload(destinationPath, function (admission) {
            var _require9 = require('../Upload.js'),
              dataSourceOf = _require9.dataSourceOf;
            return dataSourceOf(given, function (iterable) {
              return _readableStream.default.from(iterable);
            }, admission);
          }, params, options));
        case 2:
        case "end":
          return _context42.stop();
      }
    }, _callee42);
  }));
  return function (_x90, _x91, _x92, _x93) {
    return _ref45.apply(this, arguments);
  };
}());
/**
 * Uploads the file at sourceFilePath (see Upload.js), read at each part's own position, its size known, so that its
 * parts can go in parallel. The file is opened once the upload's file has been admitted, and before the upload
 * begins, so that failing to open it fails the upload without beginning it, and closed once the upload has settled.
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadFile", /*#__PURE__*/function () {
  var _ref46 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee43(destinationPath, sourceFilePath, params, options) {
    return _regenerator.default.wrap(function (_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          if (!(0, _utils.isBrowser)()) {
            _context43.next = 1;
            break;
          }
          throw new errors.NotImplementedError('Disk file uploads are only available in a NodeJS environment');
        case 1:
          return _context43.abrupt("return", _File._upload(destinationPath, function () {
            var _require0 = require('../isomorphic/File.node.js'),
              openUploadFile = _require0.openUploadFile;
            return openUploadFile(sourceFilePath);
          }, params, options));
        case 2:
        case "end":
          return _context43.stop();
      }
    }, _callee43);
  }));
  return function (_x94, _x95, _x96, _x97) {
    return _ref46.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   action - string - The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
//   custom_metadata - object - Custom metadata map to save when `action=end` completes the upload.  Replaces existing metadata; an empty map clears it.  No separate metadata-edit permission is required.  Supported on native files and configured remote mounts, excluding remote server automount paths.  Limited to 32 keys, 256 characters per key and 1024 characters per value.
//   etags[etag] (required) - array(string) - etag identifier.
//   etags[part] (required) - array(int64) - Part number.
//   length - int64 - Length of file.
//   mkdir_parents - boolean - Create parent directories if they do not exist?
//   part - int64 - Part if uploading a part.
//   parts - int64 - How many parts to fetch?
//   provided_mtime - string - User provided modification time.
//   ref - string -
//   restart - int64 - File byte offset to restart from.
//   size - int64 - Size of file.
//   copy_behaviors - boolean - If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
//   structure - string - If copying folder, copy just the structure?
//   with_rename - boolean - Allow file rename instead of overwrite?
//   buffered_upload - boolean - If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
//   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
(0, _defineProperty2.default)(File, "create", /*#__PURE__*/function () {
  var _ref47 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee44(path) {
    var params,
      options,
      response,
      _args44 = arguments;
    return _regenerator.default.wrap(function (_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          params = _args44.length > 1 && _args44[1] !== undefined ? _args44[1] : {};
          options = _args44.length > 2 && _args44[2] !== undefined ? _args44[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context44.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context44.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context44.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.action !== undefined && params.action !== null && !(0, _utils.isString)(params.action))) {
            _context44.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 4:
          if (!(params.length !== undefined && params.length !== null && !(0, _utils.isInt)(params.length))) {
            _context44.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: length must be of type Int, received ".concat((0, _utils.getType)(params.length)));
        case 5:
          if (!((0, _utils.isArray)(params.mkdir_parents) || (0, _utils.isObject)(params.mkdir_parents))) {
            _context44.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: mkdir_parents must be of type Boolean, received ".concat((0, _utils.getType)(params.mkdir_parents)));
        case 6:
          if (!(params.part !== undefined && params.part !== null && !(0, _utils.isInt)(params.part))) {
            _context44.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 7:
          if (!(params.parts !== undefined && params.parts !== null && !(0, _utils.isInt)(params.parts))) {
            _context44.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 8:
          if (!(params.provided_mtime !== undefined && params.provided_mtime !== null && !(0, _utils.isString)(params.provided_mtime))) {
            _context44.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 9:
          if (!(params.ref !== undefined && params.ref !== null && !(0, _utils.isString)(params.ref))) {
            _context44.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 10:
          if (!(params.restart !== undefined && params.restart !== null && !(0, _utils.isInt)(params.restart))) {
            _context44.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 11:
          if (!(params.size !== undefined && params.size !== null && !(0, _utils.isInt)(params.size))) {
            _context44.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 12:
          if (!((0, _utils.isArray)(params.copy_behaviors) || (0, _utils.isObject)(params.copy_behaviors))) {
            _context44.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: copy_behaviors must be of type Boolean, received ".concat((0, _utils.getType)(params.copy_behaviors)));
        case 13:
          if (!(params.structure !== undefined && params.structure !== null && !(0, _utils.isString)(params.structure))) {
            _context44.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: structure must be of type String, received ".concat((0, _utils.getType)(params.structure)));
        case 14:
          if (!((0, _utils.isArray)(params.with_rename) || (0, _utils.isObject)(params.with_rename))) {
            _context44.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_rename must be of type Boolean, received ".concat((0, _utils.getType)(params.with_rename)));
        case 15:
          if (!((0, _utils.isArray)(params.buffered_upload) || (0, _utils.isObject)(params.buffered_upload))) {
            _context44.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: buffered_upload must be of type Boolean, received ".concat((0, _utils.getType)(params.buffered_upload)));
        case 16:
          if (!((0, _utils.isArray)(params.with_direct_connection_info) || (0, _utils.isObject)(params.with_direct_connection_info))) {
            _context44.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_direct_connection_info must be of type Boolean, received ".concat((0, _utils.getType)(params.with_direct_connection_info)));
        case 17:
          _context44.next = 18;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 18:
          response = _context44.sent;
          return _context44.abrupt("return", new _File(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 19:
        case "end":
          return _context44.stop();
      }
    }, _callee44);
  }));
  return function (_x98) {
    return _ref47.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
//   with_previews - boolean - Include file preview information?
//   with_priority_color - boolean - Include file priority color information?
(0, _defineProperty2.default)(File, "find", /*#__PURE__*/function () {
  var _ref48 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee45(path) {
    var params,
      options,
      response,
      _args45 = arguments;
    return _regenerator.default.wrap(function (_context45) {
      while (1) switch (_context45.prev = _context45.next) {
        case 0:
          params = _args45.length > 1 && _args45[1] !== undefined ? _args45[1] : {};
          options = _args45.length > 2 && _args45[2] !== undefined ? _args45[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context45.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context45.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context45.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.preview_size !== undefined && params.preview_size !== null && !(0, _utils.isString)(params.preview_size))) {
            _context45.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 4:
          if (!((0, _utils.isArray)(params.with_previews) || (0, _utils.isObject)(params.with_previews))) {
            _context45.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_previews must be of type Boolean, received ".concat((0, _utils.getType)(params.with_previews)));
        case 5:
          if (!((0, _utils.isArray)(params.with_priority_color) || (0, _utils.isObject)(params.with_priority_color))) {
            _context45.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_priority_color must be of type Boolean, received ".concat((0, _utils.getType)(params.with_priority_color)));
        case 6:
          _context45.next = 7;
          return _Api.default.sendRequest("/file_actions/metadata/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 7:
          response = _context45.sent;
          return _context45.abrupt("return", new _File(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 8:
        case "end":
          return _context45.stop();
      }
    }, _callee45);
  }));
  return function (_x99) {
    return _ref48.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "get", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _File.find(path, params, options);
});
// Parameters:
//   paths (required) - array(string) - Paths to include in the ZIP.
//   destination (required) - string - Destination file path for the ZIP.
//   overwrite - boolean - Overwrite existing file in the destination?
(0, _defineProperty2.default)(File, "zip", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee46() {
  var params,
    options,
    _yield$Api$_sendActio9,
    sentAction,
    response,
    FileAction,
    _args46 = arguments;
  return _regenerator.default.wrap(function (_context46) {
    while (1) switch (_context46.prev = _context46.next) {
      case 0:
        params = _args46.length > 0 && _args46[0] !== undefined ? _args46[0] : {};
        options = _args46.length > 1 && _args46[1] !== undefined ? _args46[1] : {};
        if (params.paths) {
          _context46.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: paths');
      case 1:
        if (params.destination) {
          _context46.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: destination');
      case 2:
        if (!(params.paths !== undefined && params.paths !== null && !(0, _utils.isArray)(params.paths))) {
          _context46.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params.paths)));
      case 3:
        if (!(params.destination !== undefined && params.destination !== null && !(0, _utils.isString)(params.destination))) {
          _context46.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
      case 4:
        if (!((0, _utils.isArray)(params.overwrite) || (0, _utils.isObject)(params.overwrite))) {
          _context46.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: overwrite must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite)));
      case 5:
        _context46.next = 6;
        return _Api.default._sendAction('/file_actions/zip', 'POST', params, options);
      case 6:
        _yield$Api$_sendActio9 = _context46.sent;
        sentAction = _yield$Api$_sendActio9.action;
        response = _yield$Api$_sendActio9.response;
        FileAction = require('./FileAction.js').default;
        return _context46.abrupt("return", FileAction._accepted(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options), sentAction));
      case 7:
      case "end":
        return _context46.stop();
    }
  }, _callee46);
})));
var _default = exports.default = File;
module.exports = File;
module.exports.default = File;