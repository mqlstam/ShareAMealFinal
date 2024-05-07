const tracer = require('tracer');
require('dotenv').config();

const logger = tracer.colorConsole({
  format: '{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}',
  dateformat: 'HH:mm:ss.L',
  level: process.env.LOG_LEVEL || 'info',
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  }
});

module.exports = logger;