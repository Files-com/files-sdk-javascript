"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.withPartOffset = exports.utf8Length = exports.uploadSource = exports.textSource = exports.streamSource = exports.planOf = exports.pathBindingOf = exports.partRequestOf = exports.isRequestTimeout = exports.instructionsOf = exports.grantsOf = exports.formEnvelopeOf = exports.destinationOf = exports.dataSourceOf = exports.copyOf = exports.checkedUploadOptions = exports.bytesSource = exports.S3_MIN_PART_BYTES = exports.S3_MAX_PART_BYTES = exports.S3_MAX_PARTS = exports.PREFERRED_PART_BYTES = exports.GRANT_BATCH = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _Api = _interopRequireDefault(require("./Api"));
var errors = _interopRequireWildcard(require("./Errors"));
var _Files = _interopRequireDefault(require("./Files"));
var _Transfer = require("./Transfer");
var _utils = require("./utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// An upload's one owner, from its first begin_upload to its completion, following the public REST upload guide
// (https://developers.files.com/rest/files/files/#upload-file-optimized): the grants begin_upload gives for its parts,
// asked for in batches and matched to their parts by number and to the upload by its ref and path; how the parts are
// planned, by the client when the destination and the grant permit it, otherwise as the grants size them; each part's
// request, as its grant's http_method, headers, parameters and send instructions place its bytes; reading the source as
// bytes, whatever chunks it gives; sending each part, retrying only a failed part that may be sent again, renewing a
// grant whose URL has expired; and completing the upload with its exact size and every part's ETag. The File model's
// upload methods are its entry points.

var MIB = 1024 * 1024;
var GIB = 1024 * MIB;

// S3's multipart limits, as Amazon documents them (https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html):
// parts numbered 1 to 10,000, each from 5 MiB to 5 GiB, the last of which may be smaller. They apply to uploads to S3,
// whether Files.com's own storage or a customer's bucket, never to a remote server integration or a Files Agent.
var S3_MAX_PARTS = exports.S3_MAX_PARTS = 10000;
var S3_MIN_PART_BYTES = exports.S3_MIN_PART_BYTES = 5 * MIB;
var S3_MAX_PART_BYTES = exports.S3_MAX_PART_BYTES = 5 * GIB;

// The part size a client-planned upload prefers: small enough to bound the memory held and the bytes sent again on a
// retry, large enough for a few hundred megabytes in flight at the default concurrency. A larger file uses larger
// parts, to fit its destination's part budget.
var PREFERRED_PART_BYTES = exports.PREFERRED_PART_BYTES = 8 * MIB;

// How many parts' grants one begin_upload asks for at most, how many it asks for ahead of an upload of unknown size,
// and how few unused grants an upload keeps before asking for the next batch.
var GRANT_BATCH = exports.GRANT_BATCH = 32;
var UNKNOWN_SIZE_GRANT_BATCH = 4;
var GRANT_PREFETCH = 8;

// The wait before a part is sent again after a failure other than a throttle (see retry-logic).
var STORAGE_RETRY_MS = 100;

// The upload parameters begin_upload takes, besides those the upload sets itself; those that the upload's completion
// takes too; and those that belong to the upload itself, which a caller's params cannot set.
var BEGIN_PARAMETERS = ['buffered_upload', 'mkdir_parents', 'restart', 'with_rename'];
var SHARED_PARAMETERS = ['buffered_upload', 'mkdir_parents', 'with_rename'];
var OWN_PARAMETERS = ['action', 'etags', 'part', 'parts', 'ref', 'size', 'with_direct_connection_info'];

// Headers that the request's transport sets from its body itself, never from a grant.
var TRANSPORT_HEADERS = ['connection', 'content-length', 'host', 'transfer-encoding'];

// The send instructions a grant can give, and the query keys of a remote server integration's or Files Agent's part
// numbering, which a client-planned part replaces.
var SEND_KEYS = ['Content-Type', 'file', 'partdata', 'partsize'];
var OFFSET_KEYS = ['offset', 'partNumber', 'part_number', 'part_offset'];

// The content type a part's own Content-Type instruction is given: the bytes' type, which the upload does not know.
var PART_CONTENT_TYPE = 'application/octet-stream';
var encoder = new globalThis.TextEncoder();
var uploadError = function uploadError(message, code) {
  return new errors.FilesError(message, code);
};
var isPlainObject = function isPlainObject(value) {
  return (0, _typeof2.default)(value) === 'object' && value !== null && !Array.isArray(value);
};
var isNonEmptyString = function isNonEmptyString(value) {
  return typeof value === 'string' && value !== '';
};
var hasOwn = function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
};

// Bytes of value, a view of any kind, without copying them.
var viewOf = function viewOf(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
};

// The bytes of a view, copied into memory of their own: a real copy, whatever the view is. A Node.js Buffer's own
// slice() would share its memory instead.
var copyOf = exports.copyOf = function copyOf(view) {
  var copy = new Uint8Array(view.length);
  copy.set(view);
  return copy;
};

// The number of bytes of a string's UTF-8, as TextEncoder gives it, a lone surrogate as U+FFFD, without encoding it.
var utf8Length = exports.utf8Length = function utf8Length(string) {
  var length = 0;
  var index = 0;
  while (index < string.length) {
    var unit = string.charCodeAt(index);
    var next = index + 1 < string.length ? string.charCodeAt(index + 1) : 0;
    if (unit < 0x80) {
      length += 1;
    } else if (unit < 0x800) {
      length += 2;
    } else if (unit >= 0xd800 && unit <= 0xdbff && next >= 0xdc00 && next <= 0xdfff) {
      length += 4;
      index += 1;
    } else {
      length += 3;
    }
    index += 1;
  }
  return length;
};

// The bytes of an upload chunk, a string or a byte view, counted without copying it.
var byteLengthOf = function byteLengthOf(chunk) {
  if (typeof chunk === 'string') {
    return utf8Length(chunk);
  }
  if (ArrayBuffer.isView(chunk)) {
    return chunk.byteLength;
  }
  throw new errors.InvalidParameterError('Bad parameter: upload data chunks must be strings or bytes');
};

// One array of chunks' bytes, in order, in memory of its own, of length bytes: each string's UTF-8 encoded into it
// and each view's bytes copied, so that changing the caller's chunks afterwards changes nothing in it.
var copiedChunks = function copiedChunks(chunks, length) {
  var bytes = new Uint8Array(length);
  var offset = 0;
  chunks.forEach(function (chunk) {
    if (typeof chunk === 'string') {
      offset += encoder.encodeInto(chunk, bytes.subarray(offset)).written;
    } else {
      bytes.set(viewOf(chunk), offset);
      offset += chunk.byteLength;
    }
  });
  return bytes;
};

// Whether bytes hold sequence, anywhere.
var containsSequence = function containsSequence(bytes, sequence) {
  var at = bytes.indexOf(sequence[0]);
  while (at !== -1 && at + sequence.length <= bytes.length) {
    var index = 1;
    while (index < sequence.length && bytes[at + index] === sequence[index]) {
      index += 1;
    }
    if (index === sequence.length) {
      return true;
    }
    at = bytes.indexOf(sequence[0], at + 1);
  }
  return false;
};

// A whole number a grant gives, such as a part size or number: a safe integer, or decimal digits that make one; null
// when it gives none.
var wholeNumber = function wholeNumber(value, name, partNumber) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  var number = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
  if (!Number.isSafeInteger(number) || number < 0) {
    throw uploadError("The upload grant for part ".concat(partNumber, " has an invalid ").concat(name));
  }
  return number;
};

// A grant's headers or parameters: names and their exact values, as strings.
var exactValues = function exactValues(value, name, partNumber) {
  if (value === undefined || value === null) {
    return {};
  }
  if (!isPlainObject(value)) {
    throw uploadError("The upload grant for part ".concat(partNumber, " has invalid ").concat(name));
  }
  return Object.fromEntries(Object.entries(value).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      item = _ref2[1];
    if (!['boolean', 'number', 'string'].includes((0, _typeof2.default)(item))) {
      throw uploadError("The upload grant for part ".concat(partNumber, " has an invalid value for ").concat(name, " ").concat(key));
    }
    return [key, "".concat(item)];
  }));
};

// Whether direct_connection_info identifies a remote server integration or Files Agent destination, as the shared rule
// validates it: version 1, a server name, at least one address, a direct URI and a CA certificate.
var isDirectConnection = function isDirectConnection(info) {
  return isPlainObject(info) && info.version === 1 && isNonEmptyString(info.server_name) && Array.isArray(info.addresses) && info.addresses.length > 0 && info.addresses.every(isNonEmptyString) && isNonEmptyString(info.direct_uri) && isNonEmptyString(info.ca_pem);
};

// The kind of destination a grant's own answer identifies: 'remote' for a remote server integration or Files Agent,
// otherwise 's3', whatever its URL looks like.
var destinationOf = exports.destinationOf = function destinationOf(grant) {
  return isDirectConnection(grant.data.direct_connection_info) ? 'remote' : 's3';
};

// A site path within a workspace, as the site names one: _/Workspaces/<id>/<path>.
var SITE_WORKSPACE_PATH = /^_\/workspaces\/([^/]+)\/(.*)$/i;

// Where a path is, as the SDK normalizes paths (see utils/pathNormalizer): { named, path, workspace }, the workspace
// its site path names (named), or else workspace, the one its request acts in, or null when that is not known; and
// the path within that workspace.
var locate = function locate(path, workspace) {
  var normalized = _utils.pathNormalizer.normalize("".concat(path));
  var site = SITE_WORKSPACE_PATH.exec(normalized);
  if (site) {
    return {
      named: true,
      path: site[2],
      workspace: site[1].toLowerCase()
    };
  }
  return {
    named: false,
    path: normalized,
    workspace: workspace
  };
};
var folderOf = function folderOf(path) {
  return path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
};

// The rule binding the grants of an upload to destinationPath, asked for in workspace, the one its request names, or
// none: bind(grant) throws when a grant declares a path that is not this upload's, before anything is sent for it. A
// grant may leave its path out. The first declared path binds the upload, in its workspace: the request's own, or the
// one the destination path names as a site path, or, when neither names one, the one the API's own answer names, as a
// site path, which then holds for the whole upload; a path without a workspace is in the request's own. Within that
// workspace it must be the same path, as pathNormalizer.same() compares paths, or, only with renames (with_rename),
// another file in the same folder, as the API names a renamed upload. Every later declared path must be that same
// file, in that same workspace, whichever form it takes. No path crosses into another workspace, rename or not.
var pathBindingOf = exports.pathBindingOf = function pathBindingOf(_ref3) {
  var destinationPath = _ref3.destinationPath,
    _ref3$renames = _ref3.renames,
    renames = _ref3$renames === void 0 ? false : _ref3$renames,
    _ref3$workspace = _ref3.workspace,
    requestWorkspace = _ref3$workspace === void 0 ? null : _ref3$workspace;
  var workspace = requestWorkspace === null || requestWorkspace === undefined || "".concat(requestWorkspace) === '' ? null : "".concat(requestWorkspace).toLowerCase();
  var requested = locate(destinationPath, workspace);
  var boundWorkspace = requested.workspace;
  var namedByApi = false;
  var boundPath = null;
  return {
    bind: function bind(grant) {
      if (grant.path === null) {
        return;
      }
      var refuse = function refuse() {
        return uploadError("The upload grant for part ".concat(grant.partNumber, " is for ").concat(grant.path, ", not ").concat(destinationPath, ", which this upload is for"));
      };
      var declared = locate(grant.path, workspace);
      if (declared.named) {
        if (boundWorkspace === null) {
          boundWorkspace = declared.workspace;
          namedByApi = true;
        } else if (declared.workspace !== boundWorkspace) {
          throw refuse();
        }
      } else if (boundWorkspace !== workspace && !namedByApi) {
        throw refuse();
      }
      if (boundPath !== null) {
        if (!_utils.pathNormalizer.same(declared.path, boundPath)) {
          throw refuse();
        }
        return;
      }
      var same = _utils.pathNormalizer.same(declared.path, requested.path);
      var renamed = renames && declared.path !== '' && _utils.pathNormalizer.same(folderOf(declared.path), folderOf(requested.path));
      if (!same && !renamed) {
        throw refuse();
      }
      boundPath = declared.path;
    }
  };
};

// One part's grant, from begin_upload's answer, checked: its URL, method, headers, parameters, send instructions, size,
// number, the path it declares, if any, and the upload's ref, which a later grant must keep. partNumber is the part it
// is for when the answer does not say.
var grantOf = function grantOf(data, partNumber, ref) {
  var _wholeNumber;
  if (!isPlainObject(data)) {
    throw uploadError("The upload grant for part ".concat(partNumber, " is not an object"));
  }
  var number = (_wholeNumber = wholeNumber(data.part_number, 'part_number', partNumber)) !== null && _wholeNumber !== void 0 ? _wholeNumber : partNumber;
  if (number === null || number < 1) {
    throw uploadError('An upload grant has no part_number');
  }
  if (!isNonEmptyString(data.upload_uri)) {
    throw uploadError("The upload grant for part ".concat(number, " has no upload_uri"));
  }
  if (ref !== null && data.ref !== undefined && data.ref !== null && data.ref !== ref) {
    throw uploadError("The upload grant for part ".concat(number, " belongs to another upload"));
  }
  if (data.path !== undefined && data.path !== null && typeof data.path !== 'string') {
    throw uploadError("The upload grant for part ".concat(number, " has an invalid path"));
  }
  var send = exactValues(data.send, 'send', number);
  var unknown = Object.keys(send).find(function (key) {
    return !SEND_KEYS.includes(key);
  });
  if (unknown) {
    throw uploadError("The upload grant for part ".concat(number, " gives a send instruction this SDK does not support: ").concat(unknown));
  }
  return {
    availableParts: wholeNumber(data.available_parts, 'available_parts', number),
    data: data,
    expires: typeof data.expires === 'string' ? data.expires : undefined,
    headers: exactValues(data.headers, 'headers', number),
    method: isNonEmptyString(data.http_method) ? data.http_method.toUpperCase() : 'PUT',
    parallel: data.parallel_parts === true,
    parameters: exactValues(data.parameters, 'parameters', number),
    partNumber: number,
    partSize: wholeNumber(data.partsize, 'partsize', number),
    path: isNonEmptyString(data.path) ? data.path : null,
    ref: isNonEmptyString(data.ref) ? data.ref : ref,
    retry: data.retry_parts !== false,
    send: send,
    url: data.upload_uri
  };
};

