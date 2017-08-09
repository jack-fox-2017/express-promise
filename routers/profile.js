const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const profileModel = require('../models/profile')
const contactModel = require('../models/contact')


router.get('/profile', (req, res) => {
	profileModel.findAll(db.connection)
	.then((profiles)=>{
		res.render('profile', {profile_data: profiles})
	})
	.catch(err =>{
    res.send(err)
	})
})

router.get('/addProfile', (req, res)  =>{
	contactModel.findAll(db.connection)
	.then((profiles)=>{
		res.render('addProfile', {contact: profiles, err_msg: false})
	})
	.catch(err =>{
    res.send(err)
	})
})

router.post('/addProfile', (req, res)  =>{
	contactModel.findAll(db.connection)
	.then((contacts)=>{
		profileModel.createData(db.connection, req.body)
		.then(()=>{
			res.redirect('/profile', {contact: contacts})
		})
	})
	.catch(err=>{
		res.render('addProfile', {contact: contacts, err_msg: "Kontak sudah terpakai, Pilih lainnya!!"})
	})
})

router.get('/profile/edit/:id',(req, res) => {
	profileModel.findById(db.connection, req.params.id)
	.then((profile)=>{
		contactModel.findAll(db.connection)
		.then((contacts)=>{
			res.render('editProfile', {edit_profile : profile, edit_contact:contacts, err_msg : false})
		})
	})
	.catch(err=>{
		res.send(err)
	})
})

router.post('/profile/edit/:id', (req, res) =>{
	profileModel.findById(db.connection, req.params.id)
	.then((rows)=>{
		contactModel.findAll(db.connection)
		.then((data)=>{
			profileModel.update(db.connection, req.body, req.params.id)
			.then(()=>{
				res.redirect('/profile')
			})
		})
	})
	.catch(err=>{
		res.render('editProfile', {edit_profile : rows, edit_contact:data, err_msg : "Maaf, kontak tersebut sudah digunakan"})
	})
})

router.get('/profile/delete/:id', (req, res) =>{
	profileModel.remove(db.connection, req.params.id)
	res.redirect('/profile')
})

module.exports = router
