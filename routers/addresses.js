const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const Model = require('../models/Models');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const model = new Model();

let addr = 'Addresses';
let cont = 'Contacts';

router.get('/', (req, res)=>{
  model.findAll(db.connection, addr)
    .then(addresses=>{
      manipulateAddresses(addresses, (addresses)=>{
        model.findAll(db.connection, cont)
          .then(contacts=>{
            res.render('addresses', {dataAddresses:addresses, dataContacts:contacts});
          })
          .catch(err=>{
            res.send(err.toString());
          });
      });
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

function manipulateAddresses(addresses, cb){
  let count = 0;
  addresses.forEach(address =>{
    model.findById(db.connection, cont, address.contacts_id)
      .then(contact=>{
        address['name']=contact.name;
        address['company']=contact.company;
        count++;
        if(count == addresses.length){
          cb(addresses);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  });
}

router.post('/', (req, res)=>{
  let obj = createObjAddr(req);
  model.createData(db.connection, addr, obj)
    .then(redirect=>{
      res.redirect('/addresses');
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  model.findById(db.connection, addr, id)
    .then(address=>{
      model.findById(db.connection, cont, id)
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
  model.update(db.connection, addr, obj, id);
  res.redirect('/addresses');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  model.remove(db.connection, addr, id);
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
