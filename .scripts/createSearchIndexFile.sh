#!/bin/bash

# python -c 'import json, sys;json.dump(json.load(sys.stdin), sys.stdout)' < ./src/search/index.json
# jq -c . < ./src/search/index.json
jq -c . <(bash $(dirname $(realpath "$0"))/generateSearchIndex.sh ./src) > ./src/search/index.json