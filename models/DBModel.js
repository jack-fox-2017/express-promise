const sqlite3 = require('sqlite3').verbose()

class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }

}

// console.log(DbModel.connection);

module.exports = DbModel
