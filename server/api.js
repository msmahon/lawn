/* eslint-disable no-unused-vars */
var express = require('express')
var router = express.Router()
var Query = require('./services/database.js')

let db = new Query('lawns');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
})

router.get('/lawn/:name', function (req, res, next) {
  res.send(req.params);
})

module.exports = router;