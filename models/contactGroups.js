'use strict'

class contactGroups {
  constructor() {

  }

  static insertDataConjuction(conn, data, id){
    conn.run(`INSERT INTO ContactGroups (
      groups_id,
      contacts_id
    ) VALUES ('${id}','${data.contacts_id}')`);
  }
}




module.exports = contactGroups;
