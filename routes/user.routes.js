const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth");
const { validationResult } = require("express-validator");
const {
  createUserValidationRules,
  updateUserValidationRules,
  getUserValidationRules,
} = require("../validators/user.validator");

// Custom middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/user/profile", authenticate, userController.getProfile);
router.post(
  "/user",
  createUserValidationRules(),
  validateRequest,
  userController.create
);
router.get("/user", authenticate, userController.getAll);
router.get(
  "/user/:userId",
  authenticate,
  getUserValidationRules(),
  validateRequest,
  userController.getById
);
router.put(
  "/user/:userId",
  authenticate,
  updateUserValidationRules(),
  validateRequest,
  userController.update
);
router.delete(
  "/user/:userId",
  authenticate,
  getUserValidationRules(),
  validateRequest,
  userController.delete
);

module.exports = router;
