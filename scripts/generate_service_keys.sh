#!/bin/bash


touch ../key.json
echo '{
        "type": "service_account",
        "project_id":"'$1'",
        "private_key_id":"'$2'",
        "private_key":"'$3'",
        "client_email":"'$4'",
        "client_id":"'$5'",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/625232033576-compute%40developer.gserviceaccount.com"
      }' > key.json