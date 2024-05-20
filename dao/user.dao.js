
import db from '../mysql-db.js';

const userDao = {
  create: (user, callback) => {
    const query = 'INSERT INTO user (firstName, lastName, emailAdress, password, phoneNumber, roles, street, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password,
      user.phoneNumber,
      user.roles, // Assuming roles is a comma-separated string
      user.street,
      user.city
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, { id: result.insertId, ...user });
    });
  },
  getAll: (callback) => {
    const query = 'SELECT * FROM user';
    db.query(query, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.length === 0) {
        return callback({ message: 'User not found' }, null);
      }
      callback(null, result[0]);
    });
  },
  update: (id, user, callback) => {
    const query = 'UPDATE user SET firstName = ?, lastName = ?, emailAdress = ?, password = ?, phoneNumber = ?, roles = ?, street = ?, city = ? WHERE id = ?';
    const values = [
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password,
      user.phoneNumber,
      user.roles,
      user.street,
      user.city,
      id
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.affectedRows === 0) {
        return callback({ message: 'User not found' }, null);
      }
      callback(null, { id, ...user });
    });
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [id], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.affectedRows === 0) {
        return callback({ message: 'User not found' }, null);
      }
      callback(null, { message: 'User deleted successfully' });
    });
  },
  getByEmail: (emailAddress, callback) => {
    const query = 'SELECT * FROM user WHERE emailAdress = ?';
    db.query(query, [emailAddress], (error, result) => {
      if (error) {
        return callback(error, null);
      }
      if (result.length === 0) {
        return callback(null, null);
      }
      callback(null, result[0]);
    });
  },

  getAllFiltered: (filters, callback) => {
    let query = 'SELECT * FROM user';
    const values = [];

    if (filters.firstName) {
      query += ' WHERE firstName LIKE ?';
      values.push(`%${filters.firstName}%`);
    }

    if (filters.lastName) {
      query += (values.length > 0 ? ' AND lastName LIKE ?' : ' WHERE lastName LIKE ?');
      values.push(`%${filters.lastName}%`);
    }

    if (filters.emailAddress) {
      query += (values.length > 0 ? ' AND emailAddress LIKE ?' : ' WHERE emailAddress LIKE ?');
      values.push(`%${filters.emailAddress}%`);
    }

    if (filters.roles) {
      query += (values.length > 0 ? ' AND roles = ?' : ' WHERE roles = ?');
      values.push(filters.roles);
    }

    db.query(query, values, (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    });
  }
};

export default userDao;