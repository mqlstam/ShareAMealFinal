const jwt = require('jsonwebtoken');
const userDao = require('../dao/user.dao');
const config = require('../util/config'); 

const authService = {
  login: (emailAddress, password, callback) => {
    userDao.getByEmail(emailAddress, (error, user) => {
      if (error) {
        return callback(error, null);
      }

      if (!user || user.password !== password) {
        return callback({ message: 'Invalid email or password' }, null);
      }

      const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' }); 
      callback(null, { token });
    });
  }
};

module.exports = authService;