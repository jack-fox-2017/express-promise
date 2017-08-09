'use strict'

const express = require('express');
const router = express.Router();

const DbModel = require('../models/dbModels');
const Contacts = require('../models/contact');
const Groups = require('../models/group');

let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

// router.get('/', function(req,res) {
//   Contacts.findAll(connection, function(rows) {
//     Contacts.manipulateGroups(connection, rows, function(rows3) {
//         Groups.showGroup(connection, function(rows2) {
//           res.render('contact', {data: rows3, data_group:rows2});
//         })
//     })
//   })
// });

router.get('/', function(req,res) {
  Contacts.findAll(connection)
  .then((rows) => {

      manipulateGroups(rows, function(groups, err) {
        if(!err) {
          // console.log('hellloooooooo'+groups);
          Groups.showGroup(connection)
          .then(group => {
            res.render('contact', {data: groups, data_group:group});
          })
        }
      })
    })
    .catch(err => {
      res.send(err);
    })
  });

// router.get('/', function(req,res) {
//   Contacts.findAll(connection)
//   .then((rows) => {
//     console.log('---promise--', rows);
//   })
// })

function manipulateGroups(rows, cb) {
    let hitung = 0;
    rows.forEach(row =>{
      Contacts.joinConjunctionWithGroups(connection, row)
      .then(data_contactsingroup => {
        if (data_contactsingroup.length>0) {
          // console.log('INI ROW NYA'+JSON.stringify(data_contactsingroup));
          // row['contact_id'] = rows.id
              row['contact_name']=row.name;
              row['telp_number']=row.telp_number;
              row['company']=row.company;
              row['email']=row.email;
          // console.log(data_contactsingroup);
          // console.log(JSON.stringify(row)+'this is row');
          var arr=[]
            for (let i=0; i<data_contactsingroup.length; i++) {
              arr.push(data_contactsingroup[i].name_of_group);
            }
          row['group_names']=arr;
        }
        // console.log(row);
        hitung++;
        if(hitung == rows.length) {
          cb(rows);
        }
      })
      .catch(err=> {
        console.log('Error di manipulasi data groups di Contact');
      })
    })
  };

router.post('/', function(req,res) {
  Contacts.insertData(connection, req.body);
  res.redirect('/contacts');
})


router.get('/edit/:id', function(req, res){
  Contacts.findById(connection, req.params.id)
  .then(rows => {
    res.render('contactEdit', {data: rows});
  })
});

router.post('/edit/:id', function(req, res){
  Contacts.updateData(connection, req.body, req.params.id);
  res.redirect('/contacts');
})

router.get('/delete/:id', function(req, res){
  Contacts.removeData(connection, req.params.id);
  res.redirect('/contacts');
});


module.exports = router;
