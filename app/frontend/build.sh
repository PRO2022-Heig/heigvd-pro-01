#!/bin/bash
docker run -t -v "$PWD:/src" -w /src/app/frontend -e "FOODZEN_BACKEND_URL=/foodzen_api" -e "server=/foodzen_api" node:18-alpine3.14 sh -c "npm install && npm run build"
