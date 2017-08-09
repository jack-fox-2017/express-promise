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
      manipulateAddresses(addresses, (err, addresses)=>{
        res.render('addresses_with_contact', {data:addresses});
      });
    })
});

function manipulateAddresses(addresses, cb){
  let count = 0;
  addresses.forEach(address =>{
    contact.findById(db.connection, table2, address.contacts_id)
      .then(contact=>{
        address['name']=contact.name;
        address['company']=contact.company;
        count++;
        if(count == addresses.length){
          cb(null, addresses);
        }else{
          cb(err, null);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  });
}

module.exports = router;
