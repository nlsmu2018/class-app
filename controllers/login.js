var express = require('express');
var orm = require('../config/orm');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login', { urlPath: req.baseUrl, success: req.flash('success') });
});

module.exports = router;
