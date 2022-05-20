const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos'); //Tal cual es como un check personalizado

const router = Router();

//Crear un nuevo usuario
//Como abra mas logica en el callBack se crea en controllers "crearUsuario" y se exporta aqui su funcion
router.post( '/new', [
    check('name', 'El nombre es obligatorio y debe tener minimo 3 caracteres' ).not().isEmpty().isLength({ min: 3 }),
    check('email', 'El email es obligatorio' ).isEmail(),
    check('password', 'La contraseña es obligatoria y requiere 6 caracteres minimo' ).isLength({ min: 6 }),
    validarCampos
] , crearUsuario );    

//Login de usuario
//Añadire middlewares para que mi servicio solo se ejecute si recibe los campos que son necesarios, puede ser mas de 1
//Primero ejecuta los middlewares y despues el controlador, cuando se pasa por el middlewares ahora tenemos un nuevo objeto que podemos usar en el controlador
router.post( '/', [
    check('email', 'El email es obligatorio' ).isEmail(),
    check('password', 'La contraseña es obligatoria y requiere 6 caracteres minimo' ).isLength({ min: 6 }),
    validarCampos
] ,loginUsuario );

//Validar y revalidar token
router.get( '/renew', revalidarToken );


//Para exportar y utilizar en otros archivos
module.exports = router;