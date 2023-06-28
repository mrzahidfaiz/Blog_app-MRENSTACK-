const express = require('express');
const { register, login, logout } = require('../controllers/authController');

const {Router} = express;

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout)

module.exports = router;