class Contact {
  constructor() {
  }
  findAll(conn){
    return new Promise((resolved, reject) => {
      conn.all(`SELECT * FROM Contacts`, (err, rows) =>{
        if(!err){
          resolved(rows)
        }
        else{
          reject(err)
        }
      })
    })
  }
  findById(conn, id){
    return new Promise((resolved, reject) => {
      conn.all(`SELECT * FROM Contacts WHERE id = "${id}"`, function(err, rows) {
        if(!err){
          resolved(rows)
        }
        else{
          reject(err)
        }
      })
    })
  }
  create(conn, data){
    return new Promise((resolved, reject)=>{
      conn.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES
      ("${data.name}","${data.company}","${data.telp})","${data.email}")`, (err)=>{
        if(!err){
          resolved()
        }
        else{
          reject(err)
        }
      })
    })
  }
  update(conn, data, id){
    return new Promise((resolved, reject)=>{
      conn.run(`UPDATE Contacts SET
        name = "${data.name}",
        company = "${data.company}",
        telp_number = "${data.telp}",
        email = "${data.email}"
        WHERE id = "${id}"`, (err)=>{
          if(!err){
            resolved()
          }
          else{
            reject(err)
          }
        })
    })
  }
  destroy(conn, id){
    return new Promise((resolved, reject)=>{
      conn.run(`DELETE FROM Contacts WHERE id = "${id}"`, (err)=>{
        if(!err){
          resolved()
        }
        else{
          reject(err)
        }
      })
    })
  }
}
module.exports = Contact
