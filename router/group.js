const express = require('express')
const router = express.Router()
const setup = require('../models/DbModel')
const group = require('../models/group')

var grup = new group('./db/data.db');
var db = new setup('./db/data.db');


// LIST
router.get('/', function (req, res) {
  grup.getGroup(db.connection)
    .then(function (rows, row) {
      res.render('groups', {
        dataA: rows
      })
    })
})

// ADD
router.post('/', function (req, res) {
  grup.addGroup(db.connection, req.body.grup)
  res.redirect('/groups')
})

//EDIT PAGE
router.get('/editG/:id', function (req, res) {
  grup.getGroupE(db.connection, req.params.id)
    .then((rows) => {
        // console.log(rows);
        res.render('editG', {
          dataG: rows,
        })
      })
})

// EDIT
router.post('/editG/:id', function (req, res) {
  // console.log(req.body);
  grup.updateGroup(db.connection, req.body.grup, req.params.id)
  res.redirect('/groups')
})

//DELETE
router.get('/delete/:id', function (req, res) {
  grup.deleteGroup(db.connection, req.params.id)
  res.redirect('/groups')
})

router.get('/add', function (req, res) {
  grup.getBridge(db.connection)
  .then((bridge) => {
    grup.getcontact(db.connection)
    .then((contact) => {
      res.render('GroupContact', {
        dataG: bridge,
        dataC: contact
      })
    })
  })
})

router.post('/add', function (req, res) {
  grup.addGroupContact(db.connection, req.body.drops, req.body.drop)
  res.redirect('/groups')
})

module.exports = router