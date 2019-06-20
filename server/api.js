/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();

var indexController = require('./controllers/indexController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let response = indexController.testResponse();
  res.send(response);
});

module.exports = router;