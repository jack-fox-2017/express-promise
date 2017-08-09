const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/data.db')
// const db_model_model = require('./model/db_model.js');
// const contacts_model = require('./model/contacts.js');
// const address_model = require('./model/address.js');

const index_router = require('./router/index');
const contacts_router = require('./router/contacts');
const address_router = require('./router/address');


app.use(bodyParser.urlencoded({
  extended:true
}));
app.set('view engine', 'ejs');

app.use('/', index_router);
app.use('/contacts', contacts_router);
app.use('/address', address_router);

// app.use('')
// app.use('')



//---------------------------INDEX-------------------------------
// app.get('/', function(req,res){
// res.render('index')
// })
//
// //---------------------------CONTACT-----------------------------
//
// app.get('/contacts', function(req, res){
//   db.all(`SELECT * FROM contacts`, function(err, rows){
//     if(err){
//       res.send('Ada yang salah Fren....')
//     }
//     else{
//       res.render('contacts',{data:rows})
//     }
//   })
// })
//
// app.post('/contacts', function(req,res){
//   db.run(`INSERT INTO contacts(name,company,telp_number,email)
//           VALUES('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')
//         `)
//   res.redirect('/contacts')
// })
//
// app.get('/contacts/edit/:id', function(req,res){
//   db.each(`SELECT * FROM contacts WHERE id = ${req.params.id}`, function(err,rows){
//     if(!err){
//       res.render('editcontacts',{data: rows})
//     }
//   })
// })
//
// app.post('/contacts/edit/:id', function(req,res){
//   db.run(`UPDATE contacts SET name ='${req.body.name}',
//                               company='${req.body.company}',
//                               telp_number='${req.body.telp_number}',
//                               email='${req.body.email}'
//                               WHERE id=${req.params.id}`)
//   res.redirect('/contacts')
// })
//
// app.get('/contacts/delete/:id', function(req, res){
//   db.run(`DELETE FROM contacts WHERE id=${req.params.id}`)
//   res.redirect('/contacts')
// })
//
// //----------------------------------ADDRESS----------------------------------------------
//
// app.get('/address', function(req,res){
//   db.all(`SELECT * FROM addresses`, function(err,rows){
//     db.all(`SELECT * FROM contacts`, function(err2,rowsContacts){
//       if(!err2){
//         res.render('address',{data: rows, dataContacts:rowsContacts})
//       }
//     })
//   })
// })
//
// app.post('/address', function(req,res){
//   db.run(`INSERT INTO addresses(street,city,zip_code,contact_id)
//           VALUES('${req.body.street}',
//                  '${req.body.city}',
//                  '${req.body.zip_code}',
//                  '${req.body.contact_id}'
//                   )`)
//   res.redirect('/address')
// })
//
// app.get('/address/edit/:id', function(req,res){
//   db.each(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err,rows){
//     db.all(`SELECT * FROM contacts`, function(err2,rowsContacts){
//       if(!err){
//         res.render('editaddress',{data: rows, dataContacts:rowsContacts})
//       }
//     })
//   })
// })
//
// app.post('/address/edit/:id', function(req,res){
//   db.run(`UPDATE addresses SET street='${req.body.street}',
//                               city='${req.body.city}',
//                               zip_code='${req.body.zip_code}'
//
//   WHERE id=${req.params.id}`)
//   // contact_id=${req.body.contact_id}
//   res.redirect('/address')
// })
//
//
// app.get('/address/delete/:id', function(req,res){
//   db.run(`DELETE FROM addresses WHERE id=${req.params.id}`)
//   res.redirect('/address')
// })
//

//------------------------------------------------------------------------


app.listen(3000, function(){
  console.log("Port 3000 on my way");
});
