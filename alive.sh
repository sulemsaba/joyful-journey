#!/bin/bash
cd /home/z/my-project
while true; do
  bun x vite --port 3000 --host 0.0.0.0 2>&1
  sleep 1
done
