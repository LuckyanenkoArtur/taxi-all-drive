#!/bin/bash
set -e
echo "Edhooo"


# Check if the database is already restored
if [ -f /var/lib/postgresql/data/.restored ]; then
    echo "Database already restored. Skipping..."
    exit 0
fi

# Restore the database
echo "Restoring database..."
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" /docker-entrypoint-initdb.d/taxi-all-drive_db.sql

# Mark as restored
touch /var/lib/postgresql/data/.restored

echo "Database restored successfully."