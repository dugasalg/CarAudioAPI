var express = require('express');
var router = express.Router();

const {
  registrarUsuario, iniciarSesion
} = require('../controllers/user.controller.js');

 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/iniciar-sesion', iniciarSesion);
router.post('/registrar', registrarUsuario);

module.exports = router;


