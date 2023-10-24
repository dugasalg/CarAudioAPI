const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/config');
const { head } = require('../routes');
async function firmaJwt(req, res) {
    try {
        const nuevoToken = await jwt.sign(
            { email: "salgado@gmail.com" },
            config.auth.secretKey,
            { algorithm: 'HS256' }
        );

        res.status(200).json({
            message: "Token creado",
            jwt: nuevoToken
        });
    } catch (err) {
        res.status(500).json({
            message: "Error al crear el token jwt"
        });
    }
}

async function servicioPrueba(req,res){
    console.log("Entro a funcion");
    res.status(200).json(
        {message:"CORRECTO"}

    );
}

async function verifyJwt(req, res,next) {
    const headerToken = req.headers.authorization;
    let authToken;

    if (headerToken && headerToken.length){
        const tokenParts = headerToken.split(' ');
        if(tokenParts.length == 2){
            authToken = tokenParts[1];
        }
        try{
            await jwt.verify(authToken,config.auth.secretKey);
            next();
        }catch(err){
            console.error("INVALID TOKEN");
        }
    } else{
        res.status(500).json({
            
        });
    }
    console.log(headerToken);
    res.status(200);
}
module.exports = {
    firmaJwt,
    verifyJwt,
    servicioPrueba
}