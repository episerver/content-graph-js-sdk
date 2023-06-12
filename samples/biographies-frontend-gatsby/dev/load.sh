#!/bin/bash -e

set -o errexit
set -o pipefail

npx ts-node $(dirname $0)/load.data.ts
