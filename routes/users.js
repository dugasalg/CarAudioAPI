
var express = require('express');
var router = express.Router();

const {
  registrarUsuario, iniciarSesion, getPedidosByUsuario, actualizarUsuario, eliminarUsuarioLogico
} = require('../controllers/user.controller.js');

 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/iniciar-sesion', iniciarSesion);
router.post('/registrar', registrarUsuario);
// Ruta para obtener los pedidos de un usuario
router.get('/pedidos/:usuarioId', getPedidosByUsuario);
// Ruta para actualizar la información del usuario
router.put('/usuario/:id', actualizarUsuario);
// Ruta para eliminar lógicamente la cuenta del usuario
router.delete('/usuario/:id', eliminarUsuarioLogico);




module.exports = router;
