#!/bin/sh
set -e

# Sync schema to database.
# Once you create migration files with `npm run db:migrate`, switch this to:
#   npx prisma migrate deploy
npx prisma db push

exec npm start
