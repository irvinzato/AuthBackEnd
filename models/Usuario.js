//Creacion de DTO, Modelo de base de datos y regularmente siempre es en singular
const { Schema } = require("mongoose");

const UsuarioSchema = Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    }
});

//La exportacion es un poco diferente a las que habia hecho, es una funcion del paquete de mongoose
//mongoose se va a encargar de ponerle el plural a "Usuario" a la hora de crear la base de datos
module.exports = model('Usuario', UsuarioSchema);