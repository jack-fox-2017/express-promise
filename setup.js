var sqlite3 = require('sqlite3').verbose()
var db =  new sqlite3.Database('./db/data.db')


db.serialize(function() {
  var query_create_user = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(50), firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50))`
  var query_create_profile = `CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, hometown VARCHAR(100), relationship_status VARCHAR(100), user_id INTEGER UNIQUE, FOREIGN KEY(user_id) REFERENCES users(id))`
  var query_create_contact =`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), company VARCHAR(50), telp_number VARCHAR(20), email VARCHAR(30))`
  var query_crate_addresses = `CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contacts INTEGER, street VARCHAR(255),city VARCHAR(255),zipcode int, FOREIGN KEY (id_contacts) REFERENCES contacts(id))`


  db.run(query_create_user)
  db.run(query_create_profile)
  db.run(query_create_contact)
  db.run(query_crate_addresses)

  // db.run(`INSERT INTO users VALUES(1,'alfand','alfan','diki','cumiasem91@gmail.com')`)
  //db.run(`INSERT INTO profiles VALUES(1,'karawang','single',1)`)
})
