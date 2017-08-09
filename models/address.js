class Address{
  constructor(){

  }

  static findAll(connection){
    return new Promise((resolve, reject)=>{
      connection.all(`SELECT * FROM Address`, (err, rows) =>{
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  }

  static createData(connection, req){
    connection.run(`INSERT INTO Address(street_name, city, province, zipcodes, contact_id)
    VALUES ('${req.street_name}',
    '${req.city}',
    '${req.province}',
    '${req.zipcodes}',
    '${req.contact_id}')`)
  }

  static findById(connection, id){
    return new Promise((resolve, reject)=>{
      connection.all(`SELECT * FROM Address WHERE id = '${id}'`, (err, row)=>{
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Address SET
      street_name = '${req.street_name}',
      city = '${req.city}',
      province = '${req.province}',
      zipcodes = '${req.zipcodes}',
      contact_id = '${req.contact_id}' WHERE id = '${id}'`)
  }

  static remove(connection, id){
    connection.run(`DELETE FROM Address WHERE id = '${id}'`)
  }

}

module.exports = Address
