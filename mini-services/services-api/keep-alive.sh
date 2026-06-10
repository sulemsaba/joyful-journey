#!/bin/bash
# Keep-alive script for services-api
LOG=/tmp/services-api.log
cd /home/z/my-project/mini-services/services-api

echo "$(date): services-api keep-alive starting" >> "$LOG"

while true; do
  echo "$(date): Starting services-api..." >> "$LOG"
  bun index.ts >> "$LOG" 2>&1
  EXIT_CODE=$?
  echo "$(date): Services API exited with code $EXIT_CODE, restarting in 2s..." >> "$LOG"
  sleep 2
done
