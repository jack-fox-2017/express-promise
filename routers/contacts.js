const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const contactsModel = require('../models/Contacts');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const contact = new contactsModel();

let table = 'Contacts';

router.get('/', (req, res)=>{
  contact.findAll(db.connection, table)
    .then(contacts=>{
      res.render('contacts', {data: contacts});
    })

    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/', (req, res)=>{
  let obj = createObjCont(req);
  contact.createData(db.connection, table, obj);
  res.redirect('/contacts');
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  contact.findById(db.connection, table, id)
    .then(contact=>{
      res.render('edit-contact', {data:contact});
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/edit/:id', (req, res)=>{
  let id = req.params.id;
  let obj = createObjCont(req);
  contact.update(db.connection, table, obj, id);
  res.redirect('/contacts');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  contact.remove(db.connection, table, id);
  res.redirect('/contacts');
});

function createObjCont(req){
  let obj = {};
  obj['name'] = req.body.name;
  obj['company'] = req.body.company;
  obj['phone'] = req.body.phone;
  obj['email'] = req.body.email;
  return obj;
}

module.exports = router;
