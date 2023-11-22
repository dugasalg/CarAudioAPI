var express = require('express');
var router = express.Router();

const  {
    firmaJwt,
    verifyJwt,
    iniciarSesion,
    servicioPrueba
} = require('../controllers/auth.controller')
/* GET home page. */
router.post('/get-jwt', firmaJwt );
router.post('/verify-jwt', verifyJwt );
// Ruta para iniciar sesión y obtener un token JWT
router.post('/login', iniciarSesion);
router.post('/test', verifyJwt,servicioPrueba);


module.exports = router;