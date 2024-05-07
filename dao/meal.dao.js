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
  }
};

module.exports = mealDao;