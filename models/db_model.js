const sqlite3 = require('sqlite3').verbose()

class DBModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file)
  }
}

module.exports = DBModel
