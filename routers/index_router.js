const express = require('express')
const router = express.Router()

const Contacts = require('../models/index')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db/data.db')


router.get('/',(req,res)=>{
  res.render('index')
})

module.exports = router
