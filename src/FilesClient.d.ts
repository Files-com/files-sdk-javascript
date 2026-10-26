import Files from './Files'
import Logger from './Logger'
import ActionLog from './models/ActionLog'
import ActionNotificationExportResult from './models/ActionNotificationExportResult'
import ActionNotificationExport from './models/ActionNotificationExport'
import AiAssistantPersonality from './models/AiAssistantPersonality'
import AiTask from './models/AiTask'
import ApiKey from './models/ApiKey'
import ApiRequestLog from './models/ApiRequestLog'
import App from './models/App'
import As2IncomingMessage from './models/As2IncomingMessage'
import As2OutgoingMessage from './models/As2OutgoingMessage'
import As2Partner from './models/As2Partner'
import As2Station from './models/As2Station'
import AutomationLog from './models/AutomationLog'
import AutomationRun from './models/AutomationRun'
import Automation from './models/Automation'
import BandwidthSnapshot from './models/BandwidthSnapshot'
import Behavior from './models/Behavior'
import BundleAction from './models/BundleAction'
import BundleDownload from './models/BundleDownload'
import BundleNotification from './models/BundleNotification'
import BundleRecipient from './models/BundleRecipient'
import BundleRegistration from './models/BundleRegistration'
import Bundle from './models/Bundle'
import ChatSession from './models/ChatSession'
import ChildSiteManagementPolicy from './models/ChildSiteManagementPolicy'
import Clickwrap from './models/Clickwrap'
import CustomDomain from './models/CustomDomain'
import DesktopConfigurationProfile from './models/DesktopConfigurationProfile'
import DnsRecord from './models/DnsRecord'
import EmailIncomingMessage from './models/EmailIncomingMessage'
import EmailLog from './models/EmailLog'
import EventChannel from './models/EventChannel'
import EventDeliveryAttempt from './models/EventDeliveryAttempt'
import EventRecord from './models/EventRecord'
import EventSubscription from './models/EventSubscription'
import EventTarget from './models/EventTarget'
import ExavaultApiRequestLog from './models/ExavaultApiRequestLog'
import ExpectationEvaluation from './models/ExpectationEvaluation'
import ExpectationIncident from './models/ExpectationIncident'
import Expectation from './models/Expectation'
import ExternalEvent from './models/ExternalEvent'
import FileCommentReaction from './models/FileCommentReaction'
import FileComment from './models/FileComment'
import FileMigrationLog from './models/FileMigrationLog'
import FileMigration from './models/FileMigration'
import File from './models/File'
import Folder from './models/Folder'
import FormFieldSet from './models/FormFieldSet'
import FtpActionLog from './models/FtpActionLog'
import GpgKey from './models/GpgKey'
import GroupUser from './models/GroupUser'
import Group from './models/Group'
import History from './models/History'
import HistoryExportResult from './models/HistoryExportResult'
import HistoryExport from './models/HistoryExport'
import HolidayCalendar from './models/HolidayCalendar'
import HolidayRegion from './models/HolidayRegion'
import InboundS3Log from './models/InboundS3Log'
import InboxRecipient from './models/InboxRecipient'
import InboxRegistration from './models/InboxRegistration'
import InboxUpload from './models/InboxUpload'
import IntegrationCentricProfile from './models/IntegrationCentricProfile'
import Invoice from './models/Invoice'
import IpAddress from './models/IpAddress'
import KeyLifecycleRule from './models/KeyLifecycleRule'
import Lock from './models/Lock'
import MetadataCategory from './models/MetadataCategory'
import Notification from './models/Notification'
import OutboundConnectionLog from './models/OutboundConnectionLog'
import PartnerChannelTemplate from './models/PartnerChannelTemplate'
import PartnerChannel from './models/PartnerChannel'
import PartnerSiteRequest from './models/PartnerSiteRequest'
import Partner from './models/Partner'
import Payment from './models/Payment'
import PendingWorkEvent from './models/PendingWorkEvent'
import Permission from './models/Permission'
import PublicHostingRequestLog from './models/PublicHostingRequestLog'
import PublicKey from './models/PublicKey'
import RemoteBandwidthSnapshot from './models/RemoteBandwidthSnapshot'
import RemoteMountBackend from './models/RemoteMountBackend'
import RemoteServerCredential from './models/RemoteServerCredential'
import RemoteServer from './models/RemoteServer'
import Request from './models/Request'
import Restore from './models/Restore'
import ScheduledExport from './models/ScheduledExport'
import Schedule from './models/Schedule'
import ScimLog from './models/ScimLog'
import Secret from './models/Secret'
import Session from './models/Session'
import SettingsChange from './models/SettingsChange'
import SftpActionLog from './models/SftpActionLog'
import SftpHostKey from './models/SftpHostKey'
import ShareGroup from './models/ShareGroup'
import SiemHttpDestinationEvent from './models/SiemHttpDestinationEvent'
import SiemHttpDestination from './models/SiemHttpDestination'
import SiteSubdomainRedirect from './models/SiteSubdomainRedirect'
import Site from './models/Site'
import Snapshot from './models/Snapshot'
import SsoEvent from './models/SsoEvent'
import SsoStrategy from './models/SsoStrategy'
import Style from './models/Style'
import SyncLog from './models/SyncLog'
import SyncRun from './models/SyncRun'
import Sync from './models/Sync'
import UsageDailySnapshot from './models/UsageDailySnapshot'
import UsageSnapshot from './models/UsageSnapshot'
import UserAdditionalEmailRecipient from './models/UserAdditionalEmailRecipient'
import UserCipherUse from './models/UserCipherUse'
import UserLifecycleRule from './models/UserLifecycleRule'
import UserRequest from './models/UserRequest'
import UserSecurityEvent from './models/UserSecurityEvent'
import UserSftpClientUse from './models/UserSftpClientUse'
import User from './models/User'
import WebDavActionLog from './models/WebDavActionLog'
import WebhookTest from './models/WebhookTest'
import Workspace from './models/Workspace'

