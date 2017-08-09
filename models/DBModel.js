const sql = require('sqlite3');

class DBModel{
  constructor(pathDB){
    this.connection = new sql.Database(pathDB);
  }
  createTableContacts(){
    let qry_createContacts = `CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50), company VARCHAR(50), phone VARCHAR(16), email VARCHAR(25))`;
    this.connection.run(qry_createContacts);
  }
  createTableAddresses(){
    let qry_createAddresses = `CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT,
      street VARCHAR(100), city VARCHAR(50), zip_code VARCHAR(10), contacts_id INT, FOREIGN KEY(contacts_id) REFERENCES Contacts(id))`;
    this.connection.run(qry_createAddresses);
  }
}

module.exports = DBModel;
