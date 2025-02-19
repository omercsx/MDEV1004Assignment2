/**
 * @author: Omer Cagri Sayir
 * @date: 2025-02-19
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', userController.getAllUsers);

module.exports = router;
