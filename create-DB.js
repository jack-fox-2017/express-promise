var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

function create_table(){
  db.run(`CREATE TABLE IF NOT EXISTS Contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
      company TEXT, telp_number TEXT, email TEXT);`)

      db.run(`CREATE TABLE IF NOT EXISTS Addresses
        (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zip_code TEXT,
          contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contacts(id));`)
}

function insert_data(){
  db.run(`INSERT INTO Contacts(name,company,telp_number,email)
  VALUES ("MSrabbani", "Kaleng", "0856945940"," msrabbani@gmail.com");`)

  db.run(`INSERT INTO Addresses(street, city, zip_code)
  VALUES ("siliwangi addresses", "sukabumi", "43112");`)
}

// create_table()
// insert_data()
