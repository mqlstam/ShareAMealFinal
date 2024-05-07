const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth');

router.post('/users', validateUser, userController.create);
router.get('/users', authenticate, userController.getAll);
router.get('/users/:userId', authenticate, userController.getById);
router.put('/users/:userId', authenticate, validateUser, userController.update);
router.delete('/users/:userId', authenticate, userController.delete);
router.get('/users/profile', authenticate, userController.getProfile);

module.exports = router;