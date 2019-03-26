'use strict';

const CONFIG = require('./config');
const express = require('express');
const app = express();
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
const applicationRoute = require('./routes/application');
const gasRoute = require('./routes/gas');
const frontRoute = require('./routes/front');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');
const viewRoute = require('./routes/view');
const errorMiddleware = require('./middleware/error');
const loggerMiddleware = require('./middleware/logger');
const appInit = require('./init');
appInit(app);

app.use(compress())
    .use(express.static(__dirname + '/../public'))
    .use('/admin', express.static(__dirname + '/../admin'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .options('*', cors())
    .use(cors())
    .use(favicon(__dirname + '/../public/favicon.ico'));

app.use(loggerMiddleware);
app.use(CONFIG.API_PREFIX_URL, authRoute);
app.use(CONFIG.API_PREFIX_URL + '/application', applicationRoute);
app.use(CONFIG.API_PREFIX_URL + '/gas', gasRoute);
app.use(CONFIG.API_PREFIX_URL + '/gas/seoul', gasRoute);
app.use(CONFIG.API_PREFIX_URL + '/gas/inchon', gasRoute);
app.use(CONFIG.API_PREFIX_URL + '/front', frontRoute);
app.use(CONFIG.API_PREFIX_URL + '/admin', adminRoute);
app.use('/view', viewRoute);

app.use(errorMiddleware.notFoundHandler)
    .use(errorMiddleware.errorLogger)
    .use(errorMiddleware.hanlder);

module.exports = app;
