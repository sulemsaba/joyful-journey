#!/bin/bash
# This script runs the dev server and keeps it alive.
# It respawns the server if it dies.

LOG=/home/z/my-project/dev.log
cd /home/z/my-project

echo "$(date): spawn-server.sh starting" >> "$LOG"

while true; do
  echo "$(date): Starting vite dev server..." >> "$LOG"
  node node_modules/vite/bin/vite.js --port 3000 --host >> "$LOG" 2>&1
  EXIT_CODE=$?
  echo "$(date): Vite exited with code $EXIT_CODE, restarting in 2s..." >> "$LOG"
  sleep 2
done
