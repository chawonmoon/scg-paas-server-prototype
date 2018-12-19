'use strict';

// log level : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// const CONFIG = require('../config');
const process = require('process');
const DEBUG_MODE = process.env.NODE_ENV === 'development' ? true : false;
// const chalk = require('chalk');
// const winston = require('winston');
// const moment = require('moment');
// const WinstonDailyRotateFile = require('winston-daily-rotate-file');

// let logFileName = CONFIG.LOG_FILE_NAME;
// if (process.env.LOG_FILE_NAME) {
//     logFileName = process.env.LOG_FILE_NAME;
// }

// const fileLogTransport = new WinstonDailyRotateFile({
//     filename: logFileName,
//     prepend: true,
//     json: false,
//     maxSize: CONFIG.LOG_MAX_FILE_SIZE,
//     maxFiles: CONFIG.LOG_MAX_FILE_COUNT,
//     datePattern: 'YYYY-MM-DD',
//     timestamp() {
//         return moment().format(CONFIG.LOGFILE_TIME_FORMAT);
//     },
//     level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
// });

// fileLogTransport

// const logger = new (winston.Logger)({
//     transports: [
//         new (winston.transports.Console)({
//             timestamp: function () {
//                 return moment().format(CONFIG.LOGFILE_TIME_FORMAT);
//             },
//             level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
//         })
//     ]
// });

module.exports = {
    debug: function (message) {
        // logger.debug(chalk.blue(message));
        if (DEBUG_MODE) {
            console.info(message);
        }
    },
    info: function (message) {
        // logger.info(chalk.green(message));
        console.info(message);
    },
    warn: function (message) {
        // logger.warn(chalk.yellow(message));
        console.warn(message);
    },
    error: function (message) {
        // logger.error(chalk.red(message));
        console.error(message);
    }
};