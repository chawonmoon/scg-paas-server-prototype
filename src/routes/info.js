const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const errorRouteHandler = require('../errors/routeHandler');
const moment = require('moment');

// info 검색
router.get('/', function(req, res, next) {
    let search_kind = req.query.search_kind;
    let search_value = req.query.search_value || '';
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let selectQueryStr = 'select * from scg_info where 1=1';
    let selectCountQueryStr =
        'SELECT ifnull(count(id), 0) AS totalCount FROM scg_info where 1=1';
    let countQueryParams = [];
    let whereQueryStr = '';
    if (search_kind === 'title') {
        whereQueryStr = ' and (scg_info.title like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else if (search_kind === 'content') {
        whereQueryStr = ' and (scg_info.content like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else {
        whereQueryStr =
            ' and (scg_info.title like ? or ' + 'scg_info.content like ?)';
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
                selectQueryStr +
                whereQueryStr +
                ' order by scg_info.sort_index asc limit ?, ?';
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

// info 한건 조회
router.get('/:id', function(req, res, next) {
    dbService
        .selectOne('scg_info', 'id', req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// info 등록
router.post('/', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.title = bodyInfo.title;
    dbObject.content = bodyInfo.content;
    dbObject.status = bodyInfo.status;
    dbObject.file_id = bodyInfo.file_id;
    dbObject.color = bodyInfo.color;
    dbService
        .selectQueryById('getInfoMaxSortIndex', null)
        .then(result => {
            const maxSortIndex = result[0].maxSortIndex;
            if (bodyInfo.sort_index) {
                dbObject.sort_index = bodyInfo.sort_index;
            } else {
                dbObject.sort_index = maxSortIndex + 1;
            }
            dbService.insert('scg_info', dbObject).then(() => {
                res.send({ success: true });
            });
        })
        .catch(errorRouteHandler(next));
});

// info 수정
router.put('/:id', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.title = bodyInfo.title;
    dbObject.content = bodyInfo.content;
    if (bodyInfo.sort_index) {
        dbObject.sort_index = bodyInfo.sort_index;
    }
    dbObject.status = bodyInfo.status;
    dbObject.file_id = bodyInfo.file_id;
    dbObject.color = bodyInfo.color;
    dbObject.last_modified_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dbService
        .update('scg_info', dbObject, 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// info 한건 삭제
router.delete('/:id', function(req, res, next) {
    dbService
        .delete('scg_info', 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 정렬정보 수정
router.put('/:id/updateSortIndex', function(req, res, next) {
    let updateSortIndex = req.body.sort_index;
    dbService
        .executeQueryById('updateInfoSortIndexPlus', [updateSortIndex])
        .then(() => {
            dbService
                .update(
                    'scg_info',
                    {
                        sort_index: updateSortIndex,
                        last_modified_date: moment().format(
                            'YYYY-MM-DD HH:mm:ss'
                        )
                    },
                    'id',
                    req.params.id
                )
                .then(() => {
                    res.send({ success: true });
                });
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
