const db = require('../mysql-db');

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
  update: (id, meal, callback) => {
    const query = 'UPDATE meal SET name = ?, description = ?, imageUrl = ?, price = ?, dateTime = ?, maxAmountOfParticipants = ?, isActive = ?, isVega = ?, isVegan = ?, isToTakeHome = ?, cookId = ? WHERE id = ?';
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
      meal.cookId,
      id
    ];

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
        return callback({ message: 'Meal not found' }, null);
      }
      callback(null, { message: 'Meal deleted successfully' });
    });
  },
  participate: (userId, mealId, callback) => {
    const query = 'INSERT INTO meal_participant (userId, mealId) VALUES (?, ?)';
    const values = [userId, mealId];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, { message: `User ${userId} has joined meal ${mealId}` });
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
  }
};

module.exports = mealDao;