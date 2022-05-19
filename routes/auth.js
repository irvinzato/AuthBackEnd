const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

//Crear un nuevo usuario
//Como abra mas logica en el callBack se crea en controllers "crearUsuario" y se exporta aqui su funcion
router.post( '/new', crearUsuario );    

//Login de usuario
router.post( '/', loginUsuario );

//Validar y revalidar token
router.get( '/renew', revalidarToken );


//Para exportar y utilizar en otros archivos
module.exports = router;