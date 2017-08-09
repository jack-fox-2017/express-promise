class Contacts{
  constructor(){}

  findAll(db, table, cb){
    return new Promise((resolve, reject)=>{
      let qry = `SELECT * FROM ${table}`;
      db.all(qry, (err, rows)=>{
        if(!err){
          resolve(rows);
        }else{
          reject(err);
        }
      });
    });
  }

  findById(db, table, id){
    return new Promise((resolve, reject)=>{
      let qry = `SELECT * FROM ${table} WHERE id=${id}`;
      db.each(qry, (err, row)=>{
        if(!err){
          resolve(row);
        }else{
          reject(err);
        }
      });
    });
  }

  createData(db, table, obj){
    let qry = `INSERT INTO ${table} (name, company, phone, email) VALUES (
      '${obj.name}',
      '${obj.company}',
      '${obj.phone}',
      '${obj.email}')`;
    db.run(qry);
  }

  update(db, table, obj, id){
    let qry = `UPDATE ${table} SET
      name='${obj.name}',
      company='${obj.company}',
      phone='${obj.phone}',
      email='${obj.email}'
      WHERE id=${id}`;
    db.run(qry);
  }

  remove(db, table, id){
    let qry = `DELETE FROM ${table} WHERE id=${id}`;
    db.run(qry);
  }

}

module.exports = Contacts;
