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

# A failed contract test ends this script with its status, before the canonical namespace case runs.
if [[ "${status}" -ne 0 ]]; then
  exit "${status}"
fi

# The canonical namespace case, test/scenarios/namespace.cjs, rendered from the shared API scenarios
# (verification/scenarios/api.json), runs the files.owned-folder-namespace scenario through this SDK against a new
# server of the same Mock, loaded with its api-scenarios-canonical preset, through the same with-scenario.rb in
# Bundler's original environment. It checks that the Mock in the directory it is given was generated from this SDK's
# Swagger document, and keeps its evidence in a directory of its own under test-results/: the launcher's records and
# the case's own receipt, javascript-namespace-case.json. The case allows itself 180 s, and 30 s more to remove what
# it created after a failure, so the launcher allows it 210 s.
mock_server_dir="$(cd "${mock_server}" && pwd)" || exit
namespace_run_id="javascript-namespace-$(date -u +%Y%m%dT%H%M%SZ)-$$"
namespace_out="test-results/mock-namespace-${namespace_run_id}"
ruby -rbundler -e 'Bundler.with_original_env { exec(RbConfig.ruby, *ARGV) }' -- \
  "${mock_server}/with-scenario.rb" --scenario api-scenarios-canonical --out "${namespace_out}" \
  --run-id "${namespace_run_id}" --schema-sha256 "${schema_sha256}" --startup-timeout 30 --consumer-timeout 210 \
  --settle-timeout 5 -- "$(command -v node)" "${PWD}/test/scenarios/namespace.cjs" "${mock_server_dir}"
namespace_status=$?

echo "The canonical namespace case ended with status ${namespace_status}; its evidence is in ${PWD}/${namespace_out}"
if [[ -f "${namespace_out}/run.json" ]]; then
  cat "${namespace_out}/run.json"
fi
if [[ -f "${namespace_out}/javascript-namespace-case.json" ]]; then
  cat "${namespace_out}/javascript-namespace-case.json"
fi
if [[ "${namespace_status}" -ne 0 && -f "${namespace_out}/server.log" ]]; then
  echo "The last 200 lines of the Mock server's log, ${PWD}/${namespace_out}/server.log:"
  tail -n 200 "${namespace_out}/server.log"
fi

# A failed namespace case ends this script with its status, before the file cases run.
if [[ "${namespace_status}" -ne 0 ]]; then
  exit "${namespace_status}"
fi

# The canonical file cases, test/scenarios/file-scenarios.cjs, rendered from the same shared API scenarios, run its
# three scenarios of files and folders (files.owned-binary-roundtrip, files.owned-namespace-extended and
# files.owned-directory-helpers) one at a time. Each case gets a new server of the same Mock, with the same preset and
# launcher in Bundler's original environment, and is given the Mock's directory and its scenario's id. Each keeps its
# evidence in a directory of its own under test-results/, with its receipt, javascript-<scenario>-case.json. Each has
# the namespace case's budgets: 30 s for the server to be ready, 210 s for the case (180 s of work and 30 s more to
# remove what it created after a failure), and 5 s each time a process group is stopped. Their larger uploads send parts
# bigger than the 1 MiB request body a Mock server takes by default, so each server runs with FILES_MOCK_MAX_BODY_BYTES
# of 16 MiB unless another is set. The first case to fail ends this script with its status.
file_max_body_bytes="${FILES_MOCK_MAX_BODY_BYTES:-16777216}"
for file_scenario in files.owned-binary-roundtrip files.owned-namespace-extended files.owned-directory-helpers; do
  # A run ID with-scenario.rb accepts is at most 64 letters, digits, dots, hyphens and underscores: the scenario's own
  # part of its ID keeps it within that whatever the process ID.
  file_run_id="javascript-${file_scenario#files.owned-}-$(date -u +%Y%m%dT%H%M%SZ)-$$"
  file_out="test-results/mock-${file_run_id}"
  FILES_MOCK_MAX_BODY_BYTES="${file_max_body_bytes}" ruby -rbundler -e 'Bundler.with_original_env { exec(RbConfig.ruby, *ARGV) }' -- \
    "${mock_server}/with-scenario.rb" --scenario api-scenarios-canonical --out "${file_out}" \
    --run-id "${file_run_id}" --schema-sha256 "${schema_sha256}" --startup-timeout 30 --consumer-timeout 210 \
    --settle-timeout 5 -- "$(command -v node)" "${PWD}/test/scenarios/file-scenarios.cjs" "${mock_server_dir}" "${file_scenario}"
  file_status=$?

  echo "The canonical file case ${file_scenario} ended with status ${file_status}; its evidence is in ${PWD}/${file_out}"
  if [[ -f "${file_out}/run.json" ]]; then
    cat "${file_out}/run.json"
  fi
  if [[ -f "${file_out}/javascript-${file_scenario}-case.json" ]]; then
    cat "${file_out}/javascript-${file_scenario}-case.json"
  fi
  if [[ "${file_status}" -ne 0 && -f "${file_out}/server.log" ]]; then
    echo "The last 200 lines of the Mock server's log, ${PWD}/${file_out}/server.log:"
    tail -n 200 "${file_out}/server.log"
  fi

  if [[ "${file_status}" -ne 0 ]]; then
    exit "${file_status}"
  fi
done

exit 0
