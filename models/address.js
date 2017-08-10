var sqlite3 = require('sqlite3').verbose();

class Address{
  constructor(){
  }

  static insertData(conn,req){
    // var query = `INSERT INTO address (postal_code, street, city, contacts_id) VALUES ('${data.postal_code}','${data.street}','${data.city}',${data.contacts_id});`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`INSERT INTO address (postal_code, street, city,contacts_id) VALUES ('${req.postal_code}','${req.street}','${req.city}',${req.contacts_id});`);
  }

  static remove(conn,id){
    // var query = `DELETE FROM address WHERE id = ${id}`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`DELETE FROM address WHERE id = ${id}`)
  }

  static update(conn,req,id){
    // var query = `UPDATE address SET postal_code = '${data.postal_code}', city = '${data.city}', street = '${data.street}' WHERE id = '${data.id}'`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`UPDATE address SET postal_code = '${req.postal_code}', city = '${req.city}', street = '${req.street}' WHERE id = '${id}'`)
  }

  static findById (conn,req){
    return new Promise(function(resolve, reject) {
      var query = `SELECT * FROM address WHERE id = ${req.id}`;
      conn.all(query, function(err,data){
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    });
  }

  static findAll (conn){
    return new Promise(function(resolve, reject) {
      var query = `SELECT * FROM address`;
      conn.all(query, function(err,data){
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    });
  }

  findCustomData (conn){
    //var self = this
    return new Promise((resolve, reject) => {
      var query = `SELECT * FROM address`;
      conn.all(query, (err,dataAddress) =>{ //lexical scoping
      //  console.log(dataAddress);
        this.manipulateData(conn, dataAddress, (data) =>{
          if (!err) {
            console.log(data);
            resolve(data)
          } else {
            reject(err)
          }
        })
        // self.manipulateData(conn)
        // this.manipulateData(conn)
      })
    });
  }

  manipulateData(conn, data, callback){
    //console.log('apake=======');
  //  console.log(data);
    var count = 0
    data.forEach(row =>{
      //console.log(row);
      conn.all(`SELECT * FROM contacts WHERE id = ${row.contacts_id}`, (err,getdata) => {
        //console.log(getdata);
        row['contacts_name'] = getdata[0].name
        count ++
        if (count === data.length) {
          callback(data)
        }
      })
    })
  }

}



module.exports = Address;
