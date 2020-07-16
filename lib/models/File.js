"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _readableStream = _interopRequireDefault(require("readable-stream"));

var _safeBuffer = require("safe-buffer");

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

var _FilePartUpload = _interopRequireDefault(require("./FilePartUpload"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class File
 */
var File = function File() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, File);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "downloadToStream", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(writableStream) {
      var _require, saveUrlToStream;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(0, _utils.isBrowser)()) {
                _context.next = 2;
                break;
              }

              throw new Error('Disk file downloads are only available in a NodeJS environment');

            case 2:
              if (_this.download_uri) {
                _context.next = 4;
                break;
              }

              throw new Error('Current object has no download URI');

            case 4:
              _require = require('../isomorphic/File.node.js'), saveUrlToStream = _require.saveUrlToStream;
              return _context.abrupt("return", saveUrlToStream(_this.download_uri, writableStream));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "downloadToFile", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(destinationPath) {
      var _require2, saveUrlToFile;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(0, _utils.isBrowser)()) {
                _context2.next = 2;
                break;
              }

              throw new Error('Disk file downloads are only available in a NodeJS environment');

            case 2:
              if (_this.download_uri) {
                _context2.next = 4;
                break;
              }

              throw new Error('Current object has no download URI');

            case 4:
              _require2 = require('../isomorphic/File.node.js'), saveUrlToFile = _require2.saveUrlToFile;
              return _context2.abrupt("return", saveUrlToFile(_this.download_uri, destinationPath));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "get", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path) {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", File.find(path));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyTo", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(destinationFilePath) {
      var params;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = {
                destination: destinationFilePath
              };
              return _context4.abrupt("return", _Api.default.sendRequest("/file_actions/copy/".concat(encodeURIComponent(_this.path)), 'POST', params));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveTo", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(destinationFilePath) {
      var params;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = {
                destination: destinationFilePath
              };
              return _context5.abrupt("return", _Api.default.sendRequest("/file_actions/move/".concat(encodeURIComponent(_this.path)), 'POST', params));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  (0, _defineProperty2.default)(this, "getDisplayName", function () {
    return _this.attributes.display_name;
  });
  (0, _defineProperty2.default)(this, "setDisplayName", function (value) {
    _this.attributes.display_name = value;
  });
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
  });
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  (0, _defineProperty2.default)(this, "setSize", function (value) {
    _this.attributes.size = value;
  });
  (0, _defineProperty2.default)(this, "getMtime", function () {
    return _this.attributes.mtime;
  });
  (0, _defineProperty2.default)(this, "setMtime", function (value) {
    _this.attributes.mtime = value;
  });
  (0, _defineProperty2.default)(this, "getProvidedMtime", function () {
    return _this.attributes.provided_mtime;
  });
  (0, _defineProperty2.default)(this, "setProvidedMtime", function (value) {
    _this.attributes.provided_mtime = value;
  });
  (0, _defineProperty2.default)(this, "getCrc32", function () {
    return _this.attributes.crc32;
  });
  (0, _defineProperty2.default)(this, "setCrc32", function (value) {
    _this.attributes.crc32 = value;
  });
  (0, _defineProperty2.default)(this, "getMd5", function () {
    return _this.attributes.md5;
  });
  (0, _defineProperty2.default)(this, "setMd5", function (value) {
    _this.attributes.md5 = value;
  });
  (0, _defineProperty2.default)(this, "getMimeType", function () {
    return _this.attributes.mime_type;
  });
  (0, _defineProperty2.default)(this, "setMimeType", function (value) {
    _this.attributes.mime_type = value;
  });
  (0, _defineProperty2.default)(this, "getRegion", function () {
    return _this.attributes.region;
  });
  (0, _defineProperty2.default)(this, "setRegion", function (value) {
    _this.attributes.region = value;
  });
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
  });
  (0, _defineProperty2.default)(this, "getSubfoldersLocked", function () {
    return _this.attributes.subfolders_locked;
  });
  (0, _defineProperty2.default)(this, "setSubfoldersLocked", function (value) {
    _this.attributes.subfolders_locked = value;
  });
  (0, _defineProperty2.default)(this, "getDownloadUri", function () {
    return _this.attributes.download_uri;
  });
  (0, _defineProperty2.default)(this, "setDownloadUri", function (value) {
    _this.attributes.download_uri = value;
  });
  (0, _defineProperty2.default)(this, "getPriorityColor", function () {
    return _this.attributes.priority_color;
  });
  (0, _defineProperty2.default)(this, "setPriorityColor", function (value) {
    _this.attributes.priority_color = value;
  });
  (0, _defineProperty2.default)(this, "getPreviewId", function () {
    return _this.attributes.preview_id;
  });
  (0, _defineProperty2.default)(this, "setPreviewId", function (value) {
    _this.attributes.preview_id = value;
  });
  (0, _defineProperty2.default)(this, "getPreview", function () {
    return _this.attributes.preview;
  });
  (0, _defineProperty2.default)(this, "setPreview", function (value) {
    _this.attributes.preview = value;
  });
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
  });
  (0, _defineProperty2.default)(this, "getLength", function () {
    return _this.attributes.length;
  });
  (0, _defineProperty2.default)(this, "setLength", function (value) {
    _this.attributes.length = value;
  });
  (0, _defineProperty2.default)(this, "getMkdirParents", function () {
    return _this.attributes.mkdir_parents;
  });
  (0, _defineProperty2.default)(this, "setMkdirParents", function (value) {
    _this.attributes.mkdir_parents = value;
  });
  (0, _defineProperty2.default)(this, "getPart", function () {
    return _this.attributes.part;
  });
  (0, _defineProperty2.default)(this, "setPart", function (value) {
    _this.attributes.part = value;
  });
  (0, _defineProperty2.default)(this, "getParts", function () {
    return _this.attributes.parts;
  });
  (0, _defineProperty2.default)(this, "setParts", function (value) {
    _this.attributes.parts = value;
  });
  (0, _defineProperty2.default)(this, "getRef", function () {
    return _this.attributes.ref;
  });
  (0, _defineProperty2.default)(this, "setRef", function (value) {
    _this.attributes.ref = value;
  });
  (0, _defineProperty2.default)(this, "getRestart", function () {
    return _this.attributes.restart;
  });
  (0, _defineProperty2.default)(this, "setRestart", function (value) {
    _this.attributes.restart = value;
  });
  (0, _defineProperty2.default)(this, "getStructure", function () {
    return _this.attributes.structure;
  });
  (0, _defineProperty2.default)(this, "setStructure", function (value) {
    _this.attributes.structure = value;
  });
  (0, _defineProperty2.default)(this, "getWithRename", function () {
    return _this.attributes.with_rename;
  });
  (0, _defineProperty2.default)(this, "setWithRename", function (value) {
    _this.attributes.with_rename = value;
  });
  (0, _defineProperty2.default)(this, "download", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
    var params,
        _args6 = arguments;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};

            if (_this.attributes.id) {
              _context6.next = 3;
              break;
            }

            throw new Error('Current object has no ID');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context6.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context6.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context6.next = 10;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 10:
            if (!(params['preview_size'] && !(0, _utils.isString)(params['preview_size']))) {
              _context6.next = 12;
              break;
            }

            throw new Error("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(preview_size)));

          case 12:
            if (params['path']) {
              _context6.next = 18;
              break;
            }

            if (!_this.attributes.path) {
              _context6.next = 17;
              break;
            }

            params['path'] = _this.path;
            _context6.next = 18;
            break;

          case 17:
            throw new Error('Parameter missing: path');

          case 18:
            return _context6.abrupt("return", _Api.default.sendRequest("/files/' . params['path'] . '", 'GET', params, _this.options));

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
    var params,
        _args7 = arguments;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};

            if (_this.attributes.id) {
              _context7.next = 3;
              break;
            }

            throw new Error('Current object has no ID');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context7.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context7.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['provided_mtime'] && !(0, _utils.isString)(params['provided_mtime']))) {
              _context7.next = 10;
              break;
            }

            throw new Error("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(provided_mtime)));

          case 10:
            if (!(params['priority_color'] && !(0, _utils.isString)(params['priority_color']))) {
              _context7.next = 12;
              break;
            }

            throw new Error("Bad parameter: priority_color must be of type String, received ".concat((0, _utils.getType)(priority_color)));

          case 12:
            if (params['path']) {
              _context7.next = 18;
              break;
            }

            if (!_this.attributes.path) {
              _context7.next = 17;
              break;
            }

            params['path'] = _this.path;
            _context7.next = 18;
            break;

          case 17:
            throw new Error('Parameter missing: path');

          case 18:
            return _context7.abrupt("return", _Api.default.sendRequest("/files/' . params['path'] . '", 'PATCH', params, _this.options));

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
    var params,
        _args8 = arguments;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};

            if (_this.attributes.id) {
              _context8.next = 3;
              break;
            }

            throw new Error('Current object has no ID');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context8.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context8.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (params['path']) {
              _context8.next = 14;
              break;
            }

            if (!_this.attributes.path) {
              _context8.next = 13;
              break;
            }

            params['path'] = _this.path;
            _context8.next = 14;
            break;

          case 13:
            throw new Error('Parameter missing: path');

          case 14:
            return _context8.abrupt("return", _Api.default.sendRequest("/files/' . params['path'] . '", 'DELETE', params, _this.options));

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['path']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = File.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        key = _ref10[0],
        value = _ref10[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
};

