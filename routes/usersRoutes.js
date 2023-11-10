const express = require('express');
const router = express.Router();

const {
    addUser, loginUser, getThisuser
} = require('../controllers/usersController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', addUser);
router.post('/login', loginUser);
router.get('/this', protect, getThisuser);

module.exports = router;