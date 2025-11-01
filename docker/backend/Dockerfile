FROM php:8.3.27-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zip unzip curl \
    && docker-php-ext-install pdo_mysql

COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html
RUN composer install --prefer-dist --no-scripts --no-dev && \
composer dump-autoload --optimize

RUN pecl install xdebug
COPY docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

COPY .env.example /var/www/html/.env

RUN php artisan key:generate
RUN php artisan config:clear \
    && php artisan config:cache

RUN chmod -R 777 storage

EXPOSE 9000

CMD ["php-fpm"]
