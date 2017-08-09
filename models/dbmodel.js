const sqlite3 = require('sqlite3').verbose();

class dbModel{
  constructor(filename){
    this.connection = new sqlite3.Database(filename)
  }

  createUsers(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Users
    (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(100),
    firstname VARCHAR(100), lastname VARCHAR(100), email VARCHAR(100))`);
  }
  createProfiles(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles
    (id INTEGER PRIMARY KEY AUTOINCREMENT, hometown VARCHAR(225),
     birth_year VARCHAR(225), relationship_status VARCHAR(225),
     user_id INTEGER, FOREIGN KEY(user_id) REFERENCES Users(id))`);
  }
  createAddresses(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Addresses
    (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(225),
     city VARCHAR(225), zipcode VARCHAR(225),
     user_id INTEGER , FOREIGN KEY(user_id) REFERENCES Users(id))`);
  }
  createGroups(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(225))`);
  }
  createUserGroups(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS UsersGroups
    (id INTEGER PRIMARY KEY AUTOINCREMENT, Users_Id INTEGER ,Groups_Id INTEGER, FOREIGN KEY(Users_Id) REFERENCES Users(id),
    FOREIGN KEY(Groups_Id) REFERENCES Groups(id))`);
  }

}

// let db = new dbModel('./db/data.db')

module.exports = dbModel;
