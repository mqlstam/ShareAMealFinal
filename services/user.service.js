
import userDao from '../dao/user.dao.js';

const userService = {
  create: (user, callback) => {
    userDao.create(user, callback);
  },
  getAll: (callback) => {
    userDao.getAll(callback);
  },
  getById: (id, callback) => {
    userDao.getById(id, callback);
  },
  update: (id, updatedUser, callback) => {
    userDao.update(id, updatedUser, callback);
  },
  delete: (id, callback) => {
    userDao.delete(id, callback);
  },
  getProfile: (userId, callback) => {
    userDao.getById(userId, callback);
  },
  getAllFiltered: (filters, callback) => {
    userDao.getAllFiltered(filters, callback);
  }
};

export default userService;