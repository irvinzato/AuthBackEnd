const express = require('express'); //En NODE la importacion es con "require"
const cors = require('cors');

//Crear el servidor/aplicacion de express
const app = express();

//CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
//Defino que cualquier ruta que este en "./routes/auth" tendra primero el path "/api/auth"
app.use( '/api/auth', require('./routes/auth') );

//Creacion de peticion
app.get('/', ( req, res ) => {  //La funcion recibe un request y una respuesta
    res.json({
        ok: true,
        msg: 'Todo con exito',
        id: 123
    });
});

//Para levantar la aplicacion en el puerto que quiera
app.listen( 4000, () => {   //Funcion que se va a ejecutar cuando este levantado mi servidor
    console.log(`Servidor corriendo en puerto ${ 4000 } `);
});