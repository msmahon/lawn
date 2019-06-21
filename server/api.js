/* eslint-disable no-unused-vars */
var express = require('express')
var router = express.Router()
var Query = require('./services/database.js')

let db = new Query('test.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
})

router.get('/lawn/:name', function (req, res, next) {
  let data = db.getLawn(req.params.name);
  res.send(data);
})

module.exports = router;