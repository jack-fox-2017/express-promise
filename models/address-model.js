class Addresses{
  constructor(){
  }

  findAll(conn){
    return new Promise((resolve,reject)=>{
      conn.all(`SELECT * FROM Addresses`, (err,rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  findById(conn, reqparam){
    return new Promise((resolve,reject)=>{
      conn.all(`SELECT * FROM Addresses WHERE id = ${reqparam}`, (err,rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  update(conn,req,reqparams){
    return new Promise((resolve,reject)=>{
      conn.run(`UPDATE Addresses SET street ='${req.street}',city = '${req.city}',
      zip_code = '${req.zip_code}', contact_id = ${req.contact_id} WHERE id =${reqparams}`, (err,rows)=>{
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  createData(conn,req){
    return new Promise((resolve,reject)=>{
      conn.run(`INSERT INTO Addresses(street,city,zip_code,contact_id)
      VALUES('${req.street}','${req.city}','${req.zip_code}','${req.contact_id}')`, (err,rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  destroy(conn,req){
    conn.run(`DELETE FROM Addresses WHERE id = ${req}`)
  }

  hasilManipulate(conn){
    return new Promise((resolve,reject)=>{
      conn.all(`SELECT * FROM Addresses`, (err,dataA)=>{
        // console.log('====', dataA);
        this.manipulateContact(conn,dataA,(dataB) =>{
          console.log('====',dataB);
          if(!err){
            resolve(dataB)
          }else {
            reject(err)
          }
        })
      })
    })
  }

  manipulateContact(conn,dataA,callback){
    var count = 0
    dataA.forEach(row => {
      conn.all(`SELECT * FROM Contacts WHERE id = ${row.contact_id}`, (err, getData) => {
        row['nama_contact'] = getData[0].name
        count ++
        if (count === dataA.length-1) {
          callback(dataA)
        }
      })
    })
}

}


module.exports = Addresses
