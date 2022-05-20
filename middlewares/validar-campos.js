//Un middleware no es mas que una funcion
const { response } = require("express");
const { validationResult } = require("express-validator");

//Este codigo lo puedo modularizar por que se repite en mas de 1 ocasión
//La unica diferencia es que debo pasarle un argumento "next" que se ejecuta cuando todo esta bien, para que siga al siguiente middleware
const validarCampos = ( req, res = response, next ) => { 

    const errors = validationResult( req );
    console.log(errors);
    if( !errors.isEmpty() ){    
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}