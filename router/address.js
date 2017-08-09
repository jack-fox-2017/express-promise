const express = require('express');
const router = express.Router();

const DB_Model = require('../model/db_model.js');
const address_model = require('../model/address.js');
const contacts_model = require('../model/contacts.js');

let database_model= new DB_Model('./db/data.db')
const connection = database_model.newdatabase

var ManipulateAddress = new address_model()

router.get('/', (req, res)=>{
  // address_model.findAll(connection, (err, rowsAddress)=>{
  //   contacts_model.findAll(connection, (err, rowsContacts)=>{
    contacts_model.findAll(connection)
    .then(rowsContacts=>{
      // contacts_model.findAll(connection)
      ManipulateAddress.DoubleObj(connection)
      // .then(rowsContacts=>{
      .then(rowsDoubleObj=>{
        // console.log(rowsDoubleObj);
        // res.render('address', {data:rowsAddress,dataContacts:rowsContacts})
        res.render('address', {data:rowsContacts,dataDoubleObj:rowsDoubleObj})

        // res.redirect('/')
        // console.log(obj.manipulation2());
      })
    })
    // console.log(rowsContacts);
    // console.log(rowsAddress[0].contact_id);
    // for (var i = 0; i < rowsAddress.length; i++) {
    // for (var i = 0; i < rowsContacts.length; i++) {
    //   if(rowsAddress[0].contact_id==rowsContacts[i].id){
    //     rowsAddress[0]['nama'] = rowsContacts[i].name
    // // console.log(rowsAddress);
    //   }
    // }
  // }
    // rowsAddress['name']=
      // res.render('address', {data:rowsAddress, dataContacts:rowsContacts})
      // res.render('address', {data:rowsAddress})
  //   })
  // })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/', (req, res)=>{
  address_model.createData(connection, req.body)
    res.redirect('/address')
})

// address_model.findById(connection, req.params ,(err,rowsAddress)=>{
// contacts_model.findAll(connection, (err, rowsContacts)=>{
// res.render('editaddress',{data:rowsAddress,dataContacts:rowsContacts})
// })
// })

router.get('/edit/:id', (req, res)=>{
  address_model.findById(connection, req.params)
    .then(rowsAddress=>{
      contacts_model.findAll(connection)
        .then(rowsContacts=>{
            res.render('editaddress', {data:rowsAddress,dataContacts:rowsContacts})
      // res.render('editaddress', {data:rowsContacts})
        })
    // res.redirect('/')
    })
  .catch(err=>{
    res.send(err)
  })
  // res.send('halo');
})

router.post('/edit/:id', (req, res)=>{
  address_model.update(connection, req.body, req.params)
    res.redirect('/address')
})

router.get('/delete/:id', (req, res)=>{
  address_model.destroy(connection , req.params)
    res.redirect('/address')
})

module.exports = router
