"use strict"

const express = require('express');
const app = express()
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('./db/data.db')

var index = require('./Router/index');
var Routercontact = require('./Router/RouterContacts')
var Routeraddresses = require('./Router/RouterAddress')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine","ejs")
app.use('/', index)
app.use('/contacts',Routercontact)
app.use('/Addresses',Routeraddresses)

//************************************ Index aka '/' *************************************

// app.get('/',(req,res) => {
//   res.render('index',{})
// })

//*************************************Contacts******************************************

// app.get('/contacts',(req,res) => {
//   db.all(`SELECT*FROM Contacts`,(err,rows) => {
//   res.render('contacts',{data:rows})
//   })
// })

// app.post('/contacts',(req,res) => {
//   db.run(`INSERT INTO Contacts(name,company,telp_number,email) VALUES ('${req.body.Name}','${req.body.Company}','${req.body.Telp_number}','${req.body.Email}')`)
//   res.redirect('/contacts')
// })

// app.get('/contacts/editContacts/:id',(req,res) => {
//   db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`,(err,rows) => {
//     if (!err) {
//       res.render('editContacts',{data:rows})
//     }
//   })
// })
//
// app.post('/contacts/editContacts/:id',(req,res) => {
//   db.run(`UPDATE Contacts SET name = '${req.body.Name}',company = '${req.body.Company}',telp_number = '${req.body.Telp_number}',email = '${req.body.Email}' WHERE id = ${req.params.id}`)
//   res.redirect('/contacts')
// })
//
// app.get('/contacts/detailContactsaddress/:id',(req,res) => {
//   db.all(`SELECT * FROM Contacts JOIN Addresses on Contacts.id = Addresses.contact_id WHERE Contacts.id = '${req.params.id}'`,(err,rows) => {
//     if(!err) {
//       // let arr = {"nama" : "coba"}
//       // res.send(arr.nama)
//       res.render('detailContactsaddress',{data: rows})
//     }
//   })
// })

app.get('/contacts/detailProfiles/:id',(req,res) => {
  db.all(`SELECT * FROM Contacts JOIN Profiles on Contacts.id = Profiles.contact_id WHERE Contacts.id = ${req.params.id}`,(err,rows) => {
    res.render('detailProfiles',{data:rows})
  })
})
//
// app.get('/contacts/delete/:id',(req,res) => {
//   db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
//   res.redirect('/contacts')
// })

//***************************************groups**********************************

app.get('/groups',(req,res) => {
  db.all(`SELECT * FROM Groups`,(err,rows) => {
    if(!err){
      res.render('groups',{data:rows})
    }
  })
})

app.post('/groups',(req,res) => {
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.name_of_group}')`)
  res.redirect('groups')
})

app.get('/groups/editGroups/:id',(req,res) => {
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`,(err,rows) => {
    if(!err){
      res.render('editGroups',{data:rows})
      // res.send('masuk ga edit grupiso')
    }
  })
})

app.post('/groups/editGroups/:id',(req,res) => {
  db.run(`UPDATE Groups SET name_of_group = '${req.body.Name}' WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',(req,res) =>{
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
  res.redirect('/groups')
})

//**************************************************addresses********************************************

// app.get('/addresses',(req,res) => {
//   db.all(`SELECT * FROM Addresses`, (err,rows) => {
//     if(!err){
//       db.all(`SELECT id, name FROM Contacts`,(err2,rows2) => {
//         res.render('addresses',{data1:rows,data2:rows2})
//       })
//     }
//   })
// })

// app.post('/addresses',(req,res) => {
//   db.run(`INSERT INTO Addresses(street,city,zipcode,contact_id) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}',${req.body.contact_id})`)
//   res.redirect('/addresses')
// })

// app.get('/addresses/editAddresses/:id',(req,res) => {
//   db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`,(err,rows) => {
//     db.all(`SELECT id,name FROM Contacts`,(err2,rows2) => {
//       res.render('editAddresses',{data:rows,data2:rows2})
//     })
//   })
// })

// app.post('/addresses/editAddresses/:id',(req,res) => {
//   db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}' , zipcode = '${req.body.zipcode}', contact_id = ${req.body.contact_id} WHERE id = ${req.params.id}`)
//     res.redirect('/addresses')
// })
//
// app.get('/addresses/deleteAddresses/:id',(req,res) => {
//   db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`)
//   res.redirect('/addresses')
// })

//**************************************************Profiles********************************************

app.get('/profiles',(req,res) => {
  db.all(`SELECT * FROM Profiles`,(err,rows) => {
    res.render('profiles',{data:rows})
  })
})

app.post('/profiles',(req,res) => {
  db.run(`INSERT INTO Profiles (username,password,contact_id) VALUES ('${req.body.username}','${req.body.password}',${req.body.contact_id})`)
    res.redirect('/profiles')
})

app.get('/profiles/editProfiles/:id',(req,res) => {
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`,(err,rows) => {
    res.render('editProfiles',{data:rows})
  // res.send('masuk ga')
  })
})

app.post('/profiles/editProfiles/:id',(req,res) => {
  db.run(`UPDATE Profiles SET username = '${req.body.username}', password = '${req.body.password}', contact_id = ${req.body.contact_id} WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

app.get('/profiles/deleteProfiles/:id',(req,res) => {
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

//----------------------------------------ContactsGroups--------------------------------------------------------

app.get('/contactsGroups',(req,res) => {
  db.all(`SELECT * FROM ContactsGroups`,(err,rows) => {
    res.render('contactsGroups',{data:rows})
  })
})

app.post('/contactsGroups',(req,res) => {
  db.run(`INSERT INTO ContactsGroups (id_contacts,id_groups) VALUES (${req.body.contact_id},${req.body.group_id})`,(err,rows) => {
    res.redirect('contactsGroups')
  })
})

app.get('/contactsGroups/editcontactsGroups/:id',(req,res) =>{
  db.all(`SELECT * FROM ContactsGroups WHERE id = '${req.params.id}' `,(err,rows) => {
    res.render('editcontactsGroups',{data:rows})
  })
})

app.post('/contactsGroups/editcontactsGroups/:id',(req,res) => {
  db.run(`UPDATE ContactsGroups SET id_contacts = ${req.body.contact_id}, id_groups = ${req.body.group_id} WHERE id = ${req.params.id}`)
  res.redirect('/contactsGroups')
})

app.get('/contactsGroups/detailContactsGroups',(req,res) => {
  // db.all(`SELECT name, company, telp_number, email FROM Contacts JOIN ContactsGroups ON ContactsGroups.id_contacts = Contacts.id JOIN Groups ON Groups.id = ContactsGroups.id_groups`,(err,rows) => {
  db.all(`SELECT id,id_contacts,id_groups FROM ContactsGroups JOIN Contacts ON ContactsGroups.id_contacts = Contacts.id JOIN Groups ON ContactsGroups.id_groups = Groups.id`,(err,rows) => {
    res.render('detailContactsGroups',{data:rows})
  })
})

app.listen(3000,function(){
  console.log("im listen 3000");
})
