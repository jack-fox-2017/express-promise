const sqlite3 = require('sqlite3').verbose()

class Model {
  constructor() {
    this.connection = new sqlite3.Database('./db/database.db')
  }
  contacts(){
    let a = this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER primary key AUTOINCREMENT, name text, company text, telp_number INTEGER, email text);`)
    return a
  }
  adresses(){
   this.connection.run(`CREATE TABLE IF NOT EXISTS Adresses(id INTEGER primary key AUTOINCREMENT, jalan text, kota string, provinsi string, contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contacts(id))`)

  }
}
// let model = new Model()
// model.contacts()
// model.adresses()

module.exports = Model
