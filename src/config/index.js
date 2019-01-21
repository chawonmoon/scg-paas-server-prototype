'use strict';

const process = require('process');
let databaseName = process.env.DB || 'scgpaas';

const config = {};

// 60 * 60 * 24 하루
config.JSONTOKEN_EXPIRE = 60 * 60 * 24 * 100;
// jsonweb token key
config.JSONTOKEN_SECRETKEY = 'lsisjwtsecretkey';

// 로그파일 포맷
config.LOGFILE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
// 로그파일 이름
config.LOG_FILE_NAME = 'app.log';
// 로그파일 max size
config.LOG_MAX_FILE_SIZE = 10485760;
// 로그파일 rolling 기준 파일 갯수
config.LOG_MAX_FILE_COUNT = 3;

// api prefix url
config.API_PREFIX_URL = '/api';

// db connection info
config.db = {
    host: '127.0.0.1',
    user: 'yamdeng',
    password: '1234',
    port: 3306,
    database: databaseName
};

// version
config.version = '0.3.1v';

module.exports = config;
