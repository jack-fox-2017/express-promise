const express = require('express')
const router = express.Router()

// const sqlite3 = require('sqlite3')
// const db = new sqlite3.Database('./db/data.db')

const contactModel = require('../models/contactModel')

var dbModel = require('../models/dbModel')
var conn = new dbModel()

router.get('/', (req, res) => {
  contactModel.findAll(conn.connection)
  .then(data => {
    res.render('contact', {data: data})
  })
})

router.post('/', (req, res) => {
  contactModel.createData(conn.connection, req.body)
  res.redirect('/contacts')
})

router.get('/delete/:id', (req, res) => {
  contactModel.remove(conn.connection, req.params.id)
  res.redirect('/contacts')
})

router.get('/edit/:id', (req, res) => {
  contactModel.findById(conn.connection, req.params.id)
  .then(data => {
    res.render('contact_edit', {data: data})
  })
})

router.post('/edit/:id', (req, res) => {
  contactModel.update(conn.connection, req.body, req.params.id)
  res.redirect('/contacts')
})

module.exports = router
