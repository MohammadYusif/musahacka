#!/bin/sh
set -e

npx prisma generate
npx prisma db push
npm run db:seed || echo "Seed skipped or already done."

exec "$@"
