const express = require('express');
const router = express.Router()
const Profile = require('../models/profile');
const Contact = require('../models/contact');
const dbModel = require('../models/index');

let dataModel = new dbModel('./db/data.db')
let conn = dataModel.database
let costumProfile = new Profile()


router.get('/', (req, res) => {
  Contact.findAll(conn)
  .then(data => {
    costumProfile.findManipulate(conn)
    .then(profile => {
      // res.send(profile)
      res.render('profile', {kontak: data, profileData: profile, pesan: false})
    })
  })
})

router.post('/', (req, res) => {
  Profile.findCustom(conn, req.body)
  .then(cekProfil => {
    if(cekProfil == 0){
      Profile.createData(conn, req.body)
      res.redirect('/profiles')
    } else {
      Contact.findAll(conn)
      .then(data => {
        Profile.findAll(conn)
        .then(profile => {
          res.render('profile', {kontak: data, profileData: profile, pesan: 'Maaf!!!\nUsername atau Contact ID sudah digunakan!!!'})
        })
      })
    }
  })
})

router.get('/:id/edit', (req, res) => {
  Profile.findById(conn, req.params)
  .then( data => {
    Contact.findAll(conn)
    .then( dataKontak => {
      res.render('profile-edit', {dataProfile: data[0], dataKontak: dataKontak, pesan: false})
    })
  })
})

router.post('/:id/edit', (req, res) => {
  Profile.findCustom(conn, req.body)
  .then(cekProfil => {
    if(cekProfil.length == 1){
      Profile.updateData(conn, req.params, req.body)
      res.redirect('/profiles')
    } else {
      Profile.findById(conn, req.params)
      .then( data => {
        Contact.findAll(conn)
        .then( dataKontak => {
          res.render('profile-edit', {dataProfile: data[0], dataKontak: dataKontak, pesan: 'Contact Id atau Username sudah terdaftar!!!'})
        })
      })
    }
  })
})

router.get('/:id/delete', (req, res) => {
  Profile.destroyData(conn, req.params)
  res.redirect('/profiles')
})

module.exports = router
