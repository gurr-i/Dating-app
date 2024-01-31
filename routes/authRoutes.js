const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define authentication routes
router.get('/authenticateGoogle', authController.authenticateGoogle);
router.get('/googleCallback', authController.googleCallback);
router.get('/failure', authController.failure);
router.get('/protectedRoute', authController.protectedRoute);

router.get('/', authController.index);
router.get('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
