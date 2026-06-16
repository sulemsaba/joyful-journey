#!/bin/bash
# Keep-alive respawn loop for the static dist server (production preview).
cd "$(dirname "$0")"
while true; do
  node server.mjs
  echo "Server died, restarting in 1s..." >> /tmp/server-restarts.log
  sleep 1
done
