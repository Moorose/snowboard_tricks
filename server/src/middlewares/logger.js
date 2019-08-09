const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: "app",
    level: "debug"
});

//   name: 'app',
//   streams: [
//     {
//       type: 'rotating-file',
//       level: 'debug',
//       path: 'logs/appDebug.log',
//       period: '1d',
//       count: 3,
//     },
//     {
//       type: 'rotating-file',
//       level: 'info',
//       path: 'logs/appInfo.log',
//       period: '1d',
//       count: 3,
//     },
//     {
//       type: 'rotating-file',
//       level: 'error',
//       path: 'logs/appInfo.log',
//       period: '1d',
//       count: 3,
//     },
//   ],
// });

module.exports = logger;
