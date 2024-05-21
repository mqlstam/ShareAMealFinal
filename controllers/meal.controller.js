// controllers/meal.controller.js
import logger from '../util/logger.js';
import mealService from '../services/meal.service.js';

const mealController = {
  create: (req, res, next) => {
    const meal = req.body;
    logger.info(`Creating new meal: ${meal.name}`);
    mealService.create(meal, (error, data) => {
      if (error) {
        logger.error(`Error creating meal: ${error.message}`);
        return next(error);
      }
      logger.info(`Meal created: ${data.id}`);
      res.status(201).json({ message: 'Meal created successfully', data });
    });
  },

  getAll: (req, res, next) => {
    logger.info('Retrieving all meals');
    mealService.getAll((error, data) => {
      if (error) {
        logger.error(`Error retrieving meals: ${error.message}`);
        return next(error);
      }
      logger.info('Meals retrieved successfully');
      res.status(200).json({ message: 'Meals retrieved successfully', data });
    });
  },

  getById: (req, res, next) => {
    const mealId = +req.params.mealId;
    logger.info(`Retrieving meal: ${mealId}`);
    mealService.getById(mealId, (error, data) => {
      if (error) {
        if (error.message === 'Meal not found') {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.error(`Error retrieving meal: ${error.message}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`Meal not found: ${mealId}`);
        return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
      }
      logger.info(`Meal retrieved: ${mealId}`);
      res.status(200).json({ message: 'Meal retrieved successfully', data });
    });
  },

  update: (req, res) => {
    const mealId = +req.params.mealId;
    const updatedMeal = req.body;
    const authenticatedUserId = +req.user.userId;

    logger.info(`User ${authenticatedUserId} attempting to update meal ${mealId}`);
    mealService.getCookId(mealId, (error, cookId) => {
      if (error) {
        if (error.message === 'Meal not found') {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.error(`Error retrieving cook ID for meal ${mealId}: ${error.message}`);
        return res.status(500).json({ status: 500, message: 'Internal Server Error', data: {} });
      }

      if (cookId !== authenticatedUserId) {
        logger.warn(`User ${authenticatedUserId} is not authorized to update meal ${mealId}`);
        return res.status(403).json({ status: 403, message: 'You are not authorized to update this meal', data: {} });
      }

      logger.info(`User ${authenticatedUserId} is updating meal ${mealId}`);
      mealService.update(mealId, updatedMeal, (error, data) => {
        if (error) {
          if (error.message === 'Meal not found') {
            logger.warn(`Meal not found: ${mealId}`);
            return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
          }
          logger.error(`Error updating meal ${mealId}: ${error.message}`);
          return res.status(500).json({ status: 500, message: 'Internal Server Error', data: {} });
        }
        if (!data) {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.info(`Meal ${mealId} updated successfully`);
        res.status(200).json({ status: 200, message: 'Meal updated successfully', data });
      });
    });
  },

  delete: (req, res, next) => {
    const mealId = +req.params.mealId;
    const authenticatedUserId = +req.user.userId;

    logger.info(`User ${authenticatedUserId} attempting to delete meal ${mealId}`);
    mealService.getCookId(mealId, (error, cookId) => {
      if (error) {
        if (error.message === 'Meal not found') {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.error(`Error retrieving cook ID for meal ${mealId}: ${error.message}`);
        return res.status(500).json({ status: 500, message: 'Internal Server Error', data: {} });
      }

      if (cookId !== authenticatedUserId) {
        logger.warn(`User ${authenticatedUserId} is not authorized to delete meal ${mealId}`);
        return res.status(403).json({ message: 'You are not authorized to delete this meal' });
      }

      logger.info(`Deleting meal: ${mealId}`);
      mealService.delete(mealId, (error, data) => {
        if (error) {
          if (error.message === 'Meal not found') {
            logger.warn(`Meal not found: ${mealId}`);
            return res.status(404).json({ message: 'Meal not found' });
          } else {
            logger.error(`Error deleting meal: ${error.message}`);
            return next(error); // Pass other errors to the error middleware
          }
        }
        logger.info(`Meal deleted: ${mealId}`);
        res.status(204).send();
      });
    });
  },

  participate: (req, res, next) => {
    const mealId = +req.params.mealId;
    const userId = +req.user.userId;
  
    logger.info(`User ${userId} participating in meal: ${mealId}`);

    // check max participants
    

    mealService.participate(userId, mealId, (error, data) => {
      if (error) {
        if (error.message === 'Meal not found') {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.error(`Error participating in meal: ${error.message}`);
        return next(error);
      }
      logger.info(`User ${userId} participated in meal: ${mealId}`);
      res.status(200).json({ message: 'Participation successful', data });
    });
  },  

  cancelParticipation: (req, res, next) => {
    const mealId = +req.params.mealId;
    const userId = +req.user.userId;

    logger.info(`User ${userId} canceling participation in meal: ${mealId}`);
    mealService.cancelParticipation(userId, mealId, (error, data) => {
      if (error) {
        logger.error(`Error canceling participation in meal: ${error.message}`);
        return next(error);
      }
      logger.info(`User ${userId} canceled participation in meal: ${mealId}`);
      res.status(200).json({ message: 'Participation canceled successfully', data });
    });
  },

  getParticipants: (req, res, next) => {
    const mealId = +req.params.mealId;
    logger.info(`Retrieving participants for meal: ${mealId}`);
    mealService.getParticipants(mealId, (error, data) => {
      if (error) {
        if (error.message === 'Meal not found') {
          logger.warn(`Meal not found: ${mealId}`);
          return res.status(404).json({ status: 404, message: 'Meal not found', data: {} });
        }
        logger.error(`Error retrieving participants: ${error.message}`);
        return next(error);
      }
      logger.info(`Participants retrieved for meal: ${mealId}`);
      res.status(200).json({ message: 'Participants retrieved successfully', data });
    });
  },

  getParticipantDetails: (req, res, next) => {
    const mealId = +req.params.mealId;
    const participantId = +req.params.participantId;
    logger.info(`Retrieving participant details for meal: ${mealId}, participant: ${participantId}`);
    mealService.getParticipantDetails(mealId, participantId, (error, data) => {
      if (error) {
        logger.error(`Error retrieving participant details: ${error.message}`);
        return next(error);
      }
      if (!data) {
        logger.warn(`Participant not found: ${participantId}`);
        return res.status(404).json({ message: 'Participant not found' });
      }
      logger.info(`Participant details retrieved for meal: ${mealId}, participant: ${participantId}`);
      res.status(200).json({ message: 'Participant details retrieved successfully', data });
    });
  }
};

export default mealController;
