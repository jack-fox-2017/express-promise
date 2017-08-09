const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/data.db')

class DB_Model{
  constructor(datafile){
    this.newdatabase = new sqlite3.Database(datafile)
  }
}
  //
  // createTable(){
  //   db.serialize(function(){
  //     db.run(`CREATE TABLE IF NOT EXISTS contacts
  //       (id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         name VARCHAR(50), company VARCHAR(50),
  //         telp_number VARCHAR(50), email VARCHAR(50))`)
  //
  //     db.run(`CREATE TABLE IF NOT EXISTS addresses
  //     (id INTEGER PRIMARY KEY, street VARCHAR(50), city VARCHAR(50), zip_code INTEGER, contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id))`)
  //
  // }
// }
// }



module.exports = DB_Model
