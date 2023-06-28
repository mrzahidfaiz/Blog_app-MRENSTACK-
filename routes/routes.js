const express = require('express');
const { register, login } = require('../controllers/authController');

const {Router} = express;

const router = Router();

router.post('/register', register);

module.exports = router;