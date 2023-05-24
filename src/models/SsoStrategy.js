import Api from '../Api'
import * as errors from '../Errors'
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
  // string # SSO Protocol
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

  // string # SCIM OAuth Access Token.
  getScimOauthAccessToken = () => this.attributes.scim_oauth_access_token

  // string # SCIM OAuth Access Token Expiration Time.
  getScimOauthAccessTokenExpiresAt = () => this.attributes.scim_oauth_access_token_expires_at

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

  // string # Comma-separated list of group names whose members will be created with email_signup authentication.
  getProvisionEmailSignupGroups = () => this.attributes.provision_email_signup_groups

  // string # Comma-separated list of group names whose members will be created as Site Admins.
  getProvisionSiteAdminGroups = () => this.attributes.provision_site_admin_groups

  // string # Comma-separated list of group names whose members will be provisioned as Group Admins.
  getProvisionGroupAdminGroups = () => this.attributes.provision_group_admin_groups

  // boolean # DEPRECATED: Auto-provisioned users get Sharing permission. Use a Group with the Bundle permission instead.
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

  // boolean # Is strategy enabled?  This may become automatically set to `false` after a high number and duration of failures.
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


  // Synchronize provisioning data with the SSO remote server
  sync = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/sso_strategies/${encodeURIComponent(params['id'])}/sync`, 'POST', params, this.options)

    return response?.data
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
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
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/sso_strategies/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new SsoStrategy(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SsoStrategy.find(id, params, options)
}

export default SsoStrategy
