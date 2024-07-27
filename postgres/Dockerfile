FROM postgres

# WORKDIR /app
COPY restore.sh /docker-entrypoint-initdb.d/
COPY taxi-all-drive_db.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/restore.sh