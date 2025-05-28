# Imagen base
FROM debian:bullseye

# Desactivar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar Apache y Node.js
RUN apt-get update && apt-get install -y \
    apache2 \
    curl \
    gnupg \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g @angular/cli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar los archivos compilados de Angular
COPY ./angular-app/dist/angular-app/browser/ /var/www/html/

# Copiar la configuración personalizada de Apache
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Dar permisos a los archivos
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]