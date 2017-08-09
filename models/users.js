const express = require('express');
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');
//
// app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

// const Groups = require('../models/group');

class Users{
  constructor(data){
    this.id = data.id;
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }

  static showUsers(conn, callback){
    return new Promise((resolve, reject)=>{
      conn.all(`SELECT * FROM Users`, function(err, rows){
        if(!err){
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static addUsers(conn, data){
    return new Promise((resolve, reject)=>{
      conn.run(`INSERT INTO Users (username, firstname, lastname, email)
      VALUES ('${data.username}', '${data.firstname}', '${data.lastname}',
      '${data.email}')`, (err)=>{
        if(!err)
        {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static editUsersForm(conn, data){
    return new Promise((resolve, reject)=>{
      conn.all(`SELECT * FROM Users WHERE id = ${data.id}`, function(err, rows){
        // console.log("====>",rows);
        if(!err){
          resolve(rows)
        }
        else {
          callback(true, null)
        }
      })
    })
  }

  static editUsersData(conn, data, id){
    // console.log("===>>", id);
    return new Promise((resolve, reject)=>{
      conn.run(`UPDATE Users SET username = '${data.username}',
      firstname = '${data.firstname}',
      lastname = '${data.lastname}',
      email = '${data.email}' WHERE id = ${id}`, (err)=>{
        if(!err)
        {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static deleteUsers(conn, params){
    return new Promise((resolve, reject)=>{
      conn.run(`DELETE FROM Users WHERE id = ${params.id}`, (err)=>{
        if(!err)
        {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }
}

module.exports = Users
