const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const errorRouteHandler = require('../errors/routeHandler');
const moment = require('moment');
const passwordHash = require('password-hash');

// 사용자 검색
router.get('/', function(req, res, next) {
    let search_kind = req.query.search_kind;
    let search_value = req.query.search_value || '';
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let selectQueryStr = 'select * from scg_user where 1=1';
    let selectCountQueryStr =
        'SELECT ifnull(count(id), 0) AS totalCount FROM scg_user where 1=1';
    let countQueryParams = [];
    let whereQueryStr = '';
    if (search_kind === 'name') {
        whereQueryStr = ' and (scg_user.name like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else if (search_kind === 'login_id') {
        whereQueryStr = ' and (scg_user.login_id like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else {
        whereQueryStr =
            ' and (scg_user.name like ? or ' + 'scg_user.login_id like ?)';
        countQueryParams.push('%' + search_value + '%');
        countQueryParams.push('%' + search_value + '%');
    }
    selectCountQueryStr = selectCountQueryStr + whereQueryStr;
    dbService
        .selectQueryByStr(selectCountQueryStr, countQueryParams)
        .then(countResult => {
            countQueryParams.push(pageSize * (page - 1));
            countQueryParams.push(pageSize);
            selectQueryStr =
                selectQueryStr + whereQueryStr + ' order by id desc limit ?, ?';
            let apiResult = {};
            const totalCount = countResult[0].totalCount;
            apiResult.totalCount = totalCount;
            dbService
                .selectQueryByStr(selectQueryStr, countQueryParams)
                .then(listResult => {
                    apiResult.data = listResult;
                    res.send(apiResult);
                });
        })
        .catch(errorRouteHandler(next));
});

// 사용자 한건 조회
router.get('/:id', function(req, res, next) {
    dbService
        .selectOne('scg_user', 'id', req.params.id)
        .then(result => {
            console.log('result : ' + JSON.stringify(result));
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// 사용자 등록
router.post('/', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.login_id = bodyInfo.login_id;
    dbObject.password = passwordHash.generate(bodyInfo.password);
    dbObject.company = bodyInfo.company;
    dbObject.name = bodyInfo.name;
    dbObject.user_type = bodyInfo.user_type;
    dbService
        .insert('scg_user', dbObject)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 사용자 수정
router.put('/:id', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.login_id = bodyInfo.login_id;
    dbObject.password = passwordHash.generate(bodyInfo.password);
    dbObject.company = bodyInfo.company;
    dbObject.name = bodyInfo.name;
    dbObject.user_type = bodyInfo.user_type;
    dbObject.last_modified_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dbService
        .update('scg_user', dbObject, 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 사용자 한건 삭제
router.delete('/:id', function(req, res, next) {
    dbService
        .delete('scg_user', 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
