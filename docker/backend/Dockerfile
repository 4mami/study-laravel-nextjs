FROM php:8.3.27-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zip unzip curl \
    && docker-php-ext-install pdo_mysql

COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

# .envをコピー
# キー作成
# マイグレーション

CMD ["/bin/bash"]
