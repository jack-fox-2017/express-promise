// add express
const express = require(`express`);
const app = express()

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// add database library
const sqlite3 = require(`sqlite3`).verbose();
const db = new sqlite3.Database(`./db/data.db`)
//view engine
app.set(`view engine`,`ejs`)

//add router
var indexRoute = require(`./router/index`)
var usersRoute = require(`./router/users`)
var profilesRoute = require(`./router/profiles`)
var addressesRoute = require(`./router/addresses`)
var contactsRoute = require(`./router/contact`)

app.use(`/`, indexRoute)
app.use(`/users`, usersRoute)
app.use(`/profiles`, profilesRoute)
app.use(`/addresses`, addressesRoute)
app.use(`/contacts`, contactsRoute)

app.listen(3004, function(){
  console.log(`Launch in port 3004`);
})
