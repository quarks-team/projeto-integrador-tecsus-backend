#!/bin/bash

# Start MySQL service in the background
/usr/local/bin/docker-entrypoint.sh mysqld &

# Wait for MySQL to start
while ! mysqladmin ping -h"localhost" --silent; do
    sleep 1
done

# Run initial setup commands without requiring a password
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SET GLOBAL log_bin_trust_function_creators = 1;"

# Execute the script to create functions and triggers
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" db < /docker-entrypoint-initdb.d/2-functions_and_triggers.sql

# Keep the container running with an interactive bash shell
tail -f /dev/null
