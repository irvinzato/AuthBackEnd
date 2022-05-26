//Todo lo relacionado a la creacion y verificacion de Json Web Token
const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name, email ) => {

    //payload es la informacion que quiero que sea grabada en el JWT
    const payload = { uid, name, email };

    //Como el sign() no es una Promesa, se resuelve de manera ingeniosa
    return new Promise( ( resolve, reject ) => {
                          //SECRET_JWT_SEED es la cemilla que me ayuda a firmar mis JWT
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if( err ){
                console.log(err);
                reject( err );
            } else {
                //TODO BIEN
                resolve( token );
            }
        });

    });

}

module.exports = {
    generarJWT
}