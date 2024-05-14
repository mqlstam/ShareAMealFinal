// routes/user.routes.js
import express from 'express';
import userController from '../controllers/user.controller.js';
import authenticate from '../middleware/auth.js';
import { validationResult } from 'express-validator';
import { createUserValidationRules, updateUserValidationRules, getUserValidationRules } from '../validators/user.validator.js';

const router = express.Router();

// Custom middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/user/profile', authenticate, userController.getProfile);
router.post('/user', createUserValidationRules(), validateRequest, userController.create);
router.get('/user', authenticate, userController.getAll);
router.get('/user/:userId', authenticate, getUserValidationRules(), validateRequest, userController.getById);
router.put('/user/:userId', authenticate, updateUserValidationRules(), validateRequest, userController.update);
router.delete('/user/:userId', authenticate, getUserValidationRules(), validateRequest, userController.delete);

export default router;
