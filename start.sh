#!/bin/bash
# Start the full joyful-journey stack: services-api backend + Vite dev server.
# Portable — works regardless of where this repo is cloned.
set -e
cd "$(dirname "$0")"

echo "Starting services-api backend (Hono)..."
bun --hot mini-services/services-api/index.ts &
API_PID=$!
sleep 2

echo "Starting Vite dev server on :3000..."
npx vite --port 3000 --host 0.0.0.0

# When Vite exits, clean up the backend
kill $API_PID 2>/dev/null || true
