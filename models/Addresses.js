class Addresses{
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
    let qry = `INSERT INTO ${table} (street, city, zip_code, contacts_id) VALUES (
      '${obj.street}',
      '${obj.city}',
      '${obj.zip_code}',
      '${obj.contacts_id}')`;
    db.run(qry);
  }

  update(db, table, obj, id){
    let qry = `UPDATE ${table} SET
      street='${obj.street}',
      city='${obj.city}',
      zip_code='${obj.zip_code}'
      WHERE id=${id}`;
    db.run(qry);
  }

  remove(db, table, id){
    let qry = `DELETE FROM ${table} WHERE id=${id}`;
    db.run(qry);
  }

}

module.exports = Addresses;
