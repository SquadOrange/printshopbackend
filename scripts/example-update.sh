#!/bin/bash

API="http://localhost:4741"
URL_PATH="/examples"
TEXT="Update"
TOKEN="lYhQw2KiKU3zNZVP0MLHkMyix41TYW11XZ2Kk/UV8Dc=--dWY/cNKuhqs619o30eeKERMAJExlQG6ssRXbkcKP/rs="
ID="5923493e26fd8554b4c6096a"


curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "example": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
