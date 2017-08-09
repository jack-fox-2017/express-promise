
class Address {
  constructor() {}

  // static findAll(connection) {
  //   return new Promise((resolve, reject) => {
  //     connection.all(`SELECT * FROM Addresses;`, (err, dataAddresses) => {
  //       if(!err) {
  //         resolve(dataAddresses)
  //       }
  //       else {
  //         reject(err)
  //       }
  //     })
  //   })
  // }

  static findAll(connection) {
    return new Promise((resolve, reject) => {
      connection.all(`SELECT * FROM Addresses;`, (err, data) => {
        if(!err) {
          resolve(data)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static createData(connection, req) {
    connection.run(`INSERT INTO Addresses (street, city, zip_code, ContactId) VALUES ('${req.street}', '${req.city}', '${req.zip}', ${req.contactId});`)
  }

  static remove(connection, id) {
    connection.run(`DELETE FROM Addresses WHERE id=${id}`)
  }

  // static findById(connection, id, callback) {
  //   connection.each(`SELECT * FROM Addresses WHERE id=${id}`, (err, data) => {
  //     connection.all(`SELECT * FROM Contacts;`, (err2, data2) => {
  //       if(!err2) {
  //         callback(false, data, data2)
  //       }
  //       else {
  //         callback(true, null, null)
  //       }
  //     })
  //   })
  // }

  static findById(connection, id) {
    return new Promise((resolve, reject) => {
      connection.each(`SELECT * FROM Addresses WHERE id=${id}`, (err, data) => {
        if(!err) {
          resolve(data)
        }
        else {
          reject(err)
        }
      })
    })

  }

  static update(connection, req, id) {
    connection.run(`UPDATE Addresses SET street='${req.street}', city='${req.city}', zip_code='${req.zip}', ContactId=${req.contactId} WHERE id=${id};`)
  }

  // findAllAddressContact(connection) {
  //   return new Promise((resolve, reject) => {
  //     connection.all(`SELECT * FROM Addresses`, (err, dataAddresses) => {
  //       this.addName(connection, dataAddresses, (data) => {
  //         if(!err) {
  //           resolve(data)
  //         }
  //         else {
  //           reject(err)
  //         }
  //       })
  //     })
  //   })
  // }
  //
  // addName(connection, data, callback) {
  //   let count = 0
  //   data.forEach(d => {
  //     connection.all(`SELECT * FROM Contacts WHERE id = ${d.ContactId};`, (err, dataContact) => {
  //       console.log(dataContact);
  //       d['name'] = dataContact[0].name
  //       count++
  //       if (count == data.length) {
  //         callback(data)
  //       }
  //     })
  //   })
  // }

  static matchContactAddress(dataAddresses, dataContacts) {
    for (let i=0; i<dataAddresses.length; i++) {
      for (let j=0; j<dataContacts.length; j++) {
        if (dataAddresses[i].ContactId == dataContacts[j].id) {
          dataAddresses[i].name = dataContacts[j].name
        }
      }
    }
  }

}

module.exports = Address
