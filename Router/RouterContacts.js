'use strict'

const express = require('express');
const app = express();
var router = express.Router();

const DB = require('../model/dbModel');
const Contact = require('../model/Contacts')
const Address = require('../model/Address')

var connect = new DB();
var dbModel = new DB("./db/data.db");

router.get('/',function(req,res){
  Contact.findall(connect.connection)
    .then(rows => {
      // console.log(rows);
      res.render('contacts',{data:rows})
    })
  .catch(err => {
    res.send(err);
    // console.log(err);
  })
})

// Contact.findall(connect.connection,function(err,rows){
//   res.render('contacts',{data: rows})
//   })

router.post('/',function(req,res){
  Contact.createData(connect.connection,req.body)
    res.redirect('/contacts')
})

router.get('/editContacts/:id',function(req,res){
  Contact.findById(connect.connection,req.params.id)
    .then(rows => {
      res.render('editContacts',{data:rows})
    })
  .catch(err => {
    res.send(err)
  })
})

// Contact.findById(connect.connection,req.params.id,function(err,rows){
//   if(!err)res.render('editContacts',{data:rows})
//   else res.send('eror =${err}')



router.post('/editContacts/:id',function(req,res){
  Contact.update(connect.connection,req.body,req.params.id)
  res.redirect('/contacts')
})

router.get('/delete/:id',function(req,res){
  Contact.remove(connect.connection,req.params.id)
  res.redirect('/contacts')
})

router.get('/detailContactsaddress/:id',(req,res) => {
  Contact.findById(connect.connection,req.params.id)
    .then(contactbyid => {
      Contact.findall(connect.connection)
        .then(contactall => {
           Address.findall(connect.connection)
             .then(addressall => {
               for(var i = 0; i < addressall.length;i++){
                 for (var j = 0; j < contactall.length; j++) {
                   if(addressall[i].contact_id == contactall[j].id){
                     addressall[i].name = contactall[j].name
                     addressall[i].company = contactall[j].company
                     addressall[i].telp_number = contactall[j].telp_number
                     addressall[i].email = contactall[j].email
                   }
                 }
               }
         res.render(`detailContactsaddress`,{data1:addressall,data2:contactall,data3:contactbyid})
       })
    })
  })
})

module.exports = router
