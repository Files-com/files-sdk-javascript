#!/usr/bin/env bash

# Keep a user-level ~/.npmrc (such as a private registry) out of this run unless a userconfig is set explicitly.
export NPM_CONFIG_USERCONFIG="${NPM_CONFIG_USERCONFIG:-${npm_config_userconfig:-/dev/null}}"

# Execute running tests from same directory as current script
cd "$(dirname "$0")"

# Install dependencies
npm install --min-release-age=14 && \
npm run lint && \
npm run build && \
npm run test
