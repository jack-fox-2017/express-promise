const express = require('express')
let router = express.Router()

const DBModel = require('../models/db_model.js')
const Contact = require('../models/contact.js')
const Group = require('../models/group.js')
const Conjunction = require('../models/group_contact.js')

const db = new DBModel('./db/data.db')
const contactModel = new Contact(db.connection)
const groupModel = new Group(db.connection)
const conjunctionModel = new Conjunction(db.connection)

router.get('/', (req, res) => {
  groupModel.getGroups()
  .then(groups => {
    db.connection.serialize(() => {
      groups.forEach((group, index) => {
        conjunctionModel.getJoinWithContacts(group.id)
        .then(rowsJoin => {
          group.contacts_name = rowsJoin.map(item => {return item.name}).join(', ')
        })
        .catch(err => {
          throw err
        })
      })

      contactModel.getContacts()
      .then(contacts => {
        res.render('groups', {
          data: groups,
          contacts: contacts
        })
      })
      .catch(err => {
        throw err
      })
    })
  })
  .catch(err => {
    throw err
  })
})

router.post('/', (req, res) => {
  let objData = {name_of_group: req.body.name_of_group}
  groupModel.insertGroup(objData)
  .then(() => {
    res.redirect('/groups')
  })
  .catch((err) => {
    throw err
  })
})

router.get('/edit/:id', (req, res) => {
  groupModel.getGroupById(req.params.id)
  .then(rowGroup => {
    conjunctionModel.getJoinWithContactsChecked(req.params.id)
    .then(rowsContactCheck => {
      res.render('groups-edit', {
        data: rowGroup,
        contacts: rowsContactCheck
      })
    })
    .catch(err => {
      throw err
    })
  })
  .catch(err => {
    throw err
  })
})

router.post('/edit/:id', (req, res) => {
  let objData = {name_of_group: req.body.name_of_group}
  groupModel.updateGroup(req.params.id, objData)
  .then(() => {
    if (req.body.hasOwnProperty('contact_ids') && req.body.contact_ids.length > 0)
      conjunctionModel.removeConjunctionBy('group', req.params.id)
      .then(() => {
        req.body.contact_ids.forEach(item => {
          let objData = {
            contact_id: item,
            group_id: req.params.id
          }
          conjunctionModel.insertConjunction(objData)
          .catch(err => {
            throw err
          })
        })

        res.redirect('/groups')
      })
      .catch(err => {
        throw err
      })
    else
      res.redirect('/groups')
  })
  .catch(err => {
    throw err
  })
})

router.get('/delete/:id', (req, res) => {
  groupModel.removeGroup(req.params.id)
  .then(() => {
    return conjunctionModel.removeConjunctionBy('group', req.params.id)
  })
  .then(() => {
    res.redirect('/groups')
  })
  .catch(err => {
    throw err
  })
})

module.exports = router
