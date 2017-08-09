const express = require(`express`);
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
const userModel = require(`../models/user`)

const db = new DbModel(`./db/data.db`)
const user = new userModel(db.connection)

// users page
router.get(`/`,function(req,res){
  user.getUsers(id=null,(errUsers,rows) => {
    res.render(`users`,{data:rows})
  })
})

router.post(`/`,function(req,res){
  //res.send(req.body)
  var add = {
    username: `${req.body.username}`,
    firstname: `${req.body.first_name}`,
    lastname: `${req.body.last_name}`,
    email: `${req.body.email}`
  }

  user.addUsers(add, (errUsers,statement) =>{
    res.redirect(`/users`)
  })

})

router.get(`/delete`, function(req,res){
  var id = req.query.id
  user.deleteUsers(id, (errUsers,statement) => {
    res.redirect(`/users`)
  })
})

router.get(`/edit`, function(req,res){
  var id = req.query.id
  user.editUsers(id,(errUsers,rows) => {
    res.render('users-edit',{data: rows})
  })
})

router.post(`/edit`, function(req,res){
  var obj = {
    username:`${req.body.username}`,
    firstname:`${req.body.first_name}`,
    lastname:`${req.body.last_name}`,
    email:`${req.body.email}`
  }
  var id = req.query.id

  user.updateUsers(obj,id,(errUsers,statement) => {
    res.redirect(`/users`)
  })

})



module.exports = router
