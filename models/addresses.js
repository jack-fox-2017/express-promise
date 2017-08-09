class Addresses {
  constructor(connection){
    this.connection = connection;
    this.table ='addresses'
  }

  findAllAddresses(){
    var query = `SELECT * FROM ${this.table}`
    let promise = new Promise((resolve,reject)=>{
      this.connection.all(query, (err,rows)=>{
        if(!err){
          resolve(rows);
        } else {
          reject(`error from find all adresses: ${err}`)
        }
      })
    })

    return promise;
  }

  findByIdAddresses(id){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`

    let promise = new Promise((resolve,reject)=>{
      this.connection.get(query, (err,row)=>{
        if (!err) {
          resolve(row);
        } else {
          reject(`error from find by id addresses: ${err}`)
        }
      })
    })

    return promise
  }

  createAddresses(obj){
    var query = `INSERT INTO ${this.table}(id_contacts,street,city,zipcode) VALUES('${obj.id_contacts}','${obj.street}','${obj.city}','${obj.zipcode}')`

    let promise = new Promise((resolve,reject)=>{
      this.connection.run(query, (err,row)=>{
        if(!err){
          resolve(row)
        } else {
          reject(`Error from create addresses: ${err}`)
        }
      })
    })

    return promise

  }

  destroyAddresses(id){
    var query = ` DELETE FROM ${this.table} WHERE id='${id}'`

    let promise = new Promise((resolve,reject)=>{
      this.connection.run(query, (err,row)=>{
        if(!err){
          resolve(row)
        } else {
          reject(`Error from destroy addresses: ${err}`)
        }
      })
    })

    return promise
  }

  updateAddresses(obj){
    console.log(obj);
    var query = `UPDATE ${this.table} SET id_contacts='${obj.id_contacts}', street='${obj.street}',city='${obj.city}',zipcode='${obj.zipcode}' WHERE id='${obj.id}'`

    let promise = new Promise((resolve, reject)=>{
      this.connection.run(query,(err,row)=>{
        if (!err) {
          resolve(row)
        } else {
          reject(`Error from update addresses: ${err}`)
        }
      })
    });


    return promise
  }
}


module.exports = Addresses
