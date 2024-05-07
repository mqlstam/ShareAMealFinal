const authService = require('../services/auth.service');

const authController = {
  login: (req, res, next) => {
    const { emailAddress, password } = req.body;

    authService.login(emailAddress, password, (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json(data);
    });
  }
};

module.exports = authController;