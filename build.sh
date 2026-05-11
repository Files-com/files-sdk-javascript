#!/usr/bin/env bash

rm -f ~/.npmrc
rm -f ~/.yarnrc
npm install --min-release-age=14 && npm run build
