var express = require ('express');
var path = require ('path');
var app = express()
//var bodyParser = require ('body-parser')
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
var getAddress = new addressModel()

router.get ('/', function(req, res){
  contactsModel.findAll (conn.connection)
  .then(rows =>{
    getAddress.findCustomData(conn.connection)
    .then(data =>{
      // res.send(data)
      res.render('address', {address:data, kontak:rows})
    })
  })
  // addressModel.findAll (conn.connection)
  // .then(data =>{
  //   contactsModel.findAll (conn.connection)
  //   .then(rows =>{
  //     res.render('address', {address:data, kontak:rows})
  //   })
  // })
})

router.post ('/', function(req,res){
  addressModel.insertData(conn.connection, req.body)
  res.redirect(`/address`)
})

router.get ('/delete/:id', function (req, res) {
  addressModel.remove(conn.connection, req.params.id)
  res.redirect(`/address`)
})

// app.get ('/address/editaddress/:id', function (req, res){
//   console.log(`SELECT * FROM address WHERE id = ${req.params.id}`);
//   db.all(`SELECT * FROM address WHERE id = ${req.params.id}`, function (err, rows){
//     if (!err) {
//       console.log(rows);
//       res.render(`editaddress`, {input : rows})
//     }
//   })
// })

router.get ('/editaddress/:id', function (req, res){
  addressModel.findById (conn.connection, req.params)
      .then(rows => {
        res.render(`editaddress`, {input : rows})
      })
    })


router.post ('/editaddress/:id' , function(req, res){
  addressModel.update(conn.connection, req.body, req.params.id)
  res.redirect(`/address`)
})

module.exports = router;
