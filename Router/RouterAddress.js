'use strict'

const express = require('express');
const app = express();
var router = express.Router();

const DB = require('../model/dbModel');
const Address = require('../model/Address')
const Contacts = require('../model/Contacts')

var connect = new DB();
var dbModel = new DB("./db/data.db");

router.get('/',function(req,res){
  Address.findall(connect.connection)
    .then(addressdata => {
      // console.log(addressdata);
      Contacts.findall(connect.connection)
        .then(Contacts => {
          // console.log(Contacts);
          res.render('addresses',{data1:addressdata,data2:Contacts})
        })
    })
  .catch(err => {
    res.send(err);
    // console.log(err);
  })
})

//   Address.findall(connect.connection,function(err,rows){
//     Contacts.findall(connect.connection,function(err2,rows2){
//       res.render('addresses',{data1: rows,data2:rows2})
//     })
//   })
// })

router.post('/',function(req,res){
  Address.createData(connect.connection,req.body)
    res.redirect('/addresses')
})


router.get('/editAddresses/:id',function(req,res){
  Address.findById(connect.connection,req.params.id)
    .then(dataAddress => {
      Contacts.findall(connect.connection)
        .then(dataContacts => {
          res.render('editAddresses',{data:dataAddress,data2:dataContacts})
        })
    })
  .catch(err => {
    res.send(err);
    // console.log(err);
    })
})


//*********tanpa promise*************************
// router.get('/editAddresses/:id',function(req,res){
//   Address.findById(connect.connection,req.params.id,function(err,rows){
//     Contacts.findall(connect.connection,function(err2,rows2){
//       if(!err)res.render('editAddresses',{data:rows,data2:rows2})
//       else res.send('eror =${err}')
//     })
//   })
// })

router.post('/editAddresses/:id',function(req,res){
  Address.update(connect.connection,req.body,req.params.id)
  res.redirect('/addresses')
})


router.get('/deleteAddresses/:id',function(req,res){
  Address.remove(connect.connection,req.params.id)
  res.redirect('/addresses')
})

module.exports = router
