const { response } = require('express');    //Exportacion para tener todos los metodos posibles en "res", por eso lo igualo a response
const Usuario = require('../models/Usuario');   //La importacion es diferente por como lo exporte

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;    //Puedo desestructurar los datos que me llegan
    console.log("Recibi ", name, email, password );

    try {
        //Verificacion de email
        const usuario = await Usuario.findOne({ email });  //Esta funcion buscara alguien cuyo email sea igual al email que recibo como argumento
        if( usuario ){    //Si encuentra un objeto con ese email
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        //Crear usuario con modelo
        const dbUser = new Usuario( req.body );

        //Hash de contraseña

        //Generar Json Web Token(El que mandare a Angular)

        //Crear usuario en Base de Datos
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,     //Me lo genera Mongo
            name: name,
            msg: 'Creacion exitosa'
        });

    } catch(error) {
        console.log(error);
        return res.json({
            ok: true,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;
    console.log("Recibi ", email, password);
    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });
}

const revalidarToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew token /renew'
    });
}


//Para que otros modulos puedan utilizar mis funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}