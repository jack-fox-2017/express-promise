const express = require('express');
const router = express.Router()
const Address = require('../models/address');
const Contact = require('../models/contact');
const dbModel = require('../models/index');

let dataModel = new dbModel('./db/data.db')
let conn = dataModel.database
let customAddress = new Address()


router.get('/', (req, res) => {
  Contact.findAll(conn)
  .then(data => {
    customAddress.findManipulate(conn)
    .then(dataAddress => {
      res.render('address', {kontak: data, addressData: dataAddress})
    })
  })
})

router.post('/', (req, res) => {
  Address.createData(conn, req.body)
  res.redirect('/addresses')
})

router.get('/:id/edit', (req, res) => {
  Address.findById(conn, req.params)
  .then(data => {
    Contact.findAll(conn)
    .then(dataKontak => {
      res.render('address-edit', {data: data[0], kontak: dataKontak})
    })
  })
  .catch(err => {
    res.send('Mohon mangap sedang maintenance')
  })
})

router.post('/:id/edit', (req, res) => {
  Address.updateData(conn, req.params, req.body)
  res.redirect('/addresses')
})


router.get('/:id/delete', (req, res) => {
  Address.destroyData(conn, req.params)
  res.redirect('/addresses')
})


module.exports = router
