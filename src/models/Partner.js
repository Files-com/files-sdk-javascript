/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class Partner
 */
class Partner {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // boolean # Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  getAllowBypassing2faPolicies = () => this.attributes.allow_bypassing_2fa_policies

  setAllowBypassing2faPolicies = value => {
    this.attributes.allow_bypassing_2fa_policies = value
    exposeAttributes(this, ['allow_bypassing_2fa_policies'])
  }

  // string # A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches the Partner, User, or Site allowed IP lists.
  getAllowedIps = () => this.attributes.allowed_ips

  setAllowedIps = value => {
    this.attributes.allowed_ips = value
    exposeAttributes(this, ['allowed_ips'])
  }

  // boolean # Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  getAllowCredentialChanges = () => this.attributes.allow_credential_changes

  setAllowCredentialChanges = value => {
    this.attributes.allow_credential_changes = value
    exposeAttributes(this, ['allow_credential_changes'])
  }

  // boolean # Allow Partner Admins to provide GPG keys.
  getAllowProvidingGpgKeys = () => this.attributes.allow_providing_gpg_keys

  setAllowProvidingGpgKeys = value => {
    this.attributes.allow_providing_gpg_keys = value
    exposeAttributes(this, ['allow_providing_gpg_keys'])
  }

  // boolean # Allow Partner Admins to create users.
  getAllowUserCreation = () => this.attributes.allow_user_creation

  setAllowUserCreation = value => {
    this.attributes.allow_user_creation = value
    exposeAttributes(this, ['allow_user_creation'])
  }

  // boolean # When `true`, emails sent to Partner users are copied to the responsible User or Group.
  getCcEmailsToResponsibleParty = () => this.attributes.cc_emails_to_responsible_party

  setCcEmailsToResponsibleParty = value => {
    this.attributes.cc_emails_to_responsible_party = value
    exposeAttributes(this, ['cc_emails_to_responsible_party'])
  }

  // array(object) # Approved Connected Sites relationships for this Partner, in both directions. Empty when this Partner has no connections. Read-only.
  getConnections = () => this.attributes.connections

  setConnections = value => {
    this.attributes.connections = value
    exposeAttributes(this, ['connections'])
  }

  // int64 # The unique ID of the Partner.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct per-user assignment overrides it.
  getAiAssistantPersonalityId = () => this.attributes.ai_assistant_personality_id

  setAiAssistantPersonalityId = value => {
    this.attributes.ai_assistant_personality_id = value
    exposeAttributes(this, ['ai_assistant_personality_id'])
  }

