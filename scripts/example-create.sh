#!/bin/bash

API="http://localhost:4741"
URL_PATH="/examples"
TOKEN="tTE3hTL249/fCsF8pWKBLNNMgDAQSsBtswZ4uNpQf3M=--SqvxflVZrp0aZtf4mZCZKcV+mfLDutqibwh/lFelF9E="
TEXT="Hi"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "example": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
