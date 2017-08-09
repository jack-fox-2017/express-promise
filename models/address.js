class Address{
    static findAll(conn){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Address`, (err, data) => {
          if(!err){
            resolve(data)
          } else {
            reject(err)
          }
        })
      });
    }

    findManipulate(conn){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Address ORDER BY id DESC`, (err, dataAddress) => {
          this.manipulasi(conn, dataAddress, (finalData) => {
            if(!err){
              resolve(finalData)
            } else {
              reject(err)
            }
          })
        })
      });
    }

    manipulasi(conn, dataAddress, callback){
      let count = 0
      dataAddress.forEach(row => {
        conn.all(`select * from Contact WHERE id=${row.ContactId}`, (err, getData) => {
          row['contact_name'] = getData[0].name

          count++
          if(count == dataAddress.length){
            callback(dataAddress)
          }
        })
      })
    }

    static createData(conn, body){
        conn.run(`insert into Address (address, city, zipcode, ContactId) VALUES ('${body.address}', '${body.city}', ${body.zipcode}, ${body.ContactId})`)

    }

    static findById(conn, params){
      return new Promise((resolve, reject) => {
        conn.all(`select * from Address where id=${params.id}`, (err, data) => {
          if(!err){
            resolve(data)
          } else {
            reject(err)
          }
        })
      });
    }

    static updateData(conn, params, body){
      conn.run(`UPDATE Address set
        address='${body.address}',
        city='${body.city}',
        zipcode=${body.zipcode},
        ContactId=${body.ContactId}
        where id=${params.id}`)
    }

    static destroyData(conn, params){
      conn.run(`DELETE from Address where id=${params.id}`)
    }
}

module.exports = Address;
