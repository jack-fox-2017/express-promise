'use strict'

class Contact {
  constructor(data) {
  }

//***************promise*********************

  static findall(conn){
    return new Promise(function(resolve,reject){
      let query = `SELECT * FROM Contacts;`
        conn.all(query,(err,rows) => {
          if(!err){
            resolve(rows);
          } else {
            reject(err);
          }
        })
    })
  }

  // conn.all(`SELECT * FROM Contacts;`,function(err,rows){
  //   if(!err){
  //     callback(false,rows)
  //   } else {
  //     callback(true,null)
  //   }
  // })

  static createData(conn,req){
    conn.run(`INSERT INTO Contacts(name,company,telp_number,email) VALUES ('${req.Name}','${req.Company}','${req.Telp_number}','${req.Email}')`)
  }

  static findById(conn,req){
    return new Promise(function(resolve,reject) {
      let query = `SELECT * FROM Contacts WHERE id = ${req}`
        conn.all(query,function(err,rows){
          if(!err){
            resolve(rows)
          } else {
            reject(err)
            // console.log(err);
          }
      })
    })
  }





  //   conn.all(`SELECT * FROM Contacts WHERE id = ${req}`,function(err,rows){
  //     if(!err){
  //       callback(false,rows)
  //     }else {
  //       callback(true,null)
  //     }
  //   })
  // }

  static update(conn,req,reqparams){
    conn.all(`UPDATE Contacts SET name = '${req.Name}',company = '${req.Company}',telp_number = '${req.Telp_number}',email = '${req.Email}' WHERE id = ${reqparams}`)
  }

  static remove(conn,reqparams){
    conn.run(`DELETE FROM Contacts WHERE id = ${reqparams}`)
  }

}

module.exports = Contact;
