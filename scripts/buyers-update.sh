#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
ID="592448d40eecfe13fb17f21d"
TOKEN="qCqa+PANuJeeJc8SJdCmJsctjSz/Flt7xd6UdtQwNYE=--23kfB5WTMHwnJx0DSKYowWBSr95/baiQVCqdzm1Ol70="

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "buyer": {
      "cart": [{
        "quantity": "411",
        "idNum": "1",
        "purchased": "true"
      }]
    }
   }'

echo
