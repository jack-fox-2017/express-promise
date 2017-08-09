const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const contactModel = require('../models/contact')
const groupsModel = require('../models/groups')
const contactGroups = require('../models/contact_groups')


router.get('/contact', (req, res) => {
	contactModel.findAll(db.connection)
	.then((contacts) =>{

		contactGroups.findAll(db.connection)
		.then((cgs)=>{
			groupsModel.findAll(db.connection)
			.then((groups)=>{
				for (var i = 0; i < contacts.length; i++) {
					var grupname = []
					for (var j = 0; j < cgs.length; j++) {
						for (var k = 0; k < groups.length; k++) {
							if(contacts[i].id == cgs[j].contact_id && cgs[j].groups_id == groups[k].id){
								contacts[i].name_group = groups[k].name_group
								grupname.push(contacts[i].name_group)
							}
						}
					}
					contacts[i].name_group = grupname.join(', ')
				}
				res.render('contact', {contact_data : contacts})
			})
		})
	})
	.catch(err=>{
		res.send(err)
	})
})

router.get('/addContact', (req, res) =>{
	contactGroups.findAll(db.connection)
	.then((groups)=>{
		res.render('addContact', {groups : groups})
	})
	.catch(err=>{
		res.send(err)
	})
})

router.post('/addContact', (req, res) => {
	contactModel.createData(db.connection, req.body)
 	res.redirect('/contact');
})

router.get('/contact/edit/:id', (req, res) => {
	contactModel.findById(db.connection, req.params.id)
	.then((contact)=>{
		groupsModel.findAll(db.connection)
		.then((groups)=>{
			res.render('editContact', {edit_contact: contact, edit_groups: groups})
		})
	})
});

router.post('/contact/edit/:id', (req, res) => {
	contactModel.update(db.connection, req.body, req.params.id)
	res.redirect('/contact')
});
//
router.get('/contact/delete/:id', (req, res) => {
	contactModel.remove(db.connection, req.params.id)
	res.redirect('/contact')
});

module.exports = router
