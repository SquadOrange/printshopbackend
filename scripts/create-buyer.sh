#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
TOKEN="nme0G9D4O0zlOrXOsrUEzXBeQuvSmLEuCpDvDCzbxWE=--BtK0NphiJt15MCZYMXDHrfO66zrUjnTr/jl3gemH7NE="

curl "${API}${URL_PATH}" \
 --include \
 --request POST \
 --header "Content-Type: application/json" \
 --header "Authorization: Token token=${TOKEN}" \
 --data '{
   "buyer": {
     "cart": [{
       "quantity": "4",
       "idNum": "1",
       "purchased": "true"
     }]
   }
  }'

echo
