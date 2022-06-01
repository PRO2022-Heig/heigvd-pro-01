#!/usr/bin/env bash

echo "Running basic setup script"
SERVERNAME="${SERVERNAME:-api.our-app.local}"

echo -e "\nServerName ${SERVERNAME}" >> /etc/apache2/apache2.conf
cat - > /etc/apache2/sites-enabled/app.conf <<- EOF
<VirtualHost *:80>
    DocumentRoot "/var/www/app/public"
    ServerName ${SERVERNAME}
    <Directory "/var/www/app/public">
        Options -Indexes
        AllowOverride All
    </Directory>
</VirtualHost>
EOF
