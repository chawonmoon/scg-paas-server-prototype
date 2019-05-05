const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const errorRouteHandler = require('../errors/routeHandler');
const moment = require('moment');

// 램덤메시지 검색
router.get('/', function(req, res, next) {
    let search_kind = req.query.search_kind;
    let search_value = req.query.search_value || '';
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let selectQueryStr = 'select * from scg_random where 1=1';
    let selectCountQueryStr =
        'SELECT ifnull(count(id), 0) AS totalCount FROM scg_random where 1=1';
    let countQueryParams = [];
    let whereQueryStr = '';
    if (search_kind === 'description') {
        whereQueryStr = ' and (scg_random.description like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else if (search_kind === 'name') {
        whereQueryStr = ' and (scg_random.name like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else {
        whereQueryStr =
            ' and (scg_random.name like ? or ' +
            'scg_random.description like ?)';
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

// 랜덤메시지 한건 조회
router.get('/:id', function(req, res, next) {
    dbService
        .selectOne('scg_random', 'id', req.params.id)
        .then(result => {
            console.log('result : ' + JSON.stringify(result));
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 등록
router.post('/', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.description = bodyInfo.description;
    dbObject.name = bodyInfo.name;
    dbObject.status = bodyInfo.status;
    dbObject.category_code = bodyInfo.category_code;
    dbService
        .insert('scg_random', dbObject)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 수정
router.put('/:id', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.description = bodyInfo.description;
    dbObject.name = bodyInfo.name;
    dbObject.status = bodyInfo.status;
    dbObject.category_code = bodyInfo.category_code;
    dbObject.last_modified_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dbService
        .update('scg_random', dbObject, 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 한건 삭제
router.delete('/:id', function(req, res, next) {
    dbService
        .delete('scg_random', 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 아이템 start

// 랜덤메시지 아이템 검색
router.get('/:id/items', function(req, res, next) {
    dbService
        .selectQueryByStr('SELECT * FROM scg_random_item where random_id = ?', [
            req.params.id
        ])
        .then(result => {
            console.log('result : ' + JSON.stringify(result));
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 아이템 한건 조회
router.get('/:id/items/:itemId', function(req, res, next) {
    dbService
        .selectOne('scg_random_item', 'id', req.params.itemId)
        .then(result => {
            console.log('result : ' + JSON.stringify(result));
            if (result.item_list) {
                result.item_list = JSON.parse(result.item_list);
            }
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 아이템 등록
router.post('/:id/items', function(req, res, next) {
    let bodyInfo = req.body;
    // name, item_list, random_id
    let dbObject = {};
    if (bodyInfo.item_list && bodyInfo.item_list.length) {
        dbObject.item_list = JSON.stringify(bodyInfo.item_list);
    }
    dbObject.name = bodyInfo.name;
    dbObject.random_id = bodyInfo.random_id;
    dbService
        .insert('scg_random_item', dbObject)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 아이템 수정
router.put('/:id/items/:itemId', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    if (bodyInfo.item_list && bodyInfo.item_list.length) {
        dbObject.item_list = JSON.stringify(bodyInfo.item_list);
    }
    dbObject.name = bodyInfo.name;
    dbObject.random_id = bodyInfo.random_id;
    dbObject.last_modified_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dbService
        .update('scg_random_item', dbObject, 'id', req.params.itemId)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 랜덤메시지 한건 삭제
router.delete('/:id/items/:itemId', function(req, res, next) {
    dbService
        .delete('scg_random_item', 'id', req.params.itemId)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
