/* eslint-disable no-unused-vars */
var express = require('express')
var router = express.Router()
var Database = require('./services/database.js')
var Weather = require('./services/weather.js')
var Event = require('./services/event.js')

let db = new Database()
let weather = new Weather()
let events = new Event()

var Lawn = require('./models/lawn')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test')
})

router.get('/lawn/:name', function (req, res, next) {
  let data = Lawn.getLawnData(req.params.name)
  res.send(data)
})

router.get('/Lawns', function(req, res, next) {
	let result = db.getLawnNames()
	res.send(result)
})

router.get('/grassTypes', function(req, res, next) {
	let result = db.getGrassTypes()
	res.send(result)
})

router.post('/lawn/reset', function(req, res, next) {
	let result = db.resetDatabase()
	res.send(result)
})

router.post('/lawn/save', function(req, res, next) {
	let lawn = new Lawn(req.body)
	lawn.saveLawn()
})

router.get('/events/:name', function(req, res, next) {
	let results = events.recentEvents(req.params.name)
	res.send(results)
})

router.get('/weather/', async function(req, res, next) {
	let forecast = await weather.getForecast()
	res.send(forecast)
})

module.exports = router;