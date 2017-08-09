
class Contact{
  constructor(){}

  static findAll(connection){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM Contact`, (err, rows) =>{
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
    connection.run(`INSERT INTO Contact(name, company, telp_number, email)
    VALUES ('${req.name}',
    '${req.company}',
    '${req.telp_number}',
    '${req.email}')`)
  }

  static findById(connection, id){
    return new Promise((resolve, reject) =>{
      connection.all(`SELECT * FROM Contact WHERE id = '${id}';`, (err, row) =>{
        if(!err){
          resolve(row)
        } else{
          reject(err)
        }
      })
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Contact SET
      name ='${req.name}',
      company = '${req.company}',
      telp_number ='${req.telp_number}',
      email ='${req.email}' WHERE id = '${id}'`) //, groups_id ='${req.body.groups_id}'
  }

  static remove(connection, id){
    connection.run(`DELETE FROM Contact WHERE id = '${id}'`)
    connection.run(`DELETE FROM Address WHERE contact_id = '${id}'`)
    connection.run(`DELETE FROM ContactGroup WHERE contact_id = '${id}'`)
  }


}

module.exports = Contact;
