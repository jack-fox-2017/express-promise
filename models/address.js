class Address {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getAddress(conn) {
    return new Promise((resolve, reject) => {
      conn.all(`SELECT * FROM addresses;`, function (err, rowsA) {
        if (!err) {
          var num = 0
          rowsA.forEach(add => {
            conn.all(`SELECT * FROM contacts where id = ${add.contacts_id}`, function (errs, rowsCA) {
              if (!errs) {
                rowsA[num]['name'] = rowsCA[0].name;
                // console.log(rowsCA);
                num++
                if (num == rowsA.length) {
                  resolve(rowsA)
                }
              }
            })
          })
        }
      })
    })
  }

  getcontact(conn) {
    return new Promise((resolve, reject) => {
      conn.all(`select * from contacts`, (err, rows) => {
        resolve(rows)
      })
    })
  }




  addAddress(conn, alamat, kodepos, conId) {
    conn.run(`INSERT INTO addresses (alamat, kodepos, contacts_id)
      VALUES ('${alamat}', '${kodepos}', '${conId}');`)
  }

  getAddressE(conn, where, callback) {
    return new Promise((resolve,reject) => {
    conn.all(`SELECT * FROM addresses where id = ${where};`, function (err, rowsA) {
      if (!err) {
        var num = 0
        rowsA.forEach(add => {
          conn.all(`SELECT * FROM contacts where id = ${add.contacts_id}`, function (err, rowsCA) {
            if (!err) {
              rowsA[num]['name'] = rowsCA[0].name;
              console.log(rowsA);
              num++
              if (num == rowsA.length) {
                resolve(rowsA)
              }
            }
          })
        })
      }
    })
    })
  }

  updateAddress(conn, alamat, kodepos, contacts_id, id) {
    conn.run(`UPDATE addresses SET alamat = '${alamat}', kodepos = '${kodepos}', contacts_id = '${contacts_id}' WHERE id = ${id};`)
  }

  deleteAddress(conn, id) {
    conn.run(`DELETE FROM addresses WHERE id = ${id};`)
  }
}

module.exports = Address