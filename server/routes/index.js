var express = require('express');
var router = express.Router();
var db = require('../services/database.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Database test */
router.get('/dbtest', function(req, res, next) {
	db.
});

module.exports = router;
