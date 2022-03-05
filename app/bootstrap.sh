# Update
apt-get update
apt-get upgrade

# Temp installs
apt-get install -y curl expect figlet

# Add php repo
apt-add-repository ppa:ondrej/php

# Add node 16 source
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

# Add symfony CLI
echo 'deb [trusted=yes] https://repo.symfony.com/apt/ /' | sudo tee /etc/apt/sources.list.d/symfony-cli.list

apt-get update

# Install apache, php, mariadb, node
apt-get install -y apache2 \
                git \
                php8.0 \
                libapache2-mod-php8.0 \
                php8.0-common \
                php8.0-mcrypt \
                php8.0-zip \
                php8.0-mysql \
                php8.0-xml \
                php8.0-mbstring \
                php8.0-intl \
                mariadb-server \
                nodejs \
                zip \
                unzip \
                symfony-cli

# Setup mariadb -- not really sure
MYSQL_ROOT_PASSWORD=aComplexRootPassword

SECURE_MYSQL=$(expect -c "
set timeout 10
spawn mysql_secure_installation
expect \"Enter current password for root (enter for none): \"
send \"n\r\"
expect \"Switch to unix_socket authentication \[Y/n\] \"
send \"n\r\"
expect \"Change the root password? \[Y/n\] \"
send \"y\r\"
expect \"New password: \"
send \"$MYSQL_ROOT_PASSWORD\r\"
expect \"Re-enter new password: \"
send \"$MYSQL_ROOT_PASSWORD\r\"
expect \"Remove anonymous users? \[Y/n\] \"
send \"y\r\"
expect \"Disallow root login remotely? \[Y/n\] \"
send \"y\r\"
expect \"Remove test database and access to it? \[Y/n\] \"
send \"y\r\"
expect \"Reload privilege tables now? \[Y/n\] \"
send \"y\r\"
expect eof
")

echo "$SECURE_MYSQL"

echo "CREATE user 'db'@'%' IDENTIFIED BY 'db';GRANT ALL PRIVILEGES ON *.* TO 'db'@'%' IDENTIFIED BY 'db';" > ./user.sql

mysql -u root < ./user.sql

rm ./user.sql

# Enabling vhosts
cp /var/resources/vhost-backend.conf /etc/apache2/sites-available/
cp /var/resources/vhost-frontend.conf /etc/apache2/sites-available/
a2ensite vhost-backend.conf
a2ensite vhost-frontend.conf

# Enable Apache Mods
a2enmod rewrite

# Restart apache
service apache2 restart

# Install composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/bin/composer

figlet "PRO 2022"

# Remove useless packages
apt-get purge -y expect figlet

# Adding vagrant user to vboxsf group
usermod -G vboxsf -a vagrant

# Creating temp folders for symfony
mkdir /var/symfony
chown www-data:www-data /var/symfony
chmod 777 /var/symfony