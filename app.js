var express = require ('express');
var path = require ('path');
var app = express()
var bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.use(express.static(path.join(__dirname, 'public')))

var routecontacts = require('./routers/contacts')
var routeaddress = require('./routers/address')

app.use('/contacts', routecontacts);
app.use('/address', routeaddress);
app.listen(3000)
