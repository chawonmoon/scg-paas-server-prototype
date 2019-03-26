const express = require('express');
const router = express.Router();

router.post('/form', function(req, res) {
    res.send('aaa');
});

router.post('/redirect', function(req, res) {
    console.log(JSON.stringify(req.body));
    let bodyData = req.body;
    // http://localhost:3001/signresult.html
    res.redirect(bodyData.url);
});

module.exports = router;
