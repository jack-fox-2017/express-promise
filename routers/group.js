'use strict'

const express = require('express');
const router = express.Router();

const DbModel = require('../models/dbModels');
const Groups = require('../models/group');
const ContactGroups = require('../models/contactGroups');
const Contacts = require('../models/contact');

let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

router.get('/', function(req,res) {
  Groups.findAll(connection)
  .then((rows) => {
    manipulateGroups(rows, function(rows2, err) {
      if(!err) {
          res.render('group', {data: rows2});
      }
    })
  })
  .catch(err => {
    res.send(err);
  })
});

function manipulateGroups(rows,cb) {
  let hitung = 0;

  rows.forEach(row =>{
    Groups.joinConjunctionWithGroups(connection, row)
    .then(data_contactsingroup =>{
      if (data_contactsingroup.length>0) {
        console.log(data_contactsingroup);
        console.log(JSON.stringify(row)+'this is row');
        var arr=[]
          for (let i=0; i<data_contactsingroup.length; i++) {
            arr.push(data_contactsingroup[i].name);
          }
        row['names']=arr;
      }
      hitung++;
      if(hitung == rows.length) {
        console.log(rows);
        cb(rows);
      }
    })
    .catch(err=> {
      console.log('Error di manipulasi data contacts di Group');
    })
  })
};

router.post('/', function(req,res) {
  Groups.insertData(connection, req.body);
  res.redirect('/groups');
})


router.get('/edit/:id', function(req, res){
  Groups.findById(connection, req.params.id)
  .then(rows => {
    res.render('groupEdit', {data: rows});
  })
});

router.post('/edit/:id', function(req, res){
  Groups.updateData(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/contact/:id', function(req, res){
  Groups.findById(connection, req.params.id)
  .then(rows => {
    Contacts.findAll(connection)
    .then(rows2 => {
        res.render('groupContact', {data_group: rows, data_contact: rows2});
    })
  })
});

router.post('/contact/:id', function(req, res){
  ContactGroups.insertDataConjuction(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  Groups.removeData(connection, req.params.id);
  res.redirect('/groups');
});

module.exports = router;
