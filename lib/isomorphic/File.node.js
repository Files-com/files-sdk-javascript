"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.saveUrlToStream = exports.saveUrlToFile = exports.openDiskFileWriteStream = exports.openDiskFileReadStream = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var openDiskFileReadStream = function openDiskFileReadStream(sourceFilePath) {
  var fs = require('fs');

  return fs.createReadStream(sourceFilePath);
};

exports.openDiskFileReadStream = openDiskFileReadStream;

var openDiskFileWriteStream = function openDiskFileWriteStream(destination) {
  var fs = require('fs');

  return fs.createWriteStream(destination);
};

exports.openDiskFileWriteStream = openDiskFileWriteStream;

var saveUrlToStream = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url, stream) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var https = require('https');

              https.get(url, function (response) {
                response.pipe(stream);
                stream.on('finish', resolve);
              }).on('error', function (error) {
                reject(error);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveUrlToStream(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveUrlToStream = saveUrlToStream;

var saveUrlToFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url, destinationPath) {
    var stream;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stream = openDiskFileWriteStream(destinationPath);
            _context2.next = 3;
            return saveUrlToStream(url, stream);

          case 3:
            stream.close();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function saveUrlToFile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.saveUrlToFile = saveUrlToFile;