'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const AppError = require('../errors/AppError');
const errorRouteHandler = require('../errors/routeHandler');
const data = require('../utils/data');

// 2016 ~ 2018 까지 데이터 가공

// /api/gas/profile : 프로필 ---> 랜덤한 값으로 전달
router.get('/profile', function(req, res) {
    const result = {
        id: 17,
        loginId: 'yamdeng',
        name: '안용성'
    };
    res.send(result);
});

// /api/gas/monthInfo/{month}/{contractNo} : 월별조회
router.get('/monthInfo/:month/:contractNo', function(req, res, next) {
    /*

    */
});

// /api/gas/payOffHistory/:contractNo : 미납내역 조회
router.get('/payOffHistory/:contractNo', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// /api/gas/tariff : 가스 요금표
router.get('/tariff', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// /api/gas/tariff/:tariffId : 가스 요금표 상세
router.get('/tariff/:tariffId', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// /api/gas/safeHistory/:contractNo : 안전점검 이력조회
router.get('/safeHistory/:contractNo', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// /api/gas/homeInfos : 대략 3개정도 받아서 처리

/*

    1.청구요금 조회
    2.실시간 요금 계산 정보
    3.최근납부

*/
router.get('/homeInfos', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
