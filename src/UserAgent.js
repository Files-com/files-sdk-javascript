import { sdkMetadata } from './isomorphic/UserAgent.node'

// The SDK's default User-Agent is its identity, `Files.com JavaScript SDK v<version>`, the version being the one
// push_release.rb stamps in Files.js. In Node.js, one comment of advisory metadata of the platform follows it:
//
//   Files.com JavaScript SDK v<version> (files-sdk-meta/1; os=<os>; runtime=node/<Node.js version>)
//
// The platform's provider is chosen by the package's browser mapping, never by what the runtime seems to be (see
// isomorphic/UserAgent.node.js and UserAgent.browser.js): a browser bundle's has no metadata, and its default is the
// identity alone, as it always was. A User-Agent an application sets, globally or for a client, is sent as given.

// The bounds of the comment, as the API reads it: an OS of 1 to 16 lower-case letters, digits and hyphens, beginning
// with a letter; a runtime name of 1 to 24 of them; and a runtime version of 1 to 48 letters, digits, dots, plus signs,
// underscores and hyphens, beginning with a digit, after the name and a slash. The comment, its leading space included,
// is at most 128 bytes, and the whole User-Agent at most 190. Everything in the comment is ASCII, so its bytes are its
// characters.
const OS = /^[a-z][a-z0-9-]{0,15}$/
const RUNTIME_NAME = /^[a-z][a-z0-9-]{0,23}$/
const RUNTIME_VERSION = /^[0-9][A-Za-z0-9.+_-]{0,47}$/
const MAX_COMMENT_BYTES = 128
const MAX_USER_AGENT_BYTES = 190

// value when it is a string within domain, or else null.
const tokenOf = (value, domain) => (typeof value === 'string' && domain.test(value) ? value : null)

// identity followed by the comment of metadata, { os, runtime, runtimeVersion }, each part within its bounds: an OS that
// is not is unknown; a runtime name that is not is left out, its version with it; and a runtime version that is not is
// left out, as it is when the whole User-Agent would otherwise be too long. identity alone, never shortened, when even
// the comment without a version would make it too long.
export const userAgentWithMetadata = (identity, { os, runtime, runtimeVersion } = {}) => {
  const name = tokenOf(runtime, RUNTIME_NAME)
  const version = name === null ? null : tokenOf(runtimeVersion, RUNTIME_VERSION)
  const runtimeField = name === null ? '' : `; runtime=${name}`
  const head = ` (files-sdk-meta/1; os=${tokenOf(os, OS) ?? 'unknown'}${runtimeField}`
  const comments = version === null ? [`${head})`] : [`${head}/${version})`, `${head})`]
  const fits = candidate => candidate.length <= MAX_COMMENT_BYTES && identity.length + candidate.length <= MAX_USER_AGENT_BYTES
  const comment = comments.find(fits)

  return comment === undefined ? identity : `${identity}${comment}`
}

// The SDK's default User-Agent for its identity: with the platform's metadata in Node.js, or alone in a browser bundle,
// whose provider has none.
export const defaultUserAgentOf = identity => {
  const metadata = sdkMetadata()
  return metadata ? userAgentWithMetadata(identity, metadata) : identity
}
