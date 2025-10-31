FROM php:8.3.27-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zip unzip curl \
    && docker-php-ext-install pdo_mysql

COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html
RUN composer install --prefer-dist --no-scripts --no-dev && \
composer dump-autoload --optimize

COPY .env.example /var/www/html/.env

RUN php artisan key:generate
RUN php artisan config:clear \
    && php artisan config:cache

RUN chmod -R 777 storage

EXPOSE 9000

CMD ["php-fpm"]
