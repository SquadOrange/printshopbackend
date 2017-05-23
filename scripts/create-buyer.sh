#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
TOKEN="lYhQw2KiKU3zNZVP0MLHkMyix41TYW11XZ2Kk/UV8Dc=--dWY/cNKuhqs619o30eeKERMAJExlQG6ssRXbkcKP/rs="

curl "${API}${URL_PATH}" \
 --include \
 --request POST \
 --header "Content-Type: application/json" \
 --header "Authorization: Token token=${TOKEN}" \
 --data '{
   "buyer": {
     "cart": [{
       "quantity": "5",
       "idNum": "1",
       "purchased": "true"
     }]
   }
  }'

echo
