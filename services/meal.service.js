
import mealDao from '../dao/meal.dao.js';

const mealService = {
  create: (meal, callback) => {
    try {
      mealDao.create(meal, callback);
    } catch (error) {
      callback(error, null);
    }
  },

  getAll: (callback) => {
    try {
      mealDao.getAll(callback);
    } catch (error) {
      callback(error, null);
    }
  },

  getById: (id, callback) => {
    try {
      mealDao.getById(id, callback);
    } catch (error) {
      callback(error, null);
    }
  },

  update: (id, updatedMeal, callback) => {
    try {
      mealDao.update(id, updatedMeal, callback);
    } catch (error) {
      callback(error, null);
    }
  },

  delete: (id, callback) => {
    try {
      mealDao.delete(id, (error, data) => {
        if (error) {
          // If the error is "Meal not found", return a 404 error
          if (error.message === 'Meal not found') {
            return callback({ message: 'Meal not found', statusCode: 404 }, null);
          }
          // Pass other errors to the callback
          return callback(error, null);
        }
        callback(null, data);
      });
    } catch (error) {
      callback(error, null);
    }
  },

  participate: (userId, mealId, callback) => {
    try {
      mealDao.getById(mealId, (error, meal) => {
        if (error) {
          return callback(error, null);
        }
        if (!meal) {
          return callback({ message: 'Meal not found' }, null);
        }
  
        // Get the current number of participants
        mealDao.getParticipants(mealId, (error, participants) => {
          if (error) {
            return callback(error, null);
          }
  
          // Check if the maximum number of participants has been reached
          if (participants.length >= meal.maxAmountOfParticipants) {
            return callback({ message: 'Maximum number of participants reached' }, null);
          }
  
          // If the maximum hasn't been reached, allow the new participant to join
          mealDao.participate(userId, mealId, callback);
        });
      });
    } catch (error) {
      callback(error, null);
    }
  },

  cancelParticipation: (userId, mealId, callback) => {
    try {
      mealDao.getParticipants(mealId, (error, participants) => {
        if (error) {
          return callback(error, null);
        }

        const isParticipant = participants.some(p => p.id === userId);
        if (!isParticipant) {
          return callback({ message: 'User is not a participant of this meal' }, null);
        }

        mealDao.cancelParticipation(userId, mealId, callback);
      });
    } catch (error) {
      callback(error, null);
    }
  },
  getParticipants: (mealId, callback) => {
    try {
      mealDao.getById(mealId, (error, meal) => {
        if (error) {
          return callback(error, null);
        }
        if (!meal) {
          return callback({ message: 'Meal not found', statusCode: 404 }, null);
        }
        mealDao.getParticipants(mealId, callback);
      });
    } catch (error) {
      callback(error, null);
    }
  },

  getParticipantDetails: (mealId, participantId, callback) => {
    try {
      mealDao.getParticipantDetails(mealId, participantId, callback);
    } catch (error) {
      callback(error, null);
    }
  },

  getCookId: (mealId, callback) => {
    try {
      mealDao.getCookId(mealId, callback);
    } catch (error) {
      callback(error, null);
    }
  },
};

export default mealService;
