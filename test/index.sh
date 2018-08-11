#!/usr/bin/env bash

__DIRNAME=`cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd`;
pushd "$__DIRNAME" > /dev/null;

function throw() { echo -e "fatal: $1\nexit with code 1;"; exit 1; }

if [[ ! -d env ]]; then mkdir env || throw "create directory failed!"; fi
pushd env;

echo "# normal usage (single file)";
../../bin gpl3 || throw '"../../bin gpl3" failed!';

echo "# normal usage (single file & file is existed)";
../../bin gpl3 && throw '"../../bin gpl3" success!';

echo "# with --force (single file & file is existed)";
../../bin gpl3 -f || throw '"../../bin gpl3 -f" failed!';
../../bin -f gpl3 || throw '"../../bin -f gpl3" failed!';
../../bin --force gpl3 || throw '"../../bin --force gpl3" failed!';
../../bin gpl3 --force || throw '"../../bin gpl3 --force" failed!';

echo "# muliple files";
../../bin editorconfig node-travis || throw '"../../bin editorconfig node-travis" failed!';

popd;
rm -rf env || throw "clean directory failed!";

echo "# all tests are passed!";
