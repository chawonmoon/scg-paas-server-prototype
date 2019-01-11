'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const data = require('../utils/data');

/*

     1.청구요금 조회
     2.실시간 요금 계산
     3.최근납부
     4.주요 업무
     5.사용계약번호 관리

*/
// /api/gas/homeInfos : 대략 3개정도 받아서 처리
router.get('/homeInfos', function(req, res) {
    res.send(data.homeInfos);
});

// /api/gas/profile : 프로필
router.get('/profile', function(req, res) {
    const result = {
        id: 17,
        loginId: 'yamdeng',
        name: '안용성'
    };
    res.send(result);
});

// /api/gas/safeHistory/:contractNo : 안전점검 이력조회
router.get('/safeHistory/:contractNo', function(req, res) {
    const result = {
        safeHistory: data.safeHistory
    };
    res.send(result);
});

// /api/gas/monthInfo/{month}/{contractNo} : 월별조회
router.get('/monthInfo/:month/:contractNo', function(req, res) {
    let monthDetailInfo = _.find(data.monthDetailInfos, info => {
        return info.date === req.params.month;
    });
    const result = {
        allMonthChartData: data.allMonthChartData,
        monthDetailInfo: monthDetailInfo
    };
    res.send(result);
});

// /api/gas/allMonthInfo/{contractNo} : 연간조회
router.get('/allMonthInfo/:contractNo', function(req, res) {
    const result = {
        allMonthChartData: data.allMonthChartData,
        totalUseGas: data.totalUseGas,
        totalChargeAmt: data.totalChargeAmt,
        totalDueAmt: data.totalDueAmt
    };
    res.send(result);
});

// /api/gas/payOffHistory/:contractNo : 미납내역 조회
router.get('/payOffHistory/:contractNo', function(req, res) {
    const result = {
        payOffHistoryInfo: data.payOffHistoryInfo,
        totalPayOffUseGas: data.totalPayOffUseGas,
        totalPayOffChargeAmt: data.totalPayOffChargeAmt,
        totalPayOffDueAmt: data.totalPayOffDueAmt
    };
    res.send(result);
});

// /api/gas/realtimePayInfo/:contractNo : 납부 실시간 조회
router.get('/realtimePayInfo/:contractNo', function(req, res) {
    const result = {
        realtimePayInfos: data.realtimePayInfos
    };
    res.send(result);
});

// /api/gas/tariff : 가스 요금표
router.get('/tariff', function(req, res) {
    const result = {
        gasTariffSimpleInfos: data.gasTariffSimpleInfos
    };
    res.send(result);
});

// /api/gas/tariff/:tariffId : 가스 요금표 상세
router.get('/tariff/:tariffId', function(req, res) {
    let result = _.find(data.gasTariffDetailInfos, info => {
        return info.id === Number(req.params.tariffId);
    });
    res.send(result);
});

// api/gas/appInfo : 앱 버전
router.get('/appInfo', function(req, res) {
    let result = {
        version: 'v.2.5.1'
    };
    res.send(result);
});

// api/gas/errorClientCode : 클라이언트 에러(코드 적용)
router.get('/errorClientCode', function(req, res) {
    let result = {
        code: 404
    };
    res.send(result);
});

// api/gas/errorClient : 클라이언트 에러
router.get('/errorClient', function(req, res) {
    res.status(404).send({ error: 'clientError' });
});

// api/gas/errorServerCode : 서버 에러(코드 적용)
router.get('/errorServerCode', function(req, res) {
    let result = {
        code: 500
    };
    res.send(result);
});

// api/gas/errorServer : 서버 에러
router.get('/errorServer', function(req, res) {
    res.status(500).send({ error: 'serverError' });
});

// api/gas/errorAuthCode : 권한 에러(코드 적용)
router.get('/errorAuthCode', function(req, res) {
    let result = {
        code: 403
    };
    res.send(result);
});

// api/gas/errorAuth : 권한 에러
router.get('/errorAuth', function(req, res) {
    res.status(403).send({ error: 'authError' });
});

// api/gas/tableScroll : 테이블 스크롤 페이지
router.get('/tableScroll', function(req, res) {
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let result = {};
    result.totalCount = data.tableScrollData.length;
    result.data = data.tableScrollData.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    res.send(result);
});

router.get('/imageScroll', function(req, res) {
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let result = {};
    result.totalCount = data.imageScrollData.length;
    result.data = data.imageScrollData.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    res.send(result);
});

module.exports = router;
