const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

router.get('/', function(req, res) {
  res.render('home');
});


module.exports = router;
