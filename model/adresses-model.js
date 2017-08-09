class Adresses {
  constructor() {

  }
  findAll(conn){
    return new Promise((resolve, reject)=> {
      conn.all(`SELECT * FROM Adresses`, (err, rows) =>{
        if(!err){
          resolve(rows)
        }
        else{
          reject(err)
        }
      })
    })
  }
  findById(conn, id){
    return new Promise(function(resolve, reject) {
      conn.all(`SELECT * FROM Adresses WHERE id = "${id}"`, (err, rows)=>{
        if(!err){
          resolve(rows)
        }
        else{
          reject(err)
        }
      })
    });


  }
  create(conn, data){
    return new Promise((resolve, reject)=> {
      conn.run(`INSERT INTO Adresses(jalan, kota, provinsi, contact_id)VALUES (
        "${data.jalan}",
        "${data.kota}",
        "${data.provinsi}",
        "${data.contact_id}")`, (err,rows)=>{
          if(!err){
            resolve(rows)
          }
          else{
            reject(err)
          }
      })
    })
  }
  update(conn, data, id){
    return new Promise((resolve, reject)=> {
      conn.run(`UPDATE Adresses SET
        jalan = "${data.jalan}",
        kota = "${data.kota}",
        provinsi = "${data.provinsi}",
        contact_id = "${data.contact_id}"
        WHERE id = "${id}"`, (err)=>{
          if(!err){
            resolve()
          }
          else{
            reject(err)
          }
      })
    })
  }
  destroy(conn, id){
    return new Promise((resolve, reject)=> {
      conn.run(`DELETE FROM Adresses WHERE id = "${id}"`, (err)=>{
        if(!err){
          resolve()
        }
        else{
          reject(err)
        }
      })
    })
  }
}


module.exports = Adresses
