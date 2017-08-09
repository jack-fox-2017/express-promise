const express = require('express');
const app = express()
const bodyParser = require('body-parser');
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// const dbModel = require('./models/index');
// const Contact = require('./models/contact');
// const Group = require('./models/group');
// const Profile = require('./models/profile');
// const Address = require('./models/address');


const index = require('./routers/index');
const contact = require('./routers/contact');
const group = require('./routers/group');
const profile = require('./routers/profile');
const address = require('./routers/address');


app.use('/', index)
app.use('/contacts', contact)
app.use('/groups', group)
app.use('/profiles', profile)
app.use('/addresses', address)


let port = 3000
app.listen(port, () => {
  console.log(`Lagi dengerin kamu di jendela ${port}`);
})
