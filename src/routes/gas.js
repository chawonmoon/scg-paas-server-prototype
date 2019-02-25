'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const data = require('../utils/data');
const Config = require('../config');
const AppError = require('../errors/AppError');

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

// /api/gas/homeInfos/:homeIndex
router.get('/homeInfos/:homeIndex', function(req, res) {
    res.send(data.homeInfos[Number(req.params.homeIndex)]);
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
        version: Config.version
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

// api/gas/imageScroll : 이미지 스크롤 페이지
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

// api/gas/formJson : formJson test
router.post('/formJson', function(req, res) {
    console.log('fromJson json body : ' + JSON.stringify(req.body));
    res.send(req.body);
});

// api/gas/board(post) : board
router.post('/board', function(req, res) {
    console.log('board json body : ' + JSON.stringify(req.body));
    let newBoard = Object.assign(req.body, { id: _.uniqueId('') });
    newBoard.created = new Date();
    newBoard.lastModified = new Date();
    data.boardList.push(newBoard);
    res.send(newBoard);
});

// api/gas/board/:id(put) : board
router.put('/board/:id', function(req, res) {
    console.log('board json body : ' + JSON.stringify(req.body));
    let boardIndex = _.findIndex(data.boardList, info => {
        return info.id === req.params.id;
    });
    if (boardIndex !== -1) {
        let updateBoard = data.boardList[boardIndex];
        updateBoard.lastModified = new Date();
        Object.assign(updateBoard, req.body);
        res.send(updateBoard);
    } else {
        throw new AppError('board not found : ' + req.params.id, null, 404);
    }
});

// api/gas/board/:id(get) : board
router.get('/board/:id', function(req, res) {
    console.log('board id : ' + req.params.id);
    let boardIndex = _.findIndex(data.boardList, info => {
        return info.id === req.params.id;
    });
    if (boardIndex !== -1) {
        let detailBoard = data.boardList[boardIndex];
        res.send(detailBoard);
    } else {
        throw new AppError('board not found : ' + req.params.id, null, 404);
    }
});

// api/gas/board(get) : board
router.get('/board', function(req, res) {
    console.log('boardList length : ' + data.boardList.length);
    res.send(data.boardList);
});

// api/gas/board/:id(delete) : board
router.delete('/board/:id', function(req, res) {
    console.log('board id : ' + req.params.id);
    _.remove(data.boardList, info => {
        return req.params.id === info.id;
    });
    res.send({ success: true });
});

// api/gas/board/:id(delete) : board
router.delete('/board/:id', function(req, res) {
    console.log('board id : ' + req.params.id);
    _.remove(data.boardList, info => {
        return req.params.id === info.id;
    });
    res.send({ success: true });
});

// api/gas/board(delete) : board
router.delete('/board', function(req, res) {
    data.boardList = [];
    res.send({ success: true });
});

// select2 data
router.get('/selectSearch', function(req, res) {
    const search = req.query.search;
    const searchData = _.filter(data.selectSearchData, function(info) {
        return info.name.indexOf(search) !== -1;
    });
    res.send(searchData);
});

// data.dragdropData list
router.get('/dragdropData', function(req, res) {
    res.send(data.dragdropData);
});

// data.dragdropData add
router.post('/dragdropData', function(req, res) {
    let newDragDropData = Object.assign({}, req.body);
    newDragDropData.id = _.uniqueId('dragtest_');
    newDragDropData.sortIndex =
        data.dragdropData[data.dragdropData.length - 1].sortIndex + 1;
    data.dragdropData.push(newDragDropData);
    data.dragdropData = _.orderBy(data.dragdropData, ['sortIndex'], ['asc']);
    res.send({ success: true });
});

// data.dragdropData sortIndex Update
router.put('/dragdropData/:id', function(req, res) {
    let updateSortIndex = req.body.sortIndex;
    let searchIndex = _.findIndex(data.dragdropData, info => {
        return info.id === req.params.id;
    });
    let updateInfo = data.dragdropData[searchIndex];
    updateInfo.sortIndex = updateSortIndex;
    for (let index = 0; index < data.dragdropData.length; index++) {
        let info = data.dragdropData[index];
        if (info.sortIndex >= updateSortIndex) {
            info.sortIndex = info.sortIndex + 1;
        }
    }
    data.dragdropData = _.orderBy(data.dragdropData, ['sortIndex'], ['asc']);
    res.send({ success: true });
});

module.exports = router;