/**
 * Files.com settings of its own, logging included, independent of the global settings of `Files` and of every other
 * client, with the API's resources bound to them: `client.users.list()` is `User.list()` made with this client's
 * settings. A call's options override them for that call without changing the client: a model the call returns keeps
 * the client and a copy of the call's options, headers included, taken when the call began, so its own methods, `save()`
 * included, make their requests as the call did and log as the client does. The call's `signal` is not kept: it cancels
 * that call alone. `Logger.pause()` pauses every client's logging. Create one with `new FilesClient(config)`, or with
 * `Files.createClient(config)`, which is the same.
 *
 * `client.files` also offers File's upload helpers and its copy and move helpers for each destination, whose API
 * requests use the client's settings too. An upload's parts go to storage through the agent the options or the client
 * choose and the client's `fetch`, with the call's signal and the client's retry, timeout and log settings, but none of
 * its credentials or headers. A File's downloads go to storage through that agent, with none of them either, log with
 * the client's log settings, and go through the File's or the client's `fetch` when one is set (see
 * `File.downloadToString()`).
 */
declare class FilesClient {
  /**
   * Creates a client with Files.com settings of its own, logging included: the SDK's defaults, with those of `config`
   * over them. Its settings and headers are copied, so later changes to `config`, or to the global settings, do not
   * change it, and it never uses the global API key, session, workspace or log settings. Its application logger is
   * used, not copied. Throws a `ConfigurationError` for a setting it does not know, or a logger without the four
   * methods.
   */
  constructor(config?: Files.ClientConfig)

  getApiKey(): string | null | undefined

  getAutoPaginate(): boolean

  /**
   * The client's site. A lockout region mismatch that a request sent to it with the client's own API key or session, in
   * the client's own workspace, follows moves it to the host the API named; a request that sends no credential, such as
   * creating a session, or a call's own credential or workspace does not. Nothing else changes it, and no other client.
   */
  getBaseUrl(): string

  /** The HTTP client the client's requests are sent with (see `Files.NetworkOptions.fetch`), if any. */
  getFetch(): Files.Fetch | null | undefined

  /** Whether the client's requests follow a lockout region mismatch (see `Files.NetworkOptions`). */
  getFollowRegionMismatch(): boolean

  /** The client's own headers, a frozen copy of those it was created with, sent under a call's headers. */
  getHeaders(): Readonly<Files.HttpHeaders>

