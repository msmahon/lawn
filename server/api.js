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

router.get('/getLawns', function(req, res, next) {
	let result = db.getLawnNames()
	res.send(result)
})

router.post('/lawn/reset', function(req, res, next) {
	let result = db.resetDatabase()
	res.send(result)
})

router.post('/lawn/add', function(req, res, next) {
	res.send(JSON.stringify(req))
})

module.exports = router;