class Groups {
  constructor() {}

  static findAll(connection){
    return new Promise((resolve, reject)=>{
      connection.all(`SELECT * FROM Groups`, (err, rows)=>{
        if(!err){
          resolve(rows)
        } else{
          reject(err)
        }
      })
    })
  }

  static createData(connection, req){
    connection.run(`INSERT INTO Groups(name_group) VALUES ('${req.name_group}')`) //contact_id ,'${req.body.contact_id}'
  }

  static findById(connection, id){
    return new Promise((resolve, reject)=>{
      connection.all(`SELECT * FROM Groups WHERE id = '${id}'`, (err, row)=>{
        if(!err){
          resolve(row)
        } else{
          reject(err)
        }
      })
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Groups SET
      name_group = '${req.name_group}'
      WHERE id = '${id}'`)
  }

  static remove(connection, id){
    connection.run(`DELETE FROM Groups WHERE id = '${id}'`)
  }


} // class token close

module.exports = Groups
