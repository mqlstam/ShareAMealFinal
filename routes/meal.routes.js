const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const authenticate = require('../middleware/auth');
const { validationResult } = require('express-validator');
const {
  createMealValidationRules,
  updateMealValidationRules,
  getMealValidationRules,
} = require('../validators/meal.validator');

// Custom middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/meals',
  authenticate,
  createMealValidationRules(),
  validateRequest,
  mealController.create
);
router.get('/meals', mealController.getAll);
router.get(
  '/meals/:mealId',
  getMealValidationRules(),
  validateRequest,
  mealController.getById
);
router.put(
  '/meals/:mealId',
  authenticate,
  updateMealValidationRules(),
  validateRequest,
  mealController.update
);
router.delete('/meals/:mealId', authenticate, mealController.delete);
router.post('/meals/:mealId/participate', authenticate, mealController.participate);
router.delete('/meals/:mealId/participate', authenticate, mealController.cancelParticipation);
router.get('/meals/:mealId/participants', authenticate, mealController.getParticipants);
router.get(
  '/meals/:mealId/participants/:participantId',
  authenticate,
  mealController.getParticipantDetails
);

module.exports = router;