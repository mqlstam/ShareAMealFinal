const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

router.post('/meals', authenticate, validateMeal, mealController.create);
router.get('/meals', mealController.getAll);
router.get('/meals/:mealId', mealController.getById);
router.put('/meals/:mealId', authenticate, validateMeal, mealController.update);
router.delete('/meals/:mealId', authenticate, mealController.delete);
router.post('/meals/:mealId/participate', authenticate, mealController.participate);
router.delete('/meals/:mealId/participate', authenticate, mealController.cancelParticipation);
router.get('/meals/:mealId/participants', authenticate, mealController.getParticipants);
router.get('/meals/:mealId/participants/:participantId', authenticate, mealController.getParticipantDetails);

module.exports = router;