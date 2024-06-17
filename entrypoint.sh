#!/bin/bash
set -e

# Start MySQL service
service mysql start

# Set root password if specified
if [ -n "$MYSQL_ROOT_PASSWORD" ]; then
    echo "Setting root password"
    mysqladmin -u root password "$MYSQL_ROOT_PASSWORD"
fi

# Keep the container running with MySQL in the foreground
tail -f /var/log/mysql/error.log
