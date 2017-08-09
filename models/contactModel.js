
class Contact {
  constructor() {}

  static findAll(connection) {
    return new Promise((resolve, reject) => {
      connection.all(`SELECT * FROM Contacts;`, (err, data) => {
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
    connection.run(`INSERT INTO Contacts (name, company, phone, email) VALUES ('${req.name}', '${req.company}', '${req.phone}', '${req.email}');`)
  }

  static remove(connection, id) {
    connection.run(`DELETE FROM Contacts WHERE id=${id}`)
  }

  static findById(connection, id) {
    return new Promise((resolve, reject) => {
      connection.each(`SELECT * FROM Contacts WHERE id=${id}`, (err, data) => {
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
    connection.run(`UPDATE Contacts SET name='${req.name}', company='${req.company}', phone='${req.phone}', email='${req.email}' WHERE id=${id}`)
  }

}

module.exports = Contact
