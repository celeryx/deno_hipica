<a name="top"></a>
# Hipica Data Deno

## Índice de contenidos
* [Instrucciones](#item1)
* [Pre-Requisitos](#item2)

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


[Subir](#top)