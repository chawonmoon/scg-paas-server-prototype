'use strict';

const CONFIG = require('../config');
const logger = require('../utils/logger');
const AppError = require('../errors/AppError');
const mysql = require('mysql');
const _ = require('lodash');

let connection = mysql.createConnection({
    host: CONFIG.db.host,
    user: CONFIG.db.user,
    password: CONFIG.db.password,
    port: CONFIG.db.port,
    database: CONFIG.db.database
});

let reconnectIntervalId = null;
let reconnectSuccess = false;

function registerErrorHanlder(connInfo) {
    connInfo.on('error', function(error) {
        if (!error.fatal) {
            return;
        }
        if (connection && connection.end) {
            connection.end();
            connection = null;
        }
        reconnectSuccess = false;
        reconnectIntervalId = setInterval(function() {
            if (reconnectSuccess && reconnectIntervalId) {
                clearInterval(reconnectIntervalId);
            } else {
                reconnect();
            }
        }, 60000);
    });
}

registerErrorHanlder(connection);

function reconnect() {
    try {
        connection = mysql.createConnection({
            host: CONFIG.db.host,
            user: CONFIG.db.user,
            password: CONFIG.db.password,
            port: CONFIG.db.port,
            database: CONFIG.db.database
        });
        registerErrorHanlder(connection);
        service.connect();
    } catch (e) {
        logger.error('reconnect error : ' + e);
    }
}

const service = {};

service.connect = function() {
    return new Promise(function(resolve, reject) {
        connection.connect(function(error) {
            if (error) {
                logger.error('mysql connection error');
                reject(error);
            } else {
                logger.info('mysql connection success');
                reconnectSuccess = true;
                resolve(true);
            }
        });
    });
};

/*

    queryInfo key 값 example : id로 사용자 찾기

*/

const queryInfo = {
    findUserByLoginId: 'SELECT * FROM scg_user WHERE login_id = ?',
    updateInfoSortIndexPlus:
        'UPDATE scg_info set sort_index = sort_index + 2 where sort_index >= ?',
    searchInfo: 'SELECT * FROM scg_info order by sort_index asc',
    findBlockRelation:
        'SELECT b1.id, b1.name, b1.api_version FROM scg_block_relation r1 inner join scg_block b1 on r1.block_child_id = b1.id where r1.block_id = ?',
    getInfoMaxSortIndex:
        'select ifnull(max(scg_info.sort_index), 1) as maxSortIndex from scg_info'
};

// common insert
service.insert = function(tableName, insertArgumentInfo) {
    logger.debug(
        'insert table [' +
            tableName +
            '] : ' +
            JSON.stringify(insertArgumentInfo)
    );
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO ' + tableName + ' SET ?',
            insertArgumentInfo,
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

// common update
service.update = function(tableName, updateArgumentInfo, idColumn, idValue) {
    logger.debug(
        'update table [' +
            tableName +
            '] : ' +
            JSON.stringify(updateArgumentInfo)
    );
    let argumentKeys = _.keys(updateArgumentInfo);
    let updateFullQueryString = 'UPDATE ' + tableName + ' SET ';
    let updateSetQueryString = '';
    let updateArguments = [];
    argumentKeys.forEach(info => {
        updateArguments.push(updateArgumentInfo[info]);
        if (info === 'usage') {
            info = '`usage`';
        }
        if (updateSetQueryString) {
            updateSetQueryString = updateSetQueryString + ', ' + info + '= ?';
        } else {
            updateSetQueryString = info + '= ?';
        }
    });
    updateFullQueryString =
        updateFullQueryString +
        updateSetQueryString +
        ' WHERE ' +
        idColumn +
        ' = ?';
    updateArguments.push(idValue);
    return service.executeQueryByStr(updateFullQueryString, updateArguments);
};

// update all
service.updateAll = function(tableName, updateArgumentInfo) {
    logger.debug(
        'updateAll table [' +
            tableName +
            '] : ' +
            JSON.stringify(updateArgumentInfo)
    );
    let argumentKeys = _.keys(updateArgumentInfo);
    let updateFullQueryString = 'UPDATE ' + tableName + ' SET ';
    let updateSetQueryString = '';
    let updateArguments = [];
    argumentKeys.forEach(info => {
        if (updateSetQueryString) {
            updateSetQueryString = updateSetQueryString + ', ' + info + '= ?';
        } else {
            updateSetQueryString = info + '= ?';
        }
        updateArguments.push(updateArgumentInfo[info]);
    });
    updateFullQueryString = updateFullQueryString + updateSetQueryString;
    logger.debug('updateFullQueryString : ' + updateFullQueryString);
    return service.executeQueryByStr(updateFullQueryString, updateArguments);
};

// update where
service.updateWhere = function(
    tableName,
    updateArgumentInfo,
    whereStr,
    whereArguments
) {
    logger.debug(
        'update table [' +
            tableName +
            '] : ' +
            JSON.stringify(updateArgumentInfo)
    );
    let argumentKeys = _.keys(updateArgumentInfo);
    let updateFullQueryString = 'UPDATE ' + tableName + ' SET ';
    let updateSetQueryString = '';
    let updateArguments = [];
    argumentKeys.forEach(info => {
        updateArguments.push(updateArgumentInfo[info]);
        if (info === 'usage') {
            info = '`usage`';
        }
        if (updateSetQueryString) {
            updateSetQueryString = updateSetQueryString + ', ' + info + '= ?';
        } else {
            updateSetQueryString = info + '= ?';
        }
    });
    updateFullQueryString =
        updateFullQueryString + updateSetQueryString + ' WHERE ' + whereStr;
    return service.executeQueryByStr(
        updateFullQueryString,
        updateArguments.concat(whereArguments)
    );
};

// select table all
service.select = function(tableName) {
    logger.debug('select table [' + tableName + ']');
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ' + tableName, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// select table row 1
service.selectOne = function(tableName, idColumn, id) {
    logger.debug('selectOne table [' + tableName + ']');
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM ' + tableName + ' where ' + idColumn + '= ?',
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject(new AppError('not found', null, 404));
                    }
                }
            }
        );
    });
};

// delete table all
service.deleteAll = function(tableName) {
    logger.debug('deleteAll table [' + tableName + ']');
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM ' + tableName, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// delete table 1 row
service.delete = function(tableName, idColumn, id) {
    logger.debug('delete table [' + tableName + ']');
    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE FROM ' + tableName + ' where ' + idColumn + '= ?',
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

// insert, update, delete by queryId
service.executeQueryById = function(queryId, queryArguments) {
    logger.debug(
        'executeQueryById queryId [' +
            queryId +
            '] : ' +
            JSON.stringify(queryArguments)
    );
    return new Promise((resolve, reject) => {
        connection.query(
            queryInfo[queryId],
            queryArguments,
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

// select by queryId
service.selectQueryById = function(queryId, queryArguments) {
    logger.debug(
        'selectQueryById queryId [' +
            queryId +
            '] : ' +
            JSON.stringify(queryArguments)
    );
    return new Promise((resolve, reject) => {
        connection.query(
            queryInfo[queryId],
            queryArguments,
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

// insert, update, delete by queryString
service.executeQueryByStr = function(queryString, queryArguments) {
    logger.debug(
        'executeQueryByStr queryString [' +
            queryString +
            '] : ' +
            JSON.stringify(queryArguments)
    );
    return new Promise((resolve, reject) => {
        connection.query(queryString, queryArguments, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// select by queryString
service.selectQueryByStr = function(queryString, queryArguments) {
    logger.debug(
        'selectQueryByStr queryString [' +
            queryString +
            '] : ' +
            JSON.stringify(queryArguments)
    );
    return new Promise((resolve, reject) => {
        connection.query(queryString, queryArguments, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

service.connection = connection;

module.exports = service;
