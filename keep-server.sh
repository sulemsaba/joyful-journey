#!/bin/bash
while true; do
  node /home/z/my-project/server.mjs
  echo "Server died, restarting in 1s..." >> /tmp/server-restarts.log
  sleep 1
done
