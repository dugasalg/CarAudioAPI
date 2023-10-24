var express = require('express');
var router = express.Router();

const  {
    firmaJwt,
    verifyJwt,
    servicioPrueba
} = require('../controllers/auth.controller')
/* GET home page. */
router.post('/get-jwt', firmaJwt );
router.post('/verify-jwt', verifyJwt );
router.post('/test', verifyJwt,servicioPrueba);



module.exports = router;