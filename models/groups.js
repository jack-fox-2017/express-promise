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

class Groups{
  constructor(data){
    this.id = data.id;
    this.nama = data.nama;
  }

  static showGroups(conn, callback){
    conn.all(`SELECT * FROM Groups`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static addGroups(conn, data){
    conn.run(`INSERT INTO Groups
    (name)
    VALUES ('${data.name}')`)
  }

  static editGroupsForm(conn, data, callback){
    conn.all(`SELECT *FROM Groups WHERE id = ${data.id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static editGroupsData(conn, data, params){
    conn.run(`UPDATE Groups SET name = '${data.name}'
    WHERE id = ${params}`)
  }

  static deleteGroups(conn, params){
    conn.run(`DELETE FROM Groups WHERE id = ${params.id}`)
  }
}


module.exports = Groups
