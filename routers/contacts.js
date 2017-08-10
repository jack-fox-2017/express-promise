var express = require ('express');
var path = require ('path');
var app = express()
var bodyParser = require ('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}))
// app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

const router = express.Router()

const addressModel = require('../models/address')

const contactsModel = require('../models/contacts')

var dbModel = require('../models/dbmodels')
var conn = new dbModel()


router.get ('/', function(req, res){
  contactsModel.findAll (conn.connection)
  .then(rows =>{
    res.render('contacts', {contact: rows})
  })
})

router.post ('/', function(req,res){
  contactsModel.insertData(conn.connection, req.body)
  res.redirect(`/contacts`)
})

router.get ('/delete/:id', function (req, res) {
  contactsModel.remove(conn.connection, req.params.id)
  res.redirect(`/contacts`)
})

router.get ('/edit/:id', function (req, res){
  contactsModel.findById(conn.connection, req.params)
      .then(rows =>{
        res.render(`edit`, {input : rows})
      })
    })

router.post ('/edit/:id' , function(req, res){
  contactsModel.update(conn.connection, req.body, req.params.id)
  res.redirect(`/contacts`)
})

module.exports = router;
