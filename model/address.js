const DB_Model = require('./db_model')

class Address{
  // static findAll(connection, callback){
  //   connection.all(`SELECT * FROM addresses`, function(err, rows){
  //       if(!err){
  //         callback(null,rows)
  //       }
  //       else{
  //         callback(err,null)
  //       }
  //     })
  // }

  static findAll(connection){
    return new Promise((resolve,reject)=>{
      connection.all(`select * from addresses`, (err, rowsAll)=>{
        if(!err){
          resolve(rowsAll)
        }
        else{
          reject(err)
        }
      })
    })
  }

  // static findById(connection, req, callback){
  //       if(!err){
  //   connection.each(`SELECT * FROM addresses WHERE id = ${req.id}`, function(err,rows){
  //         callback(null,rows)
  //       }
  //       else{
  //         callback(err,null)
  //       }
  //     })
  // }

  static findById(connection, req){
    return new Promise((resolve,reject)=>{
      connection.each(`SELECT * FROM addresses WHERE id = ${req.id}`, (err,rowsById)=>{
        if(!err){
          resolve(rowsById)
        }
        else{
          reject(err)
        }
      })
    })
}

  static update(connection, req, reqs){
    connection.run(`UPDATE addresses SET street='${req.street}',
                              city='${req.city}',
                              zip_code='${req.zip_code}'
                              WHERE id=${reqs.id}`)
  }

  static destroy(connection, req){
    connection.run(`DELETE FROM addresses WHERE id=${req.id}`)
  }

  static createData(connection, req){
    connection.run(`INSERT INTO addresses(street,city,zip_code,contact_id)
               VALUES('${req.street}',
                      '${req.city}',
                      '${req.zip_code}',
                      '${req.contact_id}'
                       )`)
  }

  manipulation(connection, arrAddress, callback){
    let count = 0
    arrAddress.forEach(rowsAddress => {
      connection.all(`SELECT * FROM contacts WHERE id=${rowsAddress.contact_id}`, (err, rowsContacts) => {
        rowsAddress['contact_name'] = rowsContacts[0].name;

        count++;
        if(count == arrAddress.length){
                    callback(arrAddress)
        }
      })
    })
  }


  DoubleObj(connection){
    return new Promise((resolve,reject)=>{
      connection.all(`SELECT * FROM addresses`, (err, rowsAddress)=>{
        // console.log(rowsAddress);
        this.manipulation(connection, rowsAddress, (rowsDoubleObj)=>{
          // console.log((rowsDoubleObj));
          if(!err){
            resolve(rowsDoubleObj)
          }
          else{
            reject(err)
          }
        })
      })
    })
  }

}

module.exports = Address
