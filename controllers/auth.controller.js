// controllers/auth.controller.js
const logger = require('../util/logger');

const authService = require('../services/auth.service');

const authController = {
  login: (req, res, next) => {
    const { emailAddress, password } = req.body;

    // Log the incoming request data
    logger.info(`Login request received: ${emailAddress}`);

    // Validate the input data
    if (!emailAddress || !password) {
      logger.warn('Invalid login request: Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    authService.login(emailAddress, password, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error during login: ${error.message}`);
        return next(error);
      }

      // Log the successful login
      logger.info(`User ${emailAddress} logged in successfully`);
      res.status(200).json(data);
    });
  }
};

module.exports = authController;