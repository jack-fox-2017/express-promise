const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

var path_name = path.join(__dirname, 'public'); // untuk memanggil isi file dari public yg non ejs, ejs tidak boleh di dalam folder public, karna public hanya untuk file yang bersifat static
var express_static = express.static(path_name);

app.set('view engine', 'ejs')

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
}));

//-------untuk require export DB-----//
var setupDB = require('./models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//====== RUN DB FROM dbmodel.js =======//
app.get('/dbUsers', function(req, res){
  dbCreate.createUsers()
  res.send('user db created')
})

app.get('/dbProfiles', function(req, res){
  dbCreate.createProfiles()
  res.send('profile db created')
})

app.get('/dbAddresses', function(req, res){
  dbCreate.createAddresses()
  res.send('addresses db created')
})

app.get('/dbGroups', function(req, res){
  dbCreate.createGroups()
  res.send('groups db created')
})

app.get('/dbUsersGroups', function(req, res){
  dbCreate.createUserGroups()
  res.send('Conjunction UsersGroups db created')
})

//======== MAIN ROUTING ========//
const homes = require('./routers/home')
app.use('/home', homes)

const users = require('./routers/users')
app.use('/users', users)

const addresses = require('./routers/addresses')
app.use('/addresses', addresses)

const groups = require('./routers/groups')
app.use('/groups', groups)

app.listen(3000)
