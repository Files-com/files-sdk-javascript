#!/usr/bin/env bash

# Execute running tests from same directory as current script
cd "$(dirname "$0")"

# Install dependencies
npm install

npm run lint
npm run test