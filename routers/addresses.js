const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const addressModel = require('../models/Addresses');
const contactModel = require('../models/Contacts');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const address = new addressModel();
const contact = new contactModel();

let table = 'Addresses';
let table2 = 'Contacts';

router.get('/', (req, res)=>{
  address.findAll(db.connection, table)
    .then(addresses=>{
      contact.findAll(db.connection, table2)
        .then(contacts=>{
          res.render('addresses', {dataAddresses:addresses, dataContacts:contacts});
        })
        .catch(err=>{
          res.send(err.toString());
        })
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/', (req, res)=>{
  let obj = createObjAddr(req);
  address.createData(db.connection, table, obj);
  res.redirect('/addresses');
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  address.findById(db.connection, table, id)
    .then(address=>{
      contact.findById(db.connection, table2, id)
      .then(contact=>{
        res.render('./edit-address', {dataAddress:address, dataContact:contact});
      })
      .catch(err=>{
        res.send(err.toString());
      });
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/edit/:id', (req, res)=>{
  let id = req.params.id;
  let obj = createObjAddr(req);
  address.update(db.connection, table, obj, id);
  res.redirect('/addresses');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  address.remove(db.connection, table, id);
  res.redirect('/addresses');
});

function createObjAddr(req){
  let obj = {};
  obj['street'] = req.body.street;
  obj['city'] = req.body.city;
  obj['zip_code'] = req.body.zip_code;
  obj['contacts_id'] = req.body.contacts_id;
  return obj;
}

module.exports = router;
