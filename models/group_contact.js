class GroupContact {
  constructor(conn) {
    this.conn = conn
    this.table = 'groups_contacts'
  }

  getJoinWithGroups(contact_id) {
    return new Promise((resolve, reject) => {
      let CONTACT_JOIN_GROUPS = `
        select * from ${this.table}
          join groups on groups.id = ${this.table}.group_id
            where ${this.table}.contact_id = ${contact_id}
      `

      let result = []
      this.conn.each(CONTACT_JOIN_GROUPS, (err, row) => {
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
  }

  getJoinWithContacts(group_id) {
    return new Promise((resolve, reject) => {
      let CONTACT_JOIN_GROUPS = `
        select * from ${this.table}
          join contacts on contacts.id = ${this.table}.contact_id
            where ${this.table}.group_id = ${group_id}
      `

      let result = []
      this.conn.each(CONTACT_JOIN_GROUPS, (err, row) => {
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
  }

  getJoinWithGroupsChecked(contact_id, callback) {
    return new Promise((resolve, reject) => {
      let CONTACT_JOIN_GROUPS_AND_CHECKED_ID = `
        select groups.*, groups_contacts.contact_id from groups
          left join ${this.table} on ${this.table}.group_id = groups.id
            and ${this.table}.contact_id = ${contact_id}
      `

      let result = []
      this.conn.each(CONTACT_JOIN_GROUPS_AND_CHECKED_ID, (err, row) => {
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

    // this.conn.all(CONTACT_JOIN_GROUPS_AND_CHECKED_ID, (err, rows) => {
    //   if (callback)
    //     callback(err, rows)
    // })
  }

  getJoinWithContactsChecked(group_id) {
    return new Promise((resolve, reject) => {
      let CONTACT_JOIN_CONTACTS_AND_CHECKED_ID = `
        select contacts.*, groups_contacts.group_id from contacts
          left join ${this.table} on ${this.table}.contact_id = contacts.id
            and ${this.table}.group_id = ${group_id}
      `

      let result = []
      this.conn.each(CONTACT_JOIN_CONTACTS_AND_CHECKED_ID, (err, row) => {
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
  }

  insertConjunction(objData) {
    return new Promise((resolve, reject) => {
      let column_names = Object.keys(objData).join(',')
      let values = Object.keys(objData).map(key => {return objData[key]}).join(',')
      let INSERT_CONJUNCTION = `insert into ${this.table} (${column_names}) values (${values})`

      this.conn.run(INSERT_CONJUNCTION, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }

  removeConjunctionBy(name, id) {
    return new Promise((resolve, reject) => {
      let DELETE_CONJUNCTION = `delete from ${this.table} where ${name}_id = ${id}`

      this.conn.run(DELETE_CONJUNCTION, function(err) {
        if (err)
          reject(err)
        else
          resolve(this)
      })
    })
  }
}

module.exports = GroupContact
