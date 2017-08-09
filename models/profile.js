class Profile {
  constructor(connection){
    this.connection = connection;
    this.table ='profiles'
  }

  getProfile(cb){
    var query = `SELECT * FROM ${this.table}`
    this.connection.all(query, (err,rows)=>{
      cb(err,rows)
    })
  }

  addProfile(obj,cb){
    var query = `INSERT INTO
    ${this.table}(hometown,relationship_status,user_id)
    VALUES('${obj.hometown}','${obj.relationship_status}','${obj.id_users}')`

    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  deleteProfile(id,cb){
    var query = ` DELETE FROM ${this.table} WHERE id='${id}'`
    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  editProfile(id,cb){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`
    this.connection.get(query, (err,rows) => {
      cb(err,rows)
    })
  }

  updateProfile(obj,id,cb){
    var query = `UPDATE profiles SET hometown='${obj.hometown}',relationship_status='${obj.relationship_status}' WHERE id='${id}'`
    this.connection.run(query, function(err){
      cb(err,this)
    })
  }
}


module.exports = Profile
