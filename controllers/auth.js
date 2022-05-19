const { response } = require('express');    //Exportacion para tener todos los metodos posibles en "res", por eso lo igualo a response

const crearUsuario = (req, res = response) => {
    console.log( req.body );
    const { name, email, password } = req.body;    //Puedo desestructurar los datos que me llegan
    console.log("Recibi ", name, email, password );
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req, res) => {
    const { email, password } = req.body;
    console.log("Recibi ", email, password);
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