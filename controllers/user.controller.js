const userService = require('../services/user.service');

const userController = {
  create: (req, res, next) => {
    const user = req.body;
    userService.create(user, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(201).json(data);
    });
  },
  getAll: (req, res, next) => {
    userService.getAll((error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  getById: (req, res, next) => {
    const userId = req.params.userId;
    userService.getById(userId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  update: (req, res, next) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
    userService.update(userId, updatedUser, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  },
  delete: (req, res, next) => {
    const userId = req.params.userId;
    userService.delete(userId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(204).json(data);
    });
  },
  getProfile: (req, res, next) => {
    const userId = req.user.userId;
    userService.getProfile(userId, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  }
};

module.exports = userController;