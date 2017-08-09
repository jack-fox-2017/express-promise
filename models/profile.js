class Profile {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getProfile(conn, callback) {
    return new Promise((resolve, reject) => {
      conn.all(`SELECT * FROM profiles;`, function (err, rowsP) {
        if (!err) {
          var num = 0
          rowsP.forEach(prof => {
            prof['name'] = []
            conn.all(`SELECT * FROM contacts where id = ${prof.contacts_id}`, function (err, rowsC) {
              if (!err) {
                rowsC.forEach(cont => {
                  if (prof.contacts_id === cont.id) {
                    prof['name'].push(cont.name);
                  }
                })
                console.log(rowsP);
                num++
                if (num == rowsP.length) {
                  resolve(rowsP)
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

  addProfile(conn, user, conId) {
    conn.run(`INSERT INTO profiles (username, contacts_id)
      VALUES ('${user}', '${conId}');`)
  }

  getProfileE(conn, where, callback) {
    return new Promise((resolve, reject) => {
      conn.all(`SELECT * FROM profiles where id = ${where};`, function (err, rowsP) {
        if (!err) {
          var num = 0
          rowsP.forEach(prof => {
            prof['name'] = []
            conn.all(`SELECT * FROM contacts where id = ${prof.contacts_id}`, function (err, rowsC) {
              if (!err) {
                rowsC.forEach(cont => {
                  if (prof.contacts_id === cont.id) {
                    prof['name'].push(cont.name);
                  }
                })
                console.log(rowsP);
                num++
                if (num == rowsP.length) {
                  resolve(rowsP)
                }
              }
            })
          })
        }
      })
    })
  }

  updateProfile(conn, user, conId, id) {
    conn.run(`UPDATE profiles SET username = '${user}', contacts_id = '${conId}'  WHERE id = ${id};`)
  }

  deleteProfile(conn, id) {
    conn.run(`DELETE FROM profiles WHERE id = ${id};`)
  }
}

module.exports = Profile