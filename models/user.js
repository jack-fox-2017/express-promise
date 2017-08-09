class User {
  constructor(connection) {
    this.connection = connection
    this.table = `users`
  }

  getUsers(cb){
    var query = `SELECT * FROM ${this.table}`
    this.connection.all(query, (err,rows) => {
      console.log(rows);
      cb(err,rows)
    })
  }

  addUsers(obj, cb){
    //console.log(obj);
     var query = `INSERT INTO ${this.table}(username,firstname,lastname,email) VALUES('${obj.username}','${obj.firstname}','${obj.lastname}','${obj.email}')`
     //console.log(query);
    this.connection.run(query, function(err) {
      cb(err, this)
    })
  }

  deleteUsers(id, cb){
    // delete query where id
    var query = `DELETE FROM ${this.table} WHERE id='${id}'`
    //run query
    this.connection.run(query, function(err){
      cb(err,this)
    })
  }

  editUsers(id,cb){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`
    this.connection.get(query, (err,rows) => {
      cb(err,rows)
    })
  }

  updateUsers(obj,id,cb){
    var query = `UPDATE ${this.table} SET username='${obj.username}',firstname='${obj.firstname}',lastname='${obj.lastname}',email='${obj.email}' WHERE id='${id}'`

    this.connection.run(query, function(err){
      cb(err,this)
    })
  }

  //contoh rahmat

  // insertContact(objData, callback) {
  //   let column_names = Object.keys(objData).join(',')
  //   let values = Object.keys(objData).map(key => {return objData[key]}).join(',')
  //   console.log(column_names, values);
  //   let INSERT_CONTACT = `insert into ${this.table} (${column_names}) values (${values})`
  //
  //  this.conn.run(INSERT_CONTACT, function(err) {
  //     callback(err, this)
  //   })
  // }

}


module.exports = User
