const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/config');
async function firmarJwt(req, res) {
    const headerToken = req.headers.authorization;
    try {
        const nuevoToken = await jwt.sign(
            { email: "varelahiram55@gmail.com" },
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
    async function verifyJwt(req, res, next)
    {
        const headerToken = req.headers.authorization;
        console.log(headerToken);
        res.status(200).json({
            message: "Token verificado"
        });
    }
}


module.exports = {
    firmarJwt,
    verifyJwt
}