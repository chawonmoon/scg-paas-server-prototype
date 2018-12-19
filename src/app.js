'use strict';

const CONFIG = require('./config');
// const path = require('path');
const express = require('express');
const app = express();
const compress = require('compression');
const bodyParser = require('body-parser');
// const validator = require('express-validator');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
// const authRoute = require('./routes/auth');
const applicationRoute = require('./routes/application');
const errorMiddleware = require('./middleware/error');
const loggerMiddleware = require('./middleware/logger');
const appInit = require('./init');
appInit(app);

app.use(compress())
    .use(express.static(__dirname + '/../public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .options('*', cors())
    .use(cors())
    .use(favicon(__dirname + '/../public/favicon.ico'));

app.use(loggerMiddleware);
// app.use(CONFIG.API_PREFIX_URL, authRoute);
app.use(CONFIG.API_PREFIX_URL + '/application', applicationRoute);

app.use(errorMiddleware.notFoundHandler)
    .use(errorMiddleware.errorLogger)
    .use(errorMiddleware.hanlder);

module.exports = app;
