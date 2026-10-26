"use strict";

exports.__esModule = true;
exports.sdkMetadata = void 0;
// The platform's metadata in Node.js, for the SDK's default User-Agent (see UserAgent.js): the coarse family of the
// platform Node.js reports, windows for its win32, macos for its darwin and any other, such as linux, as it names it;
// and Node.js's own version: of scope's process, the global one by default. Nothing else of the machine is read: no
// host, kernel, architecture, environment or subprocess. A browser bundle maps this file to UserAgent.browser.js (see
// package.json).

// The platforms Node.js names otherwise than by their family.
var FAMILIES = new Map([['darwin', 'macos'], ['win32', 'windows']]);
var sdkMetadata = exports.sdkMetadata = function sdkMetadata() {
  var _scope$process, _FAMILIES$get, _scope$process2;
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalThis;
  var platform = scope === null || scope === void 0 || (_scope$process = scope.process) === null || _scope$process === void 0 ? void 0 : _scope$process.platform;
  return {
    os: (_FAMILIES$get = FAMILIES.get(platform)) !== null && _FAMILIES$get !== void 0 ? _FAMILIES$get : platform,
    runtime: 'node',
    runtimeVersion: scope === null || scope === void 0 || (_scope$process2 = scope.process) === null || _scope$process2 === void 0 || (_scope$process2 = _scope$process2.versions) === null || _scope$process2 === void 0 ? void 0 : _scope$process2.node
  };
};