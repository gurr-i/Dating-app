const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define user-related routes

// router.get('/profile', userController.profile);
router.post('/saveBirthdate', userController.saveBirthdate);
router.post('/saveuser', userController.saveuser);


module.exports = router;
