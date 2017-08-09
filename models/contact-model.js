class Contacts{
  constructor(){
  }

  // findAll(conn, callback){
  //   conn.all(`SELECT * FROM Contacts`, (err,rows)=>{
  //     if(!err){
  //       callback(false,rows)
  //     }else {
  //       callback(true,null)
  //     }
  //   })
  // }

  findAll(conn){
      return new Promise((resolve,reject)=>{
        conn.all(`SELECT * FROM Contacts`, (err,rows)=>{
            if(!err){
              resolve(rows)
            }else {
              reject(err)
            }
      })
    })
  }

  findById(conn, reqparam, callback){
    return new Promise((resolve,reject)=>{
      conn.all(`SELECT * FROM Contacts WHERE id = ${reqparam}`, (err,rows)=>{
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  update(conn,req,reqparams){
    return new Promise((resolve,reject)=>{
      conn.run(`UPDATE Contacts set name ='${req.name}',company = '${req.company}',
      telp_number = '${req.telp_number}', email = '${req.email}' WHERE id =${reqparams}`,(err,rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }


  createData(conn,req){
    return new Promise ((resolve,reject)=>{
      conn.run(`INSERT INTO Contacts(name,company,telp_number,email)
      VALUES('${req.name}','${req.company}','${req.telp_number}','${req.email}')`, (err,rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  destroy(conn,req){
    conn.run(`DELETE FROM Contacts WHERE id = ${req}`)
    conn.run(`DELETE FROM Addresses WHERE contact_id=${req}`)
  }

}

module.exports = Contacts
