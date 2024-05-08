const { body, param } = require('express-validator');

const createMealValidationRules = () => [
  body('name')
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Invalid meal name: Must be a string between 2 and 100 characters'),
  body('description')
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage('Invalid meal description: Must be a string between 10 and 500 characters'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0.01, max: 10000 })
    .withMessage('Invalid meal price: Must be a positive number not exceeding 10,000'),
  // Add more validation rules for other fields
];

const updateMealValidationRules = () => [
  body('name')
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Invalid meal name: Must be a string between 2 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage('Invalid meal description: Must be a string between 10 and 500 characters'),
  body('price')
    .optional()
    .isNumeric()
    .isFloat({ min: 0.01, max: 10000 })
    .withMessage('Invalid meal price: Must be a positive number not exceeding 10,000'),
  // Add more validation rules for other fields
];

const getMealValidationRules = () => [
  param('mealId')
    .isNumeric()
    .withMessage('Invalid meal ID: Must be a number'),
];

module.exports = {
  createMealValidationRules,
  updateMealValidationRules,
  getMealValidationRules,
};