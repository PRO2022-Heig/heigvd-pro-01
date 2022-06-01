# Handle build in dockerfile
FROM node:18-alpine3.14 AS build_node
COPY ./frontend /src
WORKDIR /src
RUN npm ci && npm run build


FROM debian:latest as base

# disable interactive functions.
ENV DEBIAN_FRONTEND noninteractive
# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

EXPOSE 80
COPY ./backend/entrypoint.sh /entrypoint.sh
CMD /entrypoint.sh

RUN apt-get update && apt-get upgrade -y && apt-get install apt-utils && \
    apt-get install -y ca-certificates apt-transport-https software-properties-common wget curl lsb-release -y
RUN curl -sSL https://packages.sury.org/php/README.txt | bash -x
RUN apt-get update && \
    apt-get install -y php8.1 libapache2-mod-php8.1 php8.1-common php8.1-mbstring php8.1-intl php8.1-xdebug php8.1-fpm libapache2-mod-fcgid php8.1-xml php8.1-curl \
    zip unzip php8.1-zip php8.1-mysql \
    && rm -rf /var/lib/apt-get/lists/* \
	&& apt-get clean -y
RUN cd /tmp && curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
# Enable apache mods.
RUN a2enmod php8.1 rewrite proxy_fcgi setenvif && a2enconf php8.1-fpm && \
    rm /etc/apache2/sites-enabled/*
RUN mkdir -p /var/symfony && chown -R www-data:www-data /var/symfony && chmod 777 /var/symfony

# Update the PHP.ini file, enable <? ?> tags and quieten logging.
# RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php5/apache2/php.ini
# RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php5/apache2/php.ini

FROM base as backend
ENV APP_ENV=prod
ENV VAR_DIR=/var/symfony
# Copy site into place.
COPY ./backend /app
RUN ln -s /app /var/www/app && ln -s /app/setup.sh /setup.sh
WORKDIR /app


FROM backend as standalone
RUN ln -f -s /app/setup_standalone.sh /setup.sh
COPY --from=build_node /src/dist/frontend/ /var/www/frontend
