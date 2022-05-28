#!/usr/bin/env bash

test -f "/setup.sh" && /setup.sh

echo "Waiting for database"
/app/wait-for-it.sh -h database -p 3306 -t 90

echo "DATABASE_URL='$DATABASE_URL'" >> /app/.env

echo "Seting up composer"
cd /app && composer update && composer install && composer setup

# ./wait-for-it.sh
service php8.1-fpm start
/usr/sbin/apache2ctl -D FOREGROUND
