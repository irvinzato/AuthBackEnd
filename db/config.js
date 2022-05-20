//Conexion a mi base de datos, en "env" ya puse su variable de entorno generada desde MongoDB
//Mongoose nos ayuda a hacer todas las interacciones con la base de datos de mongo
const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        await mongoose.connect( process.env.BD_CNN, {
 
        });

        console.log("Conexion a base de datos exitosa");

    } catch(error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');  //Esto va evitar que se levante mi base de datos en caso de error
    }
}


module.exports = {
    dbConnection
}