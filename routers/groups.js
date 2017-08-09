const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//---------------ORM-------------------//
//------------ORM CONTACT-------------//
// const Group = require('../models/group');
const Groups = require('../models/groups'); // require contact.js berdasarkan classnya

router.get('/', function(req, res){
  Groups.showGroups(dbCreate.connection, function(err, rows){
    res.render('groups', {dataGroups: rows})
  })
})

router.get('/add', function(req, res){
  res.render('groups-add-form');
})

router.post('/add', function(req, res){
  Groups.addGroups(dbCreate.connection, req.body)
  res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  Groups.editGroupsForm(dbCreate.connection, req.params, function(err, rows){
    res.render('groups-edit-form', {dataGroups:rows[0]})
  })
})

router.post('/edit/:id', function(req, res){
  Groups.editGroupsData(dbCreate.connection, req.body, req.params.id)
  res.redirect('/groups')
})

router.get('/delete/:id', function(req, res){
  Groups.deleteGroups(dbCreate.connection, req.params)
  res.redirect('/groups')
})

module.exports = router;
