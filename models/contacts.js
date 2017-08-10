var sqlite3 = require('sqlite3').verbose();

class Contacts {
  constructor() {
  }

  static insertData (conn,req){
    // var query = `INSERT INTO contacts (name,company,telp_number,email) VALUES ('${data.name}','${data.Company}','${data.telp_number}','${data.email}')`;
    // conn.run(query, function (err,data){
    //   if (!err) {
    //     cb(null,data)
    //     console.log("data insert");
    //   } else {
    //     cb(err,null);
    //   }
    // })
    conn.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${req.name}','${req.company}','${req.telp_number}','${req.email}');`);
  }

  static remove (conn,id){
    // var query = `DELETE FROM contacts WHERE id = ${id}`;
    // conn.run(query, function (err,data){
    //   if (!err) {
    //     cb(null,id)
    //     console.log("data deleted");
    //   } else {
    //     cb(err,null);
    //     }
    //   })

    conn.run(`DELETE FROM contacts WHERE id = ${id}`)
    }

  static update (conn,req,id){
    // var query = `UPDATE contacts SET name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' WHERE id = '${data.id}'`;
    // conn.run(query, function (err,data){
    //   if(!err) {
    //     cb(null,data)
    //     console.log("data update");
    //   }else {
    //     cb(err,null);
    //   }
    // })
    conn.run(`UPDATE contacts SET name = '${req.name}', company = '${req.company}', telp_number = '${req.telp_number}', email = '${req.email}' WHERE id = '${id}'`)
  }

  static findById (conn,req){
    return new Promise(function(resolve, reject) {
      var query = `SELECT * FROM contacts WHERE id = ${req.id}`;
      conn.all(query, function(err,data){
        if(!err){
          // console.log(data);
          resolve(data)
        } else {
          // console.log(err);
          reject(err)
        }
      })
    });
  }

  static findAll (conn){
    return new Promise(function(resolve, reject) {
      var query = `SELECT * FROM contacts`;
      conn.all(query, function(err,data){
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  };

}

module.exports = Contacts;
