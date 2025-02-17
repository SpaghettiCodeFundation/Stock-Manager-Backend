# Stock Manager

Una aplicación de un sistema ERP de administración de stock con Node, TypeScript y Prisma ORM.


## Authors

- [@Mauro Caetano](https://www.github.com/lucianocaetano/lucianocaetano)


## Clone el proyecto y ejecutar el proyecto con Docker

```bash
  git clone https://github.com/SpaghettiCodeFundation/Stock-Manager-Backend.git
```

Go to the project directory

```bash
  cd StockManager-back
```

Ejecuta los contenedores de Docker

```bash
  docker compose up --build
```

Creamos nuestro archivo .env

```bash
  cp .env.example .env 
```

Si quieres datos de prueba, primero entra al contenedores

```bash
  docker exec -it node_app sh
```


Y luego crea registros de prueba en la base de datos

```bash
  npm run seed
```

## Clone el proyecto y ejecutar el proyecto sin Docker

```bash
  git clone https://github.com/lucianocaetano/SpaghettiCodeFundation/Stock-Manager-Backend.git
```

Go to the project directory

```bash
  cd StockManager-back
```


Creamos nuestro archivo .env

```bash
  cp .env.example .env 
```

Modifica el archivo .env y cambia la url de la base de datos por la tuya

```bash
  DATABASE_URL="postgres://example:example@localhost:5432/test"
```
Instala las dependencias

```bash
  npm install 
```

Crea la base de datos

```bash
  npx prisma generate 
  npx prisma migrate dev 
```

Y luego crea registros de prueba en la base de datos

```bash
  npm run seed
```

Y por ultimo, ejecute el servidor

```bash
  npm run dev 
```
