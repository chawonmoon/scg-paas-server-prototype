const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const errorRouteHandler = require('../errors/routeHandler');
const moment = require('moment');

// 블록 검색
router.get('/', function(req, res, next) {
    let search_kind = req.query.search_kind;
    let search_value = req.query.search_value || '';
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5000000;
    const page = req.query.page ? Number(req.query.page) : 1;
    let selectQueryStr = 'select * from scg_block where 1=1';
    let selectCountQueryStr =
        'SELECT ifnull(count(id), 0) AS totalCount FROM scg_block where 1=1';
    let countQueryParams = [];
    let whereQueryStr = '';
    if (search_kind === 'name') {
        whereQueryStr = ' and (scg_block.name like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else if (search_kind === 'description') {
        whereQueryStr = ' and (scg_block.description like ?)';
        countQueryParams.push('%' + search_value + '%');
    } else {
        whereQueryStr =
            ' and (scg_block.name like ? or ' + 'scg_block.description like ?)';
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

// 블록 한건 조회
router.get('/:id', function(req, res, next) {
    dbService
        .selectOne('scg_block', 'id', req.params.id)
        .then(result => {
            let promiseList = [];
            console.log('result : ' + JSON.stringify(result));
            if (result.random_id) {
                promiseList.push(
                    dbService
                        .selectOne('scg_random', 'id', result.random_id)
                        .then(randomInfo => {
                            result.randomInfo = randomInfo;
                        })
                );
            }
            promiseList.push(
                dbService
                    .selectQueryById('findBlockRelation', [req.params.id])
                    .then(relationList => {
                        result.blockRelations = relationList;
                    })
            );
            Promise.all(promiseList).then(() => {
                res.send(result);
            });
        })
        .catch(errorRouteHandler(next));
});

// 블록 등록
router.post('/', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.name = bodyInfo.name;
    dbObject.description = bodyInfo.description;
    dbObject.api_version = bodyInfo.api_version;
    dbObject.status = bodyInfo.status;
    dbObject.file_id = bodyInfo.file_id;
    dbObject.random_id = bodyInfo.random_id;
    dbService
        .insert('scg_block', dbObject)
        .then(results => {
            res.send({ success: true });
            let block_relation_ids = bodyInfo.block_relation_ids;
            if (block_relation_ids && block_relation_ids.length) {
                block_relation_ids.forEach(id => {
                    let relationObject = {
                        block_id: results.insertId,
                        block_child_id: id
                    };
                    dbService.insert('scg_block_relation', relationObject);
                });
            }
        })
        .catch(errorRouteHandler(next));
});

// 블록 수정
router.put('/:id', function(req, res, next) {
    let bodyInfo = req.body;
    let dbObject = {};
    dbObject.name = bodyInfo.name;
    dbObject.description = bodyInfo.description;
    dbObject.api_version = bodyInfo.api_version;
    dbObject.status = bodyInfo.status;
    dbObject.file_id = bodyInfo.file_id;
    dbObject.random_id = bodyInfo.random_id;
    dbObject.last_modified_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dbService
        .update('scg_block', dbObject, 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
            dbService
                .delete('scg_block_relation', 'block_id', req.params.id)
                .then(() => {
                    let block_relation_ids = bodyInfo.block_relation_ids;
                    if (block_relation_ids && block_relation_ids.length) {
                        block_relation_ids.forEach(id => {
                            let relationObject = {
                                block_id: req.params.id,
                                block_child_id: id
                            };
                            dbService.insert(
                                'scg_block_relation',
                                relationObject
                            );
                        });
                    }
                });
        })
        .catch(errorRouteHandler(next));
});

// 블록 한건 삭제
router.delete('/:id', function(req, res, next) {
    dbService
        .delete('scg_block', 'id', req.params.id)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

module.exports = router;
