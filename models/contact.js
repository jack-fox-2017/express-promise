// const ModelDb = require('./DBModel');

class Contact {
  constructor() {}

  // static findAll(conn, callback) {
  //   conn.all(`SELECT * FROM Contacts;`, (err, rows) => {
  //     if(!err) {
  //       // console.log(rows)
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  // static findAll(conn, callback) {
  //   let arr=[]
  //   conn.each(`SELECT * FROM Contacts;`, (err, rows) => {
  //     if(!err) {
  //       arr.push(rows)
  //       // callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //       // throw err
  //     }
  //   }, () => {
  //     callback(false, arr)
  //   })
  // }

  static findAll(conn) {
    return new Promise ((resolve,reject)=> {
      let arr=[]
      conn.each(`SELECT * FROM Contacts;`, (err, rows) => {
        if(!err) {
          arr.push(rows)
          // callback(false, rows)
        }
        else {
          reject(err)
          // throw err
        }
      }, (err, rows) => {
         if(!err) {
           resolve(arr)
         } else {
           reject(err)
         }
      })
    })
  }

  static createData(conn, data) {
    return new Promise ((resolve, reject) => {
      let query = `INSERT INTO Contacts (name, company, telp_number, email)
      VALUES ('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')`
      conn.run(query, (err) => {
        if(!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }

  // static findById(conn, param, callback) {
  //   conn.all(`SELECT * FROM Contacts WHERE id = ${param.id}`, (err, rows) => {
  //     if(!err) {
  //       console.log(rows);
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  // static findById(conn, param, callback) {
  //   conn.get(`SELECT * FROM Contacts WHERE id = ${param.id}`, (err, rows) => {
  //     if(!err) {
  //       // console.log(rows);
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findById(conn, param) {
    return new Promise ((resolve,reject) => {
      conn.get(`SELECT * FROM Contacts WHERE id = ${param.id}`, (err, rows) => {
        if(!err) {
          // console.log(rows);
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  }

  // static findX(conn, int, callback) {
  //   conn.get(`SELECT * FROM Contacts WHERE id = ${int}`, (err, rows) => {
  //     if(!err) {
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findX(conn, int) {
    return new Promise ((resolve,reject) => {
      conn.get(`SELECT * FROM Contacts WHERE id = ${int}`, (err, rows) => {
        if(!err) {
          // console.log(rows);
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  }

  static update(conn, data, param) {
    return new Promise ((resolve,reject) => {
      let query = `UPDATE Contacts SET name='${data.name}', company='${data.company}',
      telp_number='${data.telp_number}', email='${data.email}' WHERE id=${param.id}`
      conn.run(query, (err) => {
        if(!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }

  static remove(conn, param) {
    conn.run(`DELETE FROM Contacts WHERE id = ${param.id}`)
  }
}

module.exports = Contact
