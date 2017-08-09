const sqlite3 = require('sqlite3');
class DbModel {
  constructor(file){
    this.database = new sqlite3.Database(file)
  }
}

module.exports = DbModel;
