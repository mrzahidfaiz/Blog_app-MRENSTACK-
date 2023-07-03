const express = require('express');
const { register, login, logout, refresh } = require('../controllers/authController');
const {create, getAll, getById, update, deleteById} = require('../controllers/blogController');
const auth = require('../middlewares/authHanlder');

const {Router} = express;

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout',auth, logout);

router.get('/refresh', refresh);

// Blogs

router.post('/blog',auth, create);

router.get('/blog/all',auth, getAll);

router.get('/blog/:id',auth, getById);

router.put('/blog',auth, update);

router.delete('/blog/:id',auth, deleteById);

module.exports = router;