// middleware/error.js
const logger = require('../util/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.stack); // Log the error stack trace

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: {}
  });
};

module.exports = errorMiddleware;