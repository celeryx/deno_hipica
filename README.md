<a name="top"></a>
# Hipica Data Deno

## Índice de contenidos
* [Instrucciones](#item1)
* [Pre-Requisitos](#item2)
* [Ejecutar con Docker Compose](#ejecutar-con-docker-compose)

<a name="item2"></a>
### Pre-Requisitos

* Tener Deno instalado(https://deno.land/#installation) 
* Tener PostgreSQL
* Tener Instalado "VS code"
* Tener instalado un cliente de base de datos como: (dbeaver, pgadmin,datagrip) o Tener instalado el plugin (SQLTools y SQLTools PostgrSQL/Redshift Driver)
* OPCIONAL(instalar denon)

<a name="item1"></a>
### Instrucciones

* Descargar repositorio, abriendo un terminal y pegando lo siguiente: 
> git clone https://github.com/celeryx/deno_hipica.git
* Abrir la carpeta  "deno_hipica" en "VS Code"
* En la ruta "src/hipica/configuration" 
> Modificar el nombre del archivo "environment.example.config.ts" por "environment.config.ts"
>> Completar las variables de ambientes en el archivo
* Abrir un cliente de base de datos y ejecutar el script que se encuenbtra en la ruta "src/resources"
* Abrir un terminal en "VS Code" y  Ejecutar comando:
> deno run --allow-net --allow-env --allow-write --allow-read src/hipica/server.ts 
* En un navegador(chrome,firefox,edge) abrir:
> http://localhost:8000/api/v1/hipica/getClubHipico/file/true/reload/true

### Ejecutar con Docker Compose
> Para este punto, debe tener instalado [Docker](https://www.docker.com/get-started) en su equipo.

Para levantar el ambiente, ubiquese en la carpeta raíz del proyecto clonado y ejecute docker-compose:
```sh
docker-compose up
```

Una los contenedores hayan sido levantados, puede acceder a la aplicación mediante la misma url señada en [Instrucciones](#instrucciones).
> http://localhost:8000/api/v1/hipica/getClubHipico/file/true/reload/true

Durante la ejecución de docker-compose, se habrán levantado 3 contenedores los cuales podrá acceder a tráves de los siguientes puertos:

> Los puertos expresados son redirecciones a los puertos correspondientes a los servicios que corren internamente en cada contenedor.

| Dirección              | Descripción      | Puerto  | Protocolo |
|------------------------|------------------|---------|-----------|
| http://localhost:8000/ | WebAPI           | 8000    | HTTP      |
| http://localhost:8080/ | Administrador BD | 8080    | HTTP      |
| localhost:3232         | Servidor Pgsql   | 3232    | TCP/IP    |

Los detalles de conexión a la Base de datos son:
* **Nombre de usuario:** admin
* **Contraseña:** admin
* **Nombre de la base de datos:** deno_hipica

---
[Subir](#top)