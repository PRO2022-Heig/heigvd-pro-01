#!/bin/bash

composer install
./bin/console doctrine:database:drop --force --if-exists
./bin/console doctrine:database:create --no-interaction
./bin/console doctrine:migration:migrate --no-interaction
./bin/console doctrine:fixtures:load --no-interaction