  getLanguage(): string | null

  getLogger(): Files.ApplicationLogger | null

  getLogLevel(): Logger.LogLevel

  getMaxNetworkRetries(): number

  getMaxNetworkRetryDelay(): number

  getMinNetworkRetryDelay(): number

  getNetworkTimeout(): number

  getSessionId(): string | null

  /** The function that trusts a host outside Files.com for a lockout region mismatch, if any. */
  getTrustRegionHost(): Files.TrustRegionHost | null | undefined

  getUserAgent(): string

  getWorkspaceId(): Files.WorkspaceId | null

  shouldDebugRequest(): boolean

  /** The client's `debugResponseHeaders`, kept for compatibility: at DEBUG, every response's headers are logged. */
  shouldDebugResponseHeaders(): boolean

  /**
   * The client's Files.com filesystem, with Node.js's `fs/promises` conventions over its paths: `open()` gives a file
   * handle that reads and writes the remote file, `opendir()` a directory that lists it (see `Files.Filesystem`).
   * Node.js only: in a browser, every method rejects with a `NotImplementedError`.
   */
  readonly fs: Files.Filesystem

  /** `ActionLog`'s static methods, made with this client's settings. */
  readonly actionLogs: Pick<typeof ActionLog, 'all' | 'list' | 'listIterator'>

  /** `ActionNotificationExportResult`'s static methods, made with this client's settings. */
  readonly actionNotificationExportResults: Pick<typeof ActionNotificationExportResult, 'all' | 'list' | 'listIterator'>

  /** `ActionNotificationExport`'s static methods, made with this client's settings. */
  readonly actionNotificationExports: Pick<typeof ActionNotificationExport, 'create' | 'find' | 'get'>

  /** `AiAssistantPersonality`'s static methods, made with this client's settings. */
  readonly aiAssistantPersonalities: Pick<typeof AiAssistantPersonality, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `AiTask`'s static methods, made with this client's settings. */
  readonly aiTasks: Pick<typeof AiTask, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ApiKey`'s static methods, made with this client's settings. */
  readonly apiKeys: Pick<typeof ApiKey, 'all' | 'create' | 'deleteCurrent' | 'find' | 'findCurrent' | 'get' | 'list' | 'listIterator' | 'updateCurrent'>

  /** `ApiRequestLog`'s static methods, made with this client's settings. */
  readonly apiRequestLogs: Pick<typeof ApiRequestLog, 'all' | 'list' | 'listIterator'>

  /** `App`'s static methods, made with this client's settings. */
  readonly apps: Pick<typeof App, 'all' | 'list' | 'listIterator'>

  /** `As2IncomingMessage`'s static methods, made with this client's settings. */
  readonly as2IncomingMessages: Pick<typeof As2IncomingMessage, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `As2OutgoingMessage`'s static methods, made with this client's settings. */
  readonly as2OutgoingMessages: Pick<typeof As2OutgoingMessage, 'all' | 'list' | 'listIterator'>

  /** `As2Partner`'s static methods, made with this client's settings. */
  readonly as2Partners: Pick<typeof As2Partner, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `As2Station`'s static methods, made with this client's settings. */
  readonly as2Stations: Pick<typeof As2Station, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `AutomationLog`'s static methods, made with this client's settings. */
  readonly automationLogs: Pick<typeof AutomationLog, 'all' | 'list' | 'listIterator'>

  /** `AutomationRun`'s static methods, made with this client's settings. */
  readonly automationRuns: Pick<typeof AutomationRun, 'all' | 'find' | 'findNode' | 'get' | 'list' | 'listIterator'>

  /** `Automation`'s static methods, made with this client's settings. */
  readonly automations: Pick<typeof Automation, 'all' | 'create' | 'find' | 'get' | 'getAuthoringSchema' | 'list' | 'listIterator'>

  /** `BandwidthSnapshot`'s static methods, made with this client's settings. */
  readonly bandwidthSnapshots: Pick<typeof BandwidthSnapshot, 'all' | 'list' | 'listIterator'>

  /** `Behavior`'s static methods, made with this client's settings. */
  readonly behaviors: Pick<typeof Behavior, 'all' | 'create' | 'find' | 'get' | 'list' | 'listFor' | 'listForIterator' | 'listIterator' | 'webhookTest'>

  /** `BundleAction`'s static methods, made with this client's settings. */
  readonly bundleActions: Pick<typeof BundleAction, 'all' | 'list' | 'listIterator'>

  /** `BundleDownload`'s static methods, made with this client's settings. */
  readonly bundleDownloads: Pick<typeof BundleDownload, 'all' | 'list' | 'listIterator'>

  /** `BundleNotification`'s static methods, made with this client's settings. */
  readonly bundleNotifications: Pick<typeof BundleNotification, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `BundleRecipient`'s static methods, made with this client's settings. */
  readonly bundleRecipients: Pick<typeof BundleRecipient, 'all' | 'create' | 'list' | 'listIterator'>

  /** `BundleRegistration`'s static methods, made with this client's settings. */
  readonly bundleRegistrations: Pick<typeof BundleRegistration, 'all' | 'list' | 'listIterator'>

  /** `Bundle`'s static methods, made with this client's settings. */
  readonly bundles: Pick<typeof Bundle, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ChatSession`'s static methods, made with this client's settings. */
  readonly chatSessions: Pick<typeof ChatSession, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ChildSiteManagementPolicy`'s static methods, made with this client's settings. */
  readonly childSiteManagementPolicies: Pick<typeof ChildSiteManagementPolicy, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Clickwrap`'s static methods, made with this client's settings. */
  readonly clickwraps: Pick<typeof Clickwrap, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `CustomDomain`'s static methods, made with this client's settings. */
  readonly customDomains: Pick<typeof CustomDomain, 'all' | 'create' | 'createAllocateIp' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `DesktopConfigurationProfile`'s static methods, made with this client's settings. */
  readonly desktopConfigurationProfiles: Pick<typeof DesktopConfigurationProfile, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `DnsRecord`'s static methods, made with this client's settings. */
  readonly dnsRecords: Pick<typeof DnsRecord, 'all' | 'list' | 'listIterator'>

