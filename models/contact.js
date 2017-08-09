'use strict'

class Contacts {
  constructor() {

  }

  static joinConjunctionWithGroups(conn,row){
    return new Promise(function(resolve, reject) {
      var data_contactsingroup=[];
        conn.each(`SELECT groups_id, contacts_id, name_of_group FROM ContactGroups
          JOIN Groups
          ON ContactGroups.groups_id = Groups.id
          WHERE ContactGroups.contacts_id = ${row.id}`,(err, data_perObject) => {
            // console.log('data_perObject brahh'+JSON.stringify(data_perObject));
            data_contactsingroup.push(data_perObject);
        }, function (err){
          // console.log('data_contactsingroup'+ JSON.stringify(data_contactsingroup));
          if(!err){
            resolve(data_contactsingroup)
          } else {
            reject(err);
          }
        })
      })
  };

  static findAll(conn) { // uda pake Promise gk perlu callback
    return new Promise(function(resolve, reject) {
      var temp = [];
      conn.each(`SELECT * FROM Contacts`, function (err, dGroup) {
        temp.push(dGroup);
      }, function (err){
        // console.log('---err'+temp);

        if(!err){
          resolve(temp)
        } else {
          reject(err);
        }
      })
    })
  };

  static findById(conn, id) {
    return new Promise(function(resolve, reject) {
      var temp = [];
      conn.each(`SELECT * FROM Contacts WHERE id = ${id}`, function (err, rows) {
        temp.push(rows);
      }, function(err) {
        if(!err){
          resolve(temp)
        } else {
          reject(err);
        }
      })
    });
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO Contacts (
      name,
      company,
      telp_number,
      email
    ) VALUES ('${data.name}','${data.company}', '${data.telp_number}', '${data.email}')`, function(){
      if(data.hasOwnProperty('groups_id')) {
        let contacts_id = this.lastID;
        conn.run(`INSERT INTO ContactGroups (
          contacts_id,
          groups_id
        ) VALUES (${contacts_id},'${data.groups_id}')`);
      }

    });
  }

  static removeData(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = '${data.name}',
      company = '${data.company}',
      telp_number = '${data.telp_number}',
      email = '${data.email}'
      WHERE id = '${id}';`);
  }

}

module.exports = Contacts;