// The grants of one begin_upload answer, an array or a single grant, for parts firstPart through firstPart + count -
// 1 of the upload whose ref is ref (null for its first). A grant that does not give its part_number is for firstPart,
// and only an answer of one grant may leave it out. A grant for another part, or for the same part twice, fails.
var grantsOf = exports.grantsOf = function grantsOf(answer, _ref4) {
  var count = _ref4.count,
    firstPart = _ref4.firstPart,
    ref = _ref4.ref;
  var list = Array.isArray(answer) ? answer : [answer];
  if (list.length === 0) {
    throw uploadError("The API gave no upload grant for part ".concat(firstPart));
  }
  var seen = new Set();
  return list.map(function (data) {
    var grant = grantOf(data, list.length === 1 ? firstPart : null, ref);
    if (grant.partNumber < firstPart || grant.partNumber >= firstPart + count || seen.has(grant.partNumber)) {
      throw uploadError("The API gave an upload grant for part ".concat(grant.partNumber, ", which was not asked for"));
    }
    seen.add(grant.partNumber);
    return grant;
  });
};

// Where one value of a send instruction goes: { at: 'body' }, { at: 'header', name } or { at: 'parameter', name }.
var placementOf = function placementOf(key, value, partNumber) {
  var _exec;
  if (value === 'body') {
    return {
      at: 'body'
    };
  }
  var _ref5 = (_exec = /^required-(header|parameter) (.+)$/.exec(value)) !== null && _exec !== void 0 ? _exec : [],
    _ref6 = (0, _slicedToArray2.default)(_ref5, 3),
    at = _ref6[1],
    name = _ref6[2];
  if (!at || name.trim() === '') {
    throw uploadError("The upload grant for part ".concat(partNumber, " puts ").concat(key, " where this SDK cannot: ").concat(value));
  }
  return {
    at: at,
    name: name.trim()
  };
};

// The names a signed S3 URL's signature covers, from its X-Amz-SignedHeaders, in lowercase.
var signedHeadersOf = function signedHeadersOf(url) {
  try {
    var signed = (0, _toConsumableArray2.default)(new URL(url).searchParams.entries()).find(function (_ref7) {
      var _ref8 = (0, _slicedToArray2.default)(_ref7, 1),
        key = _ref8[0];
      return key.toLowerCase() === 'x-amz-signedheaders';
    });
    return signed ? signed[1].toLowerCase().split(';') : [];
  } catch (_unused) {
    return [];
  }
};

