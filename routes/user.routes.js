const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth');
const { validationResult } = require('express-validator');
const {
  createUserValidationRules,
  updateUserValidationRules,
  getUserValidationRules,
} = require('../validators/user.validator');

// Custom middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/users',
  createUserValidationRules(),
  validateRequest,
  userController.create
);
router.get('/users', authenticate, userController.getAll);
router.get(
  '/users/:userId',
  authenticate,
  getUserValidationRules(),
  validateRequest,
  userController.getById
);
router.put(
  '/users/:userId',
  authenticate,
  updateUserValidationRules(),
  validateRequest,
  userController.update
);
router.delete(
  '/users/:userId',
  authenticate,
  getUserValidationRules(),
  validateRequest,
  userController.delete
);
router.get('/users/profile', authenticate, userController.getProfile);

module.exports = router;