console.log("Instalacion de nodemon! para que recarge solo, usando el comando -nodemon index.js-");
console.log("Para utilizar las variables del package.json hay que utilizar -npm run dev- para el caso de desarrollo");

const express = require('express'); //Asi se hace la importacion en NODE

//Crear el servidor/aplicacion de express
const app = express();

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