  /** `EmailIncomingMessage`'s static methods, made with this client's settings. */
  readonly emailIncomingMessages: Pick<typeof EmailIncomingMessage, 'all' | 'list' | 'listIterator'>

  /** `EmailLog`'s static methods, made with this client's settings. */
  readonly emailLogs: Pick<typeof EmailLog, 'all' | 'list' | 'listIterator'>

  /** `EventChannel`'s static methods, made with this client's settings. */
  readonly eventChannels: Pick<typeof EventChannel, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `EventDeliveryAttempt`'s static methods, made with this client's settings. */
  readonly eventDeliveryAttempts: Pick<typeof EventDeliveryAttempt, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `EventRecord`'s static methods, made with this client's settings. */
  readonly eventRecords: Pick<typeof EventRecord, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `EventSubscription`'s static methods, made with this client's settings. */
  readonly eventSubscriptions: Pick<typeof EventSubscription, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `EventTarget`'s static methods, made with this client's settings. */
  readonly eventTargets: Pick<typeof EventTarget, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ExavaultApiRequestLog`'s static methods, made with this client's settings. */
  readonly exavaultApiRequestLogs: Pick<typeof ExavaultApiRequestLog, 'all' | 'list' | 'listIterator'>

  /** `ExpectationEvaluation`'s static methods, made with this client's settings. */
  readonly expectationEvaluations: Pick<typeof ExpectationEvaluation, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ExpectationIncident`'s static methods, made with this client's settings. */
  readonly expectationIncidents: Pick<typeof ExpectationIncident, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Expectation`'s static methods, made with this client's settings. */
  readonly expectations: Pick<typeof Expectation, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ExternalEvent`'s static methods, made with this client's settings. */
  readonly externalEvents: Pick<typeof ExternalEvent, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `FileCommentReaction`'s static methods, made with this client's settings. */
  readonly fileCommentReactions: Pick<typeof FileCommentReaction, 'create'>

  /** `FileComment`'s static methods, made with this client's settings. */
  readonly fileComments: Pick<typeof FileComment, 'create' | 'listFor' | 'listForIterator'>

