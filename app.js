const express = require('express')
const app = express()
app.set('view engine', 'ejs')

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

const index = require('./routers/index_router')
const contacts = require('./routers/contact_router')
const addresses = require('./routers/address_router')

app.use('/', index);
app.use('/contacts', contacts);
app.use('/addresses', addresses);

app.listen(3003)
