const logger = require('../util/logger');
const userService = require('../services/user.service');

const userController = {
  create: (req, res, next) => {
    const user = req.body;

    // Log the incoming request data
    logger.info('Creating new user', user);

    userService.create(user, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error creating user: ${error.message}`);
        return next(error);
      }

      // Log the successful user creation
      logger.info(`User created: ${data.id}`);
      res.status(201).json(data);
    });
  },
  getAll: (req, res, next) => {
    // Log the incoming request
    logger.info('Retrieving all users');

    userService.getAll((error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving users: ${error.message}`);
        return next(error);
      }

      // Log the successful operation
      logger.info('Users retrieved successfully');
      res.status(200).json(data);
    });
  },
  getById: (req, res, next) => {
    const userId = req.params.userId;

    // Log the incoming request
    logger.info(`Retrieving user: ${userId}`);

    userService.getById(userId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving user: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }

      // Log the successful operation
      logger.info(`User retrieved: ${userId}`);
      res.status(200).json(data);
    });
  },
  update: (req, res, next) => {
    const userId = req.params.userId;
    const updatedUser = req.body;

    // Log the incoming request
    logger.info(`Updating user: ${userId}`);

    userService.update(userId, updatedUser, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error updating user: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }

      // Log the successful operation
      logger.info(`User updated: ${userId}`);
      res.status(200).json(data);
    });
  },
  delete: (req, res, next) => {
    const userId = req.params.userId;

    // Log the incoming request
    logger.info(`Deleting user: ${userId}`);

    userService.delete(userId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error deleting user: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }

      // Log the successful operation
      logger.info(`User deleted: ${userId}`);
      res.status(204).json(data);
    });
  },
  getProfile: (req, res, next) => {
    
    const userId = req.user.userId;
  
    // Ensure userId is a number
    if (typeof userId !== 'number') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    // Log the incoming request
    logger.info(`Retrieving user profile: ${userId}`);
  
    userService.getProfile(userId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving user: ${JSON.stringify(error)}`);
        return next(error);
      }
  
      if (!data) {
        // Log the error
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Log the successful operation
      logger.info(`User profile retrieved: ${userId}`);
      res.status(200).json(data);
    });
  }
};
module.exports = userController;