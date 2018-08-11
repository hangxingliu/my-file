#!/usr/bin/env bash

__DIRNAME=`cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd`;
pushd "$__DIRNAME/..";

set -x;
npm install --save-dev @types/node;
cp ./node_modules/@types/node/index.d.ts node.d.ts;
npm uninstall @types/node;
set +x;
