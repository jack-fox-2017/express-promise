const ModelDb = require('../models/DBModel');
// const mAddress = require('../models/address');
const mContact = require('../models/contact');
let dbModel = new ModelDb('./db/data.db')

class Address {
  constructor() {}

  // static findAll(conn, callback) {
  //   conn.all(`SELECT * FROM Addresses;`, (err, rows) => {
  //     if(!err) {
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findAll(conn) {
    return new Promise ((resolve,reject) => {
      conn.all(`SELECT * FROM Addresses;`, (err, rows) => {
        if(!err) {
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })

  }

  static createData(conn, data) {
    return new Promise ((resolve,reject) => {
      let query = `INSERT INTO Addresses (street, city, zip, contact_id)
      VALUES ('${data.street}','${data.city}','${data.zip}','${data.contact_id}')`
      conn.run(query, err => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  // static findById(conn, param, callback) {
  //   conn.all(`SELECT * FROM Addresses WHERE id = ${param.id}`, (err, rows) => {
  //     if(!err) {
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findById(conn, param) {
    return new Promise ((resolve,reject) => {
      conn.all(`SELECT * FROM Addresses WHERE id = ${param.id}`, (err, rows) => {
        if(!err) {
          resolve(rows)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static update(conn, data, param) {
    return new Promise ((resolve,reject) => {
      let query = `UPDATE Addresses SET street='${data.street}', city='${data.city}',
      zip='${data.zip}', contact_id='${data.contact_id}' WHERE id=${param.id}`
      conn.run(query, err => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static remove(conn, param) {
    conn.run(`DELETE FROM Addresses WHERE id = ${param.id}`)
  }

  static manipulasiObject(addresses, cb) {
    let count = 0;
    addresses.forEach(a => {
      mContact.findById(dbModel.connection, a.contact_id)
      .then(rows=> {
        a.name = rows[0].name
        count++
        if(count===a.length) {
          console.log(a);
          cb(null, a)
        } else {
          cb(err, null)
        }
      })
      .catch(err=> {
        console.log(err);
      })
    })
  }

}//end of class


module.exports = Address
