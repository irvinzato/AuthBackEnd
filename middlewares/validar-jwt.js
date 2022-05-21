//Creo este middleware para validar el JWT, asi si necesito la validacion del JWT en mas servicios o ENP
//Ya lo tengo aqui
const { response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    //Para leer el header que viene en mi peticion(Postman)
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg: 'Error en el token'
        });
    }

    try {
        //"process.env.SECRET_JWT_SEED" lo ocupamos para saber si ese token fue firmado con la misma llave
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        console.log("verificacion exitosa, regresa el payload ", uid, name);
        //Para mandarle los datos de mi middleware a mi controlador
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    //Si todo sale bien
    next()
}

module.exports = {
    validarJWT
}