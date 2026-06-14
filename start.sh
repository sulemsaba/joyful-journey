#!/bin/bash
cd /home/z/my-project/mini-services/services-api
bun --hot index.ts &
sleep 2
cd /home/z/my-project
npx vite --port 3000 --host 0.0.0.0
