const mealDao = require('../dao/meal.dao');

const mealService = {
  create: (meal, callback) => {
    mealDao.create(meal, callback);
  },
  getAll: (callback) => {
    mealDao.getAll(callback);
  },
  getById: (id, callback) => {
    mealDao.getById(id, callback);
  },
  update: (id, updatedMeal, callback) => {
    mealDao.update(id, updatedMeal, callback);
  },
  delete: (id, callback) => {
    mealDao.delete(id, callback);
  },
  participate: (userId, mealId, callback) => {
    // Check if the meal exists
    mealDao.getById(mealId, (error, meal) => {
      if (error) {
        return callback(error, null);
      }
      if (!meal) {
        return callback({ message: 'Meal not found' }, null);
      }

      // Check if the maximum number of participants has been reached
      if (meal.participants && meal.participants.length >= meal.maxAmountOfParticipants) {
        return callback({ message: 'Maximum number of participants reached' }, null);
      }

      // Add the participant
      mealDao.participate(userId, mealId, callback);
    });
  },
  cancelParticipation: (userId, mealId, callback) => {
    // Check if the user is a participant of the meal
    mealDao.getParticipants(mealId, (error, participants) => {
      if (error) {
        return callback(error, null);
      }

      const isParticipant = participants.some(p => p.id === userId);
      if (!isParticipant) {
        return callback({ message: 'User is not a participant of this meal' }, null);
      }

      // Cancel the participation
      mealDao.cancelParticipation(userId, mealId, callback);
    });
  },
  getParticipants: (mealId, callback) => {
    mealDao.getParticipants(mealId, callback);
  },
  getParticipantDetails: (mealId, participantId, callback) => {
    mealDao.getParticipantDetails(mealId, participantId, callback);
  },
  getCookId: (mealId, callback) => {
    mealDao.getCookId(mealId, callback);
  },
};

module.exports = mealService;