const sqlite3 = require('sqlite3').verbose();

class DbModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file)
  }

  createTableUser(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(50), firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50))`)
  }

  createTableProfile(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, hometown VARCHAR(100), relationship_status VARCHAR(100), user_id INTEGER UNIQUE, FOREIGN KEY(user_id) REFERENCES users(id))`)
  }

  createTableContact(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), company VARCHAR(50), telp_number VARCHAR(20), email VARCHAR(30))`)
  }

  createTableAddresses(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contacts INTEGER, street VARCHAR(255),city VARCHAR(255),zipcode int, FOREIGN KEY (id_contacts) REFERENCES contacts(id))`)
  }

}


module.exports = DbModel
