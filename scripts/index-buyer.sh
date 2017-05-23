#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
TOKEN="f2k4AWSsRMij0o/wIDWVscfrB0WuddJr4MhygBeH59Y=--yLhNbRQYXfOVD1CEWZIgs+TvqKTmucYJpVXSAwhBYmg="

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \

echo
