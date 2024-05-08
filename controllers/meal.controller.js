const logger = require('../util/logger');
const mealService = require('../services/meal.service');

const mealController = {
  create: (req, res, next) => {
    const meal = req.body;
    console.log(meal);

    // Log the incoming request data
    logger.info(`Creating new meal: ${meal.name}`);

    mealService.create(meal, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error creating meal: ${error.message}`);
        return next(error);
      }

      // Log the successful meal creation
      logger.info(`Meal created: ${data.id}`);
      res.status(201).json(data);
    });
  },
  getAll: (req, res, next) => {
    // Log the incoming request
    logger.info('Retrieving all meals');

    mealService.getAll((error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving meals: ${error.message}`);
        return next(error);
      }

      // Log the successful operation
      logger.info('Meals retrieved successfully');
      res.status(200).json(data);
    });
  },
  getById: (req, res, next) => {
    const mealId = req.params.mealId;

    // Log the incoming request
    logger.info(`Retrieving meal: ${mealId}`);

    mealService.getById(mealId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving meal: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`Meal not found: ${mealId}`);
        return res.status(404).json({ message: 'Meal not found' });
      }

      // Log the successful operation
      logger.info(`Meal retrieved: ${mealId}`);
      res.status(200).json(data);
    });
  },
  update: (req, res, next) => {
    const mealId = req.params.mealId;
    const updatedMeal = req.body;

    // Log the incoming request
    logger.info(`Updating meal: ${mealId}`);

    mealService.update(mealId, updatedMeal, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error updating meal: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`Meal not found: ${mealId}`);
        return res.status(404).json({ message: 'Meal not found' });
      }

      // Log the successful operation
      logger.info(`Meal updated: ${mealId}`);
      res.status(200).json(data);
    });
  },
  delete: (req, res, next) => {
    const mealId = req.params.mealId;

    // Log the incoming request
    logger.info(`Deleting meal: ${mealId}`);

    mealService.delete(mealId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error deleting meal: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`Meal not found: ${mealId}`);
        return res.status(404).json({ message: 'Meal not found' });
      }

      // Log the successful operation
      logger.info(`Meal deleted: ${mealId}`);
      res.status(204).json(data);
    });
  },
  participate: (req, res, next) => {
    const mealId = req.params.mealId;
    const userId = req.user.userId;

    // Log the incoming request
    logger.info(`User ${userId} participating in meal: ${mealId}`);

    mealService.participate(userId, mealId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error participating in meal: ${error.message}`);
        return next(error);
      }

      // Log the successful operation
      logger.info(`User ${userId} participated in meal: ${mealId}`);
      res.status(200).json(data);
    });
  },
  cancelParticipation: (req, res, next) => {
    const mealId = req.params.mealId;
    const userId = req.user.userId;

    // Log the incoming request
    logger.info(`User ${userId} canceling participation in meal: ${mealId}`);

    mealService.cancelParticipation(userId, mealId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error canceling participation in meal: ${error.message}`);
        return next(error);
      }

      // Log the successful operation
      logger.info(`User ${userId} canceled participation in meal: ${mealId}`);
      res.status(200).json(data);
    });
  },
  getParticipants: (req, res, next) => {
    const mealId = req.params.mealId;

    // Log the incoming request
    logger.info(`Retrieving participants for meal: ${mealId}`);

    mealService.getParticipants(mealId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving participants: ${error.message}`);
        return next(error);
      }

      // Log the successful operation
      logger.info(`Participants retrieved for meal: ${mealId}`);
      res.status(200).json(data);
    });
  },
  getParticipantDetails: (req, res, next) => {
    const mealId = req.params.mealId;
    const participantId = req.params.participantId;

    // Log the incoming request
    logger.info(`Retrieving participant details for meal: ${mealId}, participant: ${participantId}`);

    mealService.getParticipantDetails(mealId, participantId, (error, data) => {
      if (error) {
        // Log the error
        logger.error(`Error retrieving participant details: ${error.message}`);
        return next(error);
      }

      if (!data) {
        // Log the error
        logger.warn(`Participant not found: ${participantId}`);
        return res.status(404).json({ message: 'Participant not found' });
      }

      // Log the successful operation
      logger.info(`Participant details retrieved for meal: ${mealId}, participant: ${participantId}`);
      res.status(200).json(data);
    });
  }
};

module.exports = mealController;