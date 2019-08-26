
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'app',
  level: 'debug',
});

module.exports = logger;