// The boundary a multipart/form-data Content-Type names, or null when it names none.
var boundaryIn = function boundaryIn(contentType) {
  var _exec$slice$find, _exec2;
  return (_exec$slice$find = (_exec2 = /;\s*boundary=(?:"([^"]+)"|([^\s;]+))/i.exec(contentType)) === null || _exec2 === void 0 ? void 0 : _exec2.slice(1).find(Boolean)) !== null && _exec$slice$find !== void 0 ? _exec$slice$find : null;
};

// How a grant asks for its part to be sent: where its bytes, size and content type go (placements); whether it is a
// form (form), its fixed field parameters included; the field or place its bytes go (data); a length the grant fixes
// for the part's bytes (fixedLength), by its Content-Length or its URL's signature, or for a form's whole body
// (entityLength), by its Content-Length; the form's boundary, when its Content-Type gives one; whether its headers fix
// the bytes' checksum; whether the whole file must go in one request (wholeFile); and so whether a client may choose
// its part sizes (clientSizing).
//
// Every binding is kept exactly, or the grant is refused, before anything is sent: bytes in a header; a size or type
// in the body; both a form and a raw body; both part and whole-file data; and, for a form, a Content-Type other than
// multipart/form-data, or one without the boundary a form needs, which no rule lets the SDK complete; a length signed
// for its bytes, which the form's envelope would change; its data, size or type in a field a fixed parameter already
// sets otherwise, two of them in one field, or its size or type in the headers that a form's own encoding sets.
var instructionsOf = exports.instructionsOf = function instructionsOf(grant) {
  var _placements$partdata;
  var number = grant.partNumber;
  var placements = Object.fromEntries(Object.entries(grant.send).map(function (_ref9) {
    var _ref0 = (0, _slicedToArray2.default)(_ref9, 2),
      key = _ref0[0],
      value = _ref0[1];
    return [key, placementOf(key, value, number)];
  }));
  var parameters = Object.keys(grant.parameters).length > 0;
  var form = parameters || Object.values(placements).some(function (placement) {
    return placement.at === 'parameter';
  });
  var refuse = function refuse(reason) {
    return uploadError("The upload grant for part ".concat(number, " ").concat(reason));
  };
  if (placements.partdata && placements.file) {
    throw refuse('asks for both its part\'s data and the whole file');
  }
  var given = (_placements$partdata = placements.partdata) !== null && _placements$partdata !== void 0 ? _placements$partdata : placements.file;
  if ((given === null || given === void 0 ? void 0 : given.at) === 'header') {
    throw refuse('asks for the file\'s data in a header');
  }
  if (form && (given === null || given === void 0 ? void 0 : given.at) === 'body') {
    throw refuse('asks for both form fields and a raw body');
  }
  ['partsize', 'Content-Type'].forEach(function (key) {
    var _placements$key;
    if (((_placements$key = placements[key]) === null || _placements$key === void 0 ? void 0 : _placements$key.at) === 'body') {
      throw refuse("asks for its ".concat(key, " in the body"));
    }
  });
  var headers = Object.entries(grant.headers).map(function (_ref1) {
    var _ref10 = (0, _slicedToArray2.default)(_ref1, 2),
      name = _ref10[0],
      value = _ref10[1];
    return [name.toLowerCase(), value];
  });
  var lengthHeader = headers.find(function (_ref11) {
    var _ref12 = (0, _slicedToArray2.default)(_ref11, 1),
      name = _ref12[0];
    return name === 'content-length';
  });
  var typeHeader = headers.find(function (_ref13) {
    var _ref14 = (0, _slicedToArray2.default)(_ref13, 1),
      name = _ref14[0];
    return name === 'content-type';
  });
  var lengthSigned = signedHeadersOf(grant.url).includes('content-length');
  var data = given !== null && given !== void 0 ? given : form ? {
    at: 'parameter',
    name: 'file'
  } : {
    at: 'body'
  };
  var fixedLength = null;
  var entityLength = null;
  var boundary = null;
  if (form) {
    var _placements$partsize, _placements$ContentT;
    if (lengthSigned && !lengthHeader) {
      throw refuse('signs a length for a form, which its encoding would change');
    }
    if (typeHeader && !/^\s*multipart\/form-data\s*(;|$)/i.test(typeHeader[1])) {
      throw refuse("asks for a form sent as ".concat(typeHeader[1]));
    }
    boundary = typeHeader ? boundaryIn(typeHeader[1]) : null;
    if (typeHeader && boundary === null) {
      throw refuse("fixes the form's Content-Type as ".concat(typeHeader[1], ", without the boundary its body needs"));
    }
    entityLength = lengthHeader ? wholeNumber(lengthHeader[1], 'Content-Length', number) : null;
    if (hasOwn(grant.parameters, data.name)) {
      throw refuse("puts the file's data in the field ".concat(data.name, ", which a fixed parameter already sets"));
    }
    var fields = ['partsize', 'Content-Type'].map(function (key) {
      return placements[key];
    }).filter(function (placement) {
      return (placement === null || placement === void 0 ? void 0 : placement.at) === 'parameter';
    });
    if (fields.some(function (placement) {
      return placement.name === data.name;
    }) || fields.length === 2 && fields[0].name === fields[1].name) {
      throw refuse('puts two values in one form field');
    }
    if (((_placements$partsize = placements.partsize) === null || _placements$partsize === void 0 ? void 0 : _placements$partsize.at) === 'header' && placements.partsize.name.toLowerCase() === 'content-length') {
      throw refuse('asks for its part size as the Content-Length of a form, whose envelope makes it longer');
    }
    if (((_placements$ContentT = placements['Content-Type']) === null || _placements$ContentT === void 0 ? void 0 : _placements$ContentT.at) === 'header' && placements['Content-Type'].name.toLowerCase() === 'content-type') {
      throw refuse('asks for its content type as the Content-Type of a form, which must be multipart/form-data');
    }
  } else if (lengthHeader) {
    fixedLength = wholeNumber(lengthHeader[1], 'Content-Length', number);
  } else if (lengthSigned) {
    fixedLength = grant.partSize;
  }
  var fixedChecksum = headers.some(function (_ref15) {
    var _ref16 = (0, _slicedToArray2.default)(_ref15, 2),
      name = _ref16[0],
      value = _ref16[1];
    return name === 'content-md5' || name.startsWith('x-amz-checksum-') || name === 'x-amz-content-sha256' && !/^(UNSIGNED-PAYLOAD|STREAMING-)/.test(value);
  });
  var wholeFile = Boolean(placements.file);
  return {
    boundary: boundary,
    clientSizing: fixedLength === null && entityLength === null && !fixedChecksum && !wholeFile,
    data: data,
    entityLength: entityLength,
    fixedChecksum: fixedChecksum,
    fixedLength: fixedLength,
    form: form,
    placements: placements,
    wholeFile: wholeFile
  };
};

// How an upload of size bytes (null when unknown) is planned, from its first grant:
//
// - { mode: 'local', partSize, partCount, offsets } when the client may choose its part sizes: the size is known and
//   the grant fixes no length or checksum. For S3 a part is at least max(5 MiB, PREFERRED_PART_BYTES, ceil(size /
//   budget)), where budget is 10,000 parts, or fewer when the API gives a smaller positive available_parts, and at
//   most 5 GiB. A remote server integration or Files Agent upload keeps the API's part size, or PREFERRED_PART_BYTES
//   without one, grown only to fit a positive available_parts, with no S3 limit, and numbers its parts in its URL
//   query (offsets).
// - { mode: 'server' } otherwise: each part is as large as its own grant's partsize, the last one smaller.
// - { mode: 'whole' } when the grant asks for the whole file in one request.
//
// The arithmetic is exact for any safe integer size; nothing is allocated for it.
var planOf = exports.planOf = function planOf(_ref17) {
  var destination = _ref17.destination,
    grant = _ref17.grant,
    instructions = _ref17.instructions,
    size = _ref17.size;
  if (instructions.wholeFile) {
    return {
      mode: 'whole'
    };
  }
  if (size === null || !instructions.clientSizing) {
    return {
      mode: 'server'
    };
  }
  if (destination === 's3') {
    var budget = grant.availableParts > 0 ? Math.min(S3_MAX_PARTS, grant.availableParts) : S3_MAX_PARTS;
    var _partSize = Math.max(S3_MIN_PART_BYTES, PREFERRED_PART_BYTES, Math.ceil(size / budget));
    if (_partSize > S3_MAX_PART_BYTES) {
      throw uploadError("A file of ".concat(size, " bytes cannot be uploaded to S3 in ").concat(budget, " parts of at most 5 GiB each"));
    }
    return {
      mode: 'local',
      offsets: false,
      partCount: Math.max(1, Math.ceil(size / _partSize)),
      partSize: _partSize
    };
  }
  var base = grant.partSize > 0 ? grant.partSize : PREFERRED_PART_BYTES;
  var partSize = grant.availableParts > 0 ? Math.max(base, Math.ceil(size / grant.availableParts)) : base;
  return {
    mode: 'local',
    offsets: true,
    partCount: Math.max(1, Math.ceil(size / partSize)),
    partSize: partSize
  };
};

// url, a remote server integration's or Files Agent's upload URL, for the part partNumber at the zero-based offset:
// its part_number and part_offset query values set, any partNumber or offset alias removed, and every other part of
// the URL, its other query values' encoding included, kept exactly.
var withPartOffset = exports.withPartOffset = function withPartOffset(url, partNumber, offset) {
  var fragmentAt = url.indexOf('#');
  var fragment = fragmentAt === -1 ? '' : url.slice(fragmentAt);
  var beforeFragment = fragmentAt === -1 ? url : url.slice(0, fragmentAt);
  var queryAt = beforeFragment.indexOf('?');
  var base = queryAt === -1 ? beforeFragment : beforeFragment.slice(0, queryAt);
  var query = queryAt === -1 ? '' : beforeFragment.slice(queryAt + 1);
  var kept = query.split('&').filter(function (pair) {
    return pair !== '' && !OFFSET_KEYS.includes(pair.split('=')[0]);
  });
  kept.push("part_number=".concat(partNumber), "part_offset=".concat(offset));
  return "".concat(base, "?").concat(kept.join('&')).concat(fragment);
};

// A form field's name or file name as a multipart body quotes it.
var quoted = function quoted(name) {
  return name.replace(/"/g, '%22').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
};
var boundaryOf = function boundaryOf() {
  return "----FilesSdkBoundary".concat(Array.from({
    length: 24
  }, function () {
    return Math.floor(Math.random() * 16).toString(16);
  }).join(''));
};

// The length of every boundary the SDK makes itself.
var BOUNDARY_LENGTH = boundaryOf().length;

// A form's text before its file field's bytes, its fields in order, and after them, for boundary.
var formHeadOf = function formHeadOf(_ref18) {
  var boundary = _ref18.boundary,
    fields = _ref18.fields,
    fileField = _ref18.fileField,
    fileName = _ref18.fileName;
  return [].concat((0, _toConsumableArray2.default)(fields.map(function (_ref19) {
    var _ref20 = (0, _slicedToArray2.default)(_ref19, 2),
      name = _ref20[0],
      value = _ref20[1];
    return "--".concat(boundary, "\r\nContent-Disposition: form-data; name=\"").concat(quoted(name), "\"\r\n\r\n").concat(value, "\r\n");
  })), ["--".concat(boundary, "\r\nContent-Disposition: form-data; name=\"").concat(quoted(fileField), "\"; filename=\"").concat(quoted(fileName), "\"\r\nContent-Type: ").concat(PART_CONTENT_TYPE, "\r\n\r\n")]).join('');
};
var formTailOf = function formTailOf(boundary) {
  return "\r\n--".concat(boundary, "--\r\n");
};

// The headers and form fields of a request for a part of length bytes, as grant asks, with instructions (see
// instructionsOf()): its exact headers, except those its transport sets from the body, and fixed parameters, with its
// size and content type where its send instructions place them. A value placed where the grant already fixes one must
// agree with it, except the content type, for which the grant's own is kept; anything else is refused.
var placedOf = function placedOf(_ref21) {
  var grant = _ref21.grant,
    instructions = _ref21.instructions,
    length = _ref21.length;
  var refuse = function refuse(reason) {
    return uploadError("Part ".concat(grant.partNumber, " ").concat(reason));
  };
  var headers = Object.fromEntries(Object.entries(grant.headers).filter(function (_ref22) {
    var _ref23 = (0, _slicedToArray2.default)(_ref22, 1),
      name = _ref23[0];
    return !TRANSPORT_HEADERS.includes(name.toLowerCase());
  }));
  var fixedHeader = function fixedHeader(name) {
    var _Object$entries$find;
    return (_Object$entries$find = Object.entries(grant.headers).find(function (_ref24) {
      var _ref25 = (0, _slicedToArray2.default)(_ref24, 1),
        key = _ref25[0];
      return key.toLowerCase() === name.toLowerCase();
    })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[1];
  };
  var fields = Object.entries(grant.parameters);

  // Places value, the part's size or content type, as placement asks; keepFixed keeps a value the grant fixes there.
  var place = function place(key, placement, value, keepFixed) {
    if (placement.at === 'parameter') {
      if (!hasOwn(grant.parameters, placement.name)) {
        fields.push([placement.name, value]);
      } else if (grant.parameters[placement.name] !== value && !keepFixed) {
        throw refuse("has its ".concat(key, " fixed as ").concat(grant.parameters[placement.name], " by its upload grant, not ").concat(value));
      }
      return;
    }
    var fixed = fixedHeader(placement.name);
    var name = placement.name.toLowerCase();
    if (fixed !== undefined) {
      if (fixed !== value && !keepFixed) {
        throw refuse("has its ".concat(key, " fixed as ").concat(fixed, " by its upload grant, not ").concat(value));
      }
    } else if (TRANSPORT_HEADERS.includes(name)) {
      // The transport sends the body's own length, which only a raw body's size is.
      if (name !== 'content-length' || instructions.form || value !== "".concat(length)) {
        throw refuse("cannot have its ".concat(key, " in the ").concat(placement.name, " header"));
      }
    } else {
      headers[placement.name] = value;
    }
  };
  if (instructions.placements.partsize) {
    place('partsize', instructions.placements.partsize, "".concat(length), false);
  }
  if (instructions.placements['Content-Type']) {
    place('Content-Type', instructions.placements['Content-Type'], PART_CONTENT_TYPE, true);
  }
  return {
    fields: fields,
    headers: headers
  };
};

// How many bytes the form a part of length bytes is sent in adds to them, as grant asks: what a part's buffer credit
// counts for it before its bytes are read (see uploadSource()). 0 for a raw body.
var formEnvelopeOf = exports.formEnvelopeOf = function formEnvelopeOf(_ref26) {
  var _instructions$boundar;
  var _ref26$fileName = _ref26.fileName,
    fileName = _ref26$fileName === void 0 ? 'file' : _ref26$fileName,
    grant = _ref26.grant,
    instructions = _ref26.instructions,
    length = _ref26.length;
  if (!instructions.form) {
    return 0;
  }
  var _placedOf = placedOf({
      grant: grant,
      instructions: instructions,
      length: length
    }),
    fields = _placedOf.fields;
  var boundary = (_instructions$boundar = instructions.boundary) !== null && _instructions$boundar !== void 0 ? _instructions$boundar : '-'.repeat(BOUNDARY_LENGTH);
  return utf8Length(formHeadOf({
    boundary: boundary,
    fields: fields,
    fileField: instructions.data.name,
    fileName: fileName
  })) + utf8Length(formTailOf(boundary));
};

// The request that sends a part's bytes to url as grant asks, with instructions (see instructionsOf() and placedOf()):
// its method; its headers; and its bytes as the raw body, or as the file field of a multipart form after the grant's
// parameters, in one allocation, with dataOffset, where the bytes begin within the body. A length the grant fixes must
// be the part's, or the form's, found before the form is made; a boundary the grant gives is kept exactly, as long as
// no field or byte of the part holds it. Anything else is refused before the part is sent, and before anything is
// changed. within, when given, is the memory that holds bytes already, such as the part's earlier form, which the form
// is then made in, its bytes moved where the form puts them, without another allocation; it must have room for it.
var partRequestOf = exports.partRequestOf = function partRequestOf(_ref27) {
  var _instructions$boundar2;
  var bytes = _ref27.bytes,
    _ref27$fileName = _ref27.fileName,
    fileName = _ref27$fileName === void 0 ? 'file' : _ref27$fileName,
    grant = _ref27.grant,
    instructions = _ref27.instructions,
    url = _ref27.url,
    _ref27$within = _ref27.within,
    within = _ref27$within === void 0 ? null : _ref27$within;
  var refuse = function refuse(reason) {
    return uploadError("Part ".concat(grant.partNumber, " ").concat(reason));
  };
  if (instructions.fixedLength !== null && bytes.length !== instructions.fixedLength) {
    throw refuse("has ".concat(bytes.length, " bytes, but its upload grant fixes ").concat(instructions.fixedLength));
  }
  var _placedOf2 = placedOf({
      grant: grant,
      instructions: instructions,
      length: bytes.length
    }),
    fields = _placedOf2.fields,
    headers = _placedOf2.headers;
  if (!instructions.form) {
    return {
      body: bytes,
      dataOffset: 0,
      headers: headers,
      method: grant.method,
      url: url
    };
  }
  var boundary = (_instructions$boundar2 = instructions.boundary) !== null && _instructions$boundar2 !== void 0 ? _instructions$boundar2 : boundaryOf();
  if (instructions.boundary !== null && (fields.some(function (_ref28) {
    var _ref29 = (0, _slicedToArray2.default)(_ref28, 2),
      value = _ref29[1];
    return value.includes("--".concat(boundary));
  }) || containsSequence(bytes, encoder.encode("--".concat(boundary))))) {
    throw refuse("holds the form boundary its upload grant gives, ".concat(boundary));
  }

  // The grant's own Content-Type, with its boundary, is kept exactly; without one, the form's own is given.
  if (instructions.boundary === null) {
    headers['Content-Type'] = "multipart/form-data; boundary=".concat(boundary);
  }

  // The form's text before and after the bytes is measured as UTF-8, and encoded straight into the body, so that the
  // body is the form's one allocation: no encoding of either is held beside it.
  var head = formHeadOf({
    boundary: boundary,
    fields: fields,
    fileField: instructions.data.name,
    fileName: fileName
  });
  var tail = formTailOf(boundary);
  var headLength = utf8Length(head);
  var length = headLength + bytes.length + utf8Length(tail);
  if (instructions.entityLength !== null && length !== instructions.entityLength) {
    throw refuse("makes a form of ".concat(length, " bytes, but its upload grant fixes ").concat(instructions.entityLength));
  }
  var body;
  if (within !== null) {
    var from = bytes.byteOffset - within.byteOffset;
    if (within.buffer !== bytes.buffer || from < 0 || from + bytes.length > within.length || within.length < length) {
      throw refuse('has no room for its form where its bytes are held');
    }

    // copyWithin() moves the bytes as memmove() would, overlapping or not, with no copy of its own; set() of a view of
    // the same memory would copy them first.
    body = within.subarray(0, length);
    body.copyWithin(headLength, from, from + bytes.length);
  } else {
    body = new Uint8Array(length);
    body.set(bytes, headLength);
  }
  encoder.encodeInto(head, body.subarray(0, headLength));
  encoder.encodeInto(tail, body.subarray(headLength + bytes.length));
  return {
    body: body,
    dataOffset: headLength,
    headers: headers,
    method: grant.method,
    url: url
  };
};

// Resolves once stream has something to give, its end, a failure or its close; or rejects with signal's reason as
// soon as it aborts. Either way it leaves no listener of its own on stream or signal.
var whenReadable = function whenReadable(stream, signal) {
  return new Promise(function (resolve, reject) {
    if (signal !== null && signal !== void 0 && signal.aborted) {
      reject((0, _Transfer.abortReason)(signal));
      return;
    }
    var events = ['close', 'end', 'error', 'readable'];
    var onAbort = null;
    var onEvent = null;
    var detach = function detach() {
      events.forEach(function (event) {
        return stream.removeListener(event, onEvent);
      });
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
    };
    onEvent = function onEvent() {
      detach();
      resolve();
    };
    onAbort = function onAbort() {
      detach();
      reject((0, _Transfer.abortReason)(signal));
    };
    events.forEach(function (event) {
      return stream.on(event, onEvent);
    });
    signal === null || signal === void 0 || signal.addEventListener('abort', onAbort, {
      once: true
    });
  });
};

// The sources an upload reads (see uploadSource()): { size, read(length, hooks), close() }, and, for some, atEnd(hooks),
// whether no byte is left; prepare(), which opens what the source reads, such as a file on disk, once the upload's file
// has been admitted, and only then gives its size; held, the bytes of the SDK's own it holds in the upload's buffer
// budget, its own there (see byteBudget), which only reading on, or closing it, gives back; and views, whether its parts
// are views of memory it holds, needing no buffer of their own. read(length, hooks) resolves with the next length
// bytes, fewer only at the end, or null once none are left. hooks are the reader's own: signal stops any wait for more;
// whenRunning() resolves once the upload is not paused, before anything more is taken from a stream; holding, the
// buffer room the reader holds meanwhile for the part; and reserve, room it holds besides, which a stream's read may
// use, and which it lowers by what it used (see streamSource()). A stream's source also tells, by reserveFor(length),
// how much such room a read of length may need. close() gives back whatever the source still holds of the SDK's own.

// Moves pending's bytes, in order, into part, from filled on, as many as it has room for, and gives where they end.
// pending holds strings, encoded as UTF-8 as they are moved, which nothing can change; and copies of the SDK's own,
// { bytes, credit }, credit the buffer room each is counted for, which taken(credit) gives back once all of its bytes
// have been moved. Of a character split between two parts, the bytes the next one takes, at most three, are kept as
// such a copy, counted for nothing.
var fillFrom = function fillFrom(pending, part, filled) {
  var taken = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var at = filled;
  while (at < part.length && pending.length > 0) {
    var entry = pending[0];
    if (typeof entry === 'string') {
      var _encoder$encodeInto = encoder.encodeInto(entry, part.subarray(at)),
        read = _encoder$encodeInto.read,
        written = _encoder$encodeInto.written;
      at += written;
      if (read === entry.length) {
        pending.shift();
      } else if (at < part.length) {
        // The next character's bytes do not all fit: those that do end the part, and the rest begin the next one.
        var units = entry.codePointAt(read) > 0xffff ? 2 : 1;
        var bytes = encoder.encode(entry.slice(read, read + units));
        var used = part.length - at;
        part.set(bytes.subarray(0, used), at);
        at += used;
        pending[0] = entry.slice(read + units);
        pending.unshift({
          bytes: bytes.subarray(used),
          credit: 0
        });
      } else {
        pending[0] = entry.slice(read);
      }
    } else {
      var _used = Math.min(entry.bytes.length, part.length - at);
      part.set(entry.bytes.subarray(0, _used), at);
      at += _used;
      if (_used === entry.bytes.length) {
        pending.shift();
        taken(entry.credit);
      } else {
        pending[0] = {
          bytes: entry.bytes.subarray(_used),
          credit: entry.credit
        };
      }
    }
  }
  return at;
};

// Whether pending (see fillFrom()) has any byte left.
var hasPending = function hasPending(pending) {
  return pending.some(function (entry) {
    return (typeof entry === 'string' ? entry.length : entry.bytes.length) > 0;
  });
};

// A source of bytes in memory, read in order, each part a view of them. held is the room they are counted for, when
// they are the SDK's own copy (see dataSourceOf()), which onClose(), when given, gives back once, as the source is
// closed.
var bytesSource = exports.bytesSource = function bytesSource(bytes) {
  var _ref30 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref30$held = _ref30.held,
    held = _ref30$held === void 0 ? 0 : _ref30$held,
    _ref30$onClose = _ref30.onClose,
    onClose = _ref30$onClose === void 0 ? null : _ref30$onClose;
  var offset = 0;
  var closed = false;
  return {
    atEnd: function () {
      var _atEnd = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", offset >= bytes.length);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function atEnd() {
        return _atEnd.apply(this, arguments);
      }
      return atEnd;
    }(),
    close: function close() {
      if (!closed) {
        closed = true;
        onClose === null || onClose === void 0 || onClose();
      }
    },
    get held() {
      return closed ? 0 : held;
    },
    read: function () {
      var _read = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(length) {
        var part;
        return _regenerator.default.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(offset >= bytes.length)) {
                _context2.next = 1;
                break;
              }
              return _context2.abrupt("return", null);
            case 1:
              part = bytes.subarray(offset, offset + length);
              offset += part.length;
              return _context2.abrupt("return", part);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function read(_x) {
        return _read.apply(this, arguments);
      }
      return read;
    }(),
    size: bytes.length,
    views: true
  };
};

// A source of strings, read as their UTF-8 bytes, in order, each part encoded into a buffer of its own, which its
// reader has made room for, as it is read: a string cannot change, so nothing of it is copied before then.
var textSource = exports.textSource = function textSource(strings) {
  var pending = (0, _toConsumableArray2.default)(strings);
  return {
    atEnd: function () {
      var _atEnd2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", !hasPending(pending));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function atEnd() {
        return _atEnd2.apply(this, arguments);
      }
      return atEnd;
    }(),
    close: function close() {},
    held: 0,
    read: function () {
      var _read2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(length) {
        var part, filled;
        return _regenerator.default.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              part = new Uint8Array(length);
              filled = fillFrom(pending, part, 0);
              return _context4.abrupt("return", filled === 0 ? null : part.subarray(0, filled));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function read(_x2) {
        return _read2.apply(this, arguments);
      }
      return read;
    }(),
    size: strings.reduce(function (total, string) {
      return total + utf8Length(string);
    }, 0),
    views: false
  };
};

// A source reading a Node.js readable stream, or one like it, only as the upload needs its bytes, taking each chunk the
// stream gives whole, as it gives it. A string, which nothing can change, is encoded as UTF-8 into the parts that take
// it. Of a byte chunk, the bytes the part being read has room for are copied into it, and the rest, if any, into a copy
// of the SDK's own, in the same turn as the stream gave the chunk, so that nothing the caller does with the chunk
// afterwards changes any part, a part sent again included. With admission, the upload's (see uploadSource()), that copy
// is counted against its buffer budget as the upload's own (see byteBudget) before anything of the chunk is copied:
// within the room the reader reserved for it (hooks.reserve), which reserveFor(length) sizes as the largest chunk the
// stream has given yet, less a byte, or, before any, its buffer's highWaterMark for a stream of bytes; or else room
// admitted at once within the budget's limit; or, beyond it, only while nothing but the upload's own bytes is held, as
// for a chunk larger than the budget given to an upload alone. Otherwise the read fails with a FilesError before the
// copy is made, the chunk taken from the stream and nothing of it kept. A chunk is taken only while the budget is open
// to the upload, which otherwise waits for it, holding what it holds meanwhile, before it takes anything. The copy is
// given back once the parts after it have taken all of its bytes. Nothing is taken from the stream while the upload is
// paused, and atEnd(), a look ahead for its end, takes nothing at all. The stream is never closed, ended, resumed or
// destroyed: close() only removes the upload's listener and gives back any copy still held, leaving the rest of the
// stream to its owner. A stream that fails, or closes before its end, fails the read; a stopped wait leaves the stream as
// it is.
var streamSource = exports.streamSource = function streamSource(stream) {
  var _stream$readableHighW;
  var _ref31 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref31$admission = _ref31.admission,
    admission = _ref31$admission === void 0 ? null : _ref31$admission,
    _ref31$size = _ref31.size,
    size = _ref31$size === void 0 ? null : _ref31$size;
  // What the stream has given that no part has taken yet (see fillFrom()), and the room its copies are counted for.
  var pending = [];
  var held = 0;
  var failure = null;

  // The largest byte chunk the stream has given, or, before any, the size its buffer fills to for a stream of bytes.
  var largest = stream.readableObjectMode ? 0 : (_stream$readableHighW = stream.readableHighWaterMark) !== null && _stream$readableHighW !== void 0 ? _stream$readableHighW : 0;

  // The bytes the upload holds of its own while a read with hooks is under way: its part's room, its reserve and its
  // copies.
  var ownBytes = function ownBytes(hooks) {
    var _hooks$holding, _hooks$reserve;
    return ((_hooks$holding = hooks.holding) !== null && _hooks$holding !== void 0 ? _hooks$holding : 0) + ((_hooks$reserve = hooks.reserve) !== null && _hooks$reserve !== void 0 ? _hooks$reserve : 0) + held;
  };
  var onError = function onError(error) {
    failure = failure !== null && failure !== void 0 ? failure : {
      error: error
    };
  };
  stream.on('error', onError);
  var giveBack = function giveBack(credit) {
    if (credit > 0) {
      held -= credit;
      admission.budget.release(credit);
    }
  };

  // Counts rest bytes of a chunk being taken, before they are copied, against hooks.reserve, or else the budget (see
  // streamSource()): gives the room they are counted for, and how to give it back should the copy fail; or throws.
  var roomFor = function roomFor(rest, length, hooks) {
    var _hooks$reserve2;
    if (!admission) {
      return {
        credit: 0,
        undo: function undo() {}
      };
    }
    if (((_hooks$reserve2 = hooks.reserve) !== null && _hooks$reserve2 !== void 0 ? _hooks$reserve2 : 0) >= rest) {
      // eslint-disable-next-line no-param-reassign
      hooks.reserve -= rest;
      // eslint-disable-next-line no-param-reassign
      return {
        credit: rest,
        undo: function undo() {
          hooks.reserve += rest;
        }
      };
    }
    if (admission.budget.admitNow(rest, admission, ownBytes(hooks))) {
      return {
        credit: rest,
        undo: function undo() {
          return admission.budget.release(rest);
        }
      };
    }
    throw uploadError("The upload's stream gave a chunk of ".concat(length, " bytes, whose ").concat(rest, " bytes after the part being read must be copied as the chunk is taken, and the buffer budget of ").concat(admission.budget.limit, " bytes (maxBufferBytes) has no room for them beside what other uploads hold. Give the stream in smaller chunks, give the budget more room, or upload it once room is free"));
  };

  // Takes the stream's next chunk, as soon as it gives one, into part from filled on: resolves with where part's bytes
  // then end, or null at the stream's end. Without a part, as to look ahead in a stream that cannot tell what it has
  // buffered, the whole chunk is kept.
  var take = /*#__PURE__*/function () {
    var _ref32 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(part, filled) {
      var hooks,
        signal,
        whenRunning,
        chunk,
        bytes,
        used,
        rest,
        room,
        copy,
        _args5 = arguments,
        _t;
      return _regenerator.default.wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            hooks = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            signal = hooks.signal, whenRunning = hooks.whenRunning;
          case 1:
            if (!failure) {
              _context5.next = 2;
              break;
            }
            throw failure.error;
          case 2:
            if (!(signal !== null && signal !== void 0 && signal.aborted)) {
              _context5.next = 3;
              break;
            }
            throw (0, _Transfer.abortReason)(signal);
          case 3:
            _context5.next = 4;
            return whenRunning === null || whenRunning === void 0 ? void 0 : whenRunning();
          case 4:
            if (!(admission && !admission.budget.isOpen(admission))) {
              _context5.next = 6;
              break;
            }
            _context5.next = 5;
            return admission.budget.whenOpen(admission, ownBytes(hooks), signal);
          case 5:
            _context5.next = 17;
            break;
          case 6:
            // From here until the chunk has been copied, nothing waits: the budget is still open to the upload, and the
            // chunk is never held past this turn.
            chunk = stream.read();
            if (!(typeof chunk === 'string')) {
              _context5.next = 7;
              break;
            }
            pending.push(chunk);
            return _context5.abrupt("return", part ? fillFrom(pending, part, filled, giveBack) : filled);
          case 7:
            if (!ArrayBuffer.isView(chunk)) {
              _context5.next = 12;
              break;
            }
            bytes = viewOf(chunk);
            used = part ? Math.min(bytes.length, part.length - filled) : 0;
            rest = bytes.length - used;
            largest = Math.max(largest, bytes.length);

            // The room for the rest is had, or the read refused, before anything of the chunk is copied.
            room = rest > 0 ? roomFor(rest, bytes.length, hooks) : null;
            if (!room) {
              _context5.next = 11;
              break;
            }
            copy = void 0;
            _context5.prev = 8;
            copy = copyOf(bytes.subarray(used));
            _context5.next = 10;
            break;
          case 9:
            _context5.prev = 9;
            _t = _context5["catch"](8);
            room.undo();
            throw _t;
          case 10:
            held += room.credit;
            pending.push({
              bytes: copy,
              credit: room.credit
            });
          case 11:
            if (used > 0) {
              part.set(bytes.subarray(0, used), filled);
            }
            return _context5.abrupt("return", filled + used);
          case 12:
            if (!(chunk !== null)) {
              _context5.next = 13;
              break;
            }
            throw new errors.InvalidParameterError('Bad parameter: upload data chunks must be strings or bytes');
          case 13:
            if (!stream.readableEnded) {
              _context5.next = 14;
              break;
            }
            return _context5.abrupt("return", null);
          case 14:
            if (!stream.errored) {
              _context5.next = 15;
              break;
            }
            throw stream.errored;
          case 15:
            if (!stream.destroyed) {
              _context5.next = 16;
              break;
            }
            throw uploadError('The upload stream closed before its end');
          case 16:
            _context5.next = 17;
            return whenReadable(stream, signal);
          case 17:
            _context5.next = 1;
            break;
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[8, 9]]);
    }));
    return function take(_x3, _x4) {
      return _ref32.apply(this, arguments);
    };
  }();
  return {
    // Whether the stream has no byte left, found, when nothing is pending, without taking anything from it: by what it
    // has buffered, by its end, or once read(0), which has it fill its buffer without giving any of it, and its next
    // event tell. Nothing is asked of it while the upload is paused. A stream like a Node.js one that cannot tell what
    // it has buffered has its next chunk taken instead, and kept (see take()).
    atEnd: function () {
      var _atEnd3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var hooks,
          signal,
          whenRunning,
          _args6 = arguments,
          _t2;
        return _regenerator.default.wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              hooks = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
              signal = hooks.signal, whenRunning = hooks.whenRunning;
            case 1:
              if (!hasPending(pending)) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", false);
            case 2:
              if (!(typeof stream.readableLength !== 'number')) {
                _context6.next = 5;
                break;
              }
              _context6.next = 3;
              return take(null, 0, hooks);
            case 3:
              _t2 = _context6.sent;
              if (!(_t2 === null)) {
                _context6.next = 4;
                break;
              }
              return _context6.abrupt("return", true);
            case 4:
              return _context6.abrupt("continue", 14);
            case 5:
              if (!failure) {
                _context6.next = 6;
                break;
              }
              throw failure.error;
            case 6:
              if (!(signal !== null && signal !== void 0 && signal.aborted)) {
                _context6.next = 7;
                break;
              }
              throw (0, _Transfer.abortReason)(signal);
            case 7:
              _context6.next = 8;
              return whenRunning === null || whenRunning === void 0 ? void 0 : whenRunning();
            case 8:
              if (!(stream.readableLength > 0)) {
                _context6.next = 9;
                break;
              }
              return _context6.abrupt("return", false);
            case 9:
              if (!stream.readableEnded) {
                _context6.next = 10;
                break;
              }
              return _context6.abrupt("return", true);
            case 10:
              if (!stream.errored) {
                _context6.next = 11;
                break;
              }
              throw stream.errored;
            case 11:
              if (!stream.destroyed) {
                _context6.next = 12;
                break;
              }
              throw uploadError('The upload stream closed before its end');
            case 12:
              stream.read(0);
              if (!(stream.readableLength > 0)) {
                _context6.next = 13;
                break;
              }
              return _context6.abrupt("return", false);
            case 13:
              _context6.next = 14;
              return whenReadable(stream, signal);
            case 14:
              _context6.next = 1;
              break;
            case 15:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function atEnd() {
        return _atEnd3.apply(this, arguments);
      }
      return atEnd;
    }(),
    close: function close() {
      stream.removeListener('error', onError);
      pending.splice(0).forEach(function (entry) {
        if (typeof entry !== 'string') {
          giveBack(entry.credit);
        }
      });
    },
    get held() {
      return held;
    },
    read: function () {
      var _read3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(length) {
        var hooks,
          part,
          filled,
          ended,
          taken,
          _args7 = arguments;
        return _regenerator.default.wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              hooks = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              part = new Uint8Array(length);
              filled = fillFrom(pending, part, 0, giveBack);
              ended = false;
            case 1:
              if (!(filled < length && !ended)) {
                _context7.next = 3;
                break;
              }
              _context7.next = 2;
              return take(part, filled, hooks);
            case 2:
              taken = _context7.sent;
              if (taken === null) {
                ended = true;
              } else {
                filled = taken;
              }
              _context7.next = 1;
              break;
            case 3:
              return _context7.abrupt("return", filled === 0 ? null : part.subarray(0, filled));
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function read(_x5) {
        return _read3.apply(this, arguments);
      }
      return read;
    }(),
    // The room a read of length may need for the rest of the last chunk it takes: none while what is pending covers it.
    reserveFor: function reserveFor(length) {
      var pendingBytes = pending.reduce(function (total, entry) {
        return total + (typeof entry === 'string' ? utf8Length(entry) : entry.bytes.length);
      }, 0);
      return pendingBytes >= length ? 0 : Math.max(0, largest - 1);
    },
    size: size,
    views: false
  };
};