  /** `FileMigrationLog`'s static methods, made with this client's settings. */
  readonly fileMigrationLogs: Pick<typeof FileMigrationLog, 'all' | 'list' | 'listIterator'>

  /** `FileMigration`'s static methods, made with this client's settings. */
  readonly fileMigrations: Pick<typeof FileMigration, 'find' | 'get'>

  /** `File`'s static methods, made with this client's settings. */
  readonly files: Pick<typeof File, 'copyToChildSite' | 'copyToRemoteServer' | 'copyToSnapshot' | 'create' | 'downloadDirectory' | 'find' | 'get' | 'moveToChildSite' | 'moveToRemoteServer' | 'moveToSnapshot' | 'upload' | 'uploadData' | 'uploadDirectory' | 'uploadFile' | 'uploadFileToChildSite' | 'uploadFileToRemoteServer' | 'uploadFileToSnapshot' | 'uploadFromData' | 'uploadFromStream' | 'uploadStream' | 'uploadToChildSite' | 'uploadToRemoteServer' | 'uploadToSnapshot' | 'zip'>

  /** `Folder`'s static methods, made with this client's settings. */
  readonly folders: Pick<typeof Folder, 'create' | 'listFor' | 'listForIterator'>

  /** `FormFieldSet`'s static methods, made with this client's settings. */
  readonly formFieldSets: Pick<typeof FormFieldSet, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `FtpActionLog`'s static methods, made with this client's settings. */
  readonly ftpActionLogs: Pick<typeof FtpActionLog, 'all' | 'list' | 'listIterator'>

  /** `GpgKey`'s static methods, made with this client's settings. */
  readonly gpgKeys: Pick<typeof GpgKey, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `GroupUser`'s static methods, made with this client's settings. */
  readonly groupUsers: Pick<typeof GroupUser, 'all' | 'create' | 'list' | 'listIterator'>

  /** `Group`'s static methods, made with this client's settings. */
  readonly groups: Pick<typeof Group, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `History`'s static methods, made with this client's settings. */
  readonly histories: Pick<typeof History, 'all' | 'list' | 'listForFile' | 'listForFileIterator' | 'listForFolder' | 'listForFolderIterator' | 'listForUser' | 'listForUserIterator' | 'listIterator' | 'listLogins' | 'listLoginsIterator'>

  /** `HistoryExportResult`'s static methods, made with this client's settings. */
  readonly historyExportResults: Pick<typeof HistoryExportResult, 'all' | 'list' | 'listIterator'>

  /** `HistoryExport`'s static methods, made with this client's settings. */
  readonly historyExports: Pick<typeof HistoryExport, 'create' | 'find' | 'get'>

  /** `HolidayCalendar`'s static methods, made with this client's settings. */
  readonly holidayCalendars: Pick<typeof HolidayCalendar, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `HolidayRegion`'s static methods, made with this client's settings. */
  readonly holidayRegions: Pick<typeof HolidayRegion, 'getSupported' | 'getSupportedIterator'>

  /** `InboundS3Log`'s static methods, made with this client's settings. */
  readonly inboundS3Logs: Pick<typeof InboundS3Log, 'all' | 'list' | 'listIterator'>

  /** `InboxRecipient`'s static methods, made with this client's settings. */
  readonly inboxRecipients: Pick<typeof InboxRecipient, 'all' | 'create' | 'list' | 'listIterator'>

  /** `InboxRegistration`'s static methods, made with this client's settings. */
  readonly inboxRegistrations: Pick<typeof InboxRegistration, 'all' | 'list' | 'listIterator'>

  /** `InboxUpload`'s static methods, made with this client's settings. */
  readonly inboxUploads: Pick<typeof InboxUpload, 'all' | 'list' | 'listIterator'>

  /** `IntegrationCentricProfile`'s static methods, made with this client's settings. */
  readonly integrationCentricProfiles: Pick<typeof IntegrationCentricProfile, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Invoice`'s static methods, made with this client's settings. */
  readonly invoices: Pick<typeof Invoice, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `IpAddress`'s static methods, made with this client's settings. */
  readonly ipAddresses: Pick<typeof IpAddress, 'all' | 'getExavaultReserved' | 'getExavaultReservedIterator' | 'getReserved' | 'getReservedIterator' | 'getSmartfileReserved' | 'getSmartfileReservedIterator' | 'list' | 'listIterator'>

  /** `KeyLifecycleRule`'s static methods, made with this client's settings. */
  readonly keyLifecycleRules: Pick<typeof KeyLifecycleRule, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Lock`'s static methods, made with this client's settings. */
  readonly locks: Pick<typeof Lock, 'create' | 'listFor' | 'listForIterator'>

