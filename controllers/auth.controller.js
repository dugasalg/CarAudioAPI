const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

async function firmarjwt(req,res){

    try{
        const nuevoToken = await jwt.sign(
            {email: "dugatabacc@gmail.com"},
            config.auth.secretKey,
            {algorithm:'HS256'}
            );

            res.status(200).json({
                message: "OK",
                jwt: nuevoToken
            })
 
    }catch(err){
        res.status(500).json({
            message: "Error al crear el token jwt"
        })
    }
    
}
async function servicioPrueba(req,res){
    console.log("Entro a funcion");
    res.status(200).json(
        {message:"holaa"}

    );

}

async function verifyjwt(req, res, next) {
    console.log("verifyjwt");
    
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    let authToken;

    if (authHeader && authHeader.length) {
        const tokenParts = authHeader.split(' ');
        if (tokenParts.length === 2) {
            authToken = tokenParts[1];
        }
    }

    try {
        await jwt.verify(authToken, config.auth.secretKey);
        console.log("Paso comprobacion");
        next();
    } catch (err) {
        console.log('Error de verificación:', err.message); // imprime el mensaje del error
        res.status(400).json({ message: "No autorizado" });
    }
    

}


module.exports = {
    firmarjwt,verifyjwt,servicioPrueba


}