const sqlite3 = require('sqlite3').verbose()
const file = './db/data.db'

class Database {
  constructor() {
    this.connection = new sqlite3.Database(file)
  }

  createTables() {
    this.connection.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, company VARCHAR, phone VARCHAR, email VARCHAR);')

    this.connection.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city VARCHAR, zip_code VARCHAR, ContactId INTEGER, FOREIGN KEY (ContactId) REFERENCES Contacts(id));')
  }
}

module.exports = Database
