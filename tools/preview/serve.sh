#!/usr/bin/env bash
# Start (or restart) the local preview server on http://127.0.0.1:4173
set -e
here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
pidfile="$here/.server.pid"
if [ -f "$pidfile" ] && kill -0 "$(cat "$pidfile")" 2>/dev/null; then kill "$(cat "$pidfile")"; sleep 1; fi
[ -d "$here/node_modules" ] || (cd "$here" && npm install --no-audit --no-fund)
ln -sfn tools/preview/node_modules "$repo/node_modules"
cd "$repo"
nohup "$here/node_modules/.bin/vite" dev --config "$here/vite.config.ts" --port 4173 --host 127.0.0.1 > "$here/.server.log" 2>&1 &
echo $! > "$pidfile"
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/ || true)
  [ "$code" = "200" ] && { echo "Preview ready: http://127.0.0.1:4173"; exit 0; }
  sleep 1
done
echo "Server did not answer 200 (last: $code). See $here/.server.log"; exit 1
