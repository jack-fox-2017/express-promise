class contactGroups{
  constructor(){}

  static findAll(connection){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM ContactGroup`, (err, rows) =>{
        if(!err){
          resolve(rows)
        } else{
          reject(err)
        }
      })
    })
  }
  //input data
  static createData(connection, req){
    connection.run(`INSERT INTO ContactGroup(contact_id, groups_id)
    VALUES ('${req.contact_id}',
    '${req.groups_id}')`) //groups_id ,'${req.body.groups_id}'
  }

  static findById(connection, id){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM ContactGroup WHERE id = '${id}';`, (err, row) =>{
        if(!err){
          resolve(row)
        } else{
          reject(err)
        }
      })
    })
  }

  static remove(connection, id){
    connection.run(`DELETE FROM ContactGroup WHERE id = '${id}'`)
  }

  static findByGrupId(connection, id){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM ContactGroup WHERE groups_id = ${id}`, (err, rows)=>{
        if(!err){
          resolve(rows)
        } else{
          reject(err)
        }
      })
    })
  }

}

module.exports = contactGroups
