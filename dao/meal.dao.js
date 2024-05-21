// dao/meal.dao.js

import db from '../mysql-db.js';

const mealDao = {
  create: (meal, callback) => {
    const query = 'INSERT INTO meal (name, description, imageUrl, price, dateTime, maxAmountOfParticipants, isActive, isVega, isVegan, isToTakeHome, cookId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      meal.name,
      meal.description,
      meal.imageUrl,
      meal.price,
      meal.dateTime,
      meal.maxAmountOfParticipants,
      meal.isActive,
      meal.isVega,
      meal.isVegan,
      meal.isToTakeHome,
      meal.cookId
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, { id: result.insertId, ...meal });
    });
  },
  getAll: (callback) => {
    const query = 'SELECT * FROM meal';
    db.query(query, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM meal WHERE id = ?';
    db.query(query, [id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.length === 0) {
        return callback({ message: 'Meal not found' }, null);
      }
      callback(null, result[0]);
    });
  },
  update: function(id, meal, callback) {
    const query = 'UPDATE meal SET ? WHERE id = ?';
    const values = [meal, id];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.affectedRows === 0) {
        return callback({ message: 'Meal not found' }, null);
      }
      callback(null, { id, ...meal });
    });
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM meal WHERE id = ?';
    db.query(query, [id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.affectedRows === 0) {
        // Return an error explicitly
        // return callback(new Error('Meal not found'), null);
        return callback({ message: 'Meal not found' }, null); // Change this line
      }
      callback(null, { message: 'Meal deleted successfully' });
    });
  },

participate: (userId, mealId, callback) => {
  // First, get the meal details
  const getMealQuery = 'SELECT * FROM meal WHERE id = ?';
  db.query(getMealQuery, [mealId], (error, mealResult) => {
    if (error) {
      return callback(error, null);
    }
    if (mealResult.length === 0) {
      return callback({ message: 'Meal not found' }, null);
    }

    const meal = mealResult[0];

    // Get the actual participants associated with the meal
    const getParticipantsQuery = `
      SELECT COUNT(*) AS participantCount
      FROM meal_participant
      WHERE mealId = ?
    `;
    db.query(getParticipantsQuery, [mealId], (error, participantResult) => {
      if (error) {
        return callback(error, null);
      }

      const participantCount = participantResult[0].participantCount;

      // Check if the maximum number of participants has been reached
      if (participantCount >= meal.maxAmountOfParticipants) {
        return callback({ message: 'Maximum number of participants reached' }, null);
      }

      // If the maximum hasn't been reached, insert the new participant
      const insertQuery = 'INSERT INTO meal_participant (userId, mealId) VALUES (?, ?)';
      const values = [userId, mealId];
      db.query(insertQuery, values, (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, { message: `User ${userId} has joined meal ${mealId}` });
      });
    });
  });
},

  cancelParticipation: (userId, mealId, callback) => {
    const query = 'DELETE FROM meal_participant WHERE userId = ? AND mealId = ?';
    const values = [userId, mealId];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.affectedRows === 0) {
        return callback({ message: 'User is not a participant of this meal' }, null);
      }
      callback(null, { message: `User ${userId} has cancelled participation for meal ${mealId}` });
    });
  },

  getParticipants: (mealId, callback) => {
    const query = `
      SELECT u.id, u.firstName, u.lastName, u.emailAdress
      FROM meal_participant mp
      JOIN user u ON mp.userId = u.id
      WHERE mp.mealId = ?
    `;

    db.query(query, [mealId], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },

  getParticipantDetails: (mealId, participantId, callback) => {
    const query = `
      SELECT u.id, u.firstName, u.lastName, u.emailAdress, u.phoneNumber, u.street, u.city
      FROM meal_participant mp
      JOIN user u ON mp.userId = u.id
      WHERE mp.mealId = ? AND u.id = ?
    `;

    db.query(query, [mealId, participantId], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.length === 0) {
        return callback({ message: 'Participant not found' }, null);
      }
      callback(null, result[0]);
    });
  },
  getCookId: (mealId, callback) => {
    const query = 'SELECT cookId FROM meal WHERE id = ?';
    db.query(query, [mealId], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.length === 0) {
        return callback({ message: 'Meal not found' }, null);
      }
      callback(null, result[0].cookId);
    });
  },

};

export default mealDao;