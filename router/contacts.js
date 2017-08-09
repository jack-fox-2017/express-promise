//express & router
const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
//db
const Model = require("../model/database-create")
let model = new Model()
let db = model.connection
//file model
let Contact = require("../model/contacts-model")
let contacts = new Contact();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get("/", (req, res)=>{
  contacts.findAll(db)
  .then((rows)=>{
    res.render("contacts", {data_contacts : rows})
  })
})
router.get("/add", function(req, res) {
  res.render("contacts-form")
})

router.post("/add", function(req, res) {
  contacts.create(db, req.body)
  .then((rows) => {
    res.redirect("/home/contacts")
  })
})
router.get("/edit/:id",function(req, res) { //routing - logic - render // populate == value
  contacts.findById(db, req.params.id)
  .then(db_Contact =>{
    res.render("contacts-edit", {data_contacts : db_Contact})
  })
})
router.post("/edit/:id",function(req, res) {
  contacts.update(db, req.body, req.params.id)
  .then(()=>{
    res.redirect("/home/contacts")
  })
})

router.get("/delete/:id", function(req, res) {
  contacts.destroy(db, req.params.id)
  .then(()=>{
    res.redirect("/home/contacts")
  })
})

module.exports = router
