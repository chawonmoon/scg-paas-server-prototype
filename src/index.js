'use strict';

const logger = require('./utils/logger');
const process = require('process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const httpOptions = {
    key: fs.readFileSync('security/localhttps.pem'),
    cert: fs.readFileSync('security/cert.pem')
};

// PORT 아규먼트가 전달이 않되어있을때는 3000 PORT를 default로 server run
let serverListenPort = process.env.PORT || 3000;

let httpsPort = process.env.HTTPSPORT || 443;

let app = null;
try {
    app = require('./app');
} catch (error) {
    logger.error(
        'app init error : ' + error + error.stack
            ? ' stack : ' + error.stack
            : ''
    );
    process.exit(-1);
}

http.createServer(app).listen(serverListenPort, function() {
    logger.info('scg-paas prototype server ' + serverListenPort);
});

https.createServer(httpOptions, app).listen(httpsPort, function() {
    logger.info('scg-paas prototype https server ' + httpsPort);
});

// 전역 promise 오류(reject) catch
process.on('unhandledRejection', (error, promise) => {
    logger.error('unhandledRejection error : ' + error);
    logger.error('unhandledRejection promise : ' + promise);
    if (error.stack) {
        logger.error('unhandledRejection stack : ' + error.stack);
    }
});

// catch all
process.on('uncaughtException', function(err) {
    logger.error('uncaughtException : ' + err);
});
