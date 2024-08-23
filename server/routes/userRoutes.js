const express = require('express');
const { registerUser, loginUser, shareAccount, viewSharedAccounts, revokeAccount, logoutUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/share', auth(), shareAccount);
router.get('/shared', auth(), viewSharedAccounts);
router.post('/revoke', auth(), revokeAccount);
router.post('/logout', auth(), logoutUser);  // Added logout route

module.exports = router;
