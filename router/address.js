const express = require('express')
const router = express.Router()
const setup = require('../models/DbModel')
const address = require('../models/address')

var add = new address('./db/data.db')
var db = new setup('./db/data.db');




// LIST
router.get('/', (req, res) => {
  add.getAddress(db.connection)
    .then(function (arr) {
      add.getcontact(db.connection)
        .then((contact) => {
          res.render('addresses', {
            dataAddresses: arr,
            dataContact: contact
          })
        })
    })
})

// ADD
router.post('/', function (req, res) {
  add.addAddress(db.connection, req.body.alamat, req.body.kodepos, req.body.drop)
  res.redirect('/addresses')
})

//EDIT PAGE
router.get('/editA/:id', function (req, res) {
  add.getAddressE(db.connection, req.params.id)
    .then(function (arr) {
      add.getcontact(db.connection)
        .then((contact) => {
          res.render('editA', {
            dataAddresses: arr,
            dataContact: contact
          })
        })
    })
})

// EDIT
router.post('/editA/:id', function (req, res) {
  // console.log(req.body);
  add.updateAddress(db.connection, req.body.alamat, req.body.kodepos, req.body.drop, req.params.id)
  res.redirect('/addresses')
})

//DELETE
router.get('/delete/:id', function (req, res) {
  add.deleteAddress(db.connection, req.params.id)
  res.redirect('/addresses')
})



module.exports = router