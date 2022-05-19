const { response } = require('express');    //Exportacion para tener todos los metodos posibles en "res", por eso lo igualo a response
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {
   
    const errors = validationResult( req );
    console.log(errors);

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { name, email, password } = req.body;    //Puedo desestructurar los datos que me llegan
    console.log("Recibi ", name, email, password );
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req, res = response) => {

    const errors = validationResult( req );
    console.log(errors);

    if( !errors.isEmpty() ){    //Si no esta vacio mi arraglo de errores
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

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