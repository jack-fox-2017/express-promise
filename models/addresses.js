const express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

class Addresses{
  constructor(data){
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.user_id = data.user_id;
  }

  static showAddresses(conn){
    return new Promise((resolve, reject)=>{
      conn.all(`SELECT * FROM Addresses`, function(err, rows){
        if(!err)
        {
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static addAddresses(conn, data){
    return new Promise((resolve, reject)=>{
      conn.run(`INSERT INTO Addresses
      (street, city, zipcode, user_id)
      VALUES ('${data.street}', '${data.city}',
      '${data.zipcode}', '${data.user_id}')`, function(err){
        if(!err){
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static editAddressesForm(conn, data){
    return new Promise((resolve, reject)=>{
      conn.all(`SELECT *FROM Addresses WHERE id = ${data.id}`, function(err, rows){
        if(!err){
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static editAddressesData(conn, data, params){
    return new Promise((resolve, reject)=>{
      conn.run(`UPDATE Addresses SET street = '${data.street}',
      city = '${data.city}', zipcode = '${data.zipcode}',
      user_id = '${data.user_id}' WHERE id = ${params}`, (err)=>{
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

  static deleteAddresses(conn, params){
    return new Promise((resolve, reject)=>{
      conn.run(`DELETE FROM Addresses WHERE id = ${params.id}`, (err)=>{
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


module.exports = Addresses
