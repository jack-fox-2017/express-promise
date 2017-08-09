class Contact {
  constructor(conn) {
    this.conn = conn
    this.table = 'contacts'
  }

  getContacts() {
    return new Promise((resolve, reject) => {
      let result = []
      this.conn.each(`select * from ${this.table}`, (err, row) => {
        if (err)
          reject(err)
        else
          result.push(row)
      }, (err) => {
        if (err)
          reject(err)
        else
          resolve(result)
      })
    })

    // this.conn.all(`select * from ${this.table}`, (err, rows) => {
    //   if (callback)
    //     callback(err, rows)
    // })
  }

  getContactById(contact_id) {
    return new Promise((resolve, reject) => {
      this.conn.get(`select * from ${this.table} where id = ${contact_id}`, (err, row) => {
        if (err)
          reject(err)
        else
          resolve(row)
      })
    })
  }

  insertContact(objData) {
    return new Promise((resolve, reject) => {
      let column_names = Object.keys(objData).join(',')
      let values = Object.keys(objData).map(key => {return `'${objData[key]}'`}).join(',')

      let INSERT_CONTACT = `insert into ${this.table} (${column_names}) values (${values})`

      this.conn.run(INSERT_CONTACT, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }

  insertToConjunction(objData) {
    return new Promise((resolve, reject) => {
      let column_names = Object.keys(objData).join(',')
      let values = Object.keys(objData).map(key => {return `'${objData[key]}'`}).join(',')
      let INSERT_CONJUNCTION = `insert into groups_contacts (${column_names}) values (${values})`

      this.conn.run(INSERT_CONJUNCTION, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }

  updateContact(contact_id, objData) {
    return new Promise((resolve, reject) => {
      let column_names = Object.keys(objData)
      let set = column_names.map(key => {return `${key} = '${objData[key]}'`}).join(',')
      let UPDATE_CONTACT = `update ${this.table} set ${set} where id = ${contact_id}`

      this.conn.run(UPDATE_CONTACT, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }

  removeContact(contact_id) {
    return new Promise((resolve, reject) => {
      let REMOVE_CONTACT = `delete from ${this.table} where id = ${contact_id}`

      this.conn.run(REMOVE_CONTACT, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }
}

module.exports = Contact
