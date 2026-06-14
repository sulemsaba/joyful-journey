#!/bin/bash
while true; do
  cd /home/z/my-project
  node node_modules/.bin/vite --port 3000 --host 0.0.0.0 2>/tmp/vite-err.log
  sleep 1
done
