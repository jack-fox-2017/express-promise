var sqlite3 = require('sqlite3').verbose();
const filename = './db/data.db'

class DBModel {
  constructor() {
    this.connection = new sqlite3.Database(filename)
  }

  setup() {
    let db = this.connection;
    function createTableContacts() {
      db.run(`CREATE TABLE IF NOT EXISTS contacts
            (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);`);

      console.log("Table contacts created");

      db.run(`CREATE TABLE IF NOT EXISTS address
              (id INTEGER PRIMARY KEY AUTOINCREMENT, postal_code INTEGER, street TEXT, city TEXT,  contacts_id INTEGER, FOREIGN KEY(contacts_id) REFERENCES contacts(id));`);

      console.log("Table address berhasil di buat");
      }
  }
}

module.exports = DBModel;
