
import logger from '../util/logger';
import authService from '../services/auth.service';
import responseFormatter from '../middleware/responseFormatter';

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

      // Format the response using responseFormatter
      res.status(200).json({ message: 'Login successful', data });
    });
  }
};

export default authController;