  // int64 # ID of the Workspace associated with this Partner.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # The name of the Partner.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Notes about this Partner.
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
    exposeAttributes(this, ['notes'])
  }

  // array(int64) # Array of User IDs that are Partner Admins for this Partner.
  getPartnerAdminIds = () => this.attributes.partner_admin_ids

  setPartnerAdminIds = value => {
    this.attributes.partner_admin_ids = value
    exposeAttributes(this, ['partner_admin_ids'])
  }

  // int64 # ID of the Partner Channel Template assigned to this Partner.
  getPartnerChannelTemplateId = () => this.attributes.partner_channel_template_id

  setPartnerChannelTemplateId = value => {
    this.attributes.partner_channel_template_id = value
    exposeAttributes(this, ['partner_channel_template_id'])
  }

  // string # This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured. `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot hold users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that is also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together with a `root_folder`.
  getPartnershipRole = () => this.attributes.partnership_role

  setPartnershipRole = value => {
    this.attributes.partnership_role = value
    exposeAttributes(this, ['partnership_role'])
  }

  // int64 # ID of the Group responsible for this Partner.
  getResponsibleGroupId = () => this.attributes.responsible_group_id

  setResponsibleGroupId = value => {
    this.attributes.responsible_group_id = value
    exposeAttributes(this, ['responsible_group_id'])
  }

  // int64 # ID of the User responsible for this Partner.
  getResponsibleUserId = () => this.attributes.responsible_user_id

  setResponsibleUserId = value => {
    this.attributes.responsible_user_id = value
    exposeAttributes(this, ['responsible_user_id'])
  }

  // string # The root folder path for this Partner.
  getRootFolder = () => this.attributes.root_folder

  setRootFolder = value => {
    this.attributes.root_folder = value
    exposeAttributes(this, ['root_folder'])
  }

  // boolean # Show Partner users a simplified home page built from this Partner's Channels.
  getShowPartnerChannelHomePage = () => this.attributes.show_partner_channel_home_page

  setShowPartnerChannelHomePage = value => {
    this.attributes.show_partner_channel_home_page = value
    exposeAttributes(this, ['show_partner_channel_home_page'])
  }

  // string # Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  getTags = () => this.attributes.tags

  setTags = value => {
    this.attributes.tags = value
    exposeAttributes(this, ['tags'])
  }

  // array(int64) # Array of User IDs that belong to this Partner.
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
    exposeAttributes(this, ['user_ids'])
  }

  // Parameters:
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct per-user assignment overrides it.
  //   allowed_ips - string - A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches the Partner, User, or Site allowed IP lists.
  //   allow_bypassing_2fa_policies - boolean - Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  //   allow_credential_changes - boolean - Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  //   allow_providing_gpg_keys - boolean - Allow Partner Admins to provide GPG keys.
  //   allow_user_creation - boolean - Allow Partner Admins to create users.
  //   cc_emails_to_responsible_party - boolean - When `true`, emails sent to Partner users are copied to the responsible User or Group.
  //   notes - string - Notes about this Partner.
  //   partner_channel_template_id - int64 - ID of the Partner Channel Template assigned to this Partner.
  //   responsible_group_id - int64 - ID of the Group responsible for this Partner.
  //   responsible_user_id - int64 - ID of the User responsible for this Partner.
  //   show_partner_channel_home_page - boolean - Show Partner users a simplified home page built from this Partner's Channels.
  //   tags - string - Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   name - string - The name of the Partner.
  //   partnership_role - string - This site's role for this Partner in Connected Sites relationships. `host` is a Partner this site configured. `guest` is a Partner created by approving another site's connection request; it has no root folder and cannot hold users, permissions, or Partner Channels, or host a connection. `host_and_guest` is a configured Partner that is also the guest side of a connection. Promote a `guest` Partner by setting this to `host_and_guest` together with a `root_folder`.
  //   root_folder - string - The root folder path for this Partner.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (isArray(params.allow_bypassing_2fa_policies) || isObject(params.allow_bypassing_2fa_policies)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_bypassing_2fa_policies must be of type Boolean, received ${getType(params.allow_bypassing_2fa_policies)}`)
    }

    if (isArray(params.allow_credential_changes) || isObject(params.allow_credential_changes)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_credential_changes must be of type Boolean, received ${getType(params.allow_credential_changes)}`)
    }

    if (isArray(params.allow_providing_gpg_keys) || isObject(params.allow_providing_gpg_keys)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_providing_gpg_keys must be of type Boolean, received ${getType(params.allow_providing_gpg_keys)}`)
    }

    if (isArray(params.allow_user_creation) || isObject(params.allow_user_creation)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_user_creation must be of type Boolean, received ${getType(params.allow_user_creation)}`)
    }

    if (isArray(params.cc_emails_to_responsible_party) || isObject(params.cc_emails_to_responsible_party)) {
      throw new errors.InvalidParameterError(`Bad parameter: cc_emails_to_responsible_party must be of type Boolean, received ${getType(params.cc_emails_to_responsible_party)}`)
    }

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.partner_channel_template_id !== undefined && params.partner_channel_template_id !== null && !isInt(params.partner_channel_template_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_channel_template_id must be of type Int, received ${getType(params.partner_channel_template_id)}`)
    }

    if (params.responsible_group_id !== undefined && params.responsible_group_id !== null && !isInt(params.responsible_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_group_id must be of type Int, received ${getType(params.responsible_group_id)}`)
    }

    if (params.responsible_user_id !== undefined && params.responsible_user_id !== null && !isInt(params.responsible_user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_user_id must be of type Int, received ${getType(params.responsible_user_id)}`)
    }

    if (isArray(params.show_partner_channel_home_page) || isObject(params.show_partner_channel_home_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: show_partner_channel_home_page must be of type Boolean, received ${getType(params.show_partner_channel_home_page)}`)
    }

    if (params.tags !== undefined && params.tags !== null && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.partnership_role !== undefined && params.partnership_role !== null && !isString(params.partnership_role)) {
      throw new errors.InvalidParameterError(`Bad parameter: partnership_role must be of type String, received ${getType(params.partnership_role)}`)
    }

    if (params.root_folder !== undefined && params.root_folder !== null && !isString(params.root_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: root_folder must be of type String, received ${getType(params.root_folder)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Partner.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partners', 'GET', params, options)

    return response?.data?.map(obj => new Partner(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Partner.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Partner.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Partner ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Partner(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Partner.find(id, params, options)

  // Parameters:
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Partner, if any. Users in the Partner inherit it unless a direct per-user assignment overrides it.
  //   allowed_ips - string - A list of allowed IPs for this Partner. Newline delimited. Partner User IP access is allowed when the IP matches the Partner, User, or Site allowed IP lists.
  //   allow_bypassing_2fa_policies - boolean - Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  //   allow_credential_changes - boolean - Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  //   allow_providing_gpg_keys - boolean - Allow Partner Admins to provide GPG keys.
  //   allow_user_creation - boolean - Allow Partner Admins to create users.
  //   cc_emails_to_responsible_party - boolean - When `true`, emails sent to Partner users are copied to the responsible User or Group.
  //   notes - string - Notes about this Partner.
  //   partner_channel_template_id - int64 - ID of the Partner Channel Template assigned to this Partner.
  //   responsible_group_id - int64 - ID of the Group responsible for this Partner.
  //   responsible_user_id - int64 - ID of the User responsible for this Partner.
  //   show_partner_channel_home_page - boolean - Show Partner users a simplified home page built from this Partner's Channels.
  //   tags - string - Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   name (required) - string - The name of the Partner.
  //   root_folder (required) - string - The root folder path for this Partner.
  //   workspace_id - int64 - ID of the Workspace associated with this Partner.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.root_folder) {
      throw new errors.MissingParameterError('Parameter missing: root_folder')
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (isArray(params.allow_bypassing_2fa_policies) || isObject(params.allow_bypassing_2fa_policies)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_bypassing_2fa_policies must be of type Boolean, received ${getType(params.allow_bypassing_2fa_policies)}`)
    }

    if (isArray(params.allow_credential_changes) || isObject(params.allow_credential_changes)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_credential_changes must be of type Boolean, received ${getType(params.allow_credential_changes)}`)
    }

    if (isArray(params.allow_providing_gpg_keys) || isObject(params.allow_providing_gpg_keys)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_providing_gpg_keys must be of type Boolean, received ${getType(params.allow_providing_gpg_keys)}`)
    }

    if (isArray(params.allow_user_creation) || isObject(params.allow_user_creation)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_user_creation must be of type Boolean, received ${getType(params.allow_user_creation)}`)
    }

    if (isArray(params.cc_emails_to_responsible_party) || isObject(params.cc_emails_to_responsible_party)) {
      throw new errors.InvalidParameterError(`Bad parameter: cc_emails_to_responsible_party must be of type Boolean, received ${getType(params.cc_emails_to_responsible_party)}`)
    }

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.partner_channel_template_id !== undefined && params.partner_channel_template_id !== null && !isInt(params.partner_channel_template_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_channel_template_id must be of type Int, received ${getType(params.partner_channel_template_id)}`)
    }

    if (params.responsible_group_id !== undefined && params.responsible_group_id !== null && !isInt(params.responsible_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_group_id must be of type Int, received ${getType(params.responsible_group_id)}`)
    }

    if (params.responsible_user_id !== undefined && params.responsible_user_id !== null && !isInt(params.responsible_user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_user_id must be of type Int, received ${getType(params.responsible_user_id)}`)
    }

    if (isArray(params.show_partner_channel_home_page) || isObject(params.show_partner_channel_home_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: show_partner_channel_home_page must be of type Boolean, received ${getType(params.show_partner_channel_home_page)}`)
    }

    if (params.tags !== undefined && params.tags !== null && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.root_folder !== undefined && params.root_folder !== null && !isString(params.root_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: root_folder must be of type String, received ${getType(params.root_folder)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/partners', 'POST', params, options)

    return new Partner(response?.data, retainedOptions(options))
  }
}

export default Partner

module.exports = Partner
module.exports.default = Partner
