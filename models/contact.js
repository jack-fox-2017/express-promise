class Contact{

  static findAll(conn){
    return new Promise((resolve, reject) => {
      conn.all(`select * from Contact ORDER BY id DESC`, (err, data) => {
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    });
  }

  static createData(conn, body){
    conn.run(`INSERT INTO Contact (name, company, phone, email) VALUES
    ('${body.name}', '${body.company}', ${body.phone}, '${body.email}')`)
  }

  static findById(conn, params){
    return new Promise((resolve, reject) => {
      conn.all(`SELECT * FROM Contact where id=${params.id}`, (err, data) => {
        if(!err){
          resolve(data)
        } else {
          reject(err)
        }
      })
    });
  }

  static updateData(conn, params, body){
    conn.run(`UPDATE Contact SET name='${body.name}', company='${body.company}', phone='${body.phone}', email='${body.email}' WHERE id='${params.id}'`)
  }

  static destroyData(conn, params){
    conn.run(`DELETE from Contact where id=${params.id};`);
    conn.run(`DELETE from CG where ContactId=${params.id};`)
    conn.run(`DELETE from Address where ContactId=${params.id};`)
  }

}

module.exports = Contact
