var express = require('express');
var router = express.Router();

const {
  registrarUsuario, loginUsuario
} = require('../controllers/user.controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registrar',registrarUsuario);
router.post('/login',loginUsuario)

module.exports = router;
module.exports = router;


