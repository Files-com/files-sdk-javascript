"use strict";

exports.__esModule = true;
exports.sdkMetadata = void 0;
// A browser bundle's stand-in for UserAgent.node.js, which the package's browser mapping puts in its place (see
// package.json), so that the bundle reads nothing of a process a bundler may provide: there is no metadata, and the
// SDK's default User-Agent in a browser bundle is its identity alone, as it always was (see UserAgent.js).
var sdkMetadata = exports.sdkMetadata = function sdkMetadata() {
  return null;
};