'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const AppError = require('../errors/AppError');
const errorRouteHandler = require('../errors/routeHandler');
const process = require('process');
const os = require('os');

// table select
router.get('/selectTable/:table_name', function (req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// server, db, modbus alive check
router.get('/health', function (req, res) {
    dbService.connection.ping(error => {
        let dbAlive = false;
        if (!error) {
            dbAlive = true;
        }
        res.send({
            serverAlive: true,
            dbAlive: dbAlive
        });
    });
});

// table 컬럼정보를 json 키값으로 반환 : 기본값 존재시 해당 기본값으로 셋팅
router.get('/tableInfoToJson1', function (req, res, next) {
    dbService.selectQueryById('getTableInfoToObjectDefaultValue', [req.query.tableName])
        .then((result) => {
            if (result.length > 0) {
                let tableJsonInfo = {};
                _.forEach(result, (info) => {
                    if (info.data_type.indexOf('varchar') != -1 || info.data_type.indexOf('text') != -1) {
                        if (info.column_default && info.column_default !== 'NULL') {
                            tableJsonInfo[info.column_name] = info.column_default;
                        } else {
                            tableJsonInfo[info.column_name] = '';
                        }
                    } else {
                        if (info.column_default && info.column_default !== 'NULL') {
                            tableJsonInfo[info.column_name] = Number(info.column_default);
                        } else {
                            tableJsonInfo[info.column_name] = 0;
                        }
                    }
                });
                res.send(tableJsonInfo);
            } else {
                return Promise.reject(new AppError('존재하지 않는 테이블 입니다'));
            }
        }).catch(errorRouteHandler(next));
});

// table 컬럼정보를 json 키값으로 반환
router.get('/tableInfoToJson2', function (req, res, next) {
    dbService.selectQueryById('getTableInfoToObjectDefaultValue', [req.query.tableName])
        .then((result) => {
            if (result.length > 0) {
                let tableJsonInfo = {};
                _.forEach(result, (info) => {
                    if (info.data_type.indexOf('varchar') != -1 || info.data_type.indexOf('text') != -1) {
                        tableJsonInfo[info.column_name] = '';
                    } else {
                        tableJsonInfo[info.column_name] = 0;
                    }
                });
                res.send(tableJsonInfo);
            } else {
                return Promise.reject(new AppError('존재하지 않는 테이블 입니다'));
            }
        }).catch(errorRouteHandler(next));
});

// 전체 table 수정
router.put('/updateTableAll', function (req, res, next) {
    const table = req.body.table;
    const updateInfo = req.body.updateInfo;
    dbService.updateAll(table, updateInfo)
        .then(() => {
            res.send({ success: true });
        }).catch(errorRouteHandler(next));
});

// 테이블 한건 수정
router.put('/updateTableByColumnInfo', function (req, res, next) {
    const table = req.body.table;
    const updateInfo = req.body.updateInfo;
    const columnName = req.body.columnName;
    const columnValue = req.body.columnValue;
    dbService.update(table, updateInfo, columnName, columnValue)
        .then(() => {
            res.send({ success: true });
        }).catch(errorRouteHandler(next));
});

// 테이블 insert
router.post('/insertTable', function (req, res, next) {
    const table = req.body.table;
    const insertInfo = req.body.insertInfo;
    dbService.insert(table, insertInfo)
        .then(() => {
            res.send({ success: true });
        }).catch(errorRouteHandler(next));
});

// 메모리 체크
router.get('/memoryUsage', function (req, res) {
    let result = process.memoryUsage();
    result.totalmem = os.totalmem();
    result.freemem = os.freemem();
    res.send(result);
});

module.exports = router;
