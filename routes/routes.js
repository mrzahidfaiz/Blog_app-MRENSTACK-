const express = require('express');
const { register, login, logout, refresh } = require('../controllers/authController');
const auth = require('../middlewares/authHanlder');

const {Router} = express;

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout',auth, logout);

module.exports = router;