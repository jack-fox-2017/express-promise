'use strict'

class Groups {
  constructor() {

  }

  static joinConjunctionWithGroups(conn,row){
    return new Promise(function(resolve, reject) {
      var data_contactsingroup=[];
      conn.each(`SELECT groups_id, contacts_id, name FROM ContactGroups
        JOIN Contacts
        ON ContactGroups.contacts_id = Contacts.id
        WHERE ContactGroups.groups_id = ${row.id}`,(err, data_perObject) => {
          data_contactsingroup.push(data_perObject);
    }, function(err){
      if(!err){
        resolve(data_contactsingroup)
      } else {
        reject(err);
      }
    })
  })
};


  static findAll(conn) {
    // console.log(this.hello());
    return new Promise(function(resolve, reject) {
      var temp = [];
      // var manipulate = this.manipulateGroups; //masalah scope this cuma bisa d dalem object gk bisa d dalem all
      conn.each(`SELECT * FROM Groups`, function (err, dGroup) {
        temp.push(dGroup);
        }, function (err){
        if(!err){
          resolve(temp)
        } else {
          reject(err);
        }
      })
    });
  };

  static findById(conn, id) {
    return new Promise(function(resolve, reject) {
      var temp = [];
      conn.each(`SELECT * FROM Groups WHERE id = ${id}`, function (err, rows) {
        temp.push(rows);
        }, function(err){
          if(!err){
            resolve(temp)
          } else {
            reject(err);
          }
      })
    })
  };

  static insertData(conn, data){
    conn.run(`INSERT INTO Groups (
      name_of_group
    ) VALUES ('${data.name_of_group}')`);
  }

  static insertDataConjuction(conn, data, id){
    conn.run(`INSERT INTO ContactGroups (
      groups_id,
      contacts_id
    ) VALUES ('${id}','${data.contacts_id}')`);
  }

  static removeData(conn, id){
    conn.run(`DELETE FROM Groups WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Groups SET
      name_of_group = '${data.name_of_group}' WHERE id = ${id}`);
  }

  static showGroup(conn){
    return new Promise(function(resolve, reject) {
      var temp = [];
        conn.each(`SELECT * FROM Groups`, function (err, rows2) {
          temp.push(rows2);
        }, function(err) {
          if(!err){
            resolve(temp)
          } else {
            reject(err);
          }
        })
    });
  }


}

module.exports = Groups;
