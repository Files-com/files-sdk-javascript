"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.planUpload = exports.openNewFile = exports.makeFolder = exports.localPathOf = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _Errors = require("../Errors");
// The local half of File.uploadDirectory() and File.downloadDirectory(), Node.js only (package.json's browser field
// leaves it out of a browser bundle): reading a local folder before anything of it is uploaded, and making a
// downloaded folder's folders and files, each only where nothing is yet.

// How a folder's names are taken, the same on every platform: by their UTF-16 code units, as JavaScript compares
// strings.
var byName = function byName(first, second) {
  if (first === second) {
    return 0;
  }
  return first < second ? -1 : 1;
};

// Runs task(item) for each item in turn, each once the one before has settled; the first failure ends it.
var inTurn = function inTurn(items, task) {
  return items.reduce(function (previous, item) {
    return previous.then(function () {
      return task(item);
    });
  }, Promise.resolve());
};

// What uploadDirectory() uploads from the local folder sourceDirectoryPath, all read before anything is sent: every
// folder within it, each before those inside it, the empty ones included, and every file, each by its path relative to
// the source, its segments joined by '/', its folder's names taken by byName. Only folders and regular files can be
// uploaded: a symbolic link, which is never followed, the source itself included, and any other kind of entry, such as
// a socket or a device, refuses the upload, naming it, before anything is sent. stopIfAborted() is called before the
// source is looked at, once it has been, before each folder and entry is read, and once each entry has been looked at,
// before what it is decides anything, so that an upload cancelled before or while its tree is read reads no further,
// failing with what it throws; an entry that could not be looked at fails it with that failure still.
var planUpload = exports.planUpload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(sourceDirectoryPath) {
    var stopIfAborted,
      sourceStats,
      kind,
      directories,
      files,
      _visit,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          stopIfAborted = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : function () {};
          stopIfAborted();
          _context3.next = 1;
          return _fs.default.promises.lstat(sourceDirectoryPath);
        case 1:
          sourceStats = _context3.sent;
          stopIfAborted();
          if (sourceStats.isDirectory()) {
            _context3.next = 2;
            break;
          }
          kind = sourceStats.isSymbolicLink() ? 'a symbolic link' : 'not a folder';
          throw new _Errors.InvalidParameterError("Bad parameter: sourceDirectoryPath ".concat(sourceDirectoryPath, " is ").concat(kind, ", so it cannot be uploaded as a folder"));
        case 2:
          directories = [];
          files = [];
          _visit = /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(localFolder, segments) {
              var names;
              return _regenerator.default.wrap(function (_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    stopIfAborted();
                    _context2.next = 1;
                    return _fs.default.promises.readdir(localFolder);
                  case 1:
                    names = _context2.sent.sort(byName);
                    _context2.next = 2;
                    return inTurn(names, /*#__PURE__*/function () {
                      var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(name) {
                        var localPath, relative, stats, _kind;
                        return _regenerator.default.wrap(function (_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              stopIfAborted();
                              localPath = _path.default.join(localFolder, name);
                              relative = [].concat((0, _toConsumableArray2.default)(segments), [name]);
                              _context.next = 1;
                              return _fs.default.promises.lstat(localPath);
                            case 1:
                              stats = _context.sent;
                              stopIfAborted();
                              if (!stats.isDirectory()) {
                                _context.next = 3;
                                break;
                              }
                              directories.push(relative.join('/'));
                              _context.next = 2;
                              return _visit(localPath, relative);
                            case 2:
                              _context.next = 5;
                              break;
                            case 3:
                              if (!stats.isFile()) {
                                _context.next = 4;
                                break;
                              }
                              files.push({
                                localPath: localPath,
                                relativePath: relative.join('/')
                              });
                              _context.next = 5;
                              break;
                            case 4:
                              _kind = stats.isSymbolicLink() ? 'a symbolic link, which a folder upload does not follow' : 'neither a file nor a folder';
                              throw new _Errors.InvalidParameterError("Bad parameter: ".concat(relative.join('/'), " in ").concat(sourceDirectoryPath, " is ").concat(_kind, ", so the folder cannot be uploaded"));
                            case 5:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee);
                      }));
                      return function (_x4) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function visit(_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }();
          _context3.next = 3;
          return _visit(sourceDirectoryPath, []);
        case 3:
          return _context3.abrupt("return", {
            directories: directories,
            files: files
          });
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function planUpload(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Makes the local folder folderPath, which must not exist yet, in a folder that must: as Node.js's mkdir() without
// recursive, it fails with EEXIST when anything is there already, a symbolic link included, and ENOENT when its parent
// is missing.
var makeFolder = exports.makeFolder = function makeFolder(folderPath) {
  return _fs.default.promises.mkdir(folderPath);
};

// The names Windows gives a device, whatever extension, after any spaces, follows them.
var WINDOWS_DEVICE = /^(aux|con|conin\$|conout\$|nul|prn|com[0-9¹²³]|lpt[0-9¹²³]) *(\..*)?$/i;

// Whether name, an entry's name as the API listed it, can be a local folder's entry as it is on platform: not empty,
// '.' or '..', and holding no slash, backslash or NUL, so that the entry cannot be written anywhere but in its own
// folder. On Windows, whose file systems give other names a meaning of their own, it must also hold none of <>:"|?*
// and no control character, a colon naming an NTFS alternate data stream of another file; must not end with a space
// or a dot, which Windows drops; and must not be a device's name (see WINDOWS_DEVICE). Elsewhere, those are names like
// any other.
var isSafeName = function isSafeName(name, platform) {
  if (name === '' || name === '.' || name === '..' || /[/\\\0]/.test(name)) {
    return false;
  }
  if (platform !== 'win32') {
    return true;
  }
  var control = (0, _toConsumableArray2.default)(name).some(function (character) {
    return character.codePointAt(0) < 32;
  });
  return !control && !/[<>:"|?*]/.test(name) && !/[ .]$/.test(name) && !WINDOWS_DEVICE.test(name);
};

// The local path of name within localFolder, a folder of a download under destinationRoot, refusing with a FilesError a
// name that could not be written there as it is on this platform (see isSafeName), before anything is opened for it,
// or would lead outside destinationRoot: a path relative to it that is its parent, or begins with its parent's
// segment, not a name such as '..report' that only begins with two dots.
var localPathOf = exports.localPathOf = function localPathOf(destinationRoot, localFolder, name) {
  var localPath = _path.default.join(localFolder, "".concat(name));
  var relative = _path.default.relative(destinationRoot, localPath);
  var outside = relative === '..' || relative.startsWith("..".concat(_path.default.sep));
  if (!isSafeName("".concat(name), process.platform) || relative === '' || outside || _path.default.isAbsolute(relative)) {
    throw new _Errors.FilesError("The API listed an entry named ".concat(JSON.stringify("".concat(name)), ", which cannot be downloaded as it is into ").concat(destinationRoot));
  }
  return localPath;
};

// Opens a new local file at filePath for a download to write, exclusively: as Node.js's open() with 'wx', it fails
// with EEXIST when anything is already there, a symbolic link included, and the descriptor it opens is the one the
// download writes to. Gives that file's write stream, which closes the descriptor once it is ended or destroyed, and
// closed, which resolves once it has, never rejecting: with null, or with { error }, error being the first the stream
// gave, such as a failure to close the file. Its listeners are added as the stream is made, before it is used, and
// stay until it has closed, so that no error of the stream is uncaught, whether or not anything was writing to it then.
var openNewFile = exports.openNewFile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(filePath) {
    var handle, stream, failure, closed;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 1;
          return _fs.default.promises.open(filePath, 'wx');
        case 1:
          handle = _context4.sent;
          stream = handle.createWriteStream();
          failure = null;
          stream.on('error', function (error) {
            if (failure === null) {
              failure = {
                error: error
              };
            }
          });
          closed = new Promise(function (resolve) {
            stream.once('close', function () {
              return resolve(failure);
            });
          });
          return _context4.abrupt("return", {
            closed: closed,
            stream: stream
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function openNewFile(_x5) {
    return _ref4.apply(this, arguments);
  };
}();