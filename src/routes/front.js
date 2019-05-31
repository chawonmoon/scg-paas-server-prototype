'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const dbService = require('../services/db');
const AppError = require('../errors/AppError');
const errorRouteHandler = require('../errors/routeHandler');
const Config = require('../config');
const process = require('process');
const os = require('os');
const multer = require('multer');
const upload = multer({ dest: Config.fileUploadPath });
const fs = require('fs');
const path = require('path');
const data = require('../utils/data');
const excelUtil = require('../utils/excel');
const handlebars = require('handlebars');
const mkdirp = require('mkdirp');

// /api/front/mapClusterData : daum map cluster 예제 데이터
router.get('/mapClusterData', function(req, res) {
    res.send(data.mapClusterData);
});

// /api/front/getNearInfo : 가장 가까운 계측기 정보(위도, 경도, devno, 거리)
router.get('/getNearInfo', function(req, res) {
    res.send(data.nearInfo);
});

// /api/front/dustInfos : 먼지 정보(list)
router.get('/dustInfos', function(req, res) {
    res.send(data.dustInfos);
});

// table select
router.get('/selectTable/:table_name', function(req, res, next) {
    dbService
        .select(req.params.table_name)
        .then(result => {
            res.send(result);
        })
        .catch(errorRouteHandler(next));
});

// server, db, modbus alive check
router.get('/health', function(req, res) {
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
router.get('/tableInfoToJson1', function(req, res, next) {
    dbService
        .selectQueryById('getTableInfoToObjectDefaultValue', [
            req.query.tableName
        ])
        .then(result => {
            if (result.length > 0) {
                let tableJsonInfo = {};
                _.forEach(result, info => {
                    if (
                        info.data_type.indexOf('varchar') != -1 ||
                        info.data_type.indexOf('text') != -1
                    ) {
                        if (
                            info.column_default &&
                            info.column_default !== 'NULL'
                        ) {
                            tableJsonInfo[info.column_name] =
                                info.column_default;
                        } else {
                            tableJsonInfo[info.column_name] = '';
                        }
                    } else {
                        if (
                            info.column_default &&
                            info.column_default !== 'NULL'
                        ) {
                            tableJsonInfo[info.column_name] = Number(
                                info.column_default
                            );
                        } else {
                            tableJsonInfo[info.column_name] = 0;
                        }
                    }
                });
                res.send(tableJsonInfo);
            } else {
                return Promise.reject(
                    new AppError('존재하지 않는 테이블 입니다')
                );
            }
        })
        .catch(errorRouteHandler(next));
});

// table 컬럼정보를 json 키값으로 반환
router.get('/tableInfoToJson2', function(req, res, next) {
    dbService
        .selectQueryById('getTableInfoToObjectDefaultValue', [
            req.query.tableName
        ])
        .then(result => {
            if (result.length > 0) {
                let tableJsonInfo = {};
                _.forEach(result, info => {
                    if (
                        info.data_type.indexOf('varchar') != -1 ||
                        info.data_type.indexOf('text') != -1
                    ) {
                        tableJsonInfo[info.column_name] = '';
                    } else {
                        tableJsonInfo[info.column_name] = 0;
                    }
                });
                res.send(tableJsonInfo);
            } else {
                return Promise.reject(
                    new AppError('존재하지 않는 테이블 입니다')
                );
            }
        })
        .catch(errorRouteHandler(next));
});

// 전체 table 수정
router.put('/updateTableAll', function(req, res, next) {
    const table = req.body.table;
    const updateInfo = req.body.updateInfo;
    dbService
        .updateAll(table, updateInfo)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 테이블 한건 수정
router.put('/updateTableByColumnInfo', function(req, res, next) {
    const table = req.body.table;
    const updateInfo = req.body.updateInfo;
    const columnName = req.body.columnName;
    const columnValue = req.body.columnValue;
    dbService
        .update(table, updateInfo, columnName, columnValue)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 테이블 insert
router.post('/insertTable', function(req, res, next) {
    const table = req.body.table;
    const insertInfo = req.body.insertInfo;
    dbService
        .insert(table, insertInfo)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

// 메모리 체크
router.get('/memoryUsage', function(req, res) {
    let result = process.memoryUsage();
    result.totalmem = os.totalmem();
    result.freemem = os.freemem();
    res.send(result);
});

// 파일 업로드
router.post('/uploadImage', upload.single('imageFile'), function(req, res) {
    let file = req.file;
    let uploadFileInfo = {};
    uploadFileInfo.status = 'upload';
    uploadFileInfo.fileName = file.originalname;
    uploadFileInfo.fileTempName = file.filename;
    uploadFileInfo.fileSize = file.size;
    uploadFileInfo.fileExtension = file.originalname.substr(
        file.originalname.lastIndexOf('.') + 1
    );
    uploadFileInfo.fileFullName =
        uploadFileInfo.fileTempName + '.' + uploadFileInfo.fileExtension;
    uploadFileInfo.fileType = file.mimetype;
    fs.renameSync(
        Config.fileUploadPath + path.sep + uploadFileInfo.fileTempName,
        Config.fileUploadPath + path.sep + uploadFileInfo.fileFullName
    );
    uploadFileInfo.fileUrl =
        Config.fileDownloadPrefixUri + uploadFileInfo.fileFullName;
    res.send(uploadFileInfo);
});

// 파일 업로드(ajax form)
router.post('/uploadImageAjaxForm', upload.single('imageFile'), function(
    req,
    res
) {
    let file = req.file;
    let body = req.body;
    let uploadFileInfo = {};
    uploadFileInfo.status = 'upload';
    uploadFileInfo.fileName = file.originalname;
    uploadFileInfo.fileTempName = file.filename;
    uploadFileInfo.fileSize = file.size;
    uploadFileInfo.fileExtension = file.originalname.substr(
        file.originalname.lastIndexOf('.') + 1
    );
    uploadFileInfo.fileFullName =
        uploadFileInfo.fileTempName + '.' + uploadFileInfo.fileExtension;
    uploadFileInfo.fileType = file.mimetype;
    fs.renameSync(
        Config.fileUploadPath + path.sep + uploadFileInfo.fileTempName,
        Config.fileUploadPath + path.sep + uploadFileInfo.fileFullName
    );
    uploadFileInfo.fileUrl =
        Config.fileDownloadPrefixUri + uploadFileInfo.fileFullName;
    let result = {};
    result.name = body.name;
    result.fileName = file.originalname;
    result.fileType = file.mimetype;
    result.fileUrl = Config.fileDownloadPrefixUri + uploadFileInfo.fileFullName;
    res.send(result);
});

// 파일 업로드
router.post('/uploadImageCkEditor', upload.single('imageFile'), function(
    req,
    res
) {
    let file = req.file;
    let uploadFileInfo = {};
    uploadFileInfo.status = 'upload';
    uploadFileInfo.fileName = file.originalname;
    uploadFileInfo.fileTempName = file.filename;
    uploadFileInfo.fileSize = file.size;
    uploadFileInfo.fileExtension = file.originalname.substr(
        file.originalname.lastIndexOf('.') + 1
    );
    uploadFileInfo.fileFullName =
        uploadFileInfo.fileTempName + '.' + uploadFileInfo.fileExtension;
    uploadFileInfo.fileType = file.mimetype;
    fs.renameSync(
        Config.fileUploadPath + path.sep + uploadFileInfo.fileTempName,
        Config.fileUploadPath + path.sep + uploadFileInfo.fileFullName
    );
    uploadFileInfo.fileUrl =
        Config.fileDownloadPrefixUri + uploadFileInfo.fileFullName;
    uploadFileInfo.uploaded = 1;
    uploadFileInfo.url = uploadFileInfo.fileUrl;
    res.send(uploadFileInfo);
});

router.post('/ciauth', function(req, res) {
    res.redirect('http://app-dev.wunderflo.com/web/dummy/ciauth.html');
});

router.post('/payinfo', function(req, res) {
    res.redirect('http://app-dev.wunderflo.com/web/dummy/payinfo.html');
});

router.get('/publishInfo', function(req, res) {
    const excelFilePath = 'docs/export.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'C';
    let excelKeyInfo = {
        C: 'title',
        D: 'fileName',
        E: 'url',
        F: 'pageCount',
        G: 'success'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    res.send(result);
});

// react 상단 import 문자열 추출(퍼블리싱)
router.get('/publishInfoToFileName', function(req, res) {
    const excelFilePath = 'docs/export.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'C';
    let excelKeyInfo = {
        C: 'title',
        D: 'fileName',
        E: 'url',
        F: 'pageCount',
        G: 'success'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    let titleArray = [];
    let resultString = '';
    _.forEach(result, info => {
        if (info.fileName) {
            titleArray.push(info.fileName);
            resultString =
                resultString +
                ' import ' +
                info.fileName.substr(0, info.fileName.indexOf('.')) +
                ' from \'../components/' +
                info.fileName +
                '\';' +
                '\n';
        }
    });
    res.send(resultString);
});

router.get('/publishInfoToRoute', function(req, res) {
    const excelFilePath = 'docs/export.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'C';
    let excelKeyInfo = {
        C: 'title',
        D: 'fileName',
        E: 'url',
        F: 'pageCount',
        G: 'success'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    let titleArray = [];
    let resultString = '';
    _.forEach(result, info => {
        if (info.fileName) {
            titleArray.push(info.fileName);
            // <Route exact path="/walkthrough1" component={PWalkthrough1} />
            resultString =
                resultString +
                '<Route exact path="' +
                info.url +
                '" component={' +
                info.fileName.substr(0, info.fileName.indexOf('.')) +
                '} />';
        }
    });

    res.send(resultString);
});

router.get('/publishInfoFileNameArray', function(req, res) {
    const excelFilePath = 'docs/export.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'C';
    let excelKeyInfo = {
        C: 'title',
        D: 'fileName',
        E: 'url',
        F: 'pageCount',
        G: 'success'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    let titleArray = [];
    _.forEach(result, info => {
        if (info.fileName) {
            titleArray.push(info.fileName);
        }
    });
    res.send(titleArray);
});

router.get('/createFile', function(req, res) {
    const templateFileName = path.resolve(__dirname, 'react.template');
    data.fileList.forEach(fileName => {
        fs.readFile(templateFileName, function(err, data) {
            if (!err) {
                let source = data.toString();
                let template = handlebars.compile(source);
                let resultString = template({
                    className: fileName.substr(0, fileName.indexOf('.'))
                });
                try {
                    let createFileName = path.resolve(
                        __dirname,
                        '../newfile/' + fileName
                    );
                    fs.writeFileSync(createFileName, resultString);
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error(err);
            }
        });
    });
    res.send(null);
});

// react 상단 import 문자열 추출(운영)
router.get('/publishInfoToFileName2', function(req, res) {
    const excelFilePath = 'docs/pass_react_import.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'B';
    let excelKeyInfo = {
        B: 'fileName'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    let titleArray = [];
    let resultString = '';
    _.forEach(result, info => {
        if (info.fileName) {
            titleArray.push(info.fileName);
            let componentName = '';
            let filePath = info.fileName.substr(0, info.fileName.indexOf('.'));
            if (info.fileName.indexOf('/')) {
                componentName = info.fileName.substring(
                    info.fileName.indexOf('/') + 1,
                    info.fileName.indexOf('.')
                );
            } else {
                componentName = info.fileName.substr(
                    0,
                    info.fileName.indexOf('.')
                );
            }
            resultString =
                resultString +
                ' import ' +
                componentName +
                ' from \'../' +
                filePath +
                '\';' +
                '\n';
        }
    });
    res.send(resultString);
});

// react <Route 정보 추출
router.get('/publishInfoToRoute2', function(req, res) {
    const excelFilePath = 'docs/pass_react_route.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'B';
    let excelKeyInfo = {
        B: 'componentName',
        C: 'url',
        D: 'footerMenu'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    let resultString = '';
    _.forEach(result, info => {
        if (info.componentName) {
            // <Route exact path="/walkthrough1" component={PWalkthrough1} />
            // resultString =
            //     resultString +
            //     '<Route exact path="' +
            //     info.url +
            //     '" component={' +
            //     info.componentName +
            //     '} />';

            // <Route
            //     exact
            //     path="/scorlltest"
            //     render={props => (
            //         <PScrollTest {...props} displayFooterMenu={true} />
            //     )}
            // />
            let isFooterMenu = 'false';
            if (info.footerMenu && info.footerMenu === 'O') {
                isFooterMenu = 'true';
            }
            resultString =
                resultString +
                '<Route exact path="' +
                info.url +
                '" render={props => (<' +
                info.componentName +
                ' {...props} displayFooterMenu={' +
                isFooterMenu +
                '} /> )} />';
        }
    });

    res.send(resultString);
});

// file 생성
router.get('/createFile2', function(req, res) {
    const excelFilePath = 'docs/pass_react_file.xlsx';
    let startRowNumber = 3;
    let startColumnAlphabet = 'B';
    let excelKeyInfo = {
        B: 'fileName',
        C: 'url',
        D: 'title',
        E: 'serverApi'
    };
    let jsonColumInfoString = '';
    let result = excelUtil.convertExcelFileToArray(
        excelFilePath,
        startRowNumber,
        startColumnAlphabet,
        jsonColumInfoString,
        excelKeyInfo
    );
    const templateFileName = path.resolve(__dirname, 'react_real.template');
    fs.readFile(templateFileName, function(err, data) {
        if (!err) {
            let source = data.toString();
            let template = handlebars.compile(source);
            _.forEach(result, info => {
                if (info.fileName) {
                    // className, url, title
                    let className = '';
                    let isParentFolder = false;
                    if (info.fileName.indexOf('/') !== -1) {
                        className = info.fileName.substring(
                            info.fileName.indexOf('/') + 1,
                            info.fileName.indexOf('.')
                        );
                        isParentFolder = true;
                    } else {
                        className = info.fileName.substr(
                            0,
                            info.fileName.indexOf('.')
                        );
                    }
                    let apis = [];
                    if (info.serverApi) {
                        apis = info.serverApi.split('\r\n');
                    }
                    let templateObject = {
                        className: className,
                        title: info.title,
                        url: info.url,
                        apis: apis
                    };
                    if (isParentFolder) {
                        templateObject.isParentFolder = isParentFolder;
                    }
                    console.log('isParentFolder : ' + isParentFolder);
                    let resultString = template(templateObject);
                    try {
                        let createFileName = path.resolve(
                            __dirname,
                            '../real/' + info.fileName
                        );
                        console.log('createFileName : ' + createFileName);
                        console.log(
                            'createFileName folder path: ' +
                                createFileName.substr(
                                    0,
                                    createFileName.lastIndexOf(path.sep)
                                )
                        );
                        let folderPath = createFileName.substr(
                            0,
                            createFileName.lastIndexOf(path.sep)
                        );
                        mkdirp(folderPath, function(err) {
                            if (err) {
                                console.error(err);
                            } else {
                                fs.writeFileSync(createFileName, resultString);
                            }
                        });
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        } else {
            console.error(err);
        }
    });
    res.send(null);
});

module.exports = router;
