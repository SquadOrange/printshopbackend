#!/bin/bash

API="http://localhost:4741"
URL_PATH="/buyers"
TOKEN="tTE3hTL249/fCsF8pWKBLNNMgDAQSsBtswZ4uNpQf3M=--SqvxflVZrp0aZtf4mZCZKcV+mfLDutqibwh/lFelF9E="

curl "${API}${URL_PATH}" \
 --include \
 --request POST \
 --header "Content-Type: application/json" \
 --header "Authorization: Token token=${TOKEN}" \
 --data '[{
   "cart": {
     "quantity": "7",
     "idNum": "4"
   }
 }]'

echo