(0, _defineProperty2.default)(File, "_openUpload", /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(path) {
    var params, response, partData;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            params = {
              action: 'put'
            };
            _context9.next = 3;
            return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params);

          case 3:
            response = _context9.sent;

            if (response) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", null);

          case 6:
            partData = _objectSpread(_objectSpread({}, response.data), {}, {
              headers: response.headers,
              parameters: params
            });
            return _context9.abrupt("return", new _FilePartUpload.default(partData));

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x6) {
    return _ref11.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_continueUpload", /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(path, partNumber, firstFilePartUpload) {
    var params, response, partData;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            params = {
              action: 'put',
              part: partNumber,
              ref: firstFilePartUpload.ref
            };
            _context10.next = 3;
            return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params);

          case 3:
            response = _context10.sent;

            if (response) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", null);

          case 6:
            partData = _objectSpread(_objectSpread({}, response.data), {}, {
              headers: response.headers,
              parameters: params
            });
            return _context10.abrupt("return", new _FilePartUpload.default(partData));

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x7, _x8, _x9) {
    return _ref12.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_completeUpload", /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(filePartUpload) {
    var params;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            params = {
              action: 'end',
              ref: filePartUpload.ref
            };
            return _context11.abrupt("return", _Api.default.sendRequest("/files/".concat(encodeURIComponent(filePartUpload.path)), 'POST', params));

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x10) {
    return _ref13.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadStream", /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(destinationPath, readableStream) {
    var filePartUpload, file;
    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return File._openUpload(destinationPath);

          case 2:
            filePartUpload = _context14.sent;

            if (filePartUpload) {
              _context14.next = 5;
              break;
            }

            return _context14.abrupt("return");

          case 5:
            _context14.prev = 5;
            _context14.next = 8;
            return new Promise(function (resolve, reject) {
              var part = 0;
              var chunks = [];
              var length = 0;
              readableStream.on('error', function (error) {
                reject(error);
              });
              readableStream.on('data', /*#__PURE__*/function () {
                var _ref15 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(chunk) {
                  var buffer, nextFilePartUpload;
                  return _regenerator.default.wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          length += chunk.length;

                          if (!(length > filePartUpload.partsize)) {
                            _context12.next = 12;
                            break;
                          }

                          readableStream.pause();
                          buffer = _safeBuffer.Buffer.concat(chunks);
                          _context12.next = 6;
                          return File._continueUpload(destinationPath, ++part, filePartUpload);

                        case 6:
                          nextFilePartUpload = _context12.sent;
                          _context12.next = 9;
                          return _Api.default.sendFilePart(nextFilePartUpload.upload_uri, 'PUT', buffer);

                        case 9:
                          chunks = [];
                          length = 0;
                          readableStream.resume();

                        case 12:
                          chunks.push(_safeBuffer.Buffer.from(chunk));

                        case 13:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                }));

                return function (_x13) {
                  return _ref15.apply(this, arguments);
                };
              }());
              readableStream.on('end', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
                var buffer, nextFilePartUpload, response, createdFile;
                return _regenerator.default.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        if (!(chunks.length > 0)) {
                          _context13.next = 7;
                          break;
                        }

                        buffer = _safeBuffer.Buffer.concat(chunks);
                        _context13.next = 4;
                        return File._continueUpload(destinationPath, ++part, filePartUpload);

                      case 4:
                        nextFilePartUpload = _context13.sent;
                        _context13.next = 7;
                        return _Api.default.sendFilePart(nextFilePartUpload.upload_uri, 'PUT', buffer);

                      case 7:
                        _context13.next = 9;
                        return File._completeUpload(filePartUpload);

                      case 9:
                        response = _context13.sent;
                        createdFile = new File(response.data);
                        resolve(createdFile);

                      case 12:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              })));
            });

          case 8:
            file = _context14.sent;
            return _context14.abrupt("return", file);

          case 12:
            _context14.prev = 12;
            _context14.t0 = _context14["catch"](5);
            throw _context14.t0;

          case 15:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[5, 12]]);
  }));

  return function (_x11, _x12) {
    return _ref14.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadData", /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(destinationPath, data) {
    return _regenerator.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (data) {
              _context15.next = 2;
              break;
            }

            throw new Error('Upload data was not provided');

          case 2:
            return _context15.abrupt("return", File.uploadStream(destinationPath, _readableStream.default.from(data)));

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function (_x14, _x15) {
    return _ref17.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "uploadFile", /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16(destinationPath, sourceFilePath) {
    var _require3, openDiskFileReadStream, stream;

    return _regenerator.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context16.next = 2;
              break;
            }

            throw new Error('Disk file uploads are only available in a NodeJS environment');

          case 2:
            _require3 = require('../isomorphic/File.node.js'), openDiskFileReadStream = _require3.openDiskFileReadStream;
            stream = openDiskFileReadStream(sourceFilePath);
            return _context16.abrupt("return", File.uploadStream(destinationPath, stream));

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function (_x16, _x17) {
    return _ref18.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "find", /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(path) {
    var response;
    return _regenerator.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'GET');

          case 2:
            response = _context17.sent;
            return _context17.abrupt("return", new File(response.data));

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function (_x18) {
    return _ref19.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "create", /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(path) {
    var params,
        options,
        response,
        _args18 = arguments;
    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            params = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
            options = _args18.length > 2 && _args18[2] !== undefined ? _args18[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context18.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['path'] = path;

            if (params['path']) {
              _context18.next = 7;
              break;
            }

            throw new Error('Parameter missing: path');

          case 7:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context18.next = 9;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 9:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context18.next = 11;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 11:
            if (!(params['length'] && !(0, _utils.isInt)(params['length']))) {
              _context18.next = 13;
              break;
            }

            throw new Error("Bad parameter: length must be of type Int, received ".concat((0, _utils.getType)(length)));

          case 13:
            if (!(params['part'] && !(0, _utils.isInt)(params['part']))) {
              _context18.next = 15;
              break;
            }

            throw new Error("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(part)));

          case 15:
            if (!(params['parts'] && !(0, _utils.isInt)(params['parts']))) {
              _context18.next = 17;
              break;
            }

            throw new Error("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(parts)));

          case 17:
            if (!(params['provided_mtime'] && !(0, _utils.isString)(params['provided_mtime']))) {
              _context18.next = 19;
              break;
            }

            throw new Error("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(provided_mtime)));

          case 19:
            if (!(params['ref'] && !(0, _utils.isString)(params['ref']))) {
              _context18.next = 21;
              break;
            }

            throw new Error("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(ref)));

          case 21:
            if (!(params['restart'] && !(0, _utils.isInt)(params['restart']))) {
              _context18.next = 23;
              break;
            }

            throw new Error("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(restart)));

          case 23:
            if (!(params['size'] && !(0, _utils.isInt)(params['size']))) {
              _context18.next = 25;
              break;
            }

            throw new Error("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(size)));

          case 25:
            if (!(params['structure'] && !(0, _utils.isString)(params['structure']))) {
              _context18.next = 27;
              break;
            }

            throw new Error("Bad parameter: structure must be of type String, received ".concat((0, _utils.getType)(structure)));

          case 27:
            _context18.next = 29;
            return _Api.default.sendRequest("/files/' . params['path'] . '", 'POST', params, options);

          case 29:
            response = _context18.sent;
            return _context18.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, options));

          case 31:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function (_x19) {
    return _ref20.apply(this, arguments);
  };
}());
var _default = File;
exports.default = _default;