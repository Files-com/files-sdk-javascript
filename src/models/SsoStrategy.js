import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class SsoStrategy
 */
class SsoStrategy {
  attributes = {}
  options = {}

  constructor(attributes = {}, options = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      const normalizedKey = key.replace('?', '')

      this.attributes[normalizedKey] = value

      Object.defineProperty(this, normalizedKey, { value, writable: false })
    })

    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id
  // array # SSO Protocol
  getProtocol = () => this.attributes.protocol

  // string # Provider name
  getProvider = () => this.attributes.provider

  // string # Custom label for the SSO provider on the login page.
  getLabel = () => this.attributes.label

  // string # URL holding a custom logo for the SSO provider on the login page.
  getLogoUrl = () => this.attributes.logo_url

  // int64 # ID
  getId = () => this.attributes.id

  // string # Identity provider sha256 cert fingerprint if saml_provider_metadata_url is not available.
  getSamlProviderCertFingerprint = () => this.attributes.saml_provider_cert_fingerprint

  // string # Identity provider issuer url
  getSamlProviderIssuerUrl = () => this.attributes.saml_provider_issuer_url

  // string # Custom identity provider metadata
  getSamlProviderMetadataContent = () => this.attributes.saml_provider_metadata_content

  // string # Metadata URL for the SAML identity provider
  getSamlProviderMetadataUrl = () => this.attributes.saml_provider_metadata_url

  // string # Identity provider SLO endpoint
  getSamlProviderSloTargetUrl = () => this.attributes.saml_provider_slo_target_url

  // string # Identity provider SSO endpoint if saml_provider_metadata_url is not available.
  getSamlProviderSsoTargetUrl = () => this.attributes.saml_provider_sso_target_url

  // string # SCIM authentication type.
  getScimAuthenticationMethod = () => this.attributes.scim_authentication_method

  // string # SCIM username.
  getScimUsername = () => this.attributes.scim_username

  // string # Subdomain
  getSubdomain = () => this.attributes.subdomain

  // boolean # Auto-provision users?
  getProvisionUsers = () => this.attributes.provision_users

  // boolean # Auto-provision group membership based on group memberships on the SSO side?
  getProvisionGroups = () => this.attributes.provision_groups

  // boolean # Auto-deprovision users?
  getDeprovisionUsers = () => this.attributes.deprovision_users

  // boolean # Auto-deprovision group membership based on group memberships on the SSO side?
  getDeprovisionGroups = () => this.attributes.deprovision_groups

  // string # Method used for deprovisioning users.
  getDeprovisionBehavior = () => this.attributes.deprovision_behavior

  // string # Comma-separated list of group names for groups to automatically add all auto-provisioned users to.
  getProvisionGroupDefault = () => this.attributes.provision_group_default

  // string # Comma-separated list of group names for groups (with optional wildcards) that will be excluded from auto-provisioning.
  getProvisionGroupExclusion = () => this.attributes.provision_group_exclusion

  // string # Comma-separated list of group names for groups (with optional wildcards) that will be auto-provisioned.
  getProvisionGroupInclusion = () => this.attributes.provision_group_inclusion

  // string # Comma or newline separated list of group names (with optional wildcards) to require membership for user provisioning.
  getProvisionGroupRequired = () => this.attributes.provision_group_required

  // boolean # Auto-provisioned users get Sharing permission?
  getProvisionAttachmentsPermission = () => this.attributes.provision_attachments_permission

  // boolean # Auto-provisioned users get WebDAV permission?
  getProvisionDavPermission = () => this.attributes.provision_dav_permission

  // boolean # Auto-provisioned users get FTP permission?
  getProvisionFtpPermission = () => this.attributes.provision_ftp_permission

  // boolean # Auto-provisioned users get SFTP permission?
  getProvisionSftpPermission = () => this.attributes.provision_sftp_permission

  // string # Default time zone for auto provisioned users.
  getProvisionTimeZone = () => this.attributes.provision_time_zone

  // string # Default company for auto provisioned users.
  getProvisionCompany = () => this.attributes.provision_company

  // string # Base DN for looking up users in LDAP server
  getLdapBaseDn = () => this.attributes.ldap_base_dn

  // string # Domain name that will be appended to LDAP usernames
  getLdapDomain = () => this.attributes.ldap_domain

  // boolean # Is strategy enabled?
  getEnabled = () => this.attributes.enabled

  // string # LDAP host
  getLdapHost = () => this.attributes.ldap_host

  // string # LDAP backup host
  getLdapHost2 = () => this.attributes.ldap_host_2

  // string # LDAP backup host
  getLdapHost3 = () => this.attributes.ldap_host_3

  // int64 # LDAP port
  getLdapPort = () => this.attributes.ldap_port

  // boolean # Use secure LDAP?
  getLdapSecure = () => this.attributes.ldap_secure

  // string # Username for signing in to LDAP server.
  getLdapUsername = () => this.attributes.ldap_username

  // string # LDAP username field
  getLdapUsernameField = () => this.attributes.ldap_username_field


  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  static list = async (params = {}, options = {}) => {
    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    const response = await Api.sendRequest(`/sso_strategies`, 'GET', params, options)

    return response?.data?.map(obj => new SsoStrategy(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SsoStrategy.list(params, options)

  // Parameters:
  //   id (required) - int64 - Sso Strategy ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/sso_strategies/${params['id']}`, 'GET', params, options)

    return new SsoStrategy(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SsoStrategy.find(id, params, options)
}

export default SsoStrategy
