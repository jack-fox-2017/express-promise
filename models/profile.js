class Profile{
  constructor(){

  }

  static findAll(connection){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM Profile`, (err, rows) =>{
        if(!err){
          resolve(rows)
        } else{
          reject(err)
        }
      })
    })
  }

  static createData(connection, req){
    connection.run(`INSERT INTO Profile(nickname, account, contact_id)
    VALUES ('${req.nickname}',
    '${req.account}',
    '${req.contact_id}')`)
  }

  static findById(connection, id){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM Profile WHERE id = '${id}'`, (err, row) =>{
        if(!err){
          resolve(row)
        } else{
          reject(err)
        }
      })
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Profile SET
      nickname = '${req.nickname}',
      account = '${req.account}',
      contact_id = '${req.contact_id}' WHERE id = '${id}'`)
  }

  static remove(connection, id){
    connection.run(`DELETE FROM Profile WHERE id = '${id}'`)
  }

}

module.exports = Profile
