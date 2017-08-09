const express = require('express');
const app = express()
const router = express.Router();

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//view engine
app.set(`view engine`,`ejs`)

//orm
const DbModel = require('../models/dbModel')
const profileModel = require('../models/profile')
const userModel = require('../models/user')

const db = new DbModel(`./db/data.db`)
const profile = new profileModel(db.connection)
const user = new userModel(db.connection)


function manipulateUsers(rowProfile,cb){
  let num = 0
  rowProfile.forEach(row => {
    user.editUsers(row.user_id, (err,dataUsers)=>{
      row[`username`] =  dataUsers.username;
      row[`firstname`] = dataUsers.firstname;
      row[`lastname`] = dataUsers.lastname;
      row[`email`] = dataUsers.email;
      num++;
      if (num == rowProfile.length) {
        cb(rowProfile)
      }
    })
  })
}

function manipulateUsersOne(rowProfile,cb){
  user.editUsers(rowProfile.user_id, (err,dataUsers)=>{
    rowProfile[`username`] =  dataUsers.username;
    rowProfile[`firstname`] = dataUsers.firstname;
    rowProfile[`lastname`] = dataUsers.lastname;
    rowProfile[`email`] = dataUsers.email;
    cb(rowProfile)
  })
}


// profile
router.get(`/`,function(req,res){
  user.getUsers((err,rowUsers)=>{
    profile.getProfile((err,rowProfile)=>{
      manipulateUsers(rowProfile,(data)=>{
        res.render('profiles', {profiles:data, users:rowUsers, error:req.query.error})
      })
    })
  })
})

router.post(`/`,function(req,res){
  //res.send(req.body)
  var add = {
    hometown:`${req.body.hometown}`,
    relationship_status: `${req.body.relationship_status}`,
    id_users:`${req.body.id_users}`
  }
  profile.addProfile(add,(err,statement)=>{
    if(!err){
        res.redirect(`/profiles`)
      } else {
        res.redirect(`/profiles?error=`+err)
      }
  })
})

router.get(`/edit`, function(req,res){

  user.getUsers((err,rowUsers)=>{
    profile.editProfile(req.query.id,(err,rowProfile)=>{
      manipulateUsersOne(rowProfile,(dataUsers)=>{
        res.render('profiles-edit',{data: dataUsers})
      })
    })
  })
})

router.post(`/edit`, function(req,res){
  var obj = {
    hometown:`${req.body.hometown}`,
    relationship_status:`${req.body.relationship_status}`
  }
  var id = req.query.id

  profile.updateProfile(obj,id,(err,statement)=>{
    if (!err) {
      res.redirect(`/profiles?`)
    } else {
      res.redirect(`/profiles?error=`+err)
    }
  })
})

router.get(`/delete`, function(req,res){
  profile.deleteProfile(req.query.id,(err,statement)=>{
    if (!err) {
      res.redirect(`/profiles?`)
    } else {
      res.redirect(`/profiles?error=`+err)
    }
  })

})


module.exports = router