// Whether a value is a Node.js readable stream, or one like it.
var isStream = function isStream(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.pipe) === 'function' && typeof (value === null || value === void 0 ? void 0 : value.on) === 'function' && typeof (value === null || value === void 0 ? void 0 : value.read) === 'function';
};

// The source of data as uploadData() takes it, given admission, the upload's (see uploadSource()), or none, as for a
// direct call. An array is taken as its elements are at the call, whatever becomes of it after.
//
// Strings, a string or an array of them, cannot change: they are read as their UTF-8 bytes, in order, each part encoded
// as it is read (see textSource()), of a size so known. Data in memory with bytes, a byte view or an array of strings
// and bytes, which its caller may change or reuse as soon as its call returns, is copied in the call itself, in one
// allocation of the SDK's own, each part then a view of the copy, of a size so known. The copy cannot wait, so it is
// admitted at once against admission.budget, the upload's buffer budget, before it is made, as the upload's own, and
// given back once the upload has settled; and it is made only for an upload whose file is admitted at once
// (admission.fileNow()), so that no upload waits for its file's admission holding buffer room that the uploads already
// admitted may need to go on. It is admitted only when it fits within the budget's limit; or, when it is larger than
// the whole budget, only when nothing else is held, so that it is held alone and never waits beyond the limit.
// Otherwise the data is refused, with a FilesError, before anything is copied or sent. Without admission, the copy is
// counted against nothing.
//
// A stream is read as it is (see streamSource()), and anything else iterable as a stream that makeStream(data) makes of
// it, of unknown size.
var dataSourceOf = exports.dataSourceOf = function dataSourceOf(data, makeStream) {
  var admission = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chunks = Array.isArray(data) ? (0, _toConsumableArray2.default)(data) : [data];
  var inMemory = (typeof data === 'string' || ArrayBuffer.isView(data) || Array.isArray(data)) && chunks.every(function (chunk) {
    return typeof chunk === 'string' || ArrayBuffer.isView(chunk);
  });
  if (!inMemory) {
    return streamSource(isStream(data) ? data : makeStream(Array.isArray(data) ? chunks : data), {
      admission: admission
    });
  }
  if (chunks.every(function (chunk) {
    return typeof chunk === 'string';
  })) {
    return textSource(chunks);
  }
  var length = chunks.reduce(function (total, chunk) {
    return total + byteLengthOf(chunk);
  }, 0);
  if (admission === null) {
    return bytesSource(copiedChunks(chunks, length));
  }
  var budget = admission.budget;
  var alone = length > budget.limit;
  var refusal = function refusal(reason) {
    return uploadError("The upload's ".concat(length, " bytes of data in memory cannot be copied now: ").concat(reason));
  };
  var onlyAlone = "they are more than the buffer budget of ".concat(budget.limit, " bytes (maxBufferBytes), which can hold them only alone, with nothing else held and a file admission free at once. Upload them once nothing else is held, or give them as a stream or a file");
  if (alone ? budget.held > 0 : length > 0 && budget.held + length > budget.limit) {
    throw refusal(alone ? onlyAlone : "the buffer budget of ".concat(budget.limit, " bytes (maxBufferBytes) has no room for them. Upload them once room is free, or give them as a stream or a file"));
  }
  if (!admission.fileNow()) {
    throw refusal(alone ? onlyAlone : 'the transfer job has no file admission free for them at once (maxConcurrentFiles), and a copy cannot wait for one while it holds buffer room the uploads already admitted may need. Upload them once a file is free, or give them as a string, a stream or a file');
  }
  budget.admitWithin(length, admission);
  try {
    return bytesSource(copiedChunks(chunks, length), {
      held: length,
      onClose: function onClose() {
        return budget.release(length);
      }
    });
  } catch (error) {
    budget.release(length);
    throw error;
  }
};

