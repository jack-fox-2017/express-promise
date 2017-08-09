const express = require('express');
const router = express.Router();

const DB_Model = require('../model/db_model.js');
const contacts_model = require('../model/contacts.js');

let database_model= new DB_Model('./db/data.db')
const connection = database_model.newdatabase


router.get('/', (req, res)=>{
  // contacts_model.findAll(connection, (err, rowsContacts)=>{
  contacts_model.findAll(connection)
  .then(rowsContacts=>{
    res.render('contacts', {data:rowsContacts})
  })
  // res.render('contacts', {data:rowsContacts})
    // res.render(rowsContacts)
  // })
  .catch(err =>{
    res.send(err);
  })
})

router.post('/', (req, res)=>{
  contacts_model.createData(connection,req.body)
    res.redirect('/contacts')
  })

router.get('/edit/:id', (req, res)=>{
  // console.log(contacts_model.findById(connection, req.params, 'blabla'));
  // contacts_model.findById(connection, req.params, (err,rowsContacts)=>{
  contacts_model.findById(connection, req.params)
  .then(rowsById=>{
    res.render('editcontacts',{data:rowsById})
  })
  //   res.render('editcontacts',{data:rowsContacts})
  // })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  contacts_model.update(connection, req.body, req.params)
    res.redirect('/contacts')
})

router.get('/delete/:id', (req, res)=>{
  contacts_model.destroy(connection , req.params)
    res.redirect('/contacts')
  })

module.exports = router
