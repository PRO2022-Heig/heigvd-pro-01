#!/usr/bin/env bash

test -f "/setup.sh" && /setup.sh

ISOLATED_DB_PORT=$(echo $DATABASE_URL | grep -Po '(?<=://)[^/?]*' | grep -Po '[^@]*$')
DATABASE=$(echo $ISOLATED_DB_PORT | grep -Po '^[a-zA-Z_-]*')
PORT=$(echo $ISOLATED_DB_PORT | grep -Po '\d*$')

echo "Waiting for database"
/app/wait-for-it.sh -h ${DATABASE:=database} -p ${PORT:=3306} -t 90

echo "DATABASE_URL='$DATABASE_URL'" >> /app/.env

echo "Seting up composer"
cd /app && composer setup
chown -R www-data:www-data /var/symfony
# ./wait-for-it.sh
service php8.1-fpm start
/usr/sbin/apache2ctl -D FOREGROUND
