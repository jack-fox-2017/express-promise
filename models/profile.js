class Profile{
    static findAll(conn){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Profile ORDER BY id DESC`, (err, profile) => {
          if(!err){
            resolve(profile)
          } else {
            reject(err)
          }
        })
      });
    }

    findManipulate(conn){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Profile ORDER BY id DESC`, (err, profile) => {
          this.manipulasi(conn, profile, (data) => {
            if(!err){
              resolve(data)
            } else {
              reject(err)
            }
          })
        })
      });
    }

    manipulasi(conn, dataProfile, callback){
      let count = 0
      dataProfile.forEach(row => {
        conn.all(`select * from Contact WHERE id=${row.ContactId}`, (err, getData) => {
          row['contact_name'] = getData[0].name

          count++
          if(count == dataProfile.length){
            callback(dataProfile)
          }
        })
      })
    }

    static createData(conn, body){
      conn.run(`INSERT INTO Profile (username, password, firstname, lastname, ContactId) VALUES ('${body.username}', '${body.password}', '${body.firstname}', '${body.lastname}', ${body.ContactId})`)
    }

    static findById(conn, params){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Profile where id=${params.id}`, (err, data) => {
          if(!err){
            resolve(data)
          } else {
            reject(err)
          }
        })
      });
    }

    static findCustom(conn, body){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Profile where ContactId=${body.ContactId} OR username='${body.username}'`, (err, cekProfil) => {
          if(!err){
            resolve(cekProfil)
          } else {
            reject(err)
          }
        })
      });
    }

    static updateData(conn, params, body){
      conn.run(`UPDATE Profile set  username='${body.username}', password='${body.password}', firstname='${body.firstname}', lastname='${body.lastname}' where id=${params.id}`)
    }

    static destroyData(conn, params){
      conn.run(`DELETE from Profile where id=${params.id}`)
    }
}

module.exports = Profile;
