// The platform's metadata in Node.js, for the SDK's default User-Agent (see UserAgent.js): the coarse family of the
// platform Node.js reports, windows for its win32, macos for its darwin and any other, such as linux, as it names it;
// and Node.js's own version: of scope's process, the global one by default. Nothing else of the machine is read: no
// host, kernel, architecture, environment or subprocess. A browser bundle maps this file to UserAgent.browser.js (see
// package.json).

// The platforms Node.js names otherwise than by their family.
const FAMILIES = new Map([['darwin', 'macos'], ['win32', 'windows']])

export const sdkMetadata = (scope = globalThis) => {
  const platform = scope?.process?.platform

  return {
    os: FAMILIES.get(platform) ?? platform,
    runtime: 'node',
    runtimeVersion: scope?.process?.versions?.node,
  }
}
