class Contacts {
  constructor(connection){
    this.connection = connection;
    this.table ='contacts'
  }

  findAllContacts(){
    // resolve = rows callback
    return new Promise((resolve,reject) => {
      var query = `SELECT * FROM ${this.table}`
      this.connection.all(query, (err,rows)=>{
        if (!err) {
          resolve(rows);
        } else {
          reject(err)
        }
      })
    })
  }

  createContacts(obj){
    var promise = new Promise((resolve,reject)=>{
      var query = `INSERT INTO contacts(name,company,telp_number,email) VALUES ('${obj.name}','${obj.company}','${obj.telp_number}','${obj.email}')`

      this.connection.run(query,(err,rows)=>{
        if(!err){
          resolve(rows);
        } else {
          reject(err);
        }
      })
    })

    return promise;
  }

  destroyContacts(id){

    var promise = new Promise((resolve,reject)=>{
      var query = `DELETE FROM ${this.table} WHERE id='${id}'`
      this.connection.run(query,(err,rows)=>{
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      })
    })

    return promise;
  }

  findByIdContacts(id){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`
    var promise = new Promise((resolve,reject)=>{
      this.connection.get(query, (err,rows)=>{
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      })
    })

    return promise
  }

  updateContacts(obj){

    var query = `UPDATE contacts SET name='${obj.name}',company='${obj.company}',telp_number='${obj.telp_number}',email='${obj.email}' WHERE id='${obj.id}'`

    var promise = new Promise((resolve,reject)=>{
      this.connection.run(query, (err,rows)=> {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      })
    })

    return promise;

  }
}


module.exports = Contacts