  /** `MetadataCategory`'s static methods, made with this client's settings. */
  readonly metadataCategories: Pick<typeof MetadataCategory, 'all' | 'create' | 'find' | 'get' | 'list' | 'listFor' | 'listForIterator' | 'listIterator'>

  /** `Notification`'s static methods, made with this client's settings. */
  readonly notifications: Pick<typeof Notification, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `OutboundConnectionLog`'s static methods, made with this client's settings. */
  readonly outboundConnectionLogs: Pick<typeof OutboundConnectionLog, 'all' | 'list' | 'listIterator'>

  /** `PartnerChannelTemplate`'s static methods, made with this client's settings. */
  readonly partnerChannelTemplates: Pick<typeof PartnerChannelTemplate, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `PartnerChannel`'s static methods, made with this client's settings. */
  readonly partnerChannels: Pick<typeof PartnerChannel, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `PartnerSiteRequest`'s static methods, made with this client's settings. */
  readonly partnerSiteRequests: Pick<typeof PartnerSiteRequest, 'all' | 'approve' | 'create' | 'findByPairingKey' | 'list' | 'listIterator' | 'reject'>

  /** `Partner`'s static methods, made with this client's settings. */
  readonly partners: Pick<typeof Partner, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Payment`'s static methods, made with this client's settings. */
  readonly payments: Pick<typeof Payment, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `PendingWorkEvent`'s static methods, made with this client's settings. */
  readonly pendingWorkEvents: Pick<typeof PendingWorkEvent, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Permission`'s static methods, made with this client's settings. */
  readonly permissions: Pick<typeof Permission, 'all' | 'create' | 'list' | 'listIterator'>

  /** `PublicHostingRequestLog`'s static methods, made with this client's settings. */
  readonly publicHostingRequestLogs: Pick<typeof PublicHostingRequestLog, 'all' | 'list' | 'listIterator'>

  /** `PublicKey`'s static methods, made with this client's settings. */
  readonly publicKeys: Pick<typeof PublicKey, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `RemoteBandwidthSnapshot`'s static methods, made with this client's settings. */
  readonly remoteBandwidthSnapshots: Pick<typeof RemoteBandwidthSnapshot, 'all' | 'list' | 'listIterator'>

  /** `RemoteMountBackend`'s static methods, made with this client's settings. */
  readonly remoteMountBackends: Pick<typeof RemoteMountBackend, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `RemoteServerCredential`'s static methods, made with this client's settings. */
  readonly remoteServerCredentials: Pick<typeof RemoteServerCredential, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `RemoteServer`'s static methods, made with this client's settings. */
  readonly remoteServers: Pick<typeof RemoteServer, 'all' | 'create' | 'find' | 'findConfigurationFile' | 'get' | 'list' | 'listIterator'>

  /** `Request`'s static methods, made with this client's settings. */
  readonly requests: Pick<typeof Request, 'all' | 'create' | 'getFolder' | 'getFolderIterator' | 'list' | 'listIterator'>

  /** `Restore`'s static methods, made with this client's settings. */
  readonly restores: Pick<typeof Restore, 'all' | 'create' | 'list' | 'listIterator'>

  /** `ScheduledExport`'s static methods, made with this client's settings. */
  readonly scheduledExports: Pick<typeof ScheduledExport, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Schedule`'s static methods, made with this client's settings. */
  readonly schedules: Pick<typeof Schedule, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ScimLog`'s static methods, made with this client's settings. */
  readonly scimLogs: Pick<typeof ScimLog, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Secret`'s static methods, made with this client's settings. */
  readonly secrets: Pick<typeof Secret, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Session`'s static methods, made with this client's settings. */
  readonly sessions: Pick<typeof Session, 'create' | 'delete' | 'destroy'>

