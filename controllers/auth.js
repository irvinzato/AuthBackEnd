const { response } = require('express');    //Exportacion para tener todos los metodos posibles en "res", por eso lo igualo a response
const Usuario = require('../models/Usuario');   //La importacion es diferente por como lo exporte
const bcrypt = require('bcryptjs');     //Para hacerle el hash a mis contraseñas(forma encriptada)
const { generarJWT } = require('../helpers/jwt');

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
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generar Json Web Token(El que mandare a Angular)
        const token = await generarJWT( dbUser.id, name, email );

        //Crear usuario en Base de Datos
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,     //El id me lo genera Mongo
            name: name,
            email: email,
            token: token,
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

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    console.log("Recibi ", email, password);

    try {
                                //En ECM6 es redundante poner "email:email", se puede poner solo "email"
        const dbUser = await Usuario.findOne({ email });
        //Validacion de correo electronico 
        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        //Correo valido pero ahora hay que confirmar si la contraseña es correcta
        //Metodo de bcrypt que compara la contraseña que me esta llegando con la de mi base de datos
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }

        //Todo fue valido, generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name, dbUser.email );

        //Respusta del servicio, por defecto es status(200)
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token,
            msg: 'Logeo exitoso'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const revalidarToken = async (req, res = response) => {
    //Recibo los datos que extraje de mi middleware
    const { uid, name, email } = req;

    //generar nuevo token
    const token = await generarJWT( uid, name, email );

    return res.json({
        ok: true,
        uid,
        name,
        email,
        token,
        msg: 'Renew token exitoso /renew'
    });
}


//Para que otros modulos puedan utilizar mis funciones
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}