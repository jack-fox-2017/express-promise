const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const sqlite3 = require('sqlite3')
// const db = new sqlite3.Database('./db/data.db')

var dbModel = require('./models/dbModel')
var conn = new dbModel()
conn.createTables()


app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


var indexRouter = require('./routers/index')
var contactsRouter = require('./routers/contact')
var addressesRouter = require('./routers/address')



app.use('/', indexRouter)
app.use('/contacts', contactsRouter)
app.use('/addresses', addressesRouter)



app.listen(3000)
