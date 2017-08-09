'use strict'

const sqlite3 = require('sqlite3').verbose();

class DB {
  constructor() {
    this.connection = new sqlite3.Database('./db/data.db');
  }

  // createTable() {
  //   this.connection.run(`CREATE TABLE IF NOT EXISTS Tes (id INT,name TEXT)`)
  // }
}

module.exports = DB;
