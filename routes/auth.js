var express = require('express');
var router = express.Router();

const{firmarjwt,verifyjwt,servicioPrueba} = require('../controllers/auth.controller');


router.post('/get-jwt',firmarjwt);
router.post('/verify-jwt',verifyjwt);
router.post('/test',verifyjwt,servicioPrueba)


module.exports = router;