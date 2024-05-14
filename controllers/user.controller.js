import logger from '../util/logger.js';
import userService from '../services/user.service.js';

const userController = {
  create: (req, res, next) => {
    const user = req.body;
    logger.info('Creating new user', user);
    userService.create(user, (error, data) => {
      if (error) {
        logger.error(`Error creating user: ${error.message}`);
        return next(error);
      }
      logger.info(`User created: ${data.id}`);
      res.status(201).json({ message: 'User created successfully', data });
    });
  },

  getAll: (req, res, next) => {
    const filters = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      emailAddress: req.query.emailAddress,
      roles: req.query.roles
    };
    logger.info('Retrieving users with filters', filters);
    userService.getAllFiltered(filters, (error, data) => {
      if (error) {
        logger.error(`Error retrieving users: ${error.message}`);
        return next(error);
      }
      logger.info('Users retrieved successfully');
      res.status(200).json({ message: 'Users retrieved successfully', data });
    });
  },

  getById: (req, res, next) => {
    const userId = +req.user.userId; 
    
    logger.info(`Retrieving user: ${userId}`);
    userService.getById(userId, (error, data) => {
      if (error) {
        logger.error(`Error retrieving user: ${error.message}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User retrieved: ${userId}`);
      res.status(200).json({ message: 'User retrieved successfully', data });
    });
  },

  update: (req, res, next) => {
    const userId = +req.user.userId; 
    const updatedUser = req.body;
    const authenticatedUserId = +req.user.userId;
    if (userId !== authenticatedUserId) {
      return res.status(403).json({ message: 'You are not authorized to update this user' });
    }
    logger.info(`Updating user: ${userId}`);
    userService.update(userId, updatedUser, (error, data) => {
      if (error) {
        logger.error(`Error updating user: ${error.message}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User updated: ${userId}`);
      res.status(200).json({ message: 'User updated successfully', data });
    });
  },

  delete: (req, res, next) => {
    const userId = +req.user.userId;     

    const authenticatedUserId = +req.user.userId;
    if (userId !== authenticatedUserId) {
      console.log('You are not authorized to delete this user');

      return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }
    logger.info(`Deleting user: ${userId}`);
    userService.delete(userId, (error, data) => {
      if (error) {
        logger.error(`Error deleting user: ${error.message}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User deleted: ${userId}`);
      res.status(204).json({ message: 'User deleted successfully', data });
    });
  },

  getProfile: (req, res, next) => {
    const userId = +req.user.userId; 
    if (typeof userId !== 'number') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    logger.info(`Retrieving user profile: ${userId}`);
    userService.getProfile(userId, (error, data) => {
      if (error) {
        logger.error(`Error retrieving user: ${JSON.stringify(error)}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`User not found: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User profile retrieved: ${userId}`);
      res.status(200).json({ message: 'User profile retrieved successfully', data });
    });
  }
};

export default userController;
