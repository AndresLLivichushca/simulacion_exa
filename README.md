Angular + Apache en Docker (Debian)
Este proyecto contiene una imagen Docker personalizada que ejecuta un servidor Apache en Debian para servir una aplicación Angular compilada.

El proyecto incluye:

angular-app/: Proyecto Angular con una página que muestra "¡Bienvenido a mi servidor Docker con Angular!"
apache/000-default.conf: Configuración personalizada para Apache.
Dockerfile: Instrucciones para construir la imagen Docker.
README.md: Este archivo con pasos de ejecución y publicación.
Requisitos:

Docker Desktop funcionando
Node.js y Angular CLI instalados
Cuenta en Docker Hub para publicar la imagen
Pasos para ejecutar todo correctamente:

Desde la carpeta angular-app/, instalar dependencias y compilar la app:

npm install
ng build --configuration production

Esto genera los archivos en dist/angular-app/ que Apache servirá.

Desde la raíz del proyecto (donde está el Dockerfile), construir la imagen:

docker build -t angular-apache .

Ejecutar el contenedor (puerto 8080 o alternativo si está ocupado):

docker run -p 8080:80 angular-apache
ó
docker run -p 8081:80 angular-apache

Abrir el navegador en http://localhost:8080 o http://localhost:8081

Deberías ver el mensaje: "¡Bienvenido a mi servidor Docker con Angular!"