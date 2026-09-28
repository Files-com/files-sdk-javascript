"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.saveUrlToString = exports.saveUrlToStream = exports.saveUrlToFile = exports.openDiskFileWriteStream = exports.openDiskFileReadStream = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var openDiskFileReadStream = exports.openDiskFileReadStream = function openDiskFileReadStream(sourceFilePath) {
  var fs = require('fs');
  return fs.createReadStream(sourceFilePath);
};
var openDiskFileWriteStream = exports.openDiskFileWriteStream = function openDiskFileWriteStream(destination) {
  var fs = require('fs');
  return fs.createWriteStream(destination);
};

// The download takes over the stream: a complete response ends it, then it is closed if it has a close
// method. A failed download stops the request and closes the stream, or destroys a stream without a close
// method rather than ending it as though the download completed. The first outcome is final. Errors from
// releasing the stream afterwards, thrown or reported before the stream emits 'close', cannot change it or
// become uncaught; the stream still delivers reported errors to the caller's own 'error' listeners.
var saveUrlToStream = exports.saveUrlToStream = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(url, stream) {
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var https = require('https');
            var request = null;
            var response = null;
            var settled = false;
            var attempt = function attempt(release) {
              try {
                release();
              } catch (releaseError) {
                // The download has already settled, so a failure to release cannot replace its outcome.
              }
            };
            var settle = function settle(error) {
              if (settled) {
                return;
              }
              settled = true;
              if (!error) {
                resolve();
                attempt(function () {
                  if (typeof stream.close === 'function') {
                    stream.close();
                  }
                });
                return;
              }
              reject(error);

              // Stop the transfer before releasing the stream, each step on its own so one failure cannot skip the rest.
              if (response) {
                attempt(function () {
                  return response.unpipe(stream);
                });
              }
              if (request) {
                attempt(function () {
                  return request.destroy();
                });
              }
              attempt(function () {
                if (typeof stream.close === 'function') {
                  stream.close();
                } else if (typeof stream.destroy === 'function') {
                  stream.destroy();
                }
              });
            };
            var onFinish = function onFinish() {
              return settle();
            };
            var onClose = function onClose() {
              settle(new Error('Download destination closed before the download finished'));
              // 'close' is the stream's last event, so the listeners have nothing left to observe.
              stream.removeListener('error', settle);
              stream.removeListener('finish', onFinish);
            };
            stream.on('error', settle);
            stream.once('finish', onFinish);
            stream.once('close', onClose);
            try {
              request = https.get(url, function (res) {
                response = res;
                // Before Node 16 an interrupted response emits 'aborted' without an error, and through Node 12 it then
                // ends normally. Node 6 can also emit 'aborted' after a complete response, so check completeness.
                response.on('aborted', function () {
                  if (!response.complete) {
                    settle(new Error('Download response ended before it was complete'));
                  }
                });
                response.on('error', settle);
                response.pipe(stream);
              });
            } catch (error) {
              settle(error);
              return;
            }
            request.on('error', settle);
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function saveUrlToStream(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var saveUrlToString = exports.saveUrlToString = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(url) {
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            var https = require('https');
            https.get(url, function (response) {
              var chunks = [];
              response.on('data', function (chunk) {
                return chunks.push(Buffer.from(chunk));
              });
              response.on('end', function () {
                return resolve(Buffer.concat(chunks).toString('utf8'));
              });
            }).on('error', function (error) {
              reject(error);
            });
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function saveUrlToString(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var saveUrlToFile = exports.saveUrlToFile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(url, destinationPath) {
    var stream;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stream = openDiskFileWriteStream(destinationPath);
          _context3.next = 1;
          return saveUrlToStream(url, stream);
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function saveUrlToFile(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();