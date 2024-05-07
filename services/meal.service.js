const mealDao = require('../dao/meal.dao');

const mealService = {
  create: (meal, callback) => {
    // Implementation here
  },
  getAll: (callback) => {
    // Implementation here
  },
  getById: (id, callback) => {
    // Implementation here
  },
  update: (meal, callback) => {
    // Implementation here
  },
  delete: (id, callback) => {
    // Implementation here
  },
  participate: (userId, mealId, callback) => {
    // Implementation here
  },
  cancelParticipation: (userId, mealId, callback) => {
    // Implementation here
  },
  getParticipants: (mealId, callback) => {
    // Implementation here
  },
  getParticipantDetails: (mealId, participantId, callback) => {
    // Implementation here
  }
};

module.exports = mealService;