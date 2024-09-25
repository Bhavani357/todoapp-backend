const express = require('express');
const { signup, login, updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', verifyToken,updateProfile); 

module.exports = router;
