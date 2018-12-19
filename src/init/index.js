'use strict';

const logger = require('../utils/logger');
const dbService = require('../services/db');

module.exports = function (app) {

    logger.info('init app : ' + app);

    // db connection 정보 유지 + 초기 data 넣기
    dbService.connect()
        .then(() => {
            logger.info('db connect success');
        });

};