  /** `SettingsChange`'s static methods, made with this client's settings. */
  readonly settingsChanges: Pick<typeof SettingsChange, 'all' | 'list' | 'listIterator'>

  /** `SftpActionLog`'s static methods, made with this client's settings. */
  readonly sftpActionLogs: Pick<typeof SftpActionLog, 'all' | 'list' | 'listIterator'>

  /** `SftpHostKey`'s static methods, made with this client's settings. */
  readonly sftpHostKeys: Pick<typeof SftpHostKey, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `ShareGroup`'s static methods, made with this client's settings. */
  readonly shareGroups: Pick<typeof ShareGroup, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `SiemHttpDestinationEvent`'s static methods, made with this client's settings. */
  readonly siemHttpDestinationEvents: Pick<typeof SiemHttpDestinationEvent, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `SiemHttpDestination`'s static methods, made with this client's settings. */
  readonly siemHttpDestinations: Pick<typeof SiemHttpDestination, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator' | 'sendTestEntry'>

  /** `SiteSubdomainRedirect`'s static methods, made with this client's settings. */
  readonly siteSubdomainRedirects: Pick<typeof SiteSubdomainRedirect, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Site`'s static methods, made with this client's settings. */
  readonly sites: Pick<typeof Site, 'get' | 'getUsage' | 'update'>

  /** `Snapshot`'s static methods, made with this client's settings. */
  readonly snapshots: Pick<typeof Snapshot, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `SsoEvent`'s static methods, made with this client's settings. */
  readonly ssoEvents: Pick<typeof SsoEvent, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `SsoStrategy`'s static methods, made with this client's settings. */
  readonly ssoStrategies: Pick<typeof SsoStrategy, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Style`'s static methods, made with this client's settings. */
  readonly styles: Pick<typeof Style, 'find' | 'get'>

  /** `SyncLog`'s static methods, made with this client's settings. */
  readonly syncLogs: Pick<typeof SyncLog, 'all' | 'list' | 'listIterator'>

  /** `SyncRun`'s static methods, made with this client's settings. */
  readonly syncRuns: Pick<typeof SyncRun, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `Sync`'s static methods, made with this client's settings. */
  readonly syncs: Pick<typeof Sync, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `UsageDailySnapshot`'s static methods, made with this client's settings. */
  readonly usageDailySnapshots: Pick<typeof UsageDailySnapshot, 'all' | 'list' | 'listIterator'>

  /** `UsageSnapshot`'s static methods, made with this client's settings. */
  readonly usageSnapshots: Pick<typeof UsageSnapshot, 'all' | 'list' | 'listIterator'>

  /** `UserAdditionalEmailRecipient`'s static methods, made with this client's settings. */
  readonly userAdditionalEmailRecipients: Pick<typeof UserAdditionalEmailRecipient, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `UserCipherUse`'s static methods, made with this client's settings. */
  readonly userCipherUses: Pick<typeof UserCipherUse, 'all' | 'list' | 'listIterator'>

  /** `UserLifecycleRule`'s static methods, made with this client's settings. */
  readonly userLifecycleRules: Pick<typeof UserLifecycleRule, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `UserRequest`'s static methods, made with this client's settings. */
  readonly userRequests: Pick<typeof UserRequest, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `UserSecurityEvent`'s static methods, made with this client's settings. */
  readonly userSecurityEvents: Pick<typeof UserSecurityEvent, 'all' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `UserSftpClientUse`'s static methods, made with this client's settings. */
  readonly userSftpClientUses: Pick<typeof UserSftpClientUse, 'all' | 'list' | 'listIterator'>

  /** `User`'s static methods, made with this client's settings. */
  readonly users: Pick<typeof User, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>

  /** `WebDavActionLog`'s static methods, made with this client's settings. */
  readonly webDavActionLogs: Pick<typeof WebDavActionLog, 'all' | 'list' | 'listIterator'>

  /** `WebhookTest`'s static methods, made with this client's settings. */
  readonly webhookTests: Pick<typeof WebhookTest, 'create'>

  /** `Workspace`'s static methods, made with this client's settings. */
  readonly workspaces: Pick<typeof Workspace, 'all' | 'create' | 'find' | 'get' | 'list' | 'listIterator'>
}

export default FilesClient
