const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const addressModel = require('../models/address')
const contactModel = require('../models/contact')


router.get('/address',(req, res) => {
	addressModel.findAll(db.connection)
		.then((addresses)=>{
			contactModel.findAll(db.connection)
			.then((contacts)=>{
				for (var j = 0; j < addresses.length; j++) {
					for (var i = 0; i < contacts.length; i++) {
				    if(addresses[j].contact_id == contacts[i].id){
				       addresses[j].company = contacts[i].company;
				       addresses[j].name = contacts[i].name;
				    }
				  }
				}
				res.render('address', {address_data: addresses})
			})

		})
		.catch(err =>{
			res.send(err)
		})
}) //manipulate data should

router.get('/addAddress', (req, res) =>{
	contactModel.findAll(db.connection)
		.then((contacts) =>{
			res.render('addAddress', {contact : contacts})
		})
		.catch(err =>{
			res.send(err)
		})
})

router.post('/addAddress', (req, res) => {
	addressModel.createData(db.connection, req.body)
	res.redirect('/address')
})

router.get('/address/edit/:id', (req, res) => {
	addressModel.findById(db.connection, req.params.id)
		.then((address)=>{
			contactModel.findAll(db.connection)
			.then((contacts)=>{
				res.render('editAddress', {edit_address : address, edit_contact:contacts})
			})
		})
})

router.post('/address/edit/:id', (req, res) => {
	addressModel.update(db.connection, req.body, req.params.id)
	res.redirect('/address')
})

router.get('/address/delete/:id', (req, res) => {
	addressModel.remove(db.connection, req.params.id)
	res.redirect('/address')
})

router.get('/address_with_contact/:id', (req, res) =>{
	addressModel.findById(db.connection, req.params.id)
		.then((address)=>{
			contactModel.findAll(db.connection)
			.then((contact)=>{
				for (var i = 0; i < contact.length; i++) {
			    if(address[0].contact_id ==contact[i].id){
			       address[0].company = contact[i].company;
			       address[0].name = contact[i].name;
			    }
			  }
			  res.render('detail_address', {address: address})
			})
		})

})


module.exports = router
