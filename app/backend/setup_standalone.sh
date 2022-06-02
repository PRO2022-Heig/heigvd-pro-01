#!/usr/bin/env bash

echo "Running Standalone setup script"

SERVERNAME="${SERVERNAME:-our-app.local}"
BACKEND_PREFIX="${BACKEND_PREFIX:-/foodzen_api}"

echo -e "ErrorLog /dev/stderr" >> /etc/apache2/apache2.conf
echo -e "TransferLog /dev/stdout" >> /etc/apache2/apache2.conf
echo -e "LogLevel debug" >> /etc/apache2/apache2.conf
echo -e "ServerName ${SERVERNAME}" >> /etc/apache2/apache2.conf

# Angular needs special routing for apache when built
# https://www.stefanoscerra.it/apache-rewrite-rules-configuration-for-angular/

cat - > /etc/apache2/sites-enabled/app.conf <<- EOF
<VirtualHost *:*>
    DocumentRoot "/var/www/frontend"
    ServerName ${SERVERNAME}
    Alias ${BACKEND_PREFIX} /var/www/app/public
    # AliasMatch "^${BACKEND_PREFIX}/(.*)$"   "/var/www/app/public/$1"
    <Directory "/var/www/app/public/">
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . index.php [L]
    </Directory>

    RewriteEngine On
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteCond %{REQUEST_URI} !^${BACKEND_PREFIX}.*$
    RewriteRule ^ - [L]

    RewriteCond %{REQUEST_URI} !^${BACKEND_PREFIX}.*$
    RewriteRule ^ /index.html [L]
</VirtualHost>

EOF
