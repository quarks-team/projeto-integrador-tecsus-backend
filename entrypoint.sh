#!/bin/bash

# Start MySQL service in the background
docker-entrypoint.sh mysqld &

# Wait for MySQL to start
while ! mysqladmin ping -h"localhost" --silent; do
    sleep 1
done

# Run initial setup commands without requiring a password
# shellcheck disable=SC1073
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SET GLOBAL log_bin_trust_function_creators = 1;"

# Keep the container running with an interactive bash shell
tail -f /dev/null
