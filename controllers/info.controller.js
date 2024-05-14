// controllers/info.controller.js

const logger = require('../util/logger');

const infoController = {
  getInfo: (req, res) => {
    const systemInfo = {
      studentName: 'Miquel Stam',
      studentNumber: '2159021',
      description: 'Share-a-Meal Application'
    };

    // Log the successful operation
    logger.info('System info retrieved successfully');

    // Format the response using responseFormatter
    res.status(200).json({ message: 'Info retrieved successfully', data: systemInfo });
  }
};

module.exports = infoController;
