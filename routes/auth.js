var express = require('express');
var router = express.Router();
const {
    firmarJwt,
    verifyJwt
} = require('../controllers/auth.controller');

router.post('/get-jwt', firmarJwt)
router.post('/verify-jwt', verifyJwt)

module.exports = router;