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
 * Class EventSubscription
 */
class EventSubscription {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Event Subscription ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Event Channel ID
  getEventChannelId = () => this.attributes.event_channel_id

  setEventChannelId = value => {
    this.attributes.event_channel_id = value
    exposeAttributes(this, ['event_channel_id'])
  }

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // boolean # If true, this default-workspace subscription applies to events from all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
    exposeAttributes(this, ['apply_to_all_workspaces'])
  }

  // string # Event Subscription name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Custom subject line to use for notification emails.
  getSubject = () => this.attributes.subject

  setSubject = value => {
    this.attributes.subject = value
    exposeAttributes(this, ['subject'])
  }

  // string # Custom message to include in notification emails.
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
    exposeAttributes(this, ['message'])
  }

  // boolean # If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
  getMessageOnly = () => this.attributes.message_only

  setMessageOnly = value => {
    this.attributes.message_only = value
    exposeAttributes(this, ['message_only'])
  }

  // boolean # Whether this Event Subscription can dispatch events.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
    exposeAttributes(this, ['enabled'])
  }

  // array(string) # Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
  getEventTypes = () => this.attributes.event_types

  setEventTypes = value => {
    this.attributes.event_types = value
    exposeAttributes(this, ['event_types'])
  }

  // object # Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
  getFilter = () => this.attributes.filter

  setFilter = value => {
    this.attributes.filter = value
    exposeAttributes(this, ['filter'])
  }

  // object # Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy.
  getDeliveryPolicy = () => this.attributes.delivery_policy

  setDeliveryPolicy = value => {
    this.attributes.delivery_policy = value
    exposeAttributes(this, ['delivery_policy'])
  }

  // array(int64) # Event Target IDs this subscription sends to.
  getEventTargetIds = () => this.attributes.event_target_ids

  setEventTargetIds = value => {
    this.attributes.event_target_ids = value
    exposeAttributes(this, ['event_target_ids'])
  }

  // date-time # Event Subscription create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Event Subscription update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   event_channel_id - int64 - Event Channel ID
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
  //   name - string - Event Subscription name.
  //   subject - string - Custom subject line to use for notification emails.
  //   message - string - Custom message to include in notification emails.
  //   message_only - boolean - If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
  //   enabled - boolean - Whether this Event Subscription can dispatch events.
  //   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
  //   filter - object - Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
  //   delivery_policy - object - Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy.
  //   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
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

    if (params.event_channel_id !== undefined && params.event_channel_id !== null && !isInt(params.event_channel_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_channel_id must be of type Int, received ${getType(params.event_channel_id)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.subject !== undefined && params.subject !== null && !isString(params.subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(params.subject)}`)
    }

    if (params.message !== undefined && params.message !== null && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (isArray(params.message_only) || isObject(params.message_only)) {
      throw new errors.InvalidParameterError(`Bad parameter: message_only must be of type Boolean, received ${getType(params.message_only)}`)
    }

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (params.event_types !== undefined && params.event_types !== null && !isArray(params.event_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_types must be of type Array, received ${getType(params.event_types)}`)
    }

    if (params.event_target_ids !== undefined && params.event_target_ids !== null && !isArray(params.event_target_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_target_ids must be of type Array, received ${getType(params.event_target_ids)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await EventSubscription.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `enabled`, `event_channel_id` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `event_channel_id` or `workspace_id`. Valid field combinations are `[ enabled, event_channel_id ]`, `[ workspace_id, enabled ]`, `[ workspace_id, event_channel_id ]` or `[ workspace_id, enabled, event_channel_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_subscriptions', 'GET', params, options)

    return response?.data?.map(obj => new EventSubscription(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    EventSubscription.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      EventSubscription.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Event Subscription ID.
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

    const response = await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventSubscription(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    EventSubscription.find(id, params, options)

  // Parameters:
  //   event_channel_id - int64 - Event Channel ID
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
  //   name (required) - string - Event Subscription name.
  //   subject - string - Custom subject line to use for notification emails.
  //   message - string - Custom message to include in notification emails.
  //   message_only - boolean - If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
  //   enabled - boolean - Whether this Event Subscription can dispatch events.
  //   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
  //   filter - object - Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
  //   delivery_policy - object - Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy.
  //   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.event_channel_id !== undefined && params.event_channel_id !== null && !isInt(params.event_channel_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_channel_id must be of type Int, received ${getType(params.event_channel_id)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.subject !== undefined && params.subject !== null && !isString(params.subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(params.subject)}`)
    }

    if (params.message !== undefined && params.message !== null && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (isArray(params.message_only) || isObject(params.message_only)) {
      throw new errors.InvalidParameterError(`Bad parameter: message_only must be of type Boolean, received ${getType(params.message_only)}`)
    }

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (params.event_types !== undefined && params.event_types !== null && !isArray(params.event_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_types must be of type Array, received ${getType(params.event_types)}`)
    }

    if (params.event_target_ids !== undefined && params.event_target_ids !== null && !isArray(params.event_target_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_target_ids must be of type Array, received ${getType(params.event_target_ids)}`)
    }

    const response = await Api.sendRequest('/event_subscriptions', 'POST', params, options)

    return new EventSubscription(response?.data, retainedOptions(options))
  }
}

export default EventSubscription

module.exports = EventSubscription
module.exports.default = EventSubscription
