## Rest server en nodeJS con mongoDB

Código fuente de un servidor en Express con mongoDB, despliege en Heroku y un parser para
convertir todo lo que reciva atravez de las peticiones en un JSON.


Ejecuta este comando para instalar 
las dependecias de la aplicación

```
npm install
```

* Inicia el servidor

```
npm start
node server/server
```

* Inicia el servidor

```
nodemon server/server
```

* Abrir en heroku

```
heroku open
```


* Rutas

```
http://localhost:3000/usuario
http://localhost:3000/usuario/:id
```

* Usamos
1. *body-parser :* Para convertir todo lo que recivamos en un JSON.
2. *mongoose :* Para hacer un modelo de usuario en mongoDB.
3. *mongoose-unique-validator : * Para personalizar los mensajes de 
error de validaciones que deben de ser unicas.
4. *bcrypt :*  Para encriptar las contraseñas.

* Helpers
1. [mongoDB Windows](https://docs.mongodb.com/guides/server/install/)

