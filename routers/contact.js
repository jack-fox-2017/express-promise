const express = require('express');
const router = express.Router()
const Contact = require('../models/contact');
const dbModel = require('../models/index');

let dataModel = new dbModel('./db/data.db')
let conn = dataModel.database

router.get('/', (req, res) => {
  Contact.findAll(conn)
  .then(data => {
    res.render('contact', {contactData: data})
  })
  .catch(err => {
    res.send(err)
  })

})

router.post('/', (req, res) => {
  Contact.createData(conn, req.body)
  res.redirect('/contacts')
})

router.get('/:id/edit', (req, res) => {
  Contact.findById(conn, req.params)
  .then( data => {
    res.render('contact-edit', {edit: data[0]})
  })
})

router.post('/:id/edit', (req, res) => {
  Contact.updateData(conn, req.params, req.body)
  res.redirect('/contacts')
})

router.get('/:id/delete', (req, res) => {
  Contact.destroyData(conn, req.params)
  res.redirect('/contacts')
})

module.exports = router;
