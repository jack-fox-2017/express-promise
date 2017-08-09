const express = require('express');
const app = express()
const router = express.Router();

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//view engine
app.set(`view engine`,`ejs`)

//orm
const DbModel = require(`../models/dbModel`)
const contactsModel = require(`../models/contacts`)

const db = new DbModel(`./db/data.db`)
const contacts = new contactsModel(db.connection)



// contact page
router.get(`/`,function(req,res){

  contacts.findAllContacts()
  .then((rows)=>{
    res.render('contacts', {data: rows})
  })
  .catch((err)=>{
    console.log(err);
    res.render('contacts?error='+err, {data: rows,})
  })

})

router.post(`/`,function(req,res){
  var add = {
    name:`${req.body.name}`,
    company:`${req.body.company}`,
    telp_number:`${req.body.telp_number}`,
    email:`${req.body.email}`
  }

  contacts.createContacts(add)
  .then(()=>{
      res.redirect(`/contacts`)
  })
  .catch((err)=>{
      console.log(err);
      res.redirect(`/contacts?error=`+err)
  })
})

router.get('/delete', function(req,res){
  var id = req.query.id

  contacts.destroyContacts(id)
  .then(()=>{
    res.redirect(`/contacts`);
  })
  .catch((err)=>{
    console.log(err);
    res.redirect(`/contacts?error=`+err);
  })
})

router.get(`/edit`, function(req,res){
  var id = req.query.id
  contacts.findByIdContacts(id)
  .then((rows)=>{
    res.render('contacts-edit',{data: rows})
  })
  .catch((err)=>{
    console.log(err);
    res.render('contacts-edit',{data: rows, error: err})
  })
})

router.post(`/edit`, function(req,res){
  var obj = {
    id: req.query.id,
    name:`${req.body.name}`,
    company:`${req.body.company}`,
    telp_number:`${req.body.telp_number}`,
    email:`${req.body.email}`
  }

  contacts.updateContacts(obj)
  .then(()=>{
    res.redirect(`/contacts`)
  })
  .catch((err)=>{
    console.log(error);
    res.redirect(`/contacts?error=`+err)
  })

})




module.exports = router
