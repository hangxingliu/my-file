#!/usr/bin/env bash

__DIRNAME=`cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd`;
pushd "$__DIRNAME/../assets";

function throw() { echo -e "fatal: $1\nexit with code 1;"; exit 1; }

curl --fail --output /tmp/node.gitignore \
	https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore \
	|| throw "fetch Node.gitignore failed!";

echo -e "# This git ignore is modified from:" > node.gitignore;
echo -e "#   https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore\n" >> node.gitignore;
cat /tmp/node.gitignore >> node.gitignore;
