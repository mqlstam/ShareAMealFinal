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
    mealDao.participate(userId, mealId, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, data);
    });
  },
  cancelParticipation: (userId, mealId, callback) => {
    mealDao.cancelParticipation(userId, mealId, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, data);
    });
  },
  getParticipants: (mealId, callback) => {
    mealDao.getParticipants(mealId, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, data);
    });
  },
  getParticipantDetails: (mealId, participantId, callback) => {
    mealDao.getParticipantDetails(mealId, participantId, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, data);
    });
  }
};

module.exports = mealService;