// util/config.js
require('dotenv').config();

const config = {
  secretKey: process.env.SECRET_KEY
};

module.exports = config;