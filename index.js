const express = require('express'); //En NODE la importacion es con "require"
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); //Esto toma la configuracion por defecto del archivo ".env"

//console.log( process.env ); llamado especial para ver la configuracion de env

//Crear el servidor/aplicacion de express
const app = express();

//Conexion a Base de Datos de MongoDB
dbConnection();

//Directorio publico, cualquier persona que conoza el host podra ver
app.use( express.static( 'public' ) );

//CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
//Defino que cualquier ruta que este en "./routes/auth" tendra primero el path "/api/auth"
app.use( '/api/auth', require('./routes/auth') );

//Para levantar la aplicacion en el puerto que quiera
//Ahora puedo utilizar las variables de mi "env" en lugar de ponerlo en duro, gracias al "require('dotenv').config()"
app.listen( process.env.PORT, () => {   //Funcion que se va a ejecutar cuando este levantado mi servidor
    console.log(`Servidor corriendo en puerto ${ process.env.PORT } `);
});