#!/bin/bash
set -e

# Fixing permissions
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld /tmp

# Cleaning up MySQL data directory
echo "Cleaning up MySQL data directory..."
rm -rf /var/lib/mysql/*

# Initializing MySQL data directory
echo "Initializing MySQL data directory..."
mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql

# Starting MySQL service in safe mode to allow setting up the initial state
echo "Starting MySQL in safe mode..."
mysqld_safe &
MYSQL_PID=$!

# Waiting for MySQL to fully start
echo "Waiting for MySQL to start..."
while ! mysqladmin ping --silent; do
    echo "Waiting for MySQL to start..."
    sleep 1
    if ! kill -0 $MYSQL_PID 2>/dev/null; then
        echo "MySQL process has exited. Checking logs..."
        cat /var/log/mysql/error.log
        exit 1
    fi
done

# Setting root password if specified
if [ -n "$MYSQL_ROOT_PASSWORD" ]; then
    echo "Setting root password"
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD'; FLUSH PRIVILEGES;"
fi

# Creating the database if not exists
echo "Creating database 'db' if it does not exist"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"

# Creating the user and granting permissions
echo "Granting permissions to 'admin' user"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER IF NOT EXISTS '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%'; FLUSH PRIVILEGES;"

# Executing the script for creating tables
if [ -f /docker-entrypoint-initdb.d/1-tables.sql ]; then
    echo "Executing tables creation script"
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/1-tables.sql
fi

# Executing the script for functions and triggers
if [ -f /docker-entrypoint-initdb.d/2-functions_and_triggers.sql ]; then
    echo "Executing functions and triggers script"
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/2-functions_and_triggers.sql
fi

# Keeping the container running with MySQL in the foreground
echo "MySQL started. Keeping container running..."
tail -f /var/log/mysql/error.log
