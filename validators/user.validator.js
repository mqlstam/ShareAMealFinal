const { body, param } = require('express-validator');

const createUserValidationRules = () => [
  body('firstName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid first name: Must be a string between 2 and 50 characters'),
  body('lastName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid last name: Must be a string between 2 and 50 characters'),
  body('emailAddress')
    .isEmail()
    .withMessage('Invalid email address: Must follow the correct email format'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/)
    .withMessage('Invalid password: Must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'),
  // Add more validation rules for other fields
];

const updateUserValidationRules = () => [
  body('firstName')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid first name: Must be a string between 2 and 50 characters'),
  body('lastName')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid last name: Must be a string between 2 and 50 characters'),
  body('emailAddress')
    .optional()
    .isEmail()
    .withMessage('Invalid email address: Must follow the correct email format'),
  body('password')
    .optional()
    .isString()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/)
    .withMessage('Invalid password: Must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'),
  // Add more validation rules for other fields
];

const getUserValidationRules = () => [
  param('userId')
    .isNumeric()
    .withMessage('Invalid user ID: Must be a number'),
];

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
  getUserValidationRules,
};