const mealService = require('../services/meal.service');

const mealController = {
  create: (req, res, next) => {
    const meal = req.body;
    mealService.create(meal, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(201).json(data);
    });
  },
  getAll: (req, res, next) => {
    mealService.getAll((error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  getById: (req, res, next) => {
    const mealId = req.params.mealId;
    mealService.getById(mealId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  update: (req, res, next) => {
    const mealId = req.params.mealId;
    const updatedMeal = req.body;
    mealService.update(mealId, updatedMeal, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  delete: (req, res, next) => {
    const mealId = req.params.mealId;
    mealService.delete(mealId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(204).json(data);
    });
  },
  participate: (req, res, next) => {
    const mealId = req.params.mealId;
    const userId = req.user.userId;
    mealService.participate(userId, mealId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  cancelParticipation: (req, res, next) => {
    const mealId = req.params.mealId;
    const userId = req.user.userId;
    mealService.cancelParticipation(userId, mealId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  getParticipants: (req, res, next) => {
    const mealId = req.params.mealId;
    mealService.getParticipants(mealId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  getParticipantDetails: (req, res, next) => {
    const mealId = req.params.mealId;
    const participantId = req.params.participantId;
    mealService.getParticipantDetails(mealId, participantId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  }
};

module.exports = mealController;