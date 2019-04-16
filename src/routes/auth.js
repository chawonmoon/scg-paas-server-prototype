'use strict';

// const _ = require('lodash');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const authMiddleware = require('../middleware/auth');
const Config = require('../config/index');
const errorRouteHandler = require('../errors/routeHandler');
const AppError = require('../errors/AppError');
const dbService = require('../services/db');
const multer = require('multer');
const upload = multer({ dest: Config.fileUploadPath });
const fs = require('fs');
const path = require('path');

// 로그인
router.post('/login', function(req, res, next) {
    const id = req.body.id;
    const password = req.body.password;
    dbService
        .selectQueryById('findUserByLoginId', [id])
        .then(result => {
            if (result.length > 0) {
                let findUser = result[0];
                if (passwordHash.verify(password, findUser.password)) {
                    let authJsonWebToken = jwt.sign(
                        Object.assign({}, findUser),
                        Config.JSONTOKEN_SECRETKEY,
                        { expiresIn: Config.JSONTOKEN_EXPIRE }
                    );
                    res.send({ authToken: authJsonWebToken });
                } else {
                    return Promise.reject(
                        new AppError('비밀번호가 맞지않습니다')
                    );
                }
            } else {
                return Promise.reject(new AppError('존재하지 않는 ID 입니다'));
            }
        })
        .catch(errorRouteHandler(next));
});

// 회원가입
router.post('/signup', function(req, res, next) {
    // validate : 'id', 'password', 'name, 'login_id'
    let registerUser = Object.assign({}, req.body);
    let encodedPassword = passwordHash.generate(registerUser.password);
    registerUser.password = encodedPassword;
    dbService
        .insert('scg_user', registerUser)
        .then(() => {
            res.send({ success: true });
        })
        .catch(errorRouteHandler(next));
});

router.get('/loginUserInfo', authMiddleware, function(req, res) {
    let loginUser = null;
    try {
        loginUser = jwt.verify(
            req.headers.authorization,
            Config.JSONTOKEN_SECRETKEY
        );
        res.send({ loginInfo: loginUser });
    } catch (err) {
        throw new AppError('인증정보가 존재하지 않습니다', [err], 403);
    }
});

router.get('/profile', authMiddleware, function(req, res) {
    let loginUser = null;
    try {
        loginUser = jwt.verify(
            req.headers.authorization,
            Config.JSONTOKEN_SECRETKEY
        );
        res.send({ loginInfo: loginUser });
    } catch (err) {
        throw new AppError('인증정보가 존재하지 않습니다', [err], 403);
    }
});

router.post('/uploadFile', upload.single('file'), function(req, res) {
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

module.exports = router;