// A size a caller declares, in options.size or else params.size: a safe whole number of bytes, or null for none.
var declaredSizeOf = function declaredSizeOf(options, params) {
  var _options$size;
  var size = (_options$size = options.size) !== null && _options$size !== void 0 ? _options$size : params.size;
  if (size === undefined || size === null) {
    return null;
  }
  if (!Number.isSafeInteger(size) || size < 0) {
    throw new errors.InvalidParameterError('Bad parameter: size must be a whole number of bytes');
  }
  return size;
};

// Whether a storage error response is S3's RequestTimeout, which a retry can answer: a whole XML document whose root,
// Error, has the Code RequestTimeout, and no document type declaration.
var isRequestTimeout = exports.isRequestTimeout = function isRequestTimeout(status, text) {
  return status === 400 && typeof text === 'string' && !/<!DOCTYPE/i.test(text) && /^\s*(<\?xml[^>]*\?>\s*)?<Error>[\s\S]*<Code>RequestTimeout<\/Code>[\s\S]*<\/Error>\s*$/.test(text);
};

// The options a transfer takes that are not options of its requests.
var TRANSFER_OPTIONS = ['concurrency', 'control', 'determinePartUploadUri', 'job', 'maxConcurrency', 'onProgress', 'size', 'startup'];
var requestOptionsOf = function requestOptionsOf(options) {
  return Object.fromEntries(Object.entries(options).filter(function (_ref33) {
    var _ref34 = (0, _slicedToArray2.default)(_ref33, 1),
      name = _ref34[0];
    return !TRANSFER_OPTIONS.includes(name);
  }));
};

// Checks the options of an upload, as a whole, before anything is opened, sent or held, however the upload turns out
// to run: its concurrency options (see concurrencyOptions()), size, onProgress, determinePartUploadUri, control and job.
var checkedUploadOptions = exports.checkedUploadOptions = function checkedUploadOptions(given, params) {
  (0, _Transfer.concurrencyOptions)(given);
  if (given.onProgress !== undefined && given.onProgress !== null && typeof given.onProgress !== 'function') {
    throw new errors.InvalidParameterError('Bad parameter: onProgress must be a function');
  }
  if (given.determinePartUploadUri !== undefined && given.determinePartUploadUri !== null && typeof given.determinePartUploadUri !== 'function') {
    throw new errors.InvalidParameterError('Bad parameter: determinePartUploadUri must be a function');
  }
  return {
    control: (0, _Transfer.controlOf)(given.control),
    declared: declaredSizeOf(given, params),
    scope: (0, _Transfer.scopeOf)(given.job)
  };
};

