const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/config');
const { head } = require('../routes');


async function firmaJwt(req, res) {
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


// Controlador para iniciar sesión y obtener un token JWT
async function iniciarSesion(req, res) {
  const { usuario, contraseña } = req.body;
  try {
    // Realiza la lógica de verificación de credenciales en la base de datos
    const usuarioValido = await User.findOne({ username: usuario, password: contraseña });
    
    if (usuarioValido) {
      // Genera un token JWT
      const token = jwt.sign({ usuario: usuarioValido.username }, config.auth.secretKey, { algorithm: 'HS256' });
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}


module.exports = {
    firmaJwt,
    verifyJwt,
    iniciarSesion
}