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
  contactModel.getContacts()
  .then(contacts => {
    db.connection.serialize(() => {
      contacts.forEach((contact, index) => {
        conjunctionModel.getJoinWithGroups(contact.id)
        .then(rowsJoin => {
          contact.groups_name = rowsJoin.map(item => {return item.name_of_group}).join(', ')
        })
        .catch(err => {
          throw err
        })
      })

      groupModel.getGroups()
      .then(groups => {
        res.render('contacts', {
          data: contacts,
          groups: groups
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
  let objData = {
    name: req.body.name,
    company: req.body.company,
    telp_number: req.body.telp_number,
    email: req.body.email
  }
  contactModel.insertContact(objData)
  .then(result => {
    if (req.body.hasOwnProperty('group_ids') && req.body.group_ids.length > 0) {
      req.body.group_ids.forEach(item => {
        let objDataConjuntion = {
          contact_id: result.lastID,
          group_id: item
        }
        contactModel.insertToConjunction(objDataConjuntion)
        .catch(err => {
          throw err
        })
      })

      res.redirect('/contacts')
    }
    else
      res.redirect('/contacts')
  })
  .catch(err => {
    throw err
  })
})

router.get('/edit/:id', (req, res) => {
  contactModel.getContactById(req.params.id)
  .then(rowContact => {
    conjunctionModel.getJoinWithGroupsChecked(req.params.id)
    .then(rowsGroupCheck => {
      res.render('contacts-edit', {
        data: rowContact,
        groups: rowsGroupCheck
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
  let objData = {
    name: req.body.name,
    company: req.body.company,
    telp_number: req.body.telp_number,
    email: req.body.email
  }
  contactModel.updateContact(req.params.id, objData)
  .then(() => {
    console.log('if')
    if (req.body.hasOwnProperty('group_ids') && req.body.group_ids.length > 0)
      conjunctionModel.removeConjunctionBy('contact', req.params.id)
      .then(() => {
        console.log('looping');
        req.body.group_ids.forEach(item => {
          let objData = {
            contact_id: req.params.id,
            group_id: item
          }
          conjunctionModel.insertConjunction(objData)
          .catch(err => {
            throw err
          })
        })

        res.redirect('/contacts')
      })
      .catch(err => {
        throw err
      })
    else
      res.redirect('/contacts')
  })
  .catch(err => {
    throw err
  })
})

router.get('/delete/:id', (req, res) => {
  contactModel.removeContact(req.params.id)
  .then(() => {
    return conjunctionModel.removeConjunctionBy('contact', req.params.id)
  })
  .then(() => {
    res.redirect('/contacts')
  })
  .catch(err => {
    throw err
  })
})

module.exports = router
