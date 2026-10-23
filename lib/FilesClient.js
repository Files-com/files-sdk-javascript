"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _FilesClient;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var settings = new WeakMap();
var resources = new WeakMap();

// Gives a client its settings, frozen with a frozen copy of their headers, and no resources yet.
var bind = function bind(client, clientSettings) {
  settings.set(client, Object.freeze(_objectSpread(_objectSpread({}, clientSettings), {}, {
    headers: Object.freeze(_objectSpread({}, clientSettings.headers))
  })));
  resources.set(client, {});
  return client;
};

// A call's options as a client's resource passes them on: a copy of the caller's own, headers included, taken when the
// call begins and made with the client. Changing the caller's object later changes neither the call nor the models it
// returns, and the options never change the client's own settings.
var withClient = function withClient(client) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread({}, options), {}, {
    client: client,
    headers: _objectSpread({}, options.headers)
  });
};

// A client's resource, made the first time it is used.
var resource = function resource(client, name, makeResource) {
  var made = resources.get(client);
  if (!made[name]) {
    made[name] = makeResource();
  }
  return made[name];
};

/**
 * Files.com settings of its own, logging included, independent of the global settings of Files and of every other
 * client, with the API's resources bound to them: client.users.list() is User.list() made with this client's settings.
 * Models that a client's call returns keep the client and the call's options, so their own methods use them too. Create
 * one with new FilesClient(config), or Files.createClient(config), which is the same.
 */