// Uploads the source open(admission) gives (see streamSource and dataSourceOf), to destinationPath, with params and
// options as the File model's upload methods take them. hooks are the File model's own: agentFor(url, options), the
// agent of a part's request; makeFile(data, options), the File the upload resolves with; makeUploadPart(data), the
// FileUploadPart determinePartUploadUri receives; and storageOptionsOf(options), the options of a part's request.
//
// Every option is checked before the source is opened or anything sent; open() is called at once after, in the same
// turn as the call, so that data in memory is copied, or refused, before its caller can change it (see dataSourceOf()).
// The upload owns the source from then on, closing it, which gives back whatever it holds, once it has settled,
// however it settles.
//
// The upload begins with begin_upload, given the known size and asking for direct connection information, then asks
// for its parts' grants in batches, ahead of the parts that need them but never beyond the parts its plan, size or
// available_parts allow; a grant asked for ahead that fails, or goes unused, fails nothing, and every request for grants
// has settled before the upload does. A request for grants a part needs that does not give that part's grant fails the
// upload, so that no request is repeated without progress. Each grant must keep the upload's ref and its path binding
// (see pathBindingOf()). A part is read only once it has room in the buffer budget and among the parts ready to be
// sent, so that reading never runs ahead of sending, and sent once the concurrency controller admits it and the request
// budget allows. Parts go in parallel only when the API allows it and the size is known; once a later grant no longer
// allows parallel parts, the rest go one at a time, in order: each only once nothing else is on the wire and every part
// before it is stored, so that an earlier part sent again goes first. Parts already sent cannot be taken back.
//
// Only a part whose grant allows parallel parts and retrying (retry_parts) is sent again after a transient failure,
// with the same number and bytes, after storage's wait, whether the upload's parts go in parallel or not; a part whose
// URL has expired is given a new grant first, which, once the part may have been sent, must still allow retrying it.
// Paused, the upload sends and reads nothing new, a look ahead for the source's end included, holding no request permit
// or new buffer room meanwhile. The first failure, or the caller's signal, stops everything, any wait for the source
// included, without closing it, and its parts' requests under way, without a deadline of its own; the upload rejects
// with that failure, or the signal's reason, never with the stop, once every part under way has settled, without
// completing. Its completion sends the exact size, and every part's ETag when storage gave them; a part without one,
// when others have one, refuses it.
//
// Every byte the SDK holds for the upload is counted against its scope's one buffer budget before it is allocated (see
// byteBudget): its copy of data in memory, made as its upload is called only once its file has been admitted (see
// dataSourceOf()); the copies of the stream chunks it takes (see streamSource()); and each part's buffers, from before
// it is read until it settles: its own buffer, unless it is a view of the copy of data in memory, and, for a form, the
// form too, made while that buffer still holds the part's bytes (see requestFor). A part that cannot fit waits for room,
// holding nothing but the upload's own copy; one the budget refuses, rather than go beyond its limit, fails the upload.
// No upload waits for its file's admission holding any of the budget. A whole file the API asks for in one request, of
// unknown size, holds the whole budget while its source is read, and fails the upload when that source is larger than
// half of it, which leaves room to join what was read into one body, or when the part, its form included, needs more
// than the whole budget. A source that opens what it reads, such as a file on disk, opens it only once the upload's file
// has been admitted (see the sources).
var uploadSource = exports.uploadSource = /*#__PURE__*/function () {
  var _ref36 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee13(_ref35) {
    var _options$client;
    var destinationPath, fileName, hooks, open, givenOptions, givenParams, given, params, options, signal, _checkedUploadOptions, control, declared, scope, config, log, maxRetries, beginPath, renames, pathBinding, stopping, prefetching, failed, firstFailure, fail, onCallerAbort, negotiationOptions, storageOptions, source, fileAdmitted, progress, batch, admission, _source$size, _batch, checkSize, size, viewsOnly, beginParams, begun, _grantsOf, _grantsOf2, first, ref, grants, destination, plan, scheduledParallel, serialController, controller, serialNow, controllerNow, partLimit, noteGrant, readState, lastPartGuess, grantedThrough, speculating, ask, prefetch, grantFor, renewGrant, nextTurn, turns, takeTurn, passTurn, urlOf, parts, ready, wakeReader, leaveReady, sending, nextSerial, serialWaiters, waitForSerialTurn, wakeSerial, sent, stored, serialBlocked, dispatch, requestFor, sendPart, running, exhausted, readHooks, creditOf, takeBytes, takeWhole, lengthOf, waitForReader, sourceEnded, _loop, ended, withEtags, completionParams, completed, status, _progress, _batch2, _source, _t0, _t1, _t10, _t11, _t12, _t13;
    return _regenerator.default.wrap(function (_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          destinationPath = _ref35.destinationPath, fileName = _ref35.fileName, hooks = _ref35.hooks, open = _ref35.open, givenOptions = _ref35.options, givenParams = _ref35.params;
          given = givenOptions || {};
          params = isPlainObject(givenParams) ? givenParams : {};
          options = requestOptionsOf(given);
          signal = options.signal;
          _checkedUploadOptions = checkedUploadOptions(given, params), control = _checkedUploadOptions.control, declared = _checkedUploadOptions.declared, scope = _checkedUploadOptions.scope;
          config = (_options$client = options.client) !== null && _options$client !== void 0 ? _options$client : _Files.default;
          log = _Api.default._loggerFor(config);
          maxRetries = config.getMaxNetworkRetries();
          beginPath = "/file_actions/begin_upload/".concat(encodeURIComponent(destinationPath));
          renames = Boolean(params.with_rename) && params.with_rename !== 'false';
          pathBinding = pathBindingOf({
            destinationPath: destinationPath,
            renames: renames,
            workspace: hasOwn(options, 'workspaceId') ? options.workspaceId : config.getWorkspaceId()
          });
          stopping = new AbortController();
          prefetching = new AbortController();
          failed = false;
          fail = function fail(error) {
            if (!failed) {
              failed = true;
              firstFailure = error;
              stopping.abort();
            }
          };
          onCallerAbort = function onCallerAbort() {
            return fail((0, _Transfer.abortReason)(signal));
          }; // Requests for grants: stopped with the upload, and the speculative ones, asked for ahead, once it no longer needs them.
          negotiationOptions = _objectSpread(_objectSpread({}, options), {}, {
            signal: (0, _Transfer.linkedSignal)([signal, stopping.signal, prefetching.signal])
          }); // Requests for parts: stopped with the upload too, so that its first failure, or its caller's signal, stops every
          // part under way, each settled, its body included, before the upload is; the upload still rejects with that first
          // failure, never with the stop. Another upload's requests, even in the same job, are not stopped.
          storageOptions = _objectSpread(_objectSpread({}, hooks.storageOptionsOf(options)), {}, {
            signal: (0, _Transfer.linkedSignal)([signal, stopping.signal])
          });
          source = null;
          fileAdmitted = false;
          progress = null;
          batch = null; // The upload as the owner of what it holds in its scope's buffer budget (see byteBudget), which its source is opened
          // with: budget, for its copy of data in memory (see dataSourceOf()), its stream's copies of the chunks it takes (see
          // streamSource()) and its parts' buffers; and fileNow(), which takes the upload's file admission at once, if it is
          // free, for a copy of data in memory, which is made only then: whether the upload has it.
          admission = {
            budget: scope.buffers,
            fileNow: function fileNow() {
              if (!fileAdmitted && scope.files.tryAcquire()) {
                fileAdmitted = true;
              }
              return fileAdmitted;
            }
          };
          _context14.prev = 1;
          _context14.next = 2;
          return open(admission);
        case 2:
          source = _context14.sent;
          signal === null || signal === void 0 || signal.addEventListener('abort', onCallerAbort, {
            once: true
          });
          if (signal !== null && signal !== void 0 && signal.aborted) {
            onCallerAbort();
          }
          if (!failed) {
            _context14.next = 3;
            break;
          }
          throw firstFailure;
        case 3:
          // A size declared for a source whose size is known, now or once it has been opened, must be its size.
          checkSize = function checkSize() {
            if (source.size !== null && declared !== null && declared !== source.size) {
              throw new errors.InvalidParameterError("Bad parameter: size ".concat(declared, " is not the size of the upload's source, ").concat(source.size));
            }
          };
          checkSize();

          // An upload with a copy of data in memory has its file already (see dataSourceOf()); any other waits for it here,
          // holding nothing of the buffer budget.
          if (fileAdmitted) {
            _context14.next = 5;
            break;
          }
          _context14.next = 4;
          return scope.files.acquire(stopping.signal);
        case 4:
          fileAdmitted = true;
        case 5:
          if (!(typeof source.prepare === 'function')) {
            _context14.next = 6;
            break;
          }
          _context14.next = 6;
          return source.prepare();
        case 6:
          if (!failed) {
            _context14.next = 7;
            break;
          }
          throw firstFailure;
        case 7:
          checkSize();
          size = (_source$size = source.size) !== null && _source$size !== void 0 ? _source$size : declared;
          viewsOnly = source.views === true;
          beginParams = _objectSpread(_objectSpread(_objectSpread({}, Object.fromEntries(Object.entries(params).filter(function (_ref37) {
            var _ref38 = (0, _slicedToArray2.default)(_ref37, 1),
              name = _ref38[0];
            return BEGIN_PARAMETERS.includes(name);
          }))), size !== null ? {
            size: size
          } : {}), {}, {
            with_direct_connection_info: true
          });
          _context14.next = 8;
          return _Api.default.sendRequest(beginPath, 'POST', beginParams, options);
        case 8:
          begun = _context14.sent;
          _grantsOf = grantsOf(begun.data, {
            count: 1,
            firstPart: 1,
            ref: null
          }), _grantsOf2 = (0, _slicedToArray2.default)(_grantsOf, 1), first = _grantsOf2[0];
          if (isNonEmptyString(first.ref)) {
            _context14.next = 9;
            break;
          }
          throw uploadError('The upload was begun without a ref');
        case 9:
          ref = first.ref;
          pathBinding.bind(first);
          grants = new Map([[1, _objectSpread(_objectSpread({}, first), {}, {
            negotiationHeaders: begun.headers
          })]]);
          destination = destinationOf(first);
          plan = planOf({
            destination: destination,
            grant: first,
            instructions: instructionsOf(first),
            size: size
          }); // Parts go in parallel only when the API allows it and the size is known; otherwise one at a time, in order, with
          // a controller of their own that teaches no shared one. A later grant that withdraws the API's permission makes
          // the rest go one at a time too (serialNow).
          scheduledParallel = first.parallel && size !== null && plan.mode !== 'whole';
          serialController = (0, _Transfer.createController)({
            direction: 'upload',
            fixed: 1
          });
          controller = scheduledParallel ? (0, _Transfer.controllerFor)(scope, {
            concurrency: given.concurrency,
            destination: destination,
            direction: 'upload',
            maxConcurrency: given.maxConcurrency,
            startup: given.startup
          }) : serialController;
          serialNow = !scheduledParallel;
          controllerNow = function controllerNow() {
            return serialNow ? serialController : controller;
          }; // The highest part number the API allows, when a grant has said, which nothing is asked for beyond ahead of need.
          partLimit = first.availableParts > 0 ? first.availableParts : null;
          noteGrant = function noteGrant(grant) {
            if (grant.availableParts > 0) {
              partLimit = grant.availableParts;
            }
            if (!grant.parallel && !serialNow) {
              serialNow = true;
              log.info("The upload grant for part ".concat(grant.partNumber, " allows no parallel parts: the rest of the upload goes one part at a time"));
            }
          };
          progress = (0, _Transfer.createProgress)({
            control: control,
            direction: 'upload',
            onProgress: given.onProgress,
            totalBytes: size
          });
          progress.start();

          // How far the parts go: the plan's last part, one for a whole-file upload, or, for a server-sized upload of known
          // size, as many as its remaining bytes need at the latest grant's size (lastPartGuess); null when the size is
          // unknown.
          readState = {
            latestPartSize: first.partSize,
            offset: 0,
            partNumber: 0
          };
          lastPartGuess = function lastPartGuess() {
            if (plan.mode === 'whole') {
              return 1;
            }
            if (plan.mode === 'local') {
              return plan.partCount;
            }
            if (size === null || !(readState.latestPartSize > 0)) {
              return null;
            }
            return Math.max(1, readState.partNumber + Math.ceil((size - readState.offset) / readState.latestPartSize));
          }; // Grants: asked for in batches of at most GRANT_BATCH from begin_upload with the upload's path and ref. One
          // request is under way at a time (batch). A part that needs a grant asks for it, and the parts after it as far
          // as they are known to be needed; once a part's grant is taken with GRANT_PREFETCH or fewer unused ahead of it, the
          // next batch is asked for ahead, speculatively, never beyond lastPartGuess() or the API's partLimit, and, for an
          // upload of unknown size, at most UNKNOWN_SIZE_GRANT_BATCH beyond the last granted. A batch must give the grant of
          // the first part it asks for, or fails; the grants it gives besides are kept. A speculative batch that fails, or
          // goes unused past the end of the source, fails nothing: a part that still needs a grant asks again, and, once one
          // has failed, grants are asked for only as parts need them (speculating). A needed request that fails fails the
          // part, so that no request is ever repeated without progress.
          grantedThrough = 1;
          speculating = true;
          ask = function ask(fromPart, upTo) {
            var speculative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var count = Math.max(1, Math.min(GRANT_BATCH, upTo - fromPart + 1));
            var request = _Api.default.sendRequest(beginPath, 'POST', {
              part: fromPart,
              parts: count,
              ref: ref,
              with_direct_connection_info: true
            }, negotiationOptions).then(function (response) {
              var received = grantsOf(response.data, {
                count: count,
                firstPart: fromPart,
                ref: ref
              });
              received.forEach(function (grant) {
                pathBinding.bind(grant);
                noteGrant(grant);
                grants.set(grant.partNumber, _objectSpread(_objectSpread({}, grant), {}, {
                  negotiationHeaders: response.headers
                }));
              });
              if (!grants.has(fromPart)) {
                throw uploadError("The API gave no upload grant for part ".concat(fromPart));
              }
              while (grants.has(grantedThrough + 1)) {
                grantedThrough += 1;
              }
            });
            var current = {
              done: request.then(function () {}, function () {
                if (speculative) {
                  speculating = false;
                }
              }),
              request: request
            };
            batch = current;
            current.done.then(function () {
              if (batch === current) {
                batch = null;
              }
            });
            return current;
          };
          prefetch = function prefetch(partNumber) {
            if (failed || !speculating || batch || grantedThrough - partNumber > GRANT_PREFETCH) {
              return;
            }
            var guess = lastPartGuess();
            var upTo = Math.min(guess !== null && guess !== void 0 ? guess : grantedThrough + UNKNOWN_SIZE_GRANT_BATCH, partLimit !== null && partLimit !== void 0 ? partLimit : Number.MAX_SAFE_INTEGER, grantedThrough + GRANT_BATCH);
            if (upTo > grantedThrough) {
              ask(grantedThrough + 1, upTo, true);
            }
          };
          grantFor = /*#__PURE__*/function () {
            var _ref39 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(partNumber) {
              var _lastPartGuess, upTo;
              return _regenerator.default.wrap(function (_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    if (grants.has(partNumber)) {
                      _context8.next = 5;
                      break;
                    }
                    if (!failed) {
                      _context8.next = 1;
                      break;
                    }
                    throw firstFailure;
                  case 1:
                    if (!batch) {
                      _context8.next = 3;
                      break;
                    }
                    _context8.next = 2;
                    return batch.done;
                  case 2:
                    _context8.next = 4;
                    break;
                  case 3:
                    // Needed now: its failure is the part's.
                    upTo = Math.max(partNumber, Math.min((_lastPartGuess = lastPartGuess()) !== null && _lastPartGuess !== void 0 ? _lastPartGuess : partNumber, partLimit !== null && partLimit !== void 0 ? partLimit : Number.MAX_SAFE_INTEGER)); // eslint-disable-next-line no-await-in-loop
                    _context8.next = 4;
                    return ask(grantedThrough + 1, upTo).request;
                  case 4:
                    _context8.next = 0;
                    break;
                  case 5:
                    prefetch(partNumber);
                    return _context8.abrupt("return", grants.get(partNumber));
                  case 6:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function grantFor(_x7) {
              return _ref39.apply(this, arguments);
            };
          }(); // A new grant for partNumber, whose URL has expired, with the upload's path and ref.
          renewGrant = /*#__PURE__*/function () {
            var _ref40 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9(partNumber) {
              var response, _grantsOf3, _grantsOf4, grant, renewed;
              return _regenerator.default.wrap(function (_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 1;
                    return _Api.default.sendRequest(beginPath, 'POST', {
                      part: partNumber,
                      parts: 1,
                      ref: ref,
                      with_direct_connection_info: true
                    }, negotiationOptions);
                  case 1:
                    response = _context9.sent;
                    _grantsOf3 = grantsOf(response.data, {
                      count: 1,
                      firstPart: partNumber,
                      ref: ref
                    }), _grantsOf4 = (0, _slicedToArray2.default)(_grantsOf3, 1), grant = _grantsOf4[0];
                    pathBinding.bind(grant);
                    noteGrant(grant);
                    renewed = _objectSpread(_objectSpread({}, grant), {}, {
                      negotiationHeaders: response.headers
                    });
                    grants.set(partNumber, renewed);
                    return _context9.abrupt("return", renewed);
                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function renewGrant(_x8) {
              return _ref40.apply(this, arguments);
            };
          }(); // Turns: determinePartUploadUri is called for each part's first send in part order, and the next part's turn comes
          // once this part's URL and agent have been chosen.
          nextTurn = 1;
          turns = new Map();
          takeTurn = function takeTurn(partNumber) {
            return partNumber === nextTurn ? Promise.resolve(true) : new Promise(function (resolve) {
              turns.set(partNumber, resolve);
            });
          };
          passTurn = function passTurn() {
            nextTurn += 1;
            var take = turns.get(nextTurn);
            turns.delete(nextTurn);
            take === null || take === void 0 || take(true);
          };
          stopping.signal.addEventListener('abort', function () {
            turns.forEach(function (take) {
              return take(false);
            });
            turns.clear();
          }, {
            once: true
          });
          urlOf = function urlOf(part, grant) {
            var url = grant.url;
            if (typeof given.determinePartUploadUri === 'function') {
              url = given.determinePartUploadUri(hooks.makeUploadPart(_objectSpread(_objectSpread({}, grant.data), {}, {
                headers: grant.negotiationHeaders,
                parameters: {
                  action: 'put',
                  part: part.number,
                  ref: ref
                }
              })));
              if (!isNonEmptyString(url)) {
                throw uploadError("determinePartUploadUri gave no URL for part ".concat(part.number));
              }
            }
            return plan.offsets ? withPartOffset(url, part.number, part.offset) : url;
          }; // The parts read, by number, and those read but not yet admitted for their first request: the reader waits while
          // there are as many as the target.
          parts = [];
          ready = 0;
          wakeReader = null;
          leaveReady = function leaveReady(number) {
            var part = parts[number - 1];
            if (!part.readyLeft) {
              part.readyLeft = true;
              ready -= 1;
              var wake = wakeReader;
              wakeReader = null;
              wake === null || wake === void 0 || wake();
            }
          };
          stopping.signal.addEventListener('abort', function () {
            var _wakeReader;
            return (_wakeReader = wakeReader) === null || _wakeReader === void 0 ? void 0 : _wakeReader();
          }, {
            once: true
          });

          // The parts on the wire, and the lowest part number not yet stored (nextSerial): one at a time, a part goes only once
          // nothing else is on the wire and every part before it is stored, so that a part sent again goes before the next.
          sending = 0;
          nextSerial = 1;
          serialWaiters = [];
          waitForSerialTurn = function waitForSerialTurn() {
            return new Promise(function (resolve) {
              serialWaiters.push(resolve);
            });
          };
          wakeSerial = function wakeSerial() {
            return serialWaiters.splice(0).forEach(function (resolve) {
              return resolve();
            });
          };
          sent = function sent() {
            sending -= 1;
            if (sending === 0) {
              wakeSerial();
            }
          };
          stored = function stored(number) {
            parts[number - 1].stored = true;
            while ((_parts = parts[nextSerial - 1]) !== null && _parts !== void 0 && _parts.stored) {
              var _parts;
              nextSerial += 1;
            }
            wakeSerial();
          };
          stopping.signal.addEventListener('abort', wakeSerial, {
            once: true
          });
          serialBlocked = function serialBlocked(number) {
            return serialNow && (sending > 0 || number !== nextSerial);
          }; // Admits one request for part number: once the upload is running, by the controller now in charge and the request
          // budget, and then, at the actual dispatch, only if the upload has not failed, is not paused and has not since gone
          // one part at a time; otherwise what was acquired is given back and the part waits again. Resolves with its
          // attempt, counted among the parts on the wire, or null once the upload has failed.
          dispatch = /*#__PURE__*/function () {
            var _ref41 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee0(number) {
              var owner, attempt, _t3;
              return _regenerator.default.wrap(function (_context0) {
                while (1) switch (_context0.prev = _context0.next) {
                  case 0:
                    if (!failed) {
                      _context0.next = 1;
                      break;
                    }
                    return _context0.abrupt("return", null);
                  case 1:
                    _context0.next = 2;
                    return control === null || control === void 0 ? void 0 : control._whenRunning(stopping.signal);
                  case 2:
                    if (!serialBlocked(number)) {
                      _context0.next = 4;
                      break;
                    }
                    _context0.next = 3;
                    return waitForSerialTurn();
                  case 3:
                    _context0.next = 11;
                    break;
                  case 4:
                    owner = controllerNow(); // eslint-disable-next-line no-await-in-loop
                    _context0.next = 5;
                    return owner.admit(stopping.signal);
                  case 5:
                    attempt = _context0.sent;
                    _context0.prev = 6;
                    _context0.next = 7;
                    return scope.requests.upload.acquire(stopping.signal);
                  case 7:
                    _context0.next = 9;
                    break;
                  case 8:
                    _context0.prev = 8;
                    _t3 = _context0["catch"](6);
                    attempt.abandon();
                    throw _t3;
                  case 9:
                    if (!(!failed && !(control !== null && control !== void 0 && control.paused) && owner === controllerNow() && !serialBlocked(number))) {
                      _context0.next = 10;
                      break;
                    }
                    sending += 1;
                    return _context0.abrupt("return", attempt);
                  case 10:
                    scope.requests.upload.release();
                    attempt.abandon();
                  case 11:
                    _context0.next = 0;
                    break;
                  case 12:
                  case "end":
                    return _context0.stop();
                }
              }, _callee0, null, [[6, 8]]);
            }));
            return function dispatch(_x9) {
              return _ref41.apply(this, arguments);
            };
          }(); // The request that sends part with grant to url, built once for that grant and URL, and kept for its retries. A
          // part's credit covers, all along, the memory of the SDK's own it holds alone, part.own, of part.ownBytes: its own
          // buffer, or its form, once made. A form is made only once that credit covers what is held while it is made, the
          // part's buffer and the form together, as the credit a part read for a form already does; or, for a renewed
          // grant's form with no more bytes than the part's form has room for, within that form, which nothing more is
          // needed for. The form then becomes what the part holds, its bytes a view of it, and the rest of the credit is
          // given back, once. A form needing more than the part's credit, as a renewed grant's longer form, is given only
          // room the buffer budget admits at once within its limit (see byteBudget), since no part waits for room while
          // holding its own: otherwise it is refused, failing the upload, before anything is made.
          requestFor = function requestFor(part, grant, url) {
            var _part$request;
            if (part.request && part.request.grant === grant && part.request.url === url) {
              return part.request.built;
            }
            var instructions = instructionsOf(grant);
            if (!instructions.form) {
              var _built = partRequestOf({
                bytes: part.bytes,
                fileName: fileName,
                grant: grant,
                instructions: instructions,
                url: url
              });
              part.request = {
                built: _built,
                grant: grant,
                url: url
              };
              return _built;
            }
            var length = part.length + formEnvelopeOf({
              fileName: fileName,
              grant: grant,
              instructions: instructions,
              length: part.length
            });
            var within = part.own !== null && part.own.length >= length && ((_part$request = part.request) === null || _part$request === void 0 ? void 0 : _part$request.built.body.buffer) === part.own.buffer ? part.own : null;
            var needed = part.ownBytes + (within ? 0 : length);
            if (needed > part.credit) {
              if (!scope.buffers.admitWithin(needed - part.credit, admission)) {
                throw uploadError("Part ".concat(part.number, " needs a form of ").concat(length, " bytes, more than the buffer room held for it, and the buffer budget of ").concat(scope.buffers.limit, " bytes (maxBufferBytes) has no room for the rest at once"));
              }
              part.credit = needed;
            }
            var built = partRequestOf({
              bytes: part.bytes,
              fileName: fileName,
              grant: grant,
              instructions: instructions,
              url: url,
              within: within
            });
            if (!within) {
              part.own = built.body;
              part.ownBytes = length;
            }
            scope.buffers.release(part.credit - part.ownBytes);
            part.credit = part.ownBytes;
            part.bytes = built.body.subarray(built.dataOffset, built.dataOffset + part.length);
            part.request = {
              built: built,
              grant: grant,
              url: url
            };
            return built;
          };
          sendPart = /*#__PURE__*/function () {
            var _ref42 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee1(number) {
              var part, grant, url, agent, retries, renewedFor, request, attempt, result, unsent, failure, waitMs, _Api$_retryAfterMs, cause, _t4, _t5;
              return _regenerator.default.wrap(function (_context1) {
                while (1) switch (_context1.prev = _context1.next) {
                  case 0:
                    part = parts[number - 1];
                    _context1.next = 1;
                    return grantFor(number);
                  case 1:
                    grant = _context1.sent;
                    url = null;
                    retries = 0;
                    renewedFor = -1;
                  case 2:
                    if (!failed) {
                      _context1.next = 3;
                      break;
                    }
                    return _context1.abrupt("return");
                  case 3:
                    if (!_Api.default._storageExpired({
                      expires: grant.expires,
                      url: url !== null && url !== void 0 ? url : grant.url
                    })) {
                      _context1.next = 8;
                      break;
                    }
                    if (!(renewedFor === retries)) {
                      _context1.next = 4;
                      break;
                    }
                    throw uploadError('The signed URL had expired before the request could be sent');
                  case 4:
                    renewedFor = retries;
                    // eslint-disable-next-line no-await-in-loop
                    _context1.next = 5;
                    return renewGrant(number);
                  case 5:
                    grant = _context1.sent;
                    if (!(!grant.retry && part.sends > 0)) {
                      _context1.next = 6;
                      break;
                    }
                    part.replayWithdrawn = true;
                    throw uploadError("Part ".concat(number, " may have been sent, and its renewed grant does not allow sending it again"));
                  case 6:
                    if (!_Api.default._storageExpired({
                      expires: grant.expires,
                      url: grant.url
                    })) {
                      _context1.next = 7;
                      break;
                    }
                    throw uploadError('The signed URL had expired before the request could be sent');
                  case 7:
                    url = null;
                  case 8:
                    if (!(url === null)) {
                      _context1.next = 16;
                      break;
                    }
                    if (!(part.sends === 0 && !part.turnTaken)) {
                      _context1.next = 15;
                      break;
                    }
                    _context1.next = 9;
                    return takeTurn(number);
                  case 9:
                    if (_context1.sent) {
                      _context1.next = 10;
                      break;
                    }
                    return _context1.abrupt("return");
                  case 10:
                    part.turnTaken = true;

                    // A turn that comes once the upload has failed calls nothing back; and a callback that fails fails the
                    // upload before the next part's turn comes, so that no later part is called back for.
                    if (!failed) {
                      _context1.next = 11;
                      break;
                    }
                    passTurn();
                    return _context1.abrupt("return");
                  case 11:
                    _context1.prev = 11;
                    url = urlOf(part, grant);
                    agent = hooks.agentFor(url, options);
                    _context1.next = 13;
                    break;
                  case 12:
                    _context1.prev = 12;
                    _t4 = _context1["catch"](11);
                    fail(_t4);
                    throw _t4;
                  case 13:
                    _context1.prev = 13;
                    passTurn();
                    return _context1.finish(13);
                  case 14:
                    _context1.next = 16;
                    break;
                  case 15:
                    url = urlOf(part, grant);
                    agent = hooks.agentFor(url, options);
                  case 16:
                    request = requestFor(part, grant, url); // eslint-disable-next-line no-await-in-loop
                    _context1.next = 17;
                    return dispatch(number);
                  case 17:
                    attempt = _context1.sent;
                    if (attempt) {
                      _context1.next = 18;
                      break;
                    }
                    return _context1.abrupt("return");
                  case 18:
                    leaveReady(number);
                    attempt.start();
                    result = void 0;
                    _context1.prev = 19;
                    _context1.next = 20;
                    return _Api.default._sendStorageAttempt({
                      agent: agent,
                      expires: grant.expires,
                      headers: request.headers,
                      method: request.method,
                      url: request.url
                    }, request.body, storageOptions);
                  case 20:
                    result = _context1.sent;
                    _context1.next = 22;
                    break;
                  case 21:
                    _context1.prev = 21;
                    _t5 = _context1["catch"](19);
                    attempt.abandon();
                    throw _t5;
                  case 22:
                    _context1.prev = 22;
                    scope.requests.upload.release();
                    sent();
                    return _context1.finish(22);
                  case 23:
                    // Unsent only when found expired before any of its requests was dispatched: a redirect from a request that was
                    // sent, to a URL found expired, leaves that request sent.
                    unsent = result.expired === true && result.dispatched !== true;
                    if (!unsent) {
                      part.sends += 1;
                      progress.sent(part.length);
                    }
                    if (!result.ok) {
                      _context1.next = 24;
                      break;
                    }
                    attempt.accept(part.length);
                    part.etag = result.headers.etag;
                    stored(number);
                    progress.accepted(part.length);
                    return _context1.abrupt("return");
                  case 24:
                    failure = void 0;
                    waitMs = STORAGE_RETRY_MS;
                    if (!unsent) {
                      _context1.next = 26;
                      break;
                    }
                    // Found expired as it was to be sent, the part sent nothing: it is renewed, unless it already has been for
                    // this send.
                    attempt.abandon();
                    if (!(renewedFor === retries)) {
                      _context1.next = 25;
                      break;
                    }
                    throw result.failure;
                  case 25:
                    url = null;
                    grant = _objectSpread(_objectSpread({}, grant), {}, {
                      expires: new Date(0).toISOString()
                    });
                    failure = result.failure;
                    waitMs = 0;
                    _context1.next = 33;
                    break;
                  case 26:
                    if (!result.expired) {
                      _context1.next = 27;
                      break;
                    }
                    // Sent, and redirected to a URL found expired, which is never sent to: the part may have been stored, and is
                    // sent again only as any failure of a sent part is retried, counted as a retry, with a renewed grant, which
                    // must still allow retrying it; otherwise the upload fails with the expiry.
                    attempt.abandon();
                    url = null;
                    grant = _objectSpread(_objectSpread({}, grant), {}, {
                      expires: new Date(0).toISOString()
                    });
                    failure = result.failure;
                    waitMs = 0;
                    _context1.next = 33;
                    break;
                  case 27:
                    if (!(result.failure !== undefined)) {
                      _context1.next = 29;
                      break;
                    }
                    if (!result.permanent) {
                      _context1.next = 28;
                      break;
                    }
                    attempt.abandon();
                    throw result.failure;
                  case 28:
                    attempt.fail();
                    failure = result.failure;
                    _context1.next = 33;
                    break;
                  case 29:
                    failure = uploadError("Storage answered part ".concat(number, " with HTTP status ").concat(result.status), result.status);
                    if (!(result.status === 429 || result.status === 503)) {
                      _context1.next = 31;
                      break;
                    }
                    waitMs = (_Api$_retryAfterMs = _Api.default._retryAfterMs(result.headers['retry-after'])) !== null && _Api$_retryAfterMs !== void 0 ? _Api$_retryAfterMs : 0;

                    // A wait no timer can be set for is refused before it reaches the controller.
                    if (!(waitMs > _Transfer.MAX_TIMER_MS)) {
                      _context1.next = 30;
                      break;
                    }
                    attempt.fail({
                      throttled: true
                    });
                    log.info("Part ".concat(number, " is not retried because its wait of ").concat(waitMs, " ms cannot be scheduled"));
                    throw failure;
                  case 30:
                    attempt.fail({
                      retryAfterMs: waitMs,
                      throttled: true
                    });
                    _context1.next = 33;
                    break;
                  case 31:
                    if (!(_Api.default._isTransientStatus(result.status) || isRequestTimeout(result.status, result.data))) {
                      _context1.next = 32;
                      break;
                    }
                    attempt.fail();
                    _context1.next = 33;
                    break;
                  case 32:
                    attempt.abandon();
                    throw failure;
                  case 33:
                    if (unsent) {
                      _context1.next = 36;
                      break;
                    }
                    if (!(!grant.parallel || !grant.retry || part.replayWithdrawn || retries >= maxRetries)) {
                      _context1.next = 34;
                      break;
                    }
                    throw failure;
                  case 34:
                    if (!(waitMs > _Transfer.MAX_TIMER_MS)) {
                      _context1.next = 35;
                      break;
                    }
                    log.info("Part ".concat(number, " is not retried because its wait of ").concat(waitMs, " ms cannot be scheduled"));
                    throw failure;
                  case 35:
                    retries += 1;
                    cause = result.status && "HTTP ".concat(result.status) || (result.expired ? 'a redirect to an expired URL' : 'a network error');
                    log.info("Retrying request (retry ".concat(retries, " of ").concat(maxRetries, ") in ").concat(waitMs, " ms after ").concat(cause));
                  case 36:
                    _context1.next = 37;
                    return (0, _Transfer.delay)(waitMs, stopping.signal);
                  case 37:
                    _context1.next = 2;
                    break;
                  case 38:
                  case "end":
                    return _context1.stop();
                }
              }, _callee1, null, [[11, 12, 13, 14], [19, 21, 22, 23]]);
            }));
            return function sendPart(_x0) {
              return _ref42.apply(this, arguments);
            };
          }();
          running = new Set();
          exhausted = false; // What a read waits for: the upload's stop, and its control, which nothing is taken from the source while paused;
          // the buffer room the reader holds meanwhile for its part, holding; and reserve, room it holds besides for the rest
          // of a stream's chunk, which the read lowers by what it uses (see streamSource()).
          readHooks = function readHooks(holding) {
            var reserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            return {
              holding: holding,
              reserve: reserve,
              signal: stopping.signal,
              whenRunning: function whenRunning() {
                return control === null || control === void 0 ? void 0 : control._whenRunning(stopping.signal);
              }
            };
          }; // The buffer credit a part of length bytes with grant needs before it is read: its own buffer, unless it is a view
          // of memory the source holds, and, for a form, the form's whole body as well, a new allocation made while that
          // buffer still holds the part's bytes (see requestFor).
          creditOf = function creditOf(grant, length) {
            var instructions = instructionsOf(grant);
            var own = viewsOnly ? 0 : length;
            if (instructions.form) {
              return own + length + formEnvelopeOf({
                fileName: fileName,
                grant: grant,
                instructions: instructions,
                length: length
              });
            }
            return own;
          }; // Reads the next length bytes, once credit, the buffer room they need, has been admitted, the upload's request
          // holding as its own any copy of its stream's chunk still to be taken (see byteBudget): none is asked for when the
          // part needs none, such as a view of the source's own copy. A part read from a stream is admitted with room besides,
          // within the budget's limit, for the rest of the last chunk it takes (see streamSource()), and gives back what that
          // read did not use. At the actual read, once room has been given, nothing is read while the upload is paused, the
          // room given back while it waits, or once it has failed. Resolves with { bytes, credit, ownBytes }, ownBytes the
          // length of the buffer of the part's own the bytes were read into, or 0 for a view of the source's memory; bytes
          // null at the source's end, the credit then given back; or null once the upload has failed.
          takeBytes = /*#__PURE__*/function () {
            var _ref43 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee10(length, credit) {
              var reserve, _source$held, reading, bytes, _t6;
              return _regenerator.default.wrap(function (_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    reserve = credit > 0 && typeof source.reserveFor === 'function' ? Math.min(source.reserveFor(length), Math.max(0, scope.buffers.limit - credit)) : 0;
                    if (!(credit + reserve > 0)) {
                      _context10.next = 1;
                      break;
                    }
                    _context10.next = 1;
                    return scope.buffers.acquire(credit + reserve, stopping.signal, (_source$held = source.held) !== null && _source$held !== void 0 ? _source$held : 0, admission);
                  case 1:
                    if (!failed) {
                      _context10.next = 2;
                      break;
                    }
                    scope.buffers.release(credit + reserve);
                    return _context10.abrupt("return", null);
                  case 2:
                    if (!(control !== null && control !== void 0 && control.paused)) {
                      _context10.next = 4;
                      break;
                    }
                    scope.buffers.release(credit + reserve);
                    // eslint-disable-next-line no-await-in-loop
                    _context10.next = 3;
                    return control._whenRunning(stopping.signal);
                  case 3:
                    _context10.next = 10;
                    break;
                  case 4:
                    reading = readHooks(credit, reserve);
                    bytes = void 0;
                    _context10.prev = 5;
                    _context10.next = 6;
                    return source.read(length, reading);
                  case 6:
                    bytes = _context10.sent;
                    _context10.next = 8;
                    break;
                  case 7:
                    _context10.prev = 7;
                    _t6 = _context10["catch"](5);
                    scope.buffers.release(credit + reading.reserve);
                    throw _t6;
                  case 8:
                    // What of the reserve the read did not use is given back; what it used is the source's copy's own.
                    scope.buffers.release(reading.reserve);
                    if (!(bytes === null)) {
                      _context10.next = 9;
                      break;
                    }
                    scope.buffers.release(credit);
                    return _context10.abrupt("return", {
                      bytes: null,
                      credit: 0,
                      ownBytes: 0
                    });
                  case 9:
                    return _context10.abrupt("return", {
                      bytes: bytes,
                      credit: credit,
                      ownBytes: viewsOnly ? 0 : length
                    });
                  case 10:
                    _context10.next = 0;
                    break;
                  case 11:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, null, [[5, 7]]);
            }));
            return function takeBytes(_x1, _x10) {
              return _ref43.apply(this, arguments);
            };
          }(); // The whole of a source of unknown size, for an upload the API asks for in one request: the whole buffer budget is
          // admitted for it, held alone, before anything is read, and the source may hold at most half of it, read in pieces
          // of no more than that in all, so that they can be joined into one body within it; a larger source, found by
          // looking ahead once that much has been read, fails the upload, and so does one whose form, made while the joined
          // bytes are held (see requestFor), would need more than the budget. Its credit becomes the part's only once it is
          // returned, the rest given back; on any failure, all of it is given back, once.
          takeWhole = /*#__PURE__*/function () {
            var _ref44 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee11(grant) {
              var limit, most, credit, _source$held2, pieces, total, ended, piece, bytes, offset, needed;
              return _regenerator.default.wrap(function (_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    limit = scope.buffers.limit;
                    most = Math.floor(limit / 2);
                    credit = 0;
                    _context11.prev = 1;
                    _context11.next = 2;
                    return scope.buffers.acquire(limit, stopping.signal, (_source$held2 = source.held) !== null && _source$held2 !== void 0 ? _source$held2 : 0, admission);
                  case 2:
                    credit = limit;
                    if (!failed) {
                      _context11.next = 3;
                      break;
                    }
                    return _context11.abrupt("return", null);
                  case 3:
                    pieces = [];
                    total = 0;
                    ended = false;
                  case 4:
                    if (ended) {
                      _context11.next = 10;
                      break;
                    }
                    if (!(total === most)) {
                      _context11.next = 7;
                      break;
                    }
                    _context11.next = 5;
                    return source.atEnd(readHooks(credit));
                  case 5:
                    if (_context11.sent) {
                      _context11.next = 6;
                      break;
                    }
                    throw uploadError("The upload grant asks for the whole file in one request, and its source, of unknown size, holds more than the ".concat(most, " bytes, half the buffer budget, that the upload can hold for it: give the upload's size"));
                  case 6:
                    ended = true;
                    _context11.next = 9;
                    break;
                  case 7:
                    _context11.next = 8;
                    return source.read(Math.min(MIB, most - total), readHooks(credit));
                  case 8:
                    piece = _context11.sent;
                    if (piece === null) {
                      ended = true;
                    } else {
                      total += piece.length;
                      pieces.push(piece);
                    }
                  case 9:
                    _context11.next = 4;
                    break;
                  case 10:
                    bytes = new Uint8Array(total);
                    offset = 0;
                    pieces.forEach(function (piece) {
                      bytes.set(piece, offset);
                      offset += piece.length;
                    });
                    needed = creditOf(grant, total);
                    if (!(needed > credit)) {
                      _context11.next = 11;
                      break;
                    }
                    throw uploadError("The upload grant asks for the whole file in one request, as a form, which with the source's ".concat(total, " bytes needs ").concat(needed, " bytes, more than the buffer budget of ").concat(limit, ": give the upload's size"));
                  case 11:
                    scope.buffers.release(credit - needed);
                    credit = 0;
                    return _context11.abrupt("return", {
                      bytes: bytes,
                      credit: needed,
                      ownBytes: total
                    });
                  case 12:
                    _context11.prev = 12;
                    if (credit > 0) {
                      scope.buffers.release(credit);
                    }
                    return _context11.finish(12);
                  case 13:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, null, [[1,, 12, 13]]);
            }));
            return function takeWhole(_x11) {
              return _ref44.apply(this, arguments);
            };
          }(); // The length of part number, with its grant: the plan's, the grant's, or all that is left of a whole-file upload
          // (null when its size is unknown).
          lengthOf = function lengthOf(number, grant) {
            if (plan.mode === 'whole') {
              return size;
            }
            if (plan.mode === 'local') {
              return Math.min(plan.partSize, size - readState.offset);
            }
            if (!(grant.partSize > 0)) {
              throw uploadError("The upload grant for part ".concat(number, " gives no part size"));
            }
            readState.latestPartSize = grant.partSize;
            return size === null ? grant.partSize : Math.min(grant.partSize, size - readState.offset);
          };
          waitForReader = function waitForReader() {
            return new Promise(function (resolve) {
              wakeReader = resolve;
            });
          }; // Whether the source has no byte left, for a part after the first of an upload of unknown size, found before its
          // grant is asked for, with the reader's own hooks: nothing is taken from the source while paused.
          sourceEnded = /*#__PURE__*/function () {
            var _ref45 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee12() {
              return _regenerator.default.wrap(function (_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    return _context12.abrupt("return", typeof source.atEnd === 'function' ? source.atEnd(readHooks(0)) : false);
                  case 1:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return function sourceEnded() {
              return _ref45.apply(this, arguments);
            };
          }();
          _context14.prev = 10;
          _loop = /*#__PURE__*/_regenerator.default.mark(function _loop() {
            var number, grant, length, taken, _taken$bytes, bytes, work, _t7, _t8, _t9;
            return _regenerator.default.wrap(function (_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 1;
                  return control === null || control === void 0 ? void 0 : control._whenRunning(stopping.signal);
                case 1:
                  if (!(!failed && ready >= Math.max(1, controllerNow().target))) {
                    _context13.next = 3;
                    break;
                  }
                  _context13.next = 2;
                  return waitForReader();
                case 2:
                  _context13.next = 1;
                  break;
                case 3:
                  number = readState.partNumber + 1; // eslint-disable-next-line no-await-in-loop
                  _t7 = failed;
                  if (_t7) {
                    _context13.next = 6;
                    break;
                  }
                  _t8 = size === null && number > 1 && plan.mode !== 'whole';
                  if (!_t8) {
                    _context13.next = 5;
                    break;
                  }
                  _context13.next = 4;
                  return sourceEnded();
                case 4:
                  _t8 = _context13.sent;
                case 5:
                  _t7 = _t8;
                case 6:
                  if (!_t7) {
                    _context13.next = 7;
                    break;
                  }
                  exhausted = true;
                  _context13.next = 16;
                  break;
                case 7:
                  _context13.next = 8;
                  return grantFor(number);
                case 8:
                  grant = _context13.sent;
                  length = lengthOf(number, grant); // eslint-disable-next-line no-await-in-loop
                  if (!(length === null)) {
                    _context13.next = 10;
                    break;
                  }
                  _context13.next = 9;
                  return takeWhole(grant);
                case 9:
                  _t9 = _context13.sent;
                  _context13.next = 12;
                  break;
                case 10:
                  _context13.next = 11;
                  return takeBytes(length, creditOf(grant, length));
                case 11:
                  _t9 = _context13.sent;
                case 12:
                  taken = _t9;
                  if (!(taken === null)) {
                    _context13.next = 13;
                    break;
                  }
                  exhausted = true;
                  _context13.next = 16;
                  break;
                case 13:
                  bytes = (_taken$bytes = taken.bytes) !== null && _taken$bytes !== void 0 ? _taken$bytes : new Uint8Array(0);
                  if (!(bytes.length === 0 && number > 1)) {
                    _context13.next = 14;
                    break;
                  }
                  scope.buffers.release(taken.credit);
                  exhausted = true;
                  _context13.next = 16;
                  break;
                case 14:
                  if (!(size !== null && length !== null && bytes.length < length)) {
                    _context13.next = 15;
                    break;
                  }
                  scope.buffers.release(taken.credit);
                  throw uploadError("The upload source ended after ".concat(readState.offset + bytes.length, " bytes, before its size of ").concat(size));
                case 15:
                  readState.partNumber = number;
                  parts.push({
                    bytes: bytes,
                    credit: taken.credit,
                    etag: undefined,
                    length: bytes.length,
                    number: number,
                    offset: readState.offset,
                    own: taken.ownBytes > 0 ? bytes : null,
                    ownBytes: taken.ownBytes,
                    readyLeft: false,
                    replayWithdrawn: false,
                    request: null,
                    sends: 0,
                    stored: false,
                    turnTaken: false
                  });
                  readState.offset += bytes.length;
                  ready += 1;
                  work = sendPart(number).catch(fail).finally(function () {
                    var part = parts[number - 1];
                    leaveReady(number);
                    scope.buffers.release(part.credit);
                    part.credit = 0;
                    part.bytes = null;
                    part.own = null;
                    part.request = null;
                    running.delete(work);
                  });
                  running.add(work);
                  if (size !== null) {
                    exhausted = readState.offset >= size;
                  } else {
                    exhausted = plan.mode === 'whole' || bytes.length < length;
                  }
                case 16:
                case "end":
                  return _context13.stop();
              }
            }, _loop);
          });
        case 11:
          if (!(!failed && !exhausted)) {
            _context14.next = 13;
            break;
          }
          return _context14.delegateYield(_loop(), "t0", 12);
        case 12:
          _context14.next = 11;
          break;
        case 13:
          if (!(!failed && size !== null)) {
            _context14.next = 18;
            break;
          }
          if (!(typeof source.atEnd === 'function')) {
            _context14.next = 15;
            break;
          }
          _context14.next = 14;
          return source.atEnd(readHooks(0));
        case 14:
          _t0 = _context14.sent;
          _context14.next = 17;
          break;
        case 15:
          _context14.next = 16;
          return source.read(1, readHooks(0));
        case 16:
          _t1 = _context14.sent;
          _t0 = _t1 === null;
        case 17:
          ended = _t0;
          if (ended) {
            _context14.next = 18;
            break;
          }
          throw uploadError("The upload source has more bytes than its size of ".concat(size));
        case 18:
          _context14.next = 20;
          break;
        case 19:
          _context14.prev = 19;
          _t10 = _context14["catch"](10);
          fail(_t10);
        case 20:
          if (!(running.size > 0)) {
            _context14.next = 22;
            break;
          }
          _context14.next = 21;
          return Promise.all((0, _toConsumableArray2.default)(running));
        case 21:
          _context14.next = 20;
          break;
        case 22:
          // Grants asked for ahead are no longer needed: whatever request is still under way is stopped and settled.
          prefetching.abort();
          _context14.next = 23;
          return (_batch = batch) === null || _batch === void 0 ? void 0 : _batch.done;
        case 23:
          if (!failed) {
            _context14.next = 24;
            break;
          }
          progress.finish('failed');
          throw firstFailure;
        case 24:
          withEtags = parts.filter(function (part) {
            return isNonEmptyString(part.etag);
          });
          if (!(withEtags.length > 0 && withEtags.length < parts.length)) {
            _context14.next = 25;
            break;
          }
          throw uploadError('Storage gave an ETag for some parts of the upload but not others, so it cannot be completed');
        case 25:
          completionParams = _objectSpread(_objectSpread(_objectSpread({}, Object.fromEntries(Object.entries(params).filter(function (_ref46) {
            var _ref47 = (0, _slicedToArray2.default)(_ref46, 1),
              name = _ref47[0];
            return !OWN_PARAMETERS.includes(name) && (!BEGIN_PARAMETERS.includes(name) || SHARED_PARAMETERS.includes(name));
          }))), {}, {
            action: 'end'
          }, withEtags.length > 0 ? {
            etags: parts.map(function (part) {
              return {
                etag: part.etag,
                part: part.number
              };
            })
          } : {}), {}, {
            ref: ref,
            size: readState.offset
          });
          _context14.prev = 26;
          _context14.next = 27;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(destinationPath)), 'POST', completionParams, _Api.default._withUnambiguousRetries(options));
        case 27:
          completed = _context14.sent;
          _context14.next = 29;
          break;
        case 28:
          _context14.prev = 28;
          _t11 = _context14["catch"](26);
          // A completion that failed without a definite refusal may have completed the upload: it is not sent again, and
          // the error says so.
          if (!(signal !== null && signal !== void 0 && signal.aborted && Object.is(_t11, (0, _Transfer.abortReason)(signal))) && (0, _typeof2.default)(_t11) === 'object' && _t11 !== null) {
            status = _t11.code;
            _t11.completionUnknown = !(status >= 400 && status < 500 && status !== 429);
          }
          progress.finish('failed');
          throw _t11;
        case 29:
          progress.finish('completed');
          return _context14.abrupt("return", hooks.makeFile(completed.data, options));
        case 30:
          _context14.prev = 30;
          _t12 = _context14["catch"](1);
          fail(_t12);
          (_progress = progress) === null || _progress === void 0 || _progress.finish('failed');
          prefetching.abort();
          _context14.next = 31;
          return (_batch2 = batch) === null || _batch2 === void 0 ? void 0 : _batch2.done;
        case 31:
          throw firstFailure;
        case 32:
          _context14.prev = 32;
          // Whatever the outcome, every admission the upload holds is given back, and its source closed, which gives back
          // what it holds (see the sources): a failure to close it cannot change the outcome, nor keep the file's admission
          // from being released.
          signal === null || signal === void 0 || signal.removeEventListener('abort', onCallerAbort);
          _context14.prev = 33;
          _context14.next = 34;
          return (_source = source) === null || _source === void 0 ? void 0 : _source.close();
        case 34:
          _context14.next = 36;
          break;
        case 35:
          _context14.prev = 35;
          _t13 = _context14["catch"](33);
        case 36:
          if (fileAdmitted) {
            scope.files.release();
          }
          return _context14.finish(32);
        case 37:
        case "end":
          return _context14.stop();
      }
    }, _callee13, null, [[1, 30, 32, 37], [10, 19], [26, 28], [33, 35]]);
  }));
  return function uploadSource(_x6) {
    return _ref36.apply(this, arguments);
  };
}();