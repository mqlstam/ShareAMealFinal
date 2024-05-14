import logger from '../util/logger.js';
import authService from '../services/auth.service.js';
import responseFormatter from '../middleware/responseFormatter.js';

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
        
        // Check the type of error and send appropriate status code
        if (error.message === 'Invalid email or password') {
          return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Internal server error' });
      }

      // Log the successful login
      logger.info(`User ${emailAddress} logged in successfully`);

      // Format the response using responseFormatter
      res.status(200).json({ message: 'Login successful', data });
    });
  }
};

export default authController;