var FilesClient = /*#__PURE__*/function () {
  // The SDK's declared defaults, with config's settings and headers copied over them, as Files._clientSettings() checks
  // and makes them. Files imports this module, so it is read when a client is made.
  function FilesClient() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, FilesClient);
    bind(this, require('./Files').default._clientSettings(config));
  }

  // Not public: a client with exactly these settings, which are not a config, so they are neither checked nor merged
  // with the defaults (see Files._currentSettings()). It is made without the constructor: a client has no fields of its
  // own to set up.
  return (0, _createClass2.default)(FilesClient, [{
    key: "getApiKey",
    value: function getApiKey() {
      return settings.get(this).apiKey;
    }
  }, {
    key: "getAutoPaginate",
    value: function getAutoPaginate() {
      return settings.get(this).autoPaginate;
    }
  }, {
    key: "getBaseUrl",
    value: function getBaseUrl() {
      return settings.get(this).baseUrl;
    }
  }, {
    key: "getFetch",
    value: function getFetch() {
      return settings.get(this).fetch;
    }
  }, {
    key: "getFollowRegionMismatch",
    value: function getFollowRegionMismatch() {
      return settings.get(this).followRegionMismatch;
    }
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      return settings.get(this).headers;
    }
  }, {
    key: "getLanguage",
    value: function getLanguage() {
      return settings.get(this).language;
    }
  }, {
    key: "getLogger",
    value: function getLogger() {
      return settings.get(this).logger;
    }
  }, {
    key: "getLogLevel",
    value: function getLogLevel() {
      return settings.get(this).logLevel;
    }
  }, {
    key: "getMaxNetworkRetries",
    value: function getMaxNetworkRetries() {
      return settings.get(this).maxNetworkRetries;
    }
  }, {
    key: "getMaxNetworkRetryDelay",
    value: function getMaxNetworkRetryDelay() {
      return settings.get(this).maxNetworkRetryDelay;
    }
  }, {
    key: "getMinNetworkRetryDelay",
    value: function getMinNetworkRetryDelay() {
      return settings.get(this).minNetworkRetryDelay;
    }
  }, {
    key: "getNetworkTimeout",
    value: function getNetworkTimeout() {
      return settings.get(this).networkTimeout;
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return settings.get(this).sessionId;
    }
  }, {
    key: "getTrustRegionHost",
    value: function getTrustRegionHost() {
      return settings.get(this).trustRegionHost;
    }
  }, {
    key: "getUserAgent",
    value: function getUserAgent() {
      return settings.get(this).userAgent;
    }
  }, {
    key: "getWorkspaceId",
    value: function getWorkspaceId() {
      return settings.get(this).workspaceId;
    }
  }, {
    key: "shouldDebugRequest",
    value: function shouldDebugRequest() {
      return settings.get(this).debugRequest;
    }
  }, {
    key: "shouldDebugResponseHeaders",
    value: function shouldDebugResponseHeaders() {
      return settings.get(this).debugResponseHeaders;
    }

    // Not public: how the client's agent settings choose the agent of a request from its URL, its getAgentForUrl and then
    // its agent, or undefined when it has neither. A call's own agent options come first (see Api._sendVerbatim).
  }, {
    key: "_agentChooser",
    value: function _agentChooser() {
      var _settings$get = settings.get(this),
        agent = _settings$get.agent,
        getAgentForUrl = _settings$get.getAgentForUrl;
      return agent || getAgentForUrl ? function (url) {
        return (getAgentForUrl === null || getAgentForUrl === void 0 ? void 0 : getAgentForUrl(url)) || agent;
      } : undefined;
    }

    // Not public: moves the client's site to origin, the trusted HTTPS origin a lockout region mismatch named for a request
    // sent to the client's site with its own API key or session, in its own workspace (see Api._sendVerbatim). This is the
    // only change ever made to a client's settings, and it changes no other client.
  }, {
    key: "_useRegionOrigin",
    value: function _useRegionOrigin(origin) {
      settings.set(this, Object.freeze(_objectSpread(_objectSpread({}, settings.get(this)), {}, {
        baseUrl: origin
      })));
    }

    // The client's Files.com filesystem, with Node.js's fs/promises conventions over its paths (see Filesystem.js): file
    // handles that read and write remote files, and directories that list them, with the client's settings. Node.js only.
  }, {
    key: "fs",
    get: function get() {
      var _this = this;
      return resource(this, 'fs', function () {
        return require('./Filesystem.js').default(_this);
      });
    }
  }, {
    key: "actionLogs",
    get: function get() {
      var _this2 = this;
      return resource(this, 'actionLogs', function () {
        var ActionLog = require('./models/ActionLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionLog.all(params, withClient(_this2, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionLog.list(params, withClient(_this2, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionLog.listIterator(params, withClient(_this2, options));
          }
        };
      });
    }
  }, {
    key: "actionNotificationExportResults",
    get: function get() {
      var _this3 = this;
      return resource(this, 'actionNotificationExportResults', function () {
        var ActionNotificationExportResult = require('./models/ActionNotificationExportResult.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionNotificationExportResult.all(params, withClient(_this3, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionNotificationExportResult.list(params, withClient(_this3, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionNotificationExportResult.listIterator(params, withClient(_this3, options));
          }
        };
      });
    }
  }, {
    key: "actionNotificationExports",
    get: function get() {
      var _this4 = this;
      return resource(this, 'actionNotificationExports', function () {
        var ActionNotificationExport = require('./models/ActionNotificationExport.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ActionNotificationExport.create(params, withClient(_this4, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ActionNotificationExport.find(id, params, withClient(_this4, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ActionNotificationExport.get(id, params, withClient(_this4, options));
          }
        };
      });
    }
  }, {
    key: "aiAssistantPersonalities",
    get: function get() {
      var _this5 = this;
      return resource(this, 'aiAssistantPersonalities', function () {
        var AiAssistantPersonality = require('./models/AiAssistantPersonality.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiAssistantPersonality.all(params, withClient(_this5, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiAssistantPersonality.create(params, withClient(_this5, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AiAssistantPersonality.find(id, params, withClient(_this5, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AiAssistantPersonality.get(id, params, withClient(_this5, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiAssistantPersonality.list(params, withClient(_this5, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiAssistantPersonality.listIterator(params, withClient(_this5, options));
          }
        };
      });
    }
  }, {
    key: "aiTasks",
    get: function get() {
      var _this6 = this;
      return resource(this, 'aiTasks', function () {
        var AiTask = require('./models/AiTask.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiTask.all(params, withClient(_this6, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiTask.create(params, withClient(_this6, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AiTask.find(id, params, withClient(_this6, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AiTask.get(id, params, withClient(_this6, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiTask.list(params, withClient(_this6, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AiTask.listIterator(params, withClient(_this6, options));
          }
        };
      });
    }
  }, {
    key: "apiKeys",
    get: function get() {
      var _this7 = this;
      return resource(this, 'apiKeys', function () {
        var ApiKey = require('./models/ApiKey.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiKey.all(params, withClient(_this7, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiKey.create(params, withClient(_this7, options));
          },
          deleteCurrent: function deleteCurrent() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return ApiKey.deleteCurrent(withClient(_this7, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ApiKey.find(id, params, withClient(_this7, options));
          },
          findCurrent: function findCurrent() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return ApiKey.findCurrent(withClient(_this7, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ApiKey.get(id, params, withClient(_this7, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiKey.list(params, withClient(_this7, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiKey.listIterator(params, withClient(_this7, options));
          },
          updateCurrent: function updateCurrent() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiKey.updateCurrent(params, withClient(_this7, options));
          }
        };
      });
    }
  }, {
    key: "apiRequestLogs",
    get: function get() {
      var _this8 = this;
      return resource(this, 'apiRequestLogs', function () {
        var ApiRequestLog = require('./models/ApiRequestLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiRequestLog.all(params, withClient(_this8, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiRequestLog.list(params, withClient(_this8, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ApiRequestLog.listIterator(params, withClient(_this8, options));
          }
        };
      });
    }
  }, {
    key: "apps",
    get: function get() {
      var _this9 = this;
      return resource(this, 'apps', function () {
        var App = require('./models/App.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return App.all(params, withClient(_this9, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return App.list(params, withClient(_this9, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return App.listIterator(params, withClient(_this9, options));
          }
        };
      });
    }
  }, {
    key: "as2IncomingMessages",
    get: function get() {
      var _this0 = this;
      return resource(this, 'as2IncomingMessages', function () {
        var As2IncomingMessage = require('./models/As2IncomingMessage.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2IncomingMessage.all(params, withClient(_this0, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2IncomingMessage.list(params, withClient(_this0, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2IncomingMessage.listIterator(params, withClient(_this0, options));
          }
        };
      });
    }
  }, {
    key: "as2OutgoingMessages",
    get: function get() {
      var _this1 = this;
      return resource(this, 'as2OutgoingMessages', function () {
        var As2OutgoingMessage = require('./models/As2OutgoingMessage.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2OutgoingMessage.all(params, withClient(_this1, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2OutgoingMessage.list(params, withClient(_this1, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2OutgoingMessage.listIterator(params, withClient(_this1, options));
          }
        };
      });
    }
  }, {
    key: "as2Partners",
    get: function get() {
      var _this10 = this;
      return resource(this, 'as2Partners', function () {
        var As2Partner = require('./models/As2Partner.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Partner.all(params, withClient(_this10, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Partner.create(params, withClient(_this10, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return As2Partner.find(id, params, withClient(_this10, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return As2Partner.get(id, params, withClient(_this10, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Partner.list(params, withClient(_this10, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Partner.listIterator(params, withClient(_this10, options));
          }
        };
      });
    }
  }, {
    key: "as2Stations",
    get: function get() {
      var _this11 = this;
      return resource(this, 'as2Stations', function () {
        var As2Station = require('./models/As2Station.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Station.all(params, withClient(_this11, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Station.create(params, withClient(_this11, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return As2Station.find(id, params, withClient(_this11, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return As2Station.get(id, params, withClient(_this11, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Station.list(params, withClient(_this11, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return As2Station.listIterator(params, withClient(_this11, options));
          }
        };
      });
    }
  }, {
    key: "automationLogs",
    get: function get() {
      var _this12 = this;
      return resource(this, 'automationLogs', function () {
        var AutomationLog = require('./models/AutomationLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationLog.all(params, withClient(_this12, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationLog.list(params, withClient(_this12, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationLog.listIterator(params, withClient(_this12, options));
          }
        };
      });
    }
  }, {
    key: "automationRuns",
    get: function get() {
      var _this13 = this;
      return resource(this, 'automationRuns', function () {
        var AutomationRun = require('./models/AutomationRun.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationRun.all(params, withClient(_this13, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AutomationRun.find(id, params, withClient(_this13, options));
          },
          findNode: function findNode(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AutomationRun.findNode(id, params, withClient(_this13, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return AutomationRun.get(id, params, withClient(_this13, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationRun.list(params, withClient(_this13, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return AutomationRun.listIterator(params, withClient(_this13, options));
          }
        };
      });
    }
  }, {
    key: "automations",
    get: function get() {
      var _this14 = this;
      return resource(this, 'automations', function () {
        var Automation = require('./models/Automation.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Automation.all(params, withClient(_this14, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Automation.create(params, withClient(_this14, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Automation.find(id, params, withClient(_this14, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Automation.get(id, params, withClient(_this14, options));
          },
          getAuthoringSchema: function getAuthoringSchema() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return Automation.getAuthoringSchema(withClient(_this14, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Automation.list(params, withClient(_this14, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Automation.listIterator(params, withClient(_this14, options));
          }
        };
      });
    }
  }, {
    key: "bandwidthSnapshots",
    get: function get() {
      var _this15 = this;
      return resource(this, 'bandwidthSnapshots', function () {
        var BandwidthSnapshot = require('./models/BandwidthSnapshot.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BandwidthSnapshot.all(params, withClient(_this15, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BandwidthSnapshot.list(params, withClient(_this15, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BandwidthSnapshot.listIterator(params, withClient(_this15, options));
          }
        };
      });
    }
  }, {
    key: "behaviors",
    get: function get() {
      var _this16 = this;
      return resource(this, 'behaviors', function () {
        var Behavior = require('./models/Behavior.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Behavior.all(params, withClient(_this16, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Behavior.create(params, withClient(_this16, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Behavior.find(id, params, withClient(_this16, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Behavior.get(id, params, withClient(_this16, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Behavior.list(params, withClient(_this16, options));
          },
          listFor: function listFor(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Behavior.listFor(path, params, withClient(_this16, options));
          },
          listForIterator: function listForIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Behavior.listForIterator(path, params, withClient(_this16, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Behavior.listIterator(params, withClient(_this16, options));
          },
          webhookTest: function webhookTest() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Behavior.webhookTest(params, withClient(_this16, options));
          }
        };
      });
    }
  }, {
    key: "bundleActions",
    get: function get() {
      var _this17 = this;
      return resource(this, 'bundleActions', function () {
        var BundleAction = require('./models/BundleAction.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleAction.all(params, withClient(_this17, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleAction.list(params, withClient(_this17, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleAction.listIterator(params, withClient(_this17, options));
          }
        };
      });
    }
  }, {
    key: "bundleDownloads",
    get: function get() {
      var _this18 = this;
      return resource(this, 'bundleDownloads', function () {
        var BundleDownload = require('./models/BundleDownload.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleDownload.all(params, withClient(_this18, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleDownload.list(params, withClient(_this18, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleDownload.listIterator(params, withClient(_this18, options));
          }
        };
      });
    }
  }, {
    key: "bundleNotifications",
    get: function get() {
      var _this19 = this;
      return resource(this, 'bundleNotifications', function () {
        var BundleNotification = require('./models/BundleNotification.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleNotification.all(params, withClient(_this19, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleNotification.create(params, withClient(_this19, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return BundleNotification.find(id, params, withClient(_this19, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return BundleNotification.get(id, params, withClient(_this19, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleNotification.list(params, withClient(_this19, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleNotification.listIterator(params, withClient(_this19, options));
          }
        };
      });
    }
  }, {
    key: "bundleRecipients",
    get: function get() {
      var _this20 = this;
      return resource(this, 'bundleRecipients', function () {
        var BundleRecipient = require('./models/BundleRecipient.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRecipient.all(params, withClient(_this20, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRecipient.create(params, withClient(_this20, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRecipient.list(params, withClient(_this20, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRecipient.listIterator(params, withClient(_this20, options));
          }
        };
      });
    }
  }, {
    key: "bundleRegistrations",
    get: function get() {
      var _this21 = this;
      return resource(this, 'bundleRegistrations', function () {
        var BundleRegistration = require('./models/BundleRegistration.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRegistration.all(params, withClient(_this21, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRegistration.list(params, withClient(_this21, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return BundleRegistration.listIterator(params, withClient(_this21, options));
          }
        };
      });
    }
  }, {
    key: "bundles",
    get: function get() {
      var _this22 = this;
      return resource(this, 'bundles', function () {
        var Bundle = require('./models/Bundle.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Bundle.all(params, withClient(_this22, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Bundle.create(params, withClient(_this22, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Bundle.find(id, params, withClient(_this22, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Bundle.get(id, params, withClient(_this22, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Bundle.list(params, withClient(_this22, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Bundle.listIterator(params, withClient(_this22, options));
          }
        };
      });
    }
  }, {
    key: "chatSessions",
    get: function get() {
      var _this23 = this;
      return resource(this, 'chatSessions', function () {
        var ChatSession = require('./models/ChatSession.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChatSession.all(params, withClient(_this23, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ChatSession.find(id, params, withClient(_this23, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ChatSession.get(id, params, withClient(_this23, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChatSession.list(params, withClient(_this23, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChatSession.listIterator(params, withClient(_this23, options));
          }
        };
      });
    }
  }, {
    key: "childSiteManagementPolicies",
    get: function get() {
      var _this24 = this;
      return resource(this, 'childSiteManagementPolicies', function () {
        var ChildSiteManagementPolicy = require('./models/ChildSiteManagementPolicy.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChildSiteManagementPolicy.all(params, withClient(_this24, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChildSiteManagementPolicy.create(params, withClient(_this24, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ChildSiteManagementPolicy.find(id, params, withClient(_this24, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ChildSiteManagementPolicy.get(id, params, withClient(_this24, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChildSiteManagementPolicy.list(params, withClient(_this24, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ChildSiteManagementPolicy.listIterator(params, withClient(_this24, options));
          }
        };
      });
    }
  }, {
    key: "clickwraps",
    get: function get() {
      var _this25 = this;
      return resource(this, 'clickwraps', function () {
        var Clickwrap = require('./models/Clickwrap.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Clickwrap.all(params, withClient(_this25, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Clickwrap.create(params, withClient(_this25, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Clickwrap.find(id, params, withClient(_this25, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Clickwrap.get(id, params, withClient(_this25, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Clickwrap.list(params, withClient(_this25, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Clickwrap.listIterator(params, withClient(_this25, options));
          }
        };
      });
    }
  }, {
    key: "customDomains",
    get: function get() {
      var _this26 = this;
      return resource(this, 'customDomains', function () {
        var CustomDomain = require('./models/CustomDomain.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return CustomDomain.all(params, withClient(_this26, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return CustomDomain.create(params, withClient(_this26, options));
          },
          createAllocateIp: function createAllocateIp(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return CustomDomain.createAllocateIp(id, params, withClient(_this26, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return CustomDomain.find(id, params, withClient(_this26, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return CustomDomain.get(id, params, withClient(_this26, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return CustomDomain.list(params, withClient(_this26, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return CustomDomain.listIterator(params, withClient(_this26, options));
          }
        };
      });
    }
  }, {
    key: "desktopConfigurationProfiles",
    get: function get() {
      var _this27 = this;
      return resource(this, 'desktopConfigurationProfiles', function () {
        var DesktopConfigurationProfile = require('./models/DesktopConfigurationProfile.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DesktopConfigurationProfile.all(params, withClient(_this27, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DesktopConfigurationProfile.create(params, withClient(_this27, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return DesktopConfigurationProfile.find(id, params, withClient(_this27, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return DesktopConfigurationProfile.get(id, params, withClient(_this27, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DesktopConfigurationProfile.list(params, withClient(_this27, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DesktopConfigurationProfile.listIterator(params, withClient(_this27, options));
          }
        };
      });
    }
  }, {
    key: "dnsRecords",
    get: function get() {
      var _this28 = this;
      return resource(this, 'dnsRecords', function () {
        var DnsRecord = require('./models/DnsRecord.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DnsRecord.all(params, withClient(_this28, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DnsRecord.list(params, withClient(_this28, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return DnsRecord.listIterator(params, withClient(_this28, options));
          }
        };
      });
    }
  }, {
    key: "emailIncomingMessages",
    get: function get() {
      var _this29 = this;
      return resource(this, 'emailIncomingMessages', function () {
        var EmailIncomingMessage = require('./models/EmailIncomingMessage.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailIncomingMessage.all(params, withClient(_this29, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailIncomingMessage.list(params, withClient(_this29, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailIncomingMessage.listIterator(params, withClient(_this29, options));
          }
        };
      });
    }
  }, {
    key: "emailLogs",
    get: function get() {
      var _this30 = this;
      return resource(this, 'emailLogs', function () {
        var EmailLog = require('./models/EmailLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailLog.all(params, withClient(_this30, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailLog.list(params, withClient(_this30, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EmailLog.listIterator(params, withClient(_this30, options));
          }
        };
      });
    }
  }, {
    key: "eventChannels",
    get: function get() {
      var _this31 = this;
      return resource(this, 'eventChannels', function () {
        var EventChannel = require('./models/EventChannel.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventChannel.all(params, withClient(_this31, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventChannel.create(params, withClient(_this31, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventChannel.find(id, params, withClient(_this31, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventChannel.get(id, params, withClient(_this31, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventChannel.list(params, withClient(_this31, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventChannel.listIterator(params, withClient(_this31, options));
          }
        };
      });
    }
  }, {
    key: "eventDeliveryAttempts",
    get: function get() {
      var _this32 = this;
      return resource(this, 'eventDeliveryAttempts', function () {
        var EventDeliveryAttempt = require('./models/EventDeliveryAttempt.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventDeliveryAttempt.all(params, withClient(_this32, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventDeliveryAttempt.find(id, params, withClient(_this32, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventDeliveryAttempt.get(id, params, withClient(_this32, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventDeliveryAttempt.list(params, withClient(_this32, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventDeliveryAttempt.listIterator(params, withClient(_this32, options));
          }
        };
      });
    }
  }, {
    key: "eventRecords",
    get: function get() {
      var _this33 = this;
      return resource(this, 'eventRecords', function () {
        var EventRecord = require('./models/EventRecord.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventRecord.all(params, withClient(_this33, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventRecord.find(id, params, withClient(_this33, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventRecord.get(id, params, withClient(_this33, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventRecord.list(params, withClient(_this33, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventRecord.listIterator(params, withClient(_this33, options));
          }
        };
      });
    }
  }, {
    key: "eventSubscriptions",
    get: function get() {
      var _this34 = this;
      return resource(this, 'eventSubscriptions', function () {
        var EventSubscription = require('./models/EventSubscription.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventSubscription.all(params, withClient(_this34, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventSubscription.create(params, withClient(_this34, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventSubscription.find(id, params, withClient(_this34, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventSubscription.get(id, params, withClient(_this34, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventSubscription.list(params, withClient(_this34, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventSubscription.listIterator(params, withClient(_this34, options));
          }
        };
      });
    }
  }, {
    key: "eventTargets",
    get: function get() {
      var _this35 = this;
      return resource(this, 'eventTargets', function () {
        var EventTarget = require('./models/EventTarget.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventTarget.all(params, withClient(_this35, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventTarget.create(params, withClient(_this35, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventTarget.find(id, params, withClient(_this35, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return EventTarget.get(id, params, withClient(_this35, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventTarget.list(params, withClient(_this35, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return EventTarget.listIterator(params, withClient(_this35, options));
          }
        };
      });
    }
  }, {
    key: "exavaultApiRequestLogs",
    get: function get() {
      var _this36 = this;
      return resource(this, 'exavaultApiRequestLogs', function () {
        var ExavaultApiRequestLog = require('./models/ExavaultApiRequestLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExavaultApiRequestLog.all(params, withClient(_this36, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExavaultApiRequestLog.list(params, withClient(_this36, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExavaultApiRequestLog.listIterator(params, withClient(_this36, options));
          }
        };
      });
    }
  }, {
    key: "expectationEvaluations",
    get: function get() {
      var _this37 = this;
      return resource(this, 'expectationEvaluations', function () {
        var ExpectationEvaluation = require('./models/ExpectationEvaluation.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationEvaluation.all(params, withClient(_this37, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExpectationEvaluation.find(id, params, withClient(_this37, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExpectationEvaluation.get(id, params, withClient(_this37, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationEvaluation.list(params, withClient(_this37, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationEvaluation.listIterator(params, withClient(_this37, options));
          }
        };
      });
    }
  }, {
    key: "expectationIncidents",
    get: function get() {
      var _this38 = this;
      return resource(this, 'expectationIncidents', function () {
        var ExpectationIncident = require('./models/ExpectationIncident.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationIncident.all(params, withClient(_this38, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExpectationIncident.find(id, params, withClient(_this38, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExpectationIncident.get(id, params, withClient(_this38, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationIncident.list(params, withClient(_this38, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExpectationIncident.listIterator(params, withClient(_this38, options));
          }
        };
      });
    }
  }, {
    key: "expectations",
    get: function get() {
      var _this39 = this;
      return resource(this, 'expectations', function () {
        var Expectation = require('./models/Expectation.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Expectation.all(params, withClient(_this39, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Expectation.create(params, withClient(_this39, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Expectation.find(id, params, withClient(_this39, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Expectation.get(id, params, withClient(_this39, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Expectation.list(params, withClient(_this39, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Expectation.listIterator(params, withClient(_this39, options));
          }
        };
      });
    }
  }, {
    key: "externalEvents",
    get: function get() {
      var _this40 = this;
      return resource(this, 'externalEvents', function () {
        var ExternalEvent = require('./models/ExternalEvent.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExternalEvent.all(params, withClient(_this40, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExternalEvent.create(params, withClient(_this40, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExternalEvent.find(id, params, withClient(_this40, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ExternalEvent.get(id, params, withClient(_this40, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExternalEvent.list(params, withClient(_this40, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ExternalEvent.listIterator(params, withClient(_this40, options));
          }
        };
      });
    }
  }, {
    key: "fileCommentReactions",
    get: function get() {
      var _this41 = this;
      return resource(this, 'fileCommentReactions', function () {
        var FileCommentReaction = require('./models/FileCommentReaction.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FileCommentReaction.create(params, withClient(_this41, options));
          }
        };
      });
    }
  }, {
    key: "fileComments",
    get: function get() {
      var _this42 = this;
      return resource(this, 'fileComments', function () {
        var FileComment = require('./models/FileComment.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FileComment.create(params, withClient(_this42, options));
          },
          listFor: function listFor(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FileComment.listFor(path, params, withClient(_this42, options));
          },
          listForIterator: function listForIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FileComment.listForIterator(path, params, withClient(_this42, options));
          }
        };
      });
    }
  }, {
    key: "fileMigrationLogs",
    get: function get() {
      var _this43 = this;
      return resource(this, 'fileMigrationLogs', function () {
        var FileMigrationLog = require('./models/FileMigrationLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FileMigrationLog.all(params, withClient(_this43, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FileMigrationLog.list(params, withClient(_this43, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FileMigrationLog.listIterator(params, withClient(_this43, options));
          }
        };
      });
    }
  }, {
    key: "fileMigrations",
    get: function get() {
      var _this44 = this;
      return resource(this, 'fileMigrations', function () {
        var FileMigration = require('./models/FileMigration.js').default;
        return {
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FileMigration.find(id, params, withClient(_this44, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FileMigration.get(id, params, withClient(_this44, options));
          }
        };
      });
    }
  }, {
    key: "files",
    get: function get() {
      var _this45 = this;
      return resource(this, 'files', function () {
        var File = require('./models/File.js').default;
        return {
          copyToChildSite: function copyToChildSite(path, siteId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.copyToChildSite(path, siteId, destinationPath, params, withClient(_this45, options));
          },
          copyToRemoteServer: function copyToRemoteServer(path, remoteServerId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.copyToRemoteServer(path, remoteServerId, destinationPath, params, withClient(_this45, options));
          },
          copyToSnapshot: function copyToSnapshot(path, snapshotId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.copyToSnapshot(path, snapshotId, destinationPath, params, withClient(_this45, options));
          },
          create: function create(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return File.create(path, params, withClient(_this45, options));
          },
          downloadDirectory: function downloadDirectory(path, destinationDirectoryPath) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return File.downloadDirectory(path, destinationDirectoryPath, withClient(_this45, options));
          },
          find: function find(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return File.find(path, params, withClient(_this45, options));
          },
          get: function get(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return File.get(path, params, withClient(_this45, options));
          },
          moveToChildSite: function moveToChildSite(path, siteId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.moveToChildSite(path, siteId, destinationPath, params, withClient(_this45, options));
          },
          moveToRemoteServer: function moveToRemoteServer(path, remoteServerId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.moveToRemoteServer(path, remoteServerId, destinationPath, params, withClient(_this45, options));
          },
          moveToSnapshot: function moveToSnapshot(path, snapshotId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.moveToSnapshot(path, snapshotId, destinationPath, params, withClient(_this45, options));
          },
          upload: function upload(sourceFilePath, destinationPath) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.upload(sourceFilePath, destinationPath, params, withClient(_this45, options));
          },
          uploadData: function uploadData(destinationPath, data) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.uploadData(destinationPath, data, params, withClient(_this45, options));
          },
          uploadDirectory: function uploadDirectory(sourceDirectoryPath, destinationPath) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return File.uploadDirectory(sourceDirectoryPath, destinationPath, withClient(_this45, options));
          },
          uploadFile: function uploadFile(destinationPath, sourceFilePath) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.uploadFile(destinationPath, sourceFilePath, params, withClient(_this45, options));
          },
          uploadFileToChildSite: function uploadFileToChildSite(sourceFilePath, siteId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadFileToChildSite(sourceFilePath, siteId, destinationPath, params, withClient(_this45, options));
          },
          uploadFileToRemoteServer: function uploadFileToRemoteServer(sourceFilePath, remoteServerId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadFileToRemoteServer(sourceFilePath, remoteServerId, destinationPath, params, withClient(_this45, options));
          },
          uploadFileToSnapshot: function uploadFileToSnapshot(sourceFilePath, snapshotId, destinationPath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadFileToSnapshot(sourceFilePath, snapshotId, destinationPath, params, withClient(_this45, options));
          },
          uploadFromData: function uploadFromData(data, destinationPath) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.uploadFromData(data, destinationPath, params, withClient(_this45, options));
          },
          uploadFromStream: function uploadFromStream(readableStream, destinationPath) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.uploadFromStream(readableStream, destinationPath, params, withClient(_this45, options));
          },
          uploadStream: function uploadStream(destinationPath, readableStream) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return File.uploadStream(destinationPath, readableStream, params, withClient(_this45, options));
          },
          uploadToChildSite: function uploadToChildSite(siteId, destinationPath, sourceFilePath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadToChildSite(siteId, destinationPath, sourceFilePath, params, withClient(_this45, options));
          },
          uploadToRemoteServer: function uploadToRemoteServer(remoteServerId, destinationPath, sourceFilePath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadToRemoteServer(remoteServerId, destinationPath, sourceFilePath, params, withClient(_this45, options));
          },
          uploadToSnapshot: function uploadToSnapshot(snapshotId, destinationPath, sourceFilePath) {
            var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            return File.uploadToSnapshot(snapshotId, destinationPath, sourceFilePath, params, withClient(_this45, options));
          },
          zip: function zip() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return File.zip(params, withClient(_this45, options));
          }
        };
      });
    }
  }, {
    key: "folders",
    get: function get() {
      var _this46 = this;
      return resource(this, 'folders', function () {
        var Folder = require('./models/Folder.js').default;
        return {
          create: function create(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Folder.create(path, params, withClient(_this46, options));
          },
          listFor: function listFor(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Folder.listFor(path, params, withClient(_this46, options));
          },
          listForIterator: function listForIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Folder.listForIterator(path, params, withClient(_this46, options));
          }
        };
      });
    }
  }, {
    key: "formFieldSets",
    get: function get() {
      var _this47 = this;
      return resource(this, 'formFieldSets', function () {
        var FormFieldSet = require('./models/FormFieldSet.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FormFieldSet.all(params, withClient(_this47, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FormFieldSet.create(params, withClient(_this47, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FormFieldSet.find(id, params, withClient(_this47, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return FormFieldSet.get(id, params, withClient(_this47, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FormFieldSet.list(params, withClient(_this47, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FormFieldSet.listIterator(params, withClient(_this47, options));
          }
        };
      });
    }
  }, {
    key: "ftpActionLogs",
    get: function get() {
      var _this48 = this;
      return resource(this, 'ftpActionLogs', function () {
        var FtpActionLog = require('./models/FtpActionLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FtpActionLog.all(params, withClient(_this48, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FtpActionLog.list(params, withClient(_this48, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FtpActionLog.listIterator(params, withClient(_this48, options));
          }
        };
      });
    }
  }, {
    key: "gpgKeys",
    get: function get() {
      var _this49 = this;
      return resource(this, 'gpgKeys', function () {
        var GpgKey = require('./models/GpgKey.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GpgKey.all(params, withClient(_this49, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GpgKey.create(params, withClient(_this49, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return GpgKey.find(id, params, withClient(_this49, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return GpgKey.get(id, params, withClient(_this49, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GpgKey.list(params, withClient(_this49, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GpgKey.listIterator(params, withClient(_this49, options));
          }
        };
      });
    }
  }, {
    key: "groupUsers",
    get: function get() {
      var _this50 = this;
      return resource(this, 'groupUsers', function () {
        var GroupUser = require('./models/GroupUser.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GroupUser.all(params, withClient(_this50, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GroupUser.create(params, withClient(_this50, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GroupUser.list(params, withClient(_this50, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return GroupUser.listIterator(params, withClient(_this50, options));
          }
        };
      });
    }
  }, {
    key: "groups",
    get: function get() {
      var _this51 = this;
      return resource(this, 'groups', function () {
        var Group = require('./models/Group.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Group.all(params, withClient(_this51, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Group.create(params, withClient(_this51, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Group.find(id, params, withClient(_this51, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Group.get(id, params, withClient(_this51, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Group.list(params, withClient(_this51, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Group.listIterator(params, withClient(_this51, options));
          }
        };
      });
    }
  }, {
    key: "histories",
    get: function get() {
      var _this52 = this;
      return resource(this, 'histories', function () {
        var History = require('./models/History.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return History.all(params, withClient(_this52, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return History.list(params, withClient(_this52, options));
          },
          listForFile: function listForFile(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForFile(path, params, withClient(_this52, options));
          },
          listForFileIterator: function listForFileIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForFileIterator(path, params, withClient(_this52, options));
          },
          listForFolder: function listForFolder(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForFolder(path, params, withClient(_this52, options));
          },
          listForFolderIterator: function listForFolderIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForFolderIterator(path, params, withClient(_this52, options));
          },
          listForUser: function listForUser(userId) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForUser(userId, params, withClient(_this52, options));
          },
          listForUserIterator: function listForUserIterator(userId) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return History.listForUserIterator(userId, params, withClient(_this52, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return History.listIterator(params, withClient(_this52, options));
          },
          listLogins: function listLogins() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return History.listLogins(params, withClient(_this52, options));
          },
          listLoginsIterator: function listLoginsIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return History.listLoginsIterator(params, withClient(_this52, options));
          }
        };
      });
    }
  }, {
    key: "historyExportResults",
    get: function get() {
      var _this53 = this;
      return resource(this, 'historyExportResults', function () {
        var HistoryExportResult = require('./models/HistoryExportResult.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HistoryExportResult.all(params, withClient(_this53, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HistoryExportResult.list(params, withClient(_this53, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HistoryExportResult.listIterator(params, withClient(_this53, options));
          }
        };
      });
    }
  }, {
    key: "historyExports",
    get: function get() {
      var _this54 = this;
      return resource(this, 'historyExports', function () {
        var HistoryExport = require('./models/HistoryExport.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HistoryExport.create(params, withClient(_this54, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return HistoryExport.find(id, params, withClient(_this54, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return HistoryExport.get(id, params, withClient(_this54, options));
          }
        };
      });
    }
  }, {
    key: "holidayCalendars",
    get: function get() {
      var _this55 = this;
      return resource(this, 'holidayCalendars', function () {
        var HolidayCalendar = require('./models/HolidayCalendar.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayCalendar.all(params, withClient(_this55, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayCalendar.create(params, withClient(_this55, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return HolidayCalendar.find(id, params, withClient(_this55, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return HolidayCalendar.get(id, params, withClient(_this55, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayCalendar.list(params, withClient(_this55, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayCalendar.listIterator(params, withClient(_this55, options));
          }
        };
      });
    }
  }, {
    key: "holidayRegions",
    get: function get() {
      var _this56 = this;
      return resource(this, 'holidayRegions', function () {
        var HolidayRegion = require('./models/HolidayRegion.js').default;
        return {
          getSupported: function getSupported() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayRegion.getSupported(params, withClient(_this56, options));
          },
          getSupportedIterator: function getSupportedIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return HolidayRegion.getSupportedIterator(params, withClient(_this56, options));
          }
        };
      });
    }
  }, {
    key: "inboundS3Logs",
    get: function get() {
      var _this57 = this;
      return resource(this, 'inboundS3Logs', function () {
        var InboundS3Log = require('./models/InboundS3Log.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboundS3Log.all(params, withClient(_this57, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboundS3Log.list(params, withClient(_this57, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboundS3Log.listIterator(params, withClient(_this57, options));
          }
        };
      });
    }
  }, {
    key: "inboxRecipients",
    get: function get() {
      var _this58 = this;
      return resource(this, 'inboxRecipients', function () {
        var InboxRecipient = require('./models/InboxRecipient.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRecipient.all(params, withClient(_this58, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRecipient.create(params, withClient(_this58, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRecipient.list(params, withClient(_this58, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRecipient.listIterator(params, withClient(_this58, options));
          }
        };
      });
    }
  }, {
    key: "inboxRegistrations",
    get: function get() {
      var _this59 = this;
      return resource(this, 'inboxRegistrations', function () {
        var InboxRegistration = require('./models/InboxRegistration.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRegistration.all(params, withClient(_this59, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRegistration.list(params, withClient(_this59, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxRegistration.listIterator(params, withClient(_this59, options));
          }
        };
      });
    }
  }, {
    key: "inboxUploads",
    get: function get() {
      var _this60 = this;
      return resource(this, 'inboxUploads', function () {
        var InboxUpload = require('./models/InboxUpload.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxUpload.all(params, withClient(_this60, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxUpload.list(params, withClient(_this60, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return InboxUpload.listIterator(params, withClient(_this60, options));
          }
        };
      });
    }
  }, {
    key: "integrationCentricProfiles",
    get: function get() {
      var _this61 = this;
      return resource(this, 'integrationCentricProfiles', function () {
        var IntegrationCentricProfile = require('./models/IntegrationCentricProfile.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IntegrationCentricProfile.all(params, withClient(_this61, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IntegrationCentricProfile.create(params, withClient(_this61, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return IntegrationCentricProfile.find(id, params, withClient(_this61, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return IntegrationCentricProfile.get(id, params, withClient(_this61, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IntegrationCentricProfile.list(params, withClient(_this61, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IntegrationCentricProfile.listIterator(params, withClient(_this61, options));
          }
        };
      });
    }
  }, {
    key: "invoices",
    get: function get() {
      var _this62 = this;
      return resource(this, 'invoices', function () {
        var Invoice = require('./models/Invoice.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Invoice.all(params, withClient(_this62, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Invoice.find(id, params, withClient(_this62, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Invoice.get(id, params, withClient(_this62, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Invoice.list(params, withClient(_this62, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Invoice.listIterator(params, withClient(_this62, options));
          }
        };
      });
    }
  }, {
    key: "ipAddresses",
    get: function get() {
      var _this63 = this;
      return resource(this, 'ipAddresses', function () {
        var IpAddress = require('./models/IpAddress.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.all(params, withClient(_this63, options));
          },
          getExavaultReserved: function getExavaultReserved() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getExavaultReserved(params, withClient(_this63, options));
          },
          getExavaultReservedIterator: function getExavaultReservedIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getExavaultReservedIterator(params, withClient(_this63, options));
          },
          getReserved: function getReserved() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getReserved(params, withClient(_this63, options));
          },
          getReservedIterator: function getReservedIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getReservedIterator(params, withClient(_this63, options));
          },
          getSmartfileReserved: function getSmartfileReserved() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getSmartfileReserved(params, withClient(_this63, options));
          },
          getSmartfileReservedIterator: function getSmartfileReservedIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.getSmartfileReservedIterator(params, withClient(_this63, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.list(params, withClient(_this63, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return IpAddress.listIterator(params, withClient(_this63, options));
          }
        };
      });
    }
  }, {
    key: "keyLifecycleRules",
    get: function get() {
      var _this64 = this;
      return resource(this, 'keyLifecycleRules', function () {
        var KeyLifecycleRule = require('./models/KeyLifecycleRule.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return KeyLifecycleRule.all(params, withClient(_this64, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return KeyLifecycleRule.create(params, withClient(_this64, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return KeyLifecycleRule.find(id, params, withClient(_this64, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return KeyLifecycleRule.get(id, params, withClient(_this64, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return KeyLifecycleRule.list(params, withClient(_this64, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return KeyLifecycleRule.listIterator(params, withClient(_this64, options));
          }
        };
      });
    }
  }, {
    key: "locks",
    get: function get() {
      var _this65 = this;
      return resource(this, 'locks', function () {
        var Lock = require('./models/Lock.js').default;
        return {
          create: function create(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Lock.create(path, params, withClient(_this65, options));
          },
          listFor: function listFor(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Lock.listFor(path, params, withClient(_this65, options));
          },
          listForIterator: function listForIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Lock.listForIterator(path, params, withClient(_this65, options));
          }
        };
      });
    }
  }, {
    key: "metadataCategories",
    get: function get() {
      var _this66 = this;
      return resource(this, 'metadataCategories', function () {
        var MetadataCategory = require('./models/MetadataCategory.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return MetadataCategory.all(params, withClient(_this66, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return MetadataCategory.create(params, withClient(_this66, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return MetadataCategory.find(id, params, withClient(_this66, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return MetadataCategory.get(id, params, withClient(_this66, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return MetadataCategory.list(params, withClient(_this66, options));
          },
          listFor: function listFor(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return MetadataCategory.listFor(path, params, withClient(_this66, options));
          },
          listForIterator: function listForIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return MetadataCategory.listForIterator(path, params, withClient(_this66, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return MetadataCategory.listIterator(params, withClient(_this66, options));
          }
        };
      });
    }
  }, {
    key: "notifications",
    get: function get() {
      var _this67 = this;
      return resource(this, 'notifications', function () {
        var Notification = require('./models/Notification.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Notification.all(params, withClient(_this67, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Notification.create(params, withClient(_this67, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Notification.find(id, params, withClient(_this67, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Notification.get(id, params, withClient(_this67, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Notification.list(params, withClient(_this67, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Notification.listIterator(params, withClient(_this67, options));
          }
        };
      });
    }
  }, {
    key: "outboundConnectionLogs",
    get: function get() {
      var _this68 = this;
      return resource(this, 'outboundConnectionLogs', function () {
        var OutboundConnectionLog = require('./models/OutboundConnectionLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return OutboundConnectionLog.all(params, withClient(_this68, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return OutboundConnectionLog.list(params, withClient(_this68, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return OutboundConnectionLog.listIterator(params, withClient(_this68, options));
          }
        };
      });
    }
  }, {
    key: "partnerChannelTemplates",
    get: function get() {
      var _this69 = this;
      return resource(this, 'partnerChannelTemplates', function () {
        var PartnerChannelTemplate = require('./models/PartnerChannelTemplate.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannelTemplate.all(params, withClient(_this69, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannelTemplate.create(params, withClient(_this69, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PartnerChannelTemplate.find(id, params, withClient(_this69, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PartnerChannelTemplate.get(id, params, withClient(_this69, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannelTemplate.list(params, withClient(_this69, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannelTemplate.listIterator(params, withClient(_this69, options));
          }
        };
      });
    }
  }, {
    key: "partnerChannels",
    get: function get() {
      var _this70 = this;
      return resource(this, 'partnerChannels', function () {
        var PartnerChannel = require('./models/PartnerChannel.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannel.all(params, withClient(_this70, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannel.create(params, withClient(_this70, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PartnerChannel.find(id, params, withClient(_this70, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PartnerChannel.get(id, params, withClient(_this70, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannel.list(params, withClient(_this70, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerChannel.listIterator(params, withClient(_this70, options));
          }
        };
      });
    }
  }, {
    key: "partnerSiteRequests",
    get: function get() {
      var _this71 = this;
      return resource(this, 'partnerSiteRequests', function () {
        var PartnerSiteRequest = require('./models/PartnerSiteRequest.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.all(params, withClient(_this71, options));
          },
          approve: function approve() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.approve(params, withClient(_this71, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.create(params, withClient(_this71, options));
          },
          findByPairingKey: function findByPairingKey() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.findByPairingKey(params, withClient(_this71, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.list(params, withClient(_this71, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.listIterator(params, withClient(_this71, options));
          },
          reject: function reject() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PartnerSiteRequest.reject(params, withClient(_this71, options));
          }
        };
      });
    }
  }, {
    key: "partners",
    get: function get() {
      var _this72 = this;
      return resource(this, 'partners', function () {
        var Partner = require('./models/Partner.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Partner.all(params, withClient(_this72, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Partner.create(params, withClient(_this72, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Partner.find(id, params, withClient(_this72, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Partner.get(id, params, withClient(_this72, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Partner.list(params, withClient(_this72, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Partner.listIterator(params, withClient(_this72, options));
          }
        };
      });
    }
  }, {
    key: "payments",
    get: function get() {
      var _this73 = this;
      return resource(this, 'payments', function () {
        var Payment = require('./models/Payment.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Payment.all(params, withClient(_this73, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Payment.find(id, params, withClient(_this73, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Payment.get(id, params, withClient(_this73, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Payment.list(params, withClient(_this73, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Payment.listIterator(params, withClient(_this73, options));
          }
        };
      });
    }
  }, {
    key: "pendingWorkEvents",
    get: function get() {
      var _this74 = this;
      return resource(this, 'pendingWorkEvents', function () {
        var PendingWorkEvent = require('./models/PendingWorkEvent.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PendingWorkEvent.all(params, withClient(_this74, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PendingWorkEvent.find(id, params, withClient(_this74, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PendingWorkEvent.get(id, params, withClient(_this74, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PendingWorkEvent.list(params, withClient(_this74, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PendingWorkEvent.listIterator(params, withClient(_this74, options));
          }
        };
      });
    }
  }, {
    key: "permissions",
    get: function get() {
      var _this75 = this;
      return resource(this, 'permissions', function () {
        var Permission = require('./models/Permission.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Permission.all(params, withClient(_this75, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Permission.create(params, withClient(_this75, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Permission.list(params, withClient(_this75, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Permission.listIterator(params, withClient(_this75, options));
          }
        };
      });
    }
  }, {
    key: "publicHostingRequestLogs",
    get: function get() {
      var _this76 = this;
      return resource(this, 'publicHostingRequestLogs', function () {
        var PublicHostingRequestLog = require('./models/PublicHostingRequestLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicHostingRequestLog.all(params, withClient(_this76, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicHostingRequestLog.list(params, withClient(_this76, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicHostingRequestLog.listIterator(params, withClient(_this76, options));
          }
        };
      });
    }
  }, {
    key: "publicKeys",
    get: function get() {
      var _this77 = this;
      return resource(this, 'publicKeys', function () {
        var PublicKey = require('./models/PublicKey.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicKey.all(params, withClient(_this77, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicKey.create(params, withClient(_this77, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PublicKey.find(id, params, withClient(_this77, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return PublicKey.get(id, params, withClient(_this77, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicKey.list(params, withClient(_this77, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return PublicKey.listIterator(params, withClient(_this77, options));
          }
        };
      });
    }
  }, {
    key: "remoteBandwidthSnapshots",
    get: function get() {
      var _this78 = this;
      return resource(this, 'remoteBandwidthSnapshots', function () {
        var RemoteBandwidthSnapshot = require('./models/RemoteBandwidthSnapshot.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteBandwidthSnapshot.all(params, withClient(_this78, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteBandwidthSnapshot.list(params, withClient(_this78, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteBandwidthSnapshot.listIterator(params, withClient(_this78, options));
          }
        };
      });
    }
  }, {
    key: "remoteMountBackends",
    get: function get() {
      var _this79 = this;
      return resource(this, 'remoteMountBackends', function () {
        var RemoteMountBackend = require('./models/RemoteMountBackend.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteMountBackend.all(params, withClient(_this79, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteMountBackend.create(params, withClient(_this79, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteMountBackend.find(id, params, withClient(_this79, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteMountBackend.get(id, params, withClient(_this79, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteMountBackend.list(params, withClient(_this79, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteMountBackend.listIterator(params, withClient(_this79, options));
          }
        };
      });
    }
  }, {
    key: "remoteServerCredentials",
    get: function get() {
      var _this80 = this;
      return resource(this, 'remoteServerCredentials', function () {
        var RemoteServerCredential = require('./models/RemoteServerCredential.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServerCredential.all(params, withClient(_this80, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServerCredential.create(params, withClient(_this80, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteServerCredential.find(id, params, withClient(_this80, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteServerCredential.get(id, params, withClient(_this80, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServerCredential.list(params, withClient(_this80, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServerCredential.listIterator(params, withClient(_this80, options));
          }
        };
      });
    }
  }, {
    key: "remoteServers",
    get: function get() {
      var _this81 = this;
      return resource(this, 'remoteServers', function () {
        var RemoteServer = require('./models/RemoteServer.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServer.all(params, withClient(_this81, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServer.create(params, withClient(_this81, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteServer.find(id, params, withClient(_this81, options));
          },
          findConfigurationFile: function findConfigurationFile(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteServer.findConfigurationFile(id, params, withClient(_this81, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return RemoteServer.get(id, params, withClient(_this81, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServer.list(params, withClient(_this81, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return RemoteServer.listIterator(params, withClient(_this81, options));
          }
        };
      });
    }
  }, {
    key: "requests",
    get: function get() {
      var _this82 = this;
      return resource(this, 'requests', function () {
        var Request = require('./models/Request.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Request.all(params, withClient(_this82, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Request.create(params, withClient(_this82, options));
          },
          getFolder: function getFolder(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Request.getFolder(path, params, withClient(_this82, options));
          },
          getFolderIterator: function getFolderIterator(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Request.getFolderIterator(path, params, withClient(_this82, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Request.list(params, withClient(_this82, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Request.listIterator(params, withClient(_this82, options));
          }
        };
      });
    }
  }, {
    key: "restores",
    get: function get() {
      var _this83 = this;
      return resource(this, 'restores', function () {
        var Restore = require('./models/Restore.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Restore.all(params, withClient(_this83, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Restore.create(params, withClient(_this83, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Restore.list(params, withClient(_this83, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Restore.listIterator(params, withClient(_this83, options));
          }
        };
      });
    }
  }, {
    key: "scheduledExports",
    get: function get() {
      var _this84 = this;
      return resource(this, 'scheduledExports', function () {
        var ScheduledExport = require('./models/ScheduledExport.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScheduledExport.all(params, withClient(_this84, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScheduledExport.create(params, withClient(_this84, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ScheduledExport.find(id, params, withClient(_this84, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ScheduledExport.get(id, params, withClient(_this84, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScheduledExport.list(params, withClient(_this84, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScheduledExport.listIterator(params, withClient(_this84, options));
          }
        };
      });
    }
  }, {
    key: "schedules",
    get: function get() {
      var _this85 = this;
      return resource(this, 'schedules', function () {
        var Schedule = require('./models/Schedule.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Schedule.all(params, withClient(_this85, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Schedule.create(params, withClient(_this85, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Schedule.find(id, params, withClient(_this85, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Schedule.get(id, params, withClient(_this85, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Schedule.list(params, withClient(_this85, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Schedule.listIterator(params, withClient(_this85, options));
          }
        };
      });
    }
  }, {
    key: "scimLogs",
    get: function get() {
      var _this86 = this;
      return resource(this, 'scimLogs', function () {
        var ScimLog = require('./models/ScimLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScimLog.all(params, withClient(_this86, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ScimLog.find(id, params, withClient(_this86, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ScimLog.get(id, params, withClient(_this86, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScimLog.list(params, withClient(_this86, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ScimLog.listIterator(params, withClient(_this86, options));
          }
        };
      });
    }
  }, {
    key: "secrets",
    get: function get() {
      var _this87 = this;
      return resource(this, 'secrets', function () {
        var Secret = require('./models/Secret.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Secret.all(params, withClient(_this87, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Secret.create(params, withClient(_this87, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Secret.find(id, params, withClient(_this87, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Secret.get(id, params, withClient(_this87, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Secret.list(params, withClient(_this87, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Secret.listIterator(params, withClient(_this87, options));
          }
        };
      });
    }
  }, {
    key: "sessions",
    get: function get() {
      var _this88 = this;
      return resource(this, 'sessions', function () {
        var Session = require('./models/Session.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Session.create(params, withClient(_this88, options));
          },
          delete: function _delete() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return Session.delete(withClient(_this88, options));
          },
          destroy: function destroy() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Session.destroy(params, withClient(_this88, options));
          }
        };
      });
    }
  }, {
    key: "settingsChanges",
    get: function get() {
      var _this89 = this;
      return resource(this, 'settingsChanges', function () {
        var SettingsChange = require('./models/SettingsChange.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SettingsChange.all(params, withClient(_this89, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SettingsChange.list(params, withClient(_this89, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SettingsChange.listIterator(params, withClient(_this89, options));
          }
        };
      });
    }
  }, {
    key: "sftpActionLogs",
    get: function get() {
      var _this90 = this;
      return resource(this, 'sftpActionLogs', function () {
        var SftpActionLog = require('./models/SftpActionLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpActionLog.all(params, withClient(_this90, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpActionLog.list(params, withClient(_this90, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpActionLog.listIterator(params, withClient(_this90, options));
          }
        };
      });
    }
  }, {
    key: "sftpHostKeys",
    get: function get() {
      var _this91 = this;
      return resource(this, 'sftpHostKeys', function () {
        var SftpHostKey = require('./models/SftpHostKey.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpHostKey.all(params, withClient(_this91, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpHostKey.create(params, withClient(_this91, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SftpHostKey.find(id, params, withClient(_this91, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SftpHostKey.get(id, params, withClient(_this91, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpHostKey.list(params, withClient(_this91, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SftpHostKey.listIterator(params, withClient(_this91, options));
          }
        };
      });
    }
  }, {
    key: "shareGroups",
    get: function get() {
      var _this92 = this;
      return resource(this, 'shareGroups', function () {
        var ShareGroup = require('./models/ShareGroup.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ShareGroup.all(params, withClient(_this92, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ShareGroup.create(params, withClient(_this92, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ShareGroup.find(id, params, withClient(_this92, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return ShareGroup.get(id, params, withClient(_this92, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ShareGroup.list(params, withClient(_this92, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return ShareGroup.listIterator(params, withClient(_this92, options));
          }
        };
      });
    }
  }, {
    key: "siemHttpDestinationEvents",
    get: function get() {
      var _this93 = this;
      return resource(this, 'siemHttpDestinationEvents', function () {
        var SiemHttpDestinationEvent = require('./models/SiemHttpDestinationEvent.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestinationEvent.all(params, withClient(_this93, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiemHttpDestinationEvent.find(id, params, withClient(_this93, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiemHttpDestinationEvent.get(id, params, withClient(_this93, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestinationEvent.list(params, withClient(_this93, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestinationEvent.listIterator(params, withClient(_this93, options));
          }
        };
      });
    }
  }, {
    key: "siemHttpDestinations",
    get: function get() {
      var _this94 = this;
      return resource(this, 'siemHttpDestinations', function () {
        var SiemHttpDestination = require('./models/SiemHttpDestination.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestination.all(params, withClient(_this94, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestination.create(params, withClient(_this94, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiemHttpDestination.find(id, params, withClient(_this94, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiemHttpDestination.get(id, params, withClient(_this94, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestination.list(params, withClient(_this94, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestination.listIterator(params, withClient(_this94, options));
          },
          sendTestEntry: function sendTestEntry() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiemHttpDestination.sendTestEntry(params, withClient(_this94, options));
          }
        };
      });
    }
  }, {
    key: "siteSubdomainRedirects",
    get: function get() {
      var _this95 = this;
      return resource(this, 'siteSubdomainRedirects', function () {
        var SiteSubdomainRedirect = require('./models/SiteSubdomainRedirect.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiteSubdomainRedirect.all(params, withClient(_this95, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiteSubdomainRedirect.find(id, params, withClient(_this95, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SiteSubdomainRedirect.get(id, params, withClient(_this95, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiteSubdomainRedirect.list(params, withClient(_this95, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SiteSubdomainRedirect.listIterator(params, withClient(_this95, options));
          }
        };
      });
    }
  }, {
    key: "sites",
    get: function get() {
      var _this96 = this;
      return resource(this, 'sites', function () {
        var Site = require('./models/Site.js').default;
        return {
          get: function get() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return Site.get(withClient(_this96, options));
          },
          getUsage: function getUsage() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return Site.getUsage(withClient(_this96, options));
          },
          update: function update() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Site.update(params, withClient(_this96, options));
          }
        };
      });
    }
  }, {
    key: "snapshots",
    get: function get() {
      var _this97 = this;
      return resource(this, 'snapshots', function () {
        var Snapshot = require('./models/Snapshot.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Snapshot.all(params, withClient(_this97, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Snapshot.create(params, withClient(_this97, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Snapshot.find(id, params, withClient(_this97, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Snapshot.get(id, params, withClient(_this97, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Snapshot.list(params, withClient(_this97, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Snapshot.listIterator(params, withClient(_this97, options));
          }
        };
      });
    }
  }, {
    key: "ssoEvents",
    get: function get() {
      var _this98 = this;
      return resource(this, 'ssoEvents', function () {
        var SsoEvent = require('./models/SsoEvent.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoEvent.all(params, withClient(_this98, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SsoEvent.find(id, params, withClient(_this98, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SsoEvent.get(id, params, withClient(_this98, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoEvent.list(params, withClient(_this98, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoEvent.listIterator(params, withClient(_this98, options));
          }
        };
      });
    }
  }, {
    key: "ssoStrategies",
    get: function get() {
      var _this99 = this;
      return resource(this, 'ssoStrategies', function () {
        var SsoStrategy = require('./models/SsoStrategy.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoStrategy.all(params, withClient(_this99, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SsoStrategy.find(id, params, withClient(_this99, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SsoStrategy.get(id, params, withClient(_this99, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoStrategy.list(params, withClient(_this99, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SsoStrategy.listIterator(params, withClient(_this99, options));
          }
        };
      });
    }
  }, {
    key: "styles",
    get: function get() {
      var _this100 = this;
      return resource(this, 'styles', function () {
        var Style = require('./models/Style.js').default;
        return {
          find: function find(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Style.find(path, params, withClient(_this100, options));
          },
          get: function get(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Style.get(path, params, withClient(_this100, options));
          }
        };
      });
    }
  }, {
    key: "syncLogs",
    get: function get() {
      var _this101 = this;
      return resource(this, 'syncLogs', function () {
        var SyncLog = require('./models/SyncLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncLog.all(params, withClient(_this101, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncLog.list(params, withClient(_this101, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncLog.listIterator(params, withClient(_this101, options));
          }
        };
      });
    }
  }, {
    key: "syncRuns",
    get: function get() {
      var _this102 = this;
      return resource(this, 'syncRuns', function () {
        var SyncRun = require('./models/SyncRun.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncRun.all(params, withClient(_this102, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SyncRun.find(id, params, withClient(_this102, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return SyncRun.get(id, params, withClient(_this102, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncRun.list(params, withClient(_this102, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return SyncRun.listIterator(params, withClient(_this102, options));
          }
        };
      });
    }
  }, {
    key: "syncs",
    get: function get() {
      var _this103 = this;
      return resource(this, 'syncs', function () {
        var Sync = require('./models/Sync.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Sync.all(params, withClient(_this103, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Sync.create(params, withClient(_this103, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Sync.find(id, params, withClient(_this103, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Sync.get(id, params, withClient(_this103, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Sync.list(params, withClient(_this103, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Sync.listIterator(params, withClient(_this103, options));
          }
        };
      });
    }
  }, {
    key: "usageDailySnapshots",
    get: function get() {
      var _this104 = this;
      return resource(this, 'usageDailySnapshots', function () {
        var UsageDailySnapshot = require('./models/UsageDailySnapshot.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageDailySnapshot.all(params, withClient(_this104, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageDailySnapshot.list(params, withClient(_this104, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageDailySnapshot.listIterator(params, withClient(_this104, options));
          }
        };
      });
    }
  }, {
    key: "usageSnapshots",
    get: function get() {
      var _this105 = this;
      return resource(this, 'usageSnapshots', function () {
        var UsageSnapshot = require('./models/UsageSnapshot.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageSnapshot.all(params, withClient(_this105, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageSnapshot.list(params, withClient(_this105, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UsageSnapshot.listIterator(params, withClient(_this105, options));
          }
        };
      });
    }
  }, {
    key: "userAdditionalEmailRecipients",
    get: function get() {
      var _this106 = this;
      return resource(this, 'userAdditionalEmailRecipients', function () {
        var UserAdditionalEmailRecipient = require('./models/UserAdditionalEmailRecipient.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserAdditionalEmailRecipient.all(params, withClient(_this106, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserAdditionalEmailRecipient.create(params, withClient(_this106, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserAdditionalEmailRecipient.find(id, params, withClient(_this106, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserAdditionalEmailRecipient.get(id, params, withClient(_this106, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserAdditionalEmailRecipient.list(params, withClient(_this106, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserAdditionalEmailRecipient.listIterator(params, withClient(_this106, options));
          }
        };
      });
    }
  }, {
    key: "userCipherUses",
    get: function get() {
      var _this107 = this;
      return resource(this, 'userCipherUses', function () {
        var UserCipherUse = require('./models/UserCipherUse.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserCipherUse.all(params, withClient(_this107, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserCipherUse.list(params, withClient(_this107, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserCipherUse.listIterator(params, withClient(_this107, options));
          }
        };
      });
    }
  }, {
    key: "userLifecycleRules",
    get: function get() {
      var _this108 = this;
      return resource(this, 'userLifecycleRules', function () {
        var UserLifecycleRule = require('./models/UserLifecycleRule.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserLifecycleRule.all(params, withClient(_this108, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserLifecycleRule.create(params, withClient(_this108, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserLifecycleRule.find(id, params, withClient(_this108, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserLifecycleRule.get(id, params, withClient(_this108, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserLifecycleRule.list(params, withClient(_this108, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserLifecycleRule.listIterator(params, withClient(_this108, options));
          }
        };
      });
    }
  }, {
    key: "userRequests",
    get: function get() {
      var _this109 = this;
      return resource(this, 'userRequests', function () {
        var UserRequest = require('./models/UserRequest.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserRequest.all(params, withClient(_this109, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserRequest.create(params, withClient(_this109, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserRequest.find(id, params, withClient(_this109, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserRequest.get(id, params, withClient(_this109, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserRequest.list(params, withClient(_this109, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserRequest.listIterator(params, withClient(_this109, options));
          }
        };
      });
    }
  }, {
    key: "userSecurityEvents",
    get: function get() {
      var _this110 = this;
      return resource(this, 'userSecurityEvents', function () {
        var UserSecurityEvent = require('./models/UserSecurityEvent.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSecurityEvent.all(params, withClient(_this110, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserSecurityEvent.find(id, params, withClient(_this110, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return UserSecurityEvent.get(id, params, withClient(_this110, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSecurityEvent.list(params, withClient(_this110, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSecurityEvent.listIterator(params, withClient(_this110, options));
          }
        };
      });
    }
  }, {
    key: "userSftpClientUses",
    get: function get() {
      var _this111 = this;
      return resource(this, 'userSftpClientUses', function () {
        var UserSftpClientUse = require('./models/UserSftpClientUse.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSftpClientUse.all(params, withClient(_this111, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSftpClientUse.list(params, withClient(_this111, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return UserSftpClientUse.listIterator(params, withClient(_this111, options));
          }
        };
      });
    }
  }, {
    key: "users",
    get: function get() {
      var _this112 = this;
      return resource(this, 'users', function () {
        var User = require('./models/User.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return User.all(params, withClient(_this112, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return User.create(params, withClient(_this112, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return User.find(id, params, withClient(_this112, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return User.get(id, params, withClient(_this112, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return User.list(params, withClient(_this112, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return User.listIterator(params, withClient(_this112, options));
          }
        };
      });
    }
  }, {
    key: "webDavActionLogs",
    get: function get() {
      var _this113 = this;
      return resource(this, 'webDavActionLogs', function () {
        var WebDavActionLog = require('./models/WebDavActionLog.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return WebDavActionLog.all(params, withClient(_this113, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return WebDavActionLog.list(params, withClient(_this113, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return WebDavActionLog.listIterator(params, withClient(_this113, options));
          }
        };
      });
    }
  }, {
    key: "webhookTests",
    get: function get() {
      var _this114 = this;
      return resource(this, 'webhookTests', function () {
        var WebhookTest = require('./models/WebhookTest.js').default;
        return {
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return WebhookTest.create(params, withClient(_this114, options));
          }
        };
      });
    }
  }, {
    key: "workspaces",
    get: function get() {
      var _this115 = this;
      return resource(this, 'workspaces', function () {
        var Workspace = require('./models/Workspace.js').default;
        return {
          all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Workspace.all(params, withClient(_this115, options));
          },
          create: function create() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Workspace.create(params, withClient(_this115, options));
          },
          find: function find(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Workspace.find(id, params, withClient(_this115, options));
          },
          get: function get(id) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return Workspace.get(id, params, withClient(_this115, options));
          },
          list: function list() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Workspace.list(params, withClient(_this115, options));
          },
          listIterator: function listIterator() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return Workspace.listIterator(params, withClient(_this115, options));
          }
        };
      });
    }
  }]);
}();
_FilesClient = FilesClient;
(0, _defineProperty2.default)(FilesClient, "_withSettings", function (clientSettings) {
  return bind(Object.create(_FilesClient.prototype), clientSettings);
});
var _default = exports.default = FilesClient;
module.exports = FilesClient;
module.exports.default = FilesClient;