#!/bin/bash
cd /home/z/my-project
while true; do
  npx vite --port 3000 --host 0.0.0.0 2>&1
  echo "Vite died, restarting in 2s..."
  sleep 2
done
