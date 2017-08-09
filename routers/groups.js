const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const contactGroups = require('../models/contact_groups.js')
const contactModel = require('../models/contact')
const groupsModel = require('../models/groups')


router.get('/groups', (req, res)=>{
  groupsModel.findAll(db.connection)
  .then((groups)=>{
    res.render('groups', {groups_data : groups})
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/addGroups', (req, res) =>{
	res.render('addGroups')
})

router.post('/addGroups', (req, res) => {
	groupsModel.createData(db.connection, req.body)
 	res.redirect('/groups');
})

router.get('/groups/edit/:id', (req, res) => {
	groupsModel.findById(db.connection, req.params.id)
	.then((group)=>{
		res.render('editGroups', {edit_groups: group})
	})
});

router.post('/groups/edit/:id', (req, res) => {
	groupsModel.update(db.connection, req.body, req.params.id)
	res.redirect('/groups')
});

router.get('/groups/delete/:id', (req, res) => {
	groupsModel.remove(db.connection, req.params.id)
	res.redirect('/groups')
});

router.get('/groups/contact_groups/:id', (req, res)=>{
  contactGroups.findByGrupId(db.connection, req.params.id)
  .then((cgs)=>{
    groupsModel.findById(db.connection, req.params.id)
    .then((group)=>{
      contactModel.findAll(db.connection)
      .then((contacts)=>{
        for (var i = 0; i < cgs.length; i++) {
          for (var j = 0; j < group.length; j++) {
            for (var k = 0; k < contacts.length; k++) {
              if (cgs[i].groups_id == group[j].id) {
                cgs[i].name_group = group[j].name_group
              }
              if (cgs[i].contact_id == contacts[k].id) {
                cgs[i].name = contacts[k].name
              }
            }
          }
        }
        res.render('contact_groups', {cgs: cgs, group: group, contacts : contacts})
      })
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/groups/contact_groups/:id', (req, res)=>{
  contactGroups.createData(db.connection, req.body)
  res.redirect(`/groups/contact_groups/${req.params.id}`);
})

router.get('/groups/contact_groups/delete/:id', (req, res) => {
	contactGroups.remove(db.connection, req.params.id)
	res.redirect(`/groups`)
});


module.exports = router
