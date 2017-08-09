const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

var dbModel = require('./models/db_model')
var db = new dbModel()
db.getConnection()

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));


var index = require('./routers/index')
var contact = require('./routers/contact')
var address = require('./routers/address')
var profile = require('./routers/profile')
var groups = require('./routers/groups')

app.use('/', index)
app.use('/', contact)
app.use('/', address)
app.use('/', profile)
app.use('/', groups)


app.listen(3000, function(){
	console.log('Iam listen on port 3000')
})
