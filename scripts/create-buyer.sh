#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
TOKEN="n7y8wHSlCEF6NDJH44h5rkGuxSYcu7yuhhkON+BrU7Y=--iZt/DeTv9pE1cXV9OFFxvbDaM43tpfRl8xqk4ZQ2vIo="

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
