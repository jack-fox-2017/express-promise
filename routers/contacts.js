const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const Model = require('../models/Models');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const model = new Model();

let cont = 'Contacts';

router.get('/', (req, res)=>{
  model.findAll(db.connection, cont)
    .then(contacts=>{
      res.render('contacts', {data: contacts});
    })

    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/', (req, res)=>{
  let obj = createObjCont(req);
  model.createData(db.connection, cont, obj);
  res.redirect('/contacts');
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  model.findById(db.connection, cont, id)
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
  model.update(db.connection, cont, obj, id);
  res.redirect('/contacts');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  model.remove(db.connection, cont, id);
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
