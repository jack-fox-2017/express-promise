const express = require('express');
const router = express.Router()
const Group = require('../models/group');
const Contact = require('../models/contact');
const dbModel = require('../models/index');

let dataModel = new dbModel('./db/data.db')
let conn = dataModel.database
let dataGroup = new Group()

router.get('/', (req, res) => {
  dataGroup.findAll(conn)
  .then(data => {
    // res.send(data)
    res.render('group', {groupData: data})
  })
})

router.post('/', (req, res) => {
  Group.createData(conn, req.body)
  res.redirect('/groups')
})

router.get('/:id/edit', (req, res) => {
  Group.findById(conn, req.params)
  .then(data => {
    res.render('group-edit', {edit: data[0]})
  })
})

router.post('/:id/edit', (req, res) => {
  Group.updateData(conn, req.params, req.body)
  res.redirect('/groups')
})

router.get('/:id/delete', (req, res) => {
  Group.destroyData(conn, req.params)
  res.redirect('/groups')
})

router.get('/:id/assign-contact', (req, res) => {
  Group.findById(conn, req.params)
  .then(data => {
    Contact.findAll(conn)
    .then(dataKontak => {
      res.render('assign-contact', {dataGroup: data[0], kontak: dataKontak})
    })
  })
})

router.post('/:id/assign-contact', (req, res) => {
  Group.createAssign(conn, req.body, req.params)
  res.redirect(`/groups/`)
})

module.exports = router;
