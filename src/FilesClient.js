const settings = new WeakMap()
const resources = new WeakMap()

// Gives a client its settings, frozen with a frozen copy of their headers, and no resources yet.
const bind = (client, clientSettings) => {
  settings.set(client, Object.freeze({ ...clientSettings, headers: Object.freeze({ ...clientSettings.headers }) }))
  resources.set(client, {})
  return client
}

// A call's options as a client's resource passes them on: a copy of the caller's own, headers included, taken when the
// call begins and made with the client. Changing the caller's object later changes neither the call nor the models it
// returns, and the options never change the client's own settings.
const withClient = (client, options = {}) => ({ ...options, client, headers: { ...options.headers } })

// A client's resource, made the first time it is used.
const resource = (client, name, makeResource) => {
  const made = resources.get(client)
  if (!made[name]) {
    made[name] = makeResource()
  }

  return made[name]
}

/**
 * Files.com settings of its own, logging included, independent of the global settings of Files and of every other
 * client, with the API's resources bound to them: client.users.list() is User.list() made with this client's settings.
 * Models that a client's call returns keep the client and the call's options, so their own methods use them too. Create
 * one with new FilesClient(config), or Files.createClient(config), which is the same.
 */
class FilesClient {
  // The SDK's declared defaults, with config's settings and headers copied over them, as Files._clientSettings() checks
  // and makes them. Files imports this module, so it is read when a client is made.
  constructor(config = {}) {
    bind(this, require('./Files').default._clientSettings(config))
  }

  // Not public: a client with exactly these settings, which are not a config, so they are neither checked nor merged
  // with the defaults (see Files._currentSettings()). It is made without the constructor: a client has no fields of its
  // own to set up.
  static _withSettings = clientSettings => bind(Object.create(FilesClient.prototype), clientSettings)

  getApiKey() { return settings.get(this).apiKey }

  getAutoPaginate() { return settings.get(this).autoPaginate }

  getBaseUrl() { return settings.get(this).baseUrl }

  getFetch() { return settings.get(this).fetch }

  getFollowRegionMismatch() { return settings.get(this).followRegionMismatch }

  getHeaders() { return settings.get(this).headers }

  getLanguage() { return settings.get(this).language }

  getLogger() { return settings.get(this).logger }

  getLogLevel() { return settings.get(this).logLevel }

  getMaxNetworkRetries() { return settings.get(this).maxNetworkRetries }

  getMaxNetworkRetryDelay() { return settings.get(this).maxNetworkRetryDelay }

  getMinNetworkRetryDelay() { return settings.get(this).minNetworkRetryDelay }

  getNetworkTimeout() { return settings.get(this).networkTimeout }

  getSessionId() { return settings.get(this).sessionId }

  getTrustRegionHost() { return settings.get(this).trustRegionHost }

  getUserAgent() { return settings.get(this).userAgent }

  getWorkspaceId() { return settings.get(this).workspaceId }

  shouldDebugRequest() { return settings.get(this).debugRequest }

  shouldDebugResponseHeaders() { return settings.get(this).debugResponseHeaders }

  // Not public: how the client's agent settings choose the agent of a request from its URL, its getAgentForUrl and then
  // its agent, or undefined when it has neither. A call's own agent options come first (see Api._sendVerbatim).
  _agentChooser() {
    const { agent, getAgentForUrl } = settings.get(this)
    return agent || getAgentForUrl ? url => getAgentForUrl?.(url) || agent : undefined
  }

  // Not public: moves the client's site to origin, the trusted HTTPS origin a lockout region mismatch named for a request
  // sent to the client's site with its own API key or session, in its own workspace (see Api._sendVerbatim). This is the
  // only change ever made to a client's settings, and it changes no other client.
  _useRegionOrigin(origin) {
    settings.set(this, Object.freeze({ ...settings.get(this), baseUrl: origin }))
  }

  // The client's Files.com filesystem, with Node.js's fs/promises conventions over its paths (see Filesystem.js): file
  // handles that read and write remote files, and directories that list them, with the client's settings. Node.js only.
  get fs() {
    return resource(this, 'fs', () => require('./Filesystem.js').default(this))
  }

