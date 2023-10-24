var express = require('express');
var router = express.Router();

const {
  registrarUsuario, iniciarSesion, getPedidosByUsuario
} = require('../controllers/user.controller.js');

 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/iniciar-sesion', iniciarSesion);
router.post('/registrar', registrarUsuario);
// Ruta para obtener los pedidos de un usuario
router.get('/pedidos/:usuarioId', getPedidosByUsuario);


module.exports = router;


