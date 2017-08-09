const express = require('express');
const app = express()
const router = express.Router();

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//view engine
app.set(`view engine`,`ejs`)


const DbModel = require(`../models/dbModel`)
const contactsModel = require(`../models/contacts`)
const addressesModel = require(`../models/addresses`)

const db = new DbModel(`./db/data.db`)
const contacts = new contactsModel(db.connection)
const addresses = new addressesModel(db.connection)

function manipulate(rowsAddresses,cb){
  let num = 0
  rowsAddresses.forEach(row => {
    contacts.findByIdContacts(row.id_contacts)
    .then(dataUsers=>{
      row[`name`] =  dataUsers.name;
      row[`company`] =  dataUsers.company;
      row[`telp_number`] =  dataUsers.telp_number;
      row[`email`] =  dataUsers.email;
      num++;
      if (num == rowsAddresses.length) {
        cb(rowsAddresses)
      }
    })
    .catch(err=>{
      cb(rowsAddresses,err)
    })
  })
}


function manipulateOneContacts(rowAddresses,cb){
  contacts.findByIdContacts(rowAddresses.id_contacts)
  .then((dataUsers)=>{
    rowAddresses[`name`] =  dataUsers.name;
    rowAddresses[`company`] =  dataUsers.company;
    rowAddresses[`telp_number`] =  dataUsers.telp_number;
    rowAddresses[`email`] =  dataUsers.email;
    cb(rowAddresses)
  })
  .reject((err)=>{
    cb(err)
  })
}

// addresses
router.get(`/`,function(req,res){
  contacts.findAllContacts()
  .then(rowsContacts=>{
    addresses.findAllAddresses()
    .then(rowsAddresses=>{
      manipulate(rowsAddresses,(data,err)=>{
        if (!err) {
          res.render('addresses', {contacts:rowsContacts, addresses:data, error:null})
        } else {
          res.render('addresses', {contacts:rowsContacts, addresses:data, error:err})
        }
      })
    })
  })
  .catch(err=>{
    console.log(err);
  })
})

router.post(`/`,function(req,res){
  var add = {
    id_contacts:`${req.body.id_contacts}`,
    street:`${req.body.street}`,
    city:`${req.body.city}`,
    zipcode:`${req.body.zipcode}`
  }

  addresses.createAddresses(add)
  .then(()=>{
    res.redirect(`/addresses`)
  })
  .catch((err)=>{
    console.log(err);
    res.redirect(`/addresses?err=..`,{error:err})
  })
})

router.get(`/delete`, function(req,res){
  addresses.destroyAddresses(req.query.id)
  .then(()=>{
    res.redirect(`/addresses?`)
  })
  .catch((err)=>{
    res.redirect(`/addresses?error=`+err)
  })
})

router.get(`/edit`, function(req,res){
  contacts.findAllContacts()
  .then((rowsContact)=>{
    addresses.findByIdAddresses(req.query.id)
    .then((rowAddresses)=>{
      manipulateOneContacts(rowAddresses,(dataUsers)=>{
        res.render('addresses-edit',{data:dataUsers,contacts:rowsContact})
      })
    })
  })
  .catch((err)=>{
    console.log(err);
  })

})

router.post(`/edit`, function(req,res){
  var obj = {
    id:req.body.id,
    id_contacts:`${req.body.id_contacts}`,
    street:`${req.body.street}`,
    city:`${req.body.city}`,
    zipcode:`${req.body.zipcode}`
  }
  //console.log(obj);

  addresses.updateAddresses(obj)
  .then(()=>{
    res.redirect(`/addresses`)
  })
  .catch((err)=>{
    console.log(err);
    res.redirect(`/addresses?error=`+err)
  })
})

module.exports = router
