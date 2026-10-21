#!/usr/bin/env bash

# Keep a user-level ~/.npmrc (such as a private registry) out of this run unless a userconfig is set explicitly.
export NPM_CONFIG_USERCONFIG="${NPM_CONFIG_USERCONFIG:-${npm_config_userconfig:-/dev/null}}"

# Execute running tests from same directory as current script
cd "$(dirname "$0")"

# Install dependencies, then lint, build and run the unit and type tests. The first failure ends this script with its
# status, before the contract test runs.
npm install --min-release-age=14 && \
npm run lint && \
npm run build && \
npm run test || exit

# The contract test, test/mock-contract.cjs, runs this SDK against the Files.com Mock API Server generated from the same
# public schema: the one in FILES_CONTRACT_MOCK_SERVER, as CI sets it after generating it, or else the generator's
# sibling generated/mock-server. Its --check fails, and so does this script, when that server is missing or was not
# generated from this SDK's schema; no other server, such as the files-mock-server service, stands in for it. The
# server's own with-scenario.rb then runs the test against it, on loopback with the folder-list scenario, and keeps its
# evidence in a new directory under test-results/. It allows 30 s for the server to be ready and 60 s for the test,
# and waits up to 5 s each time it stops a process group, with TERM and then KILL.
#
# The server runs with the Mock's own bundle (`bundle exec puma`, with the Mock's Gemfile), whose gems the Mock's
# setup.sh installed in Bundler's original environment: the one before a `bundle exec` above this script, such as the
# generator's, changed it. with-scenario.rb drops that caller's Gemfile, preload and Bundler variables itself, but not
# the gem paths, PATH and RUBYLIB a `bundle exec` also passes down, so it runs here in that original environment too,
# as setup.sh does. With no `bundle exec` above this script, that is the environment as it is.
mock_server="${FILES_CONTRACT_MOCK_SERVER:-../mock-server}"
schema_sha256="$(node test/mock-contract.cjs --check "${mock_server}")" || exit
run_id="javascript-$(date -u +%Y%m%dT%H%M%SZ)-$$"
out="test-results/mock-contract-${run_id}"
ruby -rbundler -e 'Bundler.with_original_env { exec(RbConfig.ruby, *ARGV) }' -- \
  "${mock_server}/with-scenario.rb" --scenario folder-list --out "${out}" --run-id "${run_id}" \
  --schema-sha256 "${schema_sha256}" --startup-timeout 30 --consumer-timeout 60 --settle-timeout 5 \
  -- "$(command -v node)" "${PWD}/test/mock-contract.cjs"
status=$?

# The run's record goes to the log as well, since a failed job's artifacts may not be kept: run.json, and, after a
# failure, the end of the server's own output, server.log, which says why a server that was never ready stopped.
echo "The Mock contract test ended with status ${status}; its evidence is in ${PWD}/${out}"
if [[ -f "${out}/run.json" ]]; then
  cat "${out}/run.json"
fi
if [[ "${status}" -ne 0 && -f "${out}/server.log" ]]; then
  echo "The last 200 lines of the Mock server's log, ${PWD}/${out}/server.log:"
  tail -n 200 "${out}/server.log"
fi

exit "${status}"
