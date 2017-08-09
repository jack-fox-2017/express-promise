const express = require("express")
const app = express()
app.set("view engine", "ejs")


const Home = require("./router/home")
const Contact = require("./router/contacts")
const Adresses = require("./router/adresses")


app.use("/", Home)
app.use("/home/contacts", Contact)
app.use("/home/adresses", Adresses)


app.listen(3001, ()=>{
  console.log("program running on port 3001");
})