  get actionLogs() {
    return resource(this, 'actionLogs', () => {
      const ActionLog = require('./models/ActionLog.js').default

      return {
        all: (params = {}, options = {}) =>
          ActionLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ActionLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ActionLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get actionNotificationExportResults() {
    return resource(this, 'actionNotificationExportResults', () => {
      const ActionNotificationExportResult = require('./models/ActionNotificationExportResult.js').default

      return {
        all: (params = {}, options = {}) =>
          ActionNotificationExportResult.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ActionNotificationExportResult.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ActionNotificationExportResult.listIterator(params, withClient(this, options)),
      }
    })
  }

  get actionNotificationExports() {
    return resource(this, 'actionNotificationExports', () => {
      const ActionNotificationExport = require('./models/ActionNotificationExport.js').default

      return {
        create: (params = {}, options = {}) =>
          ActionNotificationExport.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ActionNotificationExport.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ActionNotificationExport.get(id, params, withClient(this, options)),
      }
    })
  }

  get aiAssistantPersonalities() {
    return resource(this, 'aiAssistantPersonalities', () => {
      const AiAssistantPersonality = require('./models/AiAssistantPersonality.js').default

      return {
        all: (params = {}, options = {}) =>
          AiAssistantPersonality.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          AiAssistantPersonality.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          AiAssistantPersonality.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          AiAssistantPersonality.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          AiAssistantPersonality.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          AiAssistantPersonality.listIterator(params, withClient(this, options)),
      }
    })
  }

  get aiTasks() {
    return resource(this, 'aiTasks', () => {
      const AiTask = require('./models/AiTask.js').default

      return {
        all: (params = {}, options = {}) =>
          AiTask.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          AiTask.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          AiTask.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          AiTask.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          AiTask.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          AiTask.listIterator(params, withClient(this, options)),
      }
    })
  }

  get apiKeys() {
    return resource(this, 'apiKeys', () => {
      const ApiKey = require('./models/ApiKey.js').default

      return {
        all: (params = {}, options = {}) =>
          ApiKey.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          ApiKey.create(params, withClient(this, options)),
        deleteCurrent: (options = {}) =>
          ApiKey.deleteCurrent(withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ApiKey.find(id, params, withClient(this, options)),
        findCurrent: (options = {}) =>
          ApiKey.findCurrent(withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ApiKey.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ApiKey.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ApiKey.listIterator(params, withClient(this, options)),
        updateCurrent: (params = {}, options = {}) =>
          ApiKey.updateCurrent(params, withClient(this, options)),
      }
    })
  }

  get apiRequestLogs() {
    return resource(this, 'apiRequestLogs', () => {
      const ApiRequestLog = require('./models/ApiRequestLog.js').default

      return {
        all: (params = {}, options = {}) =>
          ApiRequestLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ApiRequestLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ApiRequestLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get apps() {
    return resource(this, 'apps', () => {
      const App = require('./models/App.js').default

      return {
        all: (params = {}, options = {}) =>
          App.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          App.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          App.listIterator(params, withClient(this, options)),
      }
    })
  }

  get as2IncomingMessages() {
    return resource(this, 'as2IncomingMessages', () => {
      const As2IncomingMessage = require('./models/As2IncomingMessage.js').default

      return {
        all: (params = {}, options = {}) =>
          As2IncomingMessage.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          As2IncomingMessage.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          As2IncomingMessage.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          As2IncomingMessage.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          As2IncomingMessage.listIterator(params, withClient(this, options)),
      }
    })
  }

  get as2OutgoingMessages() {
    return resource(this, 'as2OutgoingMessages', () => {
      const As2OutgoingMessage = require('./models/As2OutgoingMessage.js').default

      return {
        all: (params = {}, options = {}) =>
          As2OutgoingMessage.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          As2OutgoingMessage.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          As2OutgoingMessage.listIterator(params, withClient(this, options)),
      }
    })
  }

  get as2Partners() {
    return resource(this, 'as2Partners', () => {
      const As2Partner = require('./models/As2Partner.js').default

      return {
        all: (params = {}, options = {}) =>
          As2Partner.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          As2Partner.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          As2Partner.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          As2Partner.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          As2Partner.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          As2Partner.listIterator(params, withClient(this, options)),
      }
    })
  }

  get as2Stations() {
    return resource(this, 'as2Stations', () => {
      const As2Station = require('./models/As2Station.js').default

      return {
        all: (params = {}, options = {}) =>
          As2Station.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          As2Station.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          As2Station.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          As2Station.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          As2Station.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          As2Station.listIterator(params, withClient(this, options)),
      }
    })
  }

  get automationLogs() {
    return resource(this, 'automationLogs', () => {
      const AutomationLog = require('./models/AutomationLog.js').default

      return {
        all: (params = {}, options = {}) =>
          AutomationLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          AutomationLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          AutomationLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get automationRuns() {
    return resource(this, 'automationRuns', () => {
      const AutomationRun = require('./models/AutomationRun.js').default

      return {
        all: (params = {}, options = {}) =>
          AutomationRun.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          AutomationRun.find(id, params, withClient(this, options)),
        findNode: (id, params = {}, options = {}) =>
          AutomationRun.findNode(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          AutomationRun.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          AutomationRun.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          AutomationRun.listIterator(params, withClient(this, options)),
      }
    })
  }

  get automations() {
    return resource(this, 'automations', () => {
      const Automation = require('./models/Automation.js').default

      return {
        all: (params = {}, options = {}) =>
          Automation.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Automation.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Automation.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Automation.get(id, params, withClient(this, options)),
        getAuthoringSchema: (options = {}) =>
          Automation.getAuthoringSchema(withClient(this, options)),
        list: (params = {}, options = {}) =>
          Automation.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Automation.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bandwidthSnapshots() {
    return resource(this, 'bandwidthSnapshots', () => {
      const BandwidthSnapshot = require('./models/BandwidthSnapshot.js').default

      return {
        all: (params = {}, options = {}) =>
          BandwidthSnapshot.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BandwidthSnapshot.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BandwidthSnapshot.listIterator(params, withClient(this, options)),
      }
    })
  }

  get behaviors() {
    return resource(this, 'behaviors', () => {
      const Behavior = require('./models/Behavior.js').default

      return {
        all: (params = {}, options = {}) =>
          Behavior.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Behavior.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Behavior.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Behavior.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Behavior.list(params, withClient(this, options)),
        listFor: (path, params = {}, options = {}) =>
          Behavior.listFor(path, params, withClient(this, options)),
        listForIterator: (path, params = {}, options = {}) =>
          Behavior.listForIterator(path, params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Behavior.listIterator(params, withClient(this, options)),
        webhookTest: (params = {}, options = {}) =>
          Behavior.webhookTest(params, withClient(this, options)),
      }
    })
  }

  get bundleActions() {
    return resource(this, 'bundleActions', () => {
      const BundleAction = require('./models/BundleAction.js').default

      return {
        all: (params = {}, options = {}) =>
          BundleAction.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BundleAction.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BundleAction.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bundleDownloads() {
    return resource(this, 'bundleDownloads', () => {
      const BundleDownload = require('./models/BundleDownload.js').default

      return {
        all: (params = {}, options = {}) =>
          BundleDownload.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BundleDownload.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BundleDownload.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bundleNotifications() {
    return resource(this, 'bundleNotifications', () => {
      const BundleNotification = require('./models/BundleNotification.js').default

      return {
        all: (params = {}, options = {}) =>
          BundleNotification.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          BundleNotification.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          BundleNotification.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          BundleNotification.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BundleNotification.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BundleNotification.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bundleRecipients() {
    return resource(this, 'bundleRecipients', () => {
      const BundleRecipient = require('./models/BundleRecipient.js').default

      return {
        all: (params = {}, options = {}) =>
          BundleRecipient.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          BundleRecipient.create(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BundleRecipient.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BundleRecipient.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bundleRegistrations() {
    return resource(this, 'bundleRegistrations', () => {
      const BundleRegistration = require('./models/BundleRegistration.js').default

      return {
        all: (params = {}, options = {}) =>
          BundleRegistration.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          BundleRegistration.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          BundleRegistration.listIterator(params, withClient(this, options)),
      }
    })
  }

  get bundles() {
    return resource(this, 'bundles', () => {
      const Bundle = require('./models/Bundle.js').default

      return {
        all: (params = {}, options = {}) =>
          Bundle.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Bundle.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Bundle.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Bundle.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Bundle.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Bundle.listIterator(params, withClient(this, options)),
      }
    })
  }

  get chatSessions() {
    return resource(this, 'chatSessions', () => {
      const ChatSession = require('./models/ChatSession.js').default

      return {
        all: (params = {}, options = {}) =>
          ChatSession.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ChatSession.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ChatSession.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ChatSession.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ChatSession.listIterator(params, withClient(this, options)),
      }
    })
  }

  get childSiteManagementPolicies() {
    return resource(this, 'childSiteManagementPolicies', () => {
      const ChildSiteManagementPolicy = require('./models/ChildSiteManagementPolicy.js').default

      return {
        all: (params = {}, options = {}) =>
          ChildSiteManagementPolicy.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          ChildSiteManagementPolicy.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ChildSiteManagementPolicy.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ChildSiteManagementPolicy.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ChildSiteManagementPolicy.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ChildSiteManagementPolicy.listIterator(params, withClient(this, options)),
      }
    })
  }

  get clickwraps() {
    return resource(this, 'clickwraps', () => {
      const Clickwrap = require('./models/Clickwrap.js').default

      return {
        all: (params = {}, options = {}) =>
          Clickwrap.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Clickwrap.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Clickwrap.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Clickwrap.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Clickwrap.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Clickwrap.listIterator(params, withClient(this, options)),
      }
    })
  }

  get customDomains() {
    return resource(this, 'customDomains', () => {
      const CustomDomain = require('./models/CustomDomain.js').default

      return {
        all: (params = {}, options = {}) =>
          CustomDomain.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          CustomDomain.create(params, withClient(this, options)),
        createAllocateIp: (id, params = {}, options = {}) =>
          CustomDomain.createAllocateIp(id, params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          CustomDomain.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          CustomDomain.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          CustomDomain.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          CustomDomain.listIterator(params, withClient(this, options)),
      }
    })
  }

  get desktopConfigurationProfiles() {
    return resource(this, 'desktopConfigurationProfiles', () => {
      const DesktopConfigurationProfile = require('./models/DesktopConfigurationProfile.js').default

      return {
        all: (params = {}, options = {}) =>
          DesktopConfigurationProfile.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          DesktopConfigurationProfile.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          DesktopConfigurationProfile.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          DesktopConfigurationProfile.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          DesktopConfigurationProfile.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          DesktopConfigurationProfile.listIterator(params, withClient(this, options)),
      }
    })
  }

  get dnsRecords() {
    return resource(this, 'dnsRecords', () => {
      const DnsRecord = require('./models/DnsRecord.js').default

      return {
        all: (params = {}, options = {}) =>
          DnsRecord.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          DnsRecord.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          DnsRecord.listIterator(params, withClient(this, options)),
      }
    })
  }

  get emailIncomingMessages() {
    return resource(this, 'emailIncomingMessages', () => {
      const EmailIncomingMessage = require('./models/EmailIncomingMessage.js').default

      return {
        all: (params = {}, options = {}) =>
          EmailIncomingMessage.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EmailIncomingMessage.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EmailIncomingMessage.listIterator(params, withClient(this, options)),
      }
    })
  }

  get emailLogs() {
    return resource(this, 'emailLogs', () => {
      const EmailLog = require('./models/EmailLog.js').default

      return {
        all: (params = {}, options = {}) =>
          EmailLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EmailLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EmailLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get eventChannels() {
    return resource(this, 'eventChannels', () => {
      const EventChannel = require('./models/EventChannel.js').default

      return {
        all: (params = {}, options = {}) =>
          EventChannel.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          EventChannel.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          EventChannel.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          EventChannel.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EventChannel.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EventChannel.listIterator(params, withClient(this, options)),
      }
    })
  }

  get eventDeliveryAttempts() {
    return resource(this, 'eventDeliveryAttempts', () => {
      const EventDeliveryAttempt = require('./models/EventDeliveryAttempt.js').default

      return {
        all: (params = {}, options = {}) =>
          EventDeliveryAttempt.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          EventDeliveryAttempt.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          EventDeliveryAttempt.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EventDeliveryAttempt.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EventDeliveryAttempt.listIterator(params, withClient(this, options)),
      }
    })
  }

  get eventRecords() {
    return resource(this, 'eventRecords', () => {
      const EventRecord = require('./models/EventRecord.js').default

      return {
        all: (params = {}, options = {}) =>
          EventRecord.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          EventRecord.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          EventRecord.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EventRecord.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EventRecord.listIterator(params, withClient(this, options)),
      }
    })
  }

  get eventSubscriptions() {
    return resource(this, 'eventSubscriptions', () => {
      const EventSubscription = require('./models/EventSubscription.js').default

      return {
        all: (params = {}, options = {}) =>
          EventSubscription.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          EventSubscription.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          EventSubscription.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          EventSubscription.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EventSubscription.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EventSubscription.listIterator(params, withClient(this, options)),
      }
    })
  }

  get eventTargets() {
    return resource(this, 'eventTargets', () => {
      const EventTarget = require('./models/EventTarget.js').default

      return {
        all: (params = {}, options = {}) =>
          EventTarget.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          EventTarget.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          EventTarget.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          EventTarget.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          EventTarget.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          EventTarget.listIterator(params, withClient(this, options)),
      }
    })
  }

  get exavaultApiRequestLogs() {
    return resource(this, 'exavaultApiRequestLogs', () => {
      const ExavaultApiRequestLog = require('./models/ExavaultApiRequestLog.js').default

      return {
        all: (params = {}, options = {}) =>
          ExavaultApiRequestLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ExavaultApiRequestLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ExavaultApiRequestLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get expectationEvaluations() {
    return resource(this, 'expectationEvaluations', () => {
      const ExpectationEvaluation = require('./models/ExpectationEvaluation.js').default

      return {
        all: (params = {}, options = {}) =>
          ExpectationEvaluation.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ExpectationEvaluation.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ExpectationEvaluation.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ExpectationEvaluation.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ExpectationEvaluation.listIterator(params, withClient(this, options)),
      }
    })
  }

  get expectationIncidents() {
    return resource(this, 'expectationIncidents', () => {
      const ExpectationIncident = require('./models/ExpectationIncident.js').default

      return {
        all: (params = {}, options = {}) =>
          ExpectationIncident.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ExpectationIncident.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ExpectationIncident.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ExpectationIncident.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ExpectationIncident.listIterator(params, withClient(this, options)),
      }
    })
  }

  get expectations() {
    return resource(this, 'expectations', () => {
      const Expectation = require('./models/Expectation.js').default

      return {
        all: (params = {}, options = {}) =>
          Expectation.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Expectation.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Expectation.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Expectation.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Expectation.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Expectation.listIterator(params, withClient(this, options)),
      }
    })
  }

  get externalEvents() {
    return resource(this, 'externalEvents', () => {
      const ExternalEvent = require('./models/ExternalEvent.js').default

      return {
        all: (params = {}, options = {}) =>
          ExternalEvent.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          ExternalEvent.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ExternalEvent.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ExternalEvent.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ExternalEvent.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ExternalEvent.listIterator(params, withClient(this, options)),
      }
    })
  }

  get fileCommentReactions() {
    return resource(this, 'fileCommentReactions', () => {
      const FileCommentReaction = require('./models/FileCommentReaction.js').default

      return {
        create: (params = {}, options = {}) =>
          FileCommentReaction.create(params, withClient(this, options)),
      }
    })
  }

  get fileComments() {
    return resource(this, 'fileComments', () => {
      const FileComment = require('./models/FileComment.js').default

      return {
        create: (params = {}, options = {}) =>
          FileComment.create(params, withClient(this, options)),
        listFor: (path, params = {}, options = {}) =>
          FileComment.listFor(path, params, withClient(this, options)),
        listForIterator: (path, params = {}, options = {}) =>
          FileComment.listForIterator(path, params, withClient(this, options)),
      }
    })
  }

  get fileMigrationLogs() {
    return resource(this, 'fileMigrationLogs', () => {
      const FileMigrationLog = require('./models/FileMigrationLog.js').default

      return {
        all: (params = {}, options = {}) =>
          FileMigrationLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          FileMigrationLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          FileMigrationLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get fileMigrations() {
    return resource(this, 'fileMigrations', () => {
      const FileMigration = require('./models/FileMigration.js').default

      return {
        find: (id, params = {}, options = {}) =>
          FileMigration.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          FileMigration.get(id, params, withClient(this, options)),
      }
    })
  }

  get files() {
    return resource(this, 'files', () => {
      const File = require('./models/File.js').default

      return {
        copyToChildSite: (path, siteId, destinationPath, params = {}, options = {}) =>
          File.copyToChildSite(path, siteId, destinationPath, params, withClient(this, options)),
        copyToRemoteServer: (path, remoteServerId, destinationPath, params = {}, options = {}) =>
          File.copyToRemoteServer(path, remoteServerId, destinationPath, params, withClient(this, options)),
        copyToSnapshot: (path, snapshotId, destinationPath, params = {}, options = {}) =>
          File.copyToSnapshot(path, snapshotId, destinationPath, params, withClient(this, options)),
        create: (path, params = {}, options = {}) =>
          File.create(path, params, withClient(this, options)),
        downloadDirectory: (path, destinationDirectoryPath, options = {}) =>
          File.downloadDirectory(path, destinationDirectoryPath, withClient(this, options)),
        find: (path, params = {}, options = {}) =>
          File.find(path, params, withClient(this, options)),
        get: (path, params = {}, options = {}) =>
          File.get(path, params, withClient(this, options)),
        moveToChildSite: (path, siteId, destinationPath, params = {}, options = {}) =>
          File.moveToChildSite(path, siteId, destinationPath, params, withClient(this, options)),
        moveToRemoteServer: (path, remoteServerId, destinationPath, params = {}, options = {}) =>
          File.moveToRemoteServer(path, remoteServerId, destinationPath, params, withClient(this, options)),
        moveToSnapshot: (path, snapshotId, destinationPath, params = {}, options = {}) =>
          File.moveToSnapshot(path, snapshotId, destinationPath, params, withClient(this, options)),
        upload: (sourceFilePath, destinationPath, params = {}, options = {}) =>
          File.upload(sourceFilePath, destinationPath, params, withClient(this, options)),
        uploadData: (destinationPath, data, params = {}, options = {}) =>
          File.uploadData(destinationPath, data, params, withClient(this, options)),
        uploadDirectory: (sourceDirectoryPath, destinationPath, options = {}) =>
          File.uploadDirectory(sourceDirectoryPath, destinationPath, withClient(this, options)),
        uploadFile: (destinationPath, sourceFilePath, params = {}, options = {}) =>
          File.uploadFile(destinationPath, sourceFilePath, params, withClient(this, options)),
        uploadFileToChildSite: (sourceFilePath, siteId, destinationPath, params = {}, options = {}) =>
          File.uploadFileToChildSite(sourceFilePath, siteId, destinationPath, params, withClient(this, options)),
        uploadFileToRemoteServer: (sourceFilePath, remoteServerId, destinationPath, params = {}, options = {}) =>
          File.uploadFileToRemoteServer(sourceFilePath, remoteServerId, destinationPath, params, withClient(this, options)),
        uploadFileToSnapshot: (sourceFilePath, snapshotId, destinationPath, params = {}, options = {}) =>
          File.uploadFileToSnapshot(sourceFilePath, snapshotId, destinationPath, params, withClient(this, options)),
        uploadFromData: (data, destinationPath, params = {}, options = {}) =>
          File.uploadFromData(data, destinationPath, params, withClient(this, options)),
        uploadFromStream: (readableStream, destinationPath, params = {}, options = {}) =>
          File.uploadFromStream(readableStream, destinationPath, params, withClient(this, options)),
        uploadStream: (destinationPath, readableStream, params = {}, options = {}) =>
          File.uploadStream(destinationPath, readableStream, params, withClient(this, options)),
        uploadToChildSite: (siteId, destinationPath, sourceFilePath, params = {}, options = {}) =>
          File.uploadToChildSite(siteId, destinationPath, sourceFilePath, params, withClient(this, options)),
        uploadToRemoteServer: (remoteServerId, destinationPath, sourceFilePath, params = {}, options = {}) =>
          File.uploadToRemoteServer(remoteServerId, destinationPath, sourceFilePath, params, withClient(this, options)),
        uploadToSnapshot: (snapshotId, destinationPath, sourceFilePath, params = {}, options = {}) =>
          File.uploadToSnapshot(snapshotId, destinationPath, sourceFilePath, params, withClient(this, options)),
        zip: (params = {}, options = {}) =>
          File.zip(params, withClient(this, options)),
      }
    })
  }

  get folders() {
    return resource(this, 'folders', () => {
      const Folder = require('./models/Folder.js').default

      return {
        create: (path, params = {}, options = {}) =>
          Folder.create(path, params, withClient(this, options)),
        listFor: (path, params = {}, options = {}) =>
          Folder.listFor(path, params, withClient(this, options)),
        listForIterator: (path, params = {}, options = {}) =>
          Folder.listForIterator(path, params, withClient(this, options)),
      }
    })
  }

  get formFieldSets() {
    return resource(this, 'formFieldSets', () => {
      const FormFieldSet = require('./models/FormFieldSet.js').default

      return {
        all: (params = {}, options = {}) =>
          FormFieldSet.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          FormFieldSet.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          FormFieldSet.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          FormFieldSet.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          FormFieldSet.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          FormFieldSet.listIterator(params, withClient(this, options)),
      }
    })
  }

  get ftpActionLogs() {
    return resource(this, 'ftpActionLogs', () => {
      const FtpActionLog = require('./models/FtpActionLog.js').default

      return {
        all: (params = {}, options = {}) =>
          FtpActionLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          FtpActionLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          FtpActionLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get gpgKeys() {
    return resource(this, 'gpgKeys', () => {
      const GpgKey = require('./models/GpgKey.js').default

      return {
        all: (params = {}, options = {}) =>
          GpgKey.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          GpgKey.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          GpgKey.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          GpgKey.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          GpgKey.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          GpgKey.listIterator(params, withClient(this, options)),
      }
    })
  }

  get groupUsers() {
    return resource(this, 'groupUsers', () => {
      const GroupUser = require('./models/GroupUser.js').default

      return {
        all: (params = {}, options = {}) =>
          GroupUser.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          GroupUser.create(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          GroupUser.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          GroupUser.listIterator(params, withClient(this, options)),
      }
    })
  }

  get groups() {
    return resource(this, 'groups', () => {
      const Group = require('./models/Group.js').default

      return {
        all: (params = {}, options = {}) =>
          Group.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Group.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Group.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Group.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Group.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Group.listIterator(params, withClient(this, options)),
      }
    })
  }

  get histories() {
    return resource(this, 'histories', () => {
      const History = require('./models/History.js').default

      return {
        all: (params = {}, options = {}) =>
          History.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          History.list(params, withClient(this, options)),
        listForFile: (path, params = {}, options = {}) =>
          History.listForFile(path, params, withClient(this, options)),
        listForFileIterator: (path, params = {}, options = {}) =>
          History.listForFileIterator(path, params, withClient(this, options)),
        listForFolder: (path, params = {}, options = {}) =>
          History.listForFolder(path, params, withClient(this, options)),
        listForFolderIterator: (path, params = {}, options = {}) =>
          History.listForFolderIterator(path, params, withClient(this, options)),
        listForUser: (userId, params = {}, options = {}) =>
          History.listForUser(userId, params, withClient(this, options)),
        listForUserIterator: (userId, params = {}, options = {}) =>
          History.listForUserIterator(userId, params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          History.listIterator(params, withClient(this, options)),
        listLogins: (params = {}, options = {}) =>
          History.listLogins(params, withClient(this, options)),
        listLoginsIterator: (params = {}, options = {}) =>
          History.listLoginsIterator(params, withClient(this, options)),
      }
    })
  }

  get historyExportResults() {
    return resource(this, 'historyExportResults', () => {
      const HistoryExportResult = require('./models/HistoryExportResult.js').default

      return {
        all: (params = {}, options = {}) =>
          HistoryExportResult.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          HistoryExportResult.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          HistoryExportResult.listIterator(params, withClient(this, options)),
      }
    })
  }

  get historyExports() {
    return resource(this, 'historyExports', () => {
      const HistoryExport = require('./models/HistoryExport.js').default

      return {
        create: (params = {}, options = {}) =>
          HistoryExport.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          HistoryExport.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          HistoryExport.get(id, params, withClient(this, options)),
      }
    })
  }

  get holidayCalendars() {
    return resource(this, 'holidayCalendars', () => {
      const HolidayCalendar = require('./models/HolidayCalendar.js').default

      return {
        all: (params = {}, options = {}) =>
          HolidayCalendar.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          HolidayCalendar.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          HolidayCalendar.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          HolidayCalendar.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          HolidayCalendar.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          HolidayCalendar.listIterator(params, withClient(this, options)),
      }
    })
  }

  get holidayRegions() {
    return resource(this, 'holidayRegions', () => {
      const HolidayRegion = require('./models/HolidayRegion.js').default

      return {
        getSupported: (params = {}, options = {}) =>
          HolidayRegion.getSupported(params, withClient(this, options)),
        getSupportedIterator: (params = {}, options = {}) =>
          HolidayRegion.getSupportedIterator(params, withClient(this, options)),
      }
    })
  }

  get inboundS3Logs() {
    return resource(this, 'inboundS3Logs', () => {
      const InboundS3Log = require('./models/InboundS3Log.js').default

      return {
        all: (params = {}, options = {}) =>
          InboundS3Log.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          InboundS3Log.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          InboundS3Log.listIterator(params, withClient(this, options)),
      }
    })
  }

  get inboxRecipients() {
    return resource(this, 'inboxRecipients', () => {
      const InboxRecipient = require('./models/InboxRecipient.js').default

      return {
        all: (params = {}, options = {}) =>
          InboxRecipient.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          InboxRecipient.create(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          InboxRecipient.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          InboxRecipient.listIterator(params, withClient(this, options)),
      }
    })
  }

  get inboxRegistrations() {
    return resource(this, 'inboxRegistrations', () => {
      const InboxRegistration = require('./models/InboxRegistration.js').default

      return {
        all: (params = {}, options = {}) =>
          InboxRegistration.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          InboxRegistration.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          InboxRegistration.listIterator(params, withClient(this, options)),
      }
    })
  }

  get inboxUploads() {
    return resource(this, 'inboxUploads', () => {
      const InboxUpload = require('./models/InboxUpload.js').default

      return {
        all: (params = {}, options = {}) =>
          InboxUpload.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          InboxUpload.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          InboxUpload.listIterator(params, withClient(this, options)),
      }
    })
  }

  get integrationCentricProfiles() {
    return resource(this, 'integrationCentricProfiles', () => {
      const IntegrationCentricProfile = require('./models/IntegrationCentricProfile.js').default

      return {
        all: (params = {}, options = {}) =>
          IntegrationCentricProfile.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          IntegrationCentricProfile.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          IntegrationCentricProfile.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          IntegrationCentricProfile.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          IntegrationCentricProfile.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          IntegrationCentricProfile.listIterator(params, withClient(this, options)),
      }
    })
  }

  get invoices() {
    return resource(this, 'invoices', () => {
      const Invoice = require('./models/Invoice.js').default

      return {
        all: (params = {}, options = {}) =>
          Invoice.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Invoice.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Invoice.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Invoice.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Invoice.listIterator(params, withClient(this, options)),
      }
    })
  }

  get ipAddresses() {
    return resource(this, 'ipAddresses', () => {
      const IpAddress = require('./models/IpAddress.js').default

      return {
        all: (params = {}, options = {}) =>
          IpAddress.all(params, withClient(this, options)),
        getExavaultReserved: (params = {}, options = {}) =>
          IpAddress.getExavaultReserved(params, withClient(this, options)),
        getExavaultReservedIterator: (params = {}, options = {}) =>
          IpAddress.getExavaultReservedIterator(params, withClient(this, options)),
        getReserved: (params = {}, options = {}) =>
          IpAddress.getReserved(params, withClient(this, options)),
        getReservedIterator: (params = {}, options = {}) =>
          IpAddress.getReservedIterator(params, withClient(this, options)),
        getSmartfileReserved: (params = {}, options = {}) =>
          IpAddress.getSmartfileReserved(params, withClient(this, options)),
        getSmartfileReservedIterator: (params = {}, options = {}) =>
          IpAddress.getSmartfileReservedIterator(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          IpAddress.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          IpAddress.listIterator(params, withClient(this, options)),
      }
    })
  }

  get keyLifecycleRules() {
    return resource(this, 'keyLifecycleRules', () => {
      const KeyLifecycleRule = require('./models/KeyLifecycleRule.js').default

      return {
        all: (params = {}, options = {}) =>
          KeyLifecycleRule.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          KeyLifecycleRule.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          KeyLifecycleRule.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          KeyLifecycleRule.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          KeyLifecycleRule.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          KeyLifecycleRule.listIterator(params, withClient(this, options)),
      }
    })
  }

  get locks() {
    return resource(this, 'locks', () => {
      const Lock = require('./models/Lock.js').default

      return {
        create: (path, params = {}, options = {}) =>
          Lock.create(path, params, withClient(this, options)),
        listFor: (path, params = {}, options = {}) =>
          Lock.listFor(path, params, withClient(this, options)),
        listForIterator: (path, params = {}, options = {}) =>
          Lock.listForIterator(path, params, withClient(this, options)),
      }
    })
  }

  get metadataCategories() {
    return resource(this, 'metadataCategories', () => {
      const MetadataCategory = require('./models/MetadataCategory.js').default

      return {
        all: (params = {}, options = {}) =>
          MetadataCategory.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          MetadataCategory.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          MetadataCategory.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          MetadataCategory.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          MetadataCategory.list(params, withClient(this, options)),
        listFor: (path, params = {}, options = {}) =>
          MetadataCategory.listFor(path, params, withClient(this, options)),
        listForIterator: (path, params = {}, options = {}) =>
          MetadataCategory.listForIterator(path, params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          MetadataCategory.listIterator(params, withClient(this, options)),
      }
    })
  }

  get notifications() {
    return resource(this, 'notifications', () => {
      const Notification = require('./models/Notification.js').default

      return {
        all: (params = {}, options = {}) =>
          Notification.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Notification.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Notification.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Notification.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Notification.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Notification.listIterator(params, withClient(this, options)),
      }
    })
  }

  get outboundConnectionLogs() {
    return resource(this, 'outboundConnectionLogs', () => {
      const OutboundConnectionLog = require('./models/OutboundConnectionLog.js').default

      return {
        all: (params = {}, options = {}) =>
          OutboundConnectionLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          OutboundConnectionLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          OutboundConnectionLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get partnerChannelTemplates() {
    return resource(this, 'partnerChannelTemplates', () => {
      const PartnerChannelTemplate = require('./models/PartnerChannelTemplate.js').default

      return {
        all: (params = {}, options = {}) =>
          PartnerChannelTemplate.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          PartnerChannelTemplate.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          PartnerChannelTemplate.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          PartnerChannelTemplate.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PartnerChannelTemplate.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PartnerChannelTemplate.listIterator(params, withClient(this, options)),
      }
    })
  }

  get partnerChannels() {
    return resource(this, 'partnerChannels', () => {
      const PartnerChannel = require('./models/PartnerChannel.js').default

      return {
        all: (params = {}, options = {}) =>
          PartnerChannel.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          PartnerChannel.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          PartnerChannel.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          PartnerChannel.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PartnerChannel.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PartnerChannel.listIterator(params, withClient(this, options)),
      }
    })
  }

  get partnerSiteRequests() {
    return resource(this, 'partnerSiteRequests', () => {
      const PartnerSiteRequest = require('./models/PartnerSiteRequest.js').default

      return {
        all: (params = {}, options = {}) =>
          PartnerSiteRequest.all(params, withClient(this, options)),
        approve: (params = {}, options = {}) =>
          PartnerSiteRequest.approve(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          PartnerSiteRequest.create(params, withClient(this, options)),
        findByPairingKey: (params = {}, options = {}) =>
          PartnerSiteRequest.findByPairingKey(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PartnerSiteRequest.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PartnerSiteRequest.listIterator(params, withClient(this, options)),
        reject: (params = {}, options = {}) =>
          PartnerSiteRequest.reject(params, withClient(this, options)),
      }
    })
  }

  get partners() {
    return resource(this, 'partners', () => {
      const Partner = require('./models/Partner.js').default

      return {
        all: (params = {}, options = {}) =>
          Partner.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Partner.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Partner.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Partner.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Partner.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Partner.listIterator(params, withClient(this, options)),
      }
    })
  }

  get payments() {
    return resource(this, 'payments', () => {
      const Payment = require('./models/Payment.js').default

      return {
        all: (params = {}, options = {}) =>
          Payment.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Payment.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Payment.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Payment.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Payment.listIterator(params, withClient(this, options)),
      }
    })
  }

  get pendingWorkEvents() {
    return resource(this, 'pendingWorkEvents', () => {
      const PendingWorkEvent = require('./models/PendingWorkEvent.js').default

      return {
        all: (params = {}, options = {}) =>
          PendingWorkEvent.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          PendingWorkEvent.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          PendingWorkEvent.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PendingWorkEvent.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PendingWorkEvent.listIterator(params, withClient(this, options)),
      }
    })
  }

  get permissions() {
    return resource(this, 'permissions', () => {
      const Permission = require('./models/Permission.js').default

      return {
        all: (params = {}, options = {}) =>
          Permission.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Permission.create(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Permission.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Permission.listIterator(params, withClient(this, options)),
      }
    })
  }

  get publicHostingRequestLogs() {
    return resource(this, 'publicHostingRequestLogs', () => {
      const PublicHostingRequestLog = require('./models/PublicHostingRequestLog.js').default

      return {
        all: (params = {}, options = {}) =>
          PublicHostingRequestLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PublicHostingRequestLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PublicHostingRequestLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get publicKeys() {
    return resource(this, 'publicKeys', () => {
      const PublicKey = require('./models/PublicKey.js').default

      return {
        all: (params = {}, options = {}) =>
          PublicKey.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          PublicKey.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          PublicKey.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          PublicKey.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          PublicKey.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          PublicKey.listIterator(params, withClient(this, options)),
      }
    })
  }

  get remoteBandwidthSnapshots() {
    return resource(this, 'remoteBandwidthSnapshots', () => {
      const RemoteBandwidthSnapshot = require('./models/RemoteBandwidthSnapshot.js').default

      return {
        all: (params = {}, options = {}) =>
          RemoteBandwidthSnapshot.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          RemoteBandwidthSnapshot.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          RemoteBandwidthSnapshot.listIterator(params, withClient(this, options)),
      }
    })
  }

  get remoteMountBackends() {
    return resource(this, 'remoteMountBackends', () => {
      const RemoteMountBackend = require('./models/RemoteMountBackend.js').default

      return {
        all: (params = {}, options = {}) =>
          RemoteMountBackend.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          RemoteMountBackend.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          RemoteMountBackend.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          RemoteMountBackend.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          RemoteMountBackend.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          RemoteMountBackend.listIterator(params, withClient(this, options)),
      }
    })
  }

  get remoteServerCredentials() {
    return resource(this, 'remoteServerCredentials', () => {
      const RemoteServerCredential = require('./models/RemoteServerCredential.js').default

      return {
        all: (params = {}, options = {}) =>
          RemoteServerCredential.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          RemoteServerCredential.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          RemoteServerCredential.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          RemoteServerCredential.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          RemoteServerCredential.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          RemoteServerCredential.listIterator(params, withClient(this, options)),
      }
    })
  }

  get remoteServers() {
    return resource(this, 'remoteServers', () => {
      const RemoteServer = require('./models/RemoteServer.js').default

      return {
        all: (params = {}, options = {}) =>
          RemoteServer.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          RemoteServer.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          RemoteServer.find(id, params, withClient(this, options)),
        findConfigurationFile: (id, params = {}, options = {}) =>
          RemoteServer.findConfigurationFile(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          RemoteServer.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          RemoteServer.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          RemoteServer.listIterator(params, withClient(this, options)),
      }
    })
  }

  get requests() {
    return resource(this, 'requests', () => {
      const Request = require('./models/Request.js').default

      return {
        all: (params = {}, options = {}) =>
          Request.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Request.create(params, withClient(this, options)),
        getFolder: (path, params = {}, options = {}) =>
          Request.getFolder(path, params, withClient(this, options)),
        getFolderIterator: (path, params = {}, options = {}) =>
          Request.getFolderIterator(path, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Request.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Request.listIterator(params, withClient(this, options)),
      }
    })
  }

  get restores() {
    return resource(this, 'restores', () => {
      const Restore = require('./models/Restore.js').default

      return {
        all: (params = {}, options = {}) =>
          Restore.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Restore.create(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Restore.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Restore.listIterator(params, withClient(this, options)),
      }
    })
  }

  get scheduledExports() {
    return resource(this, 'scheduledExports', () => {
      const ScheduledExport = require('./models/ScheduledExport.js').default

      return {
        all: (params = {}, options = {}) =>
          ScheduledExport.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          ScheduledExport.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ScheduledExport.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ScheduledExport.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ScheduledExport.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ScheduledExport.listIterator(params, withClient(this, options)),
      }
    })
  }

  get schedules() {
    return resource(this, 'schedules', () => {
      const Schedule = require('./models/Schedule.js').default

      return {
        all: (params = {}, options = {}) =>
          Schedule.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Schedule.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Schedule.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Schedule.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Schedule.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Schedule.listIterator(params, withClient(this, options)),
      }
    })
  }

  get scimLogs() {
    return resource(this, 'scimLogs', () => {
      const ScimLog = require('./models/ScimLog.js').default

      return {
        all: (params = {}, options = {}) =>
          ScimLog.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ScimLog.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ScimLog.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ScimLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ScimLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get secrets() {
    return resource(this, 'secrets', () => {
      const Secret = require('./models/Secret.js').default

      return {
        all: (params = {}, options = {}) =>
          Secret.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Secret.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Secret.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Secret.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Secret.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Secret.listIterator(params, withClient(this, options)),
      }
    })
  }

  get sessions() {
    return resource(this, 'sessions', () => {
      const Session = require('./models/Session.js').default

      return {
        create: (params = {}, options = {}) =>
          Session.create(params, withClient(this, options)),
        delete: (options = {}) =>
          Session.delete(withClient(this, options)),
        destroy: (params = {}, options = {}) =>
          Session.destroy(params, withClient(this, options)),
      }
    })
  }

  get settingsChanges() {
    return resource(this, 'settingsChanges', () => {
      const SettingsChange = require('./models/SettingsChange.js').default

      return {
        all: (params = {}, options = {}) =>
          SettingsChange.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SettingsChange.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SettingsChange.listIterator(params, withClient(this, options)),
      }
    })
  }

  get sftpActionLogs() {
    return resource(this, 'sftpActionLogs', () => {
      const SftpActionLog = require('./models/SftpActionLog.js').default

      return {
        all: (params = {}, options = {}) =>
          SftpActionLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SftpActionLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SftpActionLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get sftpHostKeys() {
    return resource(this, 'sftpHostKeys', () => {
      const SftpHostKey = require('./models/SftpHostKey.js').default

      return {
        all: (params = {}, options = {}) =>
          SftpHostKey.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          SftpHostKey.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SftpHostKey.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SftpHostKey.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SftpHostKey.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SftpHostKey.listIterator(params, withClient(this, options)),
      }
    })
  }

  get shareGroups() {
    return resource(this, 'shareGroups', () => {
      const ShareGroup = require('./models/ShareGroup.js').default

      return {
        all: (params = {}, options = {}) =>
          ShareGroup.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          ShareGroup.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          ShareGroup.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          ShareGroup.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          ShareGroup.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          ShareGroup.listIterator(params, withClient(this, options)),
      }
    })
  }

  get siemHttpDestinationEvents() {
    return resource(this, 'siemHttpDestinationEvents', () => {
      const SiemHttpDestinationEvent = require('./models/SiemHttpDestinationEvent.js').default

      return {
        all: (params = {}, options = {}) =>
          SiemHttpDestinationEvent.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SiemHttpDestinationEvent.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SiemHttpDestinationEvent.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SiemHttpDestinationEvent.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SiemHttpDestinationEvent.listIterator(params, withClient(this, options)),
      }
    })
  }

  get siemHttpDestinations() {
    return resource(this, 'siemHttpDestinations', () => {
      const SiemHttpDestination = require('./models/SiemHttpDestination.js').default

      return {
        all: (params = {}, options = {}) =>
          SiemHttpDestination.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          SiemHttpDestination.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SiemHttpDestination.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SiemHttpDestination.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SiemHttpDestination.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SiemHttpDestination.listIterator(params, withClient(this, options)),
        sendTestEntry: (params = {}, options = {}) =>
          SiemHttpDestination.sendTestEntry(params, withClient(this, options)),
      }
    })
  }

  get siteSubdomainRedirects() {
    return resource(this, 'siteSubdomainRedirects', () => {
      const SiteSubdomainRedirect = require('./models/SiteSubdomainRedirect.js').default

      return {
        all: (params = {}, options = {}) =>
          SiteSubdomainRedirect.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SiteSubdomainRedirect.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SiteSubdomainRedirect.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SiteSubdomainRedirect.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SiteSubdomainRedirect.listIterator(params, withClient(this, options)),
      }
    })
  }

  get sites() {
    return resource(this, 'sites', () => {
      const Site = require('./models/Site.js').default

      return {
        get: (options = {}) =>
          Site.get(withClient(this, options)),
        getUsage: (options = {}) =>
          Site.getUsage(withClient(this, options)),
        update: (params = {}, options = {}) =>
          Site.update(params, withClient(this, options)),
      }
    })
  }

  get snapshots() {
    return resource(this, 'snapshots', () => {
      const Snapshot = require('./models/Snapshot.js').default

      return {
        all: (params = {}, options = {}) =>
          Snapshot.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Snapshot.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Snapshot.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Snapshot.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Snapshot.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Snapshot.listIterator(params, withClient(this, options)),
      }
    })
  }

  get ssoEvents() {
    return resource(this, 'ssoEvents', () => {
      const SsoEvent = require('./models/SsoEvent.js').default

      return {
        all: (params = {}, options = {}) =>
          SsoEvent.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SsoEvent.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SsoEvent.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SsoEvent.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SsoEvent.listIterator(params, withClient(this, options)),
      }
    })
  }

  get ssoStrategies() {
    return resource(this, 'ssoStrategies', () => {
      const SsoStrategy = require('./models/SsoStrategy.js').default

      return {
        all: (params = {}, options = {}) =>
          SsoStrategy.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SsoStrategy.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SsoStrategy.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SsoStrategy.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SsoStrategy.listIterator(params, withClient(this, options)),
      }
    })
  }

  get styles() {
    return resource(this, 'styles', () => {
      const Style = require('./models/Style.js').default

      return {
        find: (path, params = {}, options = {}) =>
          Style.find(path, params, withClient(this, options)),
        get: (path, params = {}, options = {}) =>
          Style.get(path, params, withClient(this, options)),
      }
    })
  }

  get syncLogs() {
    return resource(this, 'syncLogs', () => {
      const SyncLog = require('./models/SyncLog.js').default

      return {
        all: (params = {}, options = {}) =>
          SyncLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SyncLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SyncLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get syncRuns() {
    return resource(this, 'syncRuns', () => {
      const SyncRun = require('./models/SyncRun.js').default

      return {
        all: (params = {}, options = {}) =>
          SyncRun.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          SyncRun.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          SyncRun.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          SyncRun.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          SyncRun.listIterator(params, withClient(this, options)),
      }
    })
  }

  get syncs() {
    return resource(this, 'syncs', () => {
      const Sync = require('./models/Sync.js').default

      return {
        all: (params = {}, options = {}) =>
          Sync.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Sync.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Sync.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Sync.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Sync.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Sync.listIterator(params, withClient(this, options)),
      }
    })
  }

  get usageDailySnapshots() {
    return resource(this, 'usageDailySnapshots', () => {
      const UsageDailySnapshot = require('./models/UsageDailySnapshot.js').default

      return {
        all: (params = {}, options = {}) =>
          UsageDailySnapshot.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UsageDailySnapshot.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UsageDailySnapshot.listIterator(params, withClient(this, options)),
      }
    })
  }

  get usageSnapshots() {
    return resource(this, 'usageSnapshots', () => {
      const UsageSnapshot = require('./models/UsageSnapshot.js').default

      return {
        all: (params = {}, options = {}) =>
          UsageSnapshot.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UsageSnapshot.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UsageSnapshot.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userAdditionalEmailRecipients() {
    return resource(this, 'userAdditionalEmailRecipients', () => {
      const UserAdditionalEmailRecipient = require('./models/UserAdditionalEmailRecipient.js').default

      return {
        all: (params = {}, options = {}) =>
          UserAdditionalEmailRecipient.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          UserAdditionalEmailRecipient.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          UserAdditionalEmailRecipient.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          UserAdditionalEmailRecipient.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserAdditionalEmailRecipient.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserAdditionalEmailRecipient.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userCipherUses() {
    return resource(this, 'userCipherUses', () => {
      const UserCipherUse = require('./models/UserCipherUse.js').default

      return {
        all: (params = {}, options = {}) =>
          UserCipherUse.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserCipherUse.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserCipherUse.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userLifecycleRules() {
    return resource(this, 'userLifecycleRules', () => {
      const UserLifecycleRule = require('./models/UserLifecycleRule.js').default

      return {
        all: (params = {}, options = {}) =>
          UserLifecycleRule.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          UserLifecycleRule.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          UserLifecycleRule.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          UserLifecycleRule.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserLifecycleRule.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserLifecycleRule.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userRequests() {
    return resource(this, 'userRequests', () => {
      const UserRequest = require('./models/UserRequest.js').default

      return {
        all: (params = {}, options = {}) =>
          UserRequest.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          UserRequest.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          UserRequest.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          UserRequest.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserRequest.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserRequest.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userSecurityEvents() {
    return resource(this, 'userSecurityEvents', () => {
      const UserSecurityEvent = require('./models/UserSecurityEvent.js').default

      return {
        all: (params = {}, options = {}) =>
          UserSecurityEvent.all(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          UserSecurityEvent.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          UserSecurityEvent.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserSecurityEvent.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserSecurityEvent.listIterator(params, withClient(this, options)),
      }
    })
  }

  get userSftpClientUses() {
    return resource(this, 'userSftpClientUses', () => {
      const UserSftpClientUse = require('./models/UserSftpClientUse.js').default

      return {
        all: (params = {}, options = {}) =>
          UserSftpClientUse.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          UserSftpClientUse.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          UserSftpClientUse.listIterator(params, withClient(this, options)),
      }
    })
  }

  get users() {
    return resource(this, 'users', () => {
      const User = require('./models/User.js').default

      return {
        all: (params = {}, options = {}) =>
          User.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          User.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          User.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          User.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          User.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          User.listIterator(params, withClient(this, options)),
      }
    })
  }

  get webDavActionLogs() {
    return resource(this, 'webDavActionLogs', () => {
      const WebDavActionLog = require('./models/WebDavActionLog.js').default

      return {
        all: (params = {}, options = {}) =>
          WebDavActionLog.all(params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          WebDavActionLog.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          WebDavActionLog.listIterator(params, withClient(this, options)),
      }
    })
  }

  get webhookTests() {
    return resource(this, 'webhookTests', () => {
      const WebhookTest = require('./models/WebhookTest.js').default

      return {
        create: (params = {}, options = {}) =>
          WebhookTest.create(params, withClient(this, options)),
      }
    })
  }

  get workspaces() {
    return resource(this, 'workspaces', () => {
      const Workspace = require('./models/Workspace.js').default

      return {
        all: (params = {}, options = {}) =>
          Workspace.all(params, withClient(this, options)),
        create: (params = {}, options = {}) =>
          Workspace.create(params, withClient(this, options)),
        find: (id, params = {}, options = {}) =>
          Workspace.find(id, params, withClient(this, options)),
        get: (id, params = {}, options = {}) =>
          Workspace.get(id, params, withClient(this, options)),
        list: (params = {}, options = {}) =>
          Workspace.list(params, withClient(this, options)),
        listIterator: (params = {}, options = {}) =>
          Workspace.listIterator(params, withClient(this, options)),
      }
    })
  }
}

export default FilesClient

module.exports = FilesClient
module.exports.default = FilesClient
