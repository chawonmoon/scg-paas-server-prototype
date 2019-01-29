'use strict';

// const _ = require('lodash');
const express = require('express');
const router = express.Router();
// const data = require('../utils/data');
// const Config = require('../config');
// const AppError = require('../errors/AppError');

// /api/gas/profile : 프로필
router.get('/profile', function(req, res) {
    const result = {
        id: 17,
        loginId: 'yamdeng7',
        name: '안용성7'
    };
    res.send(result);
});

module.exports = router;
