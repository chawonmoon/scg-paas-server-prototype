const express = require('express');
const router = express.Router();

router.post('/form', function(req, res) {
    res.send('aaa');
});

router.post('/redirect', function(req, res) {
    res.redirect('http://localhost:3001/signresult.html');
});

module.exports = router;
