#!/bin/bash
# Keep-alive respawn loop for the services-api backend.
LOG=/tmp/services-api.log
cd "$(dirname "$0")"

echo "$(date): services-api keep-alive starting" >> "$LOG"

while true; do
  echo "$(date): Starting services-api..." >> "$LOG"
  bun index.ts >> "$LOG" 2>&1
  EXIT_CODE=$?
  echo "$(date): Services API exited with code $EXIT_CODE, restarting in 2s..." >> "$LOG"
  sleep 2
done
