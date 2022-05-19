const { response } = require('express');    //Exportacion para tener todos los metodos posibles en "res", por eso lo igualo a response

const crearUsuario = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });
}

const revalidarToken = (req, res) => {
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