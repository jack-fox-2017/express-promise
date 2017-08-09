'use strict'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')


function tabelContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50),company VARCHAR(50),telp_number VARCHAR(50),email VARCHAR(50) )`)
  console.log("table Contacts berhasil di buat");
}

function tabelGroups() {
  db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT,name_of_group VARCHAR(50))`);
  console.log("table Groups berhasi di buat");
}

function tabelAddreses() {
  db.run(`CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT,street VARCHAR(50),city VARCHAR(50),zipcode VARCHAR(50))`);
  console.log("tabel address berhasil di buat");
}

function tabelProfiles() {
  db.run(`CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(50),password VARCHAR(50))`);
  console.log("tavel profiles done");
}

function insertProfiles() {
  db.run(`INSERT INTO Profiles (username,password) VALUES ('aridwia@gmail','aridwia')`)
}

function insertAddress() {
  db.run(`INSERT INTO Addresses (street,city,zipcode) VALUES ('Sadang Asri','Bandung',4056)`)
}

function insertGroups() {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('Hacktiv8')`);
}

function addcolumnAddress() {
  db.run(`ALTER TABLE Addresses ADD COLUMN contact_id INTEGER`);
  console.log("add column done");
}

function addColumnProfiles() {
  db.run(`ALTER TABLE Profiles ADD COLUMN contact_id INTEGER`);
  console.log('add column profile done');
}

function tablecontactGroup() {
  db.run(`CREATE TABLE IF NOT EXISTS ContactsGroups(id INTEGER PRIMARY KEY AUTOINCREMENT,id_contacts INTEGER, id_groups INTEGER) `)
  console.log('tabel contactgrup done ');
}

tabelContacts()
tabelGroups()
tabelAddreses()
tabelProfiles()
tablecontactGroup()

// insertContacts()
// insertGroups()
// insertAddress()
// insertProfiles()

// addcolumnAddress()
// addColumnProfiles()
