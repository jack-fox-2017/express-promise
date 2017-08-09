
class Contacts{

  // static findAll(connection, callback){
  //   connection.all(`SELECT * FROM contacts`, function(err, rows){
  //     if(!err){
  //       callback('blabla',rows)
  //     }
  //     else{
  //       callback(err,null)
  //     }
  //   })
  // }
   static findAll(connection){
     return new Promise((resolve, roject)=>{
      //  let query = `select * from contacts`;
       connection.all(`select * from contacts`, (err,rowsAll)=>{
         if(!err){
                resolve(rowsAll)
              }
              else{
                reject(err)
              }
       })
     })
   }

  // static findById(connection, req, callback){
  //   connection.each(`SELECT * FROM contacts WHERE id = ${req.id}`, function(err,rows){
  //     if(!err){
  //       callback(null,rows)
  //     }
  //     else{
  //       callback(err,null)
  //     }
  //   })
  // }

  static findById(connection, req){
    return new Promise((resolve, reject)=> {
    connection.each(`SELECT * FROM contacts WHERE id = ${req.id}`,(err,rowsById)=>{
      if(!err){
        resolve(rowsById)
      }
      else{
        resolve(err)
      }
    })
  });
}

  static update(connection, req, reqs){
    connection.run(`UPDATE contacts SET name ='${req.name}',
                                   company='${req.company}',
                                   telp_number='${req.telp_number}',
                                   email='${req.email}'
                                   WHERE id=${reqs.id}`)
  }


  static destroy(connection,req){
    connection.run(`DELETE FROM contacts WHERE id=${req.id}`)
  }

  static createData(connection, req){
    connection.run(`INSERT INTO contacts(name,company,telp_number,email)
    VALUES('${req.name}','${req.company}','${req.telp_number}','${req.email}')
         `)
  }
}

module.exports = Contacts
