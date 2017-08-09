const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const Model = require('../models/Models');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const model = new Model();

let prof = 'Profiles';
let cont = 'Contacts';

router.get('/', (req, res)=>{
  model.findAll(db.connection, prof)
    .then(profiles=>{
      manipulateProfiles(profiles, (profiles)=>{
        model.findAll(db.connection, cont)
          .then(contacts=>{
            res.render('profiles', {dataProfiles:profiles, dataContacts:contacts});
          })
          .catch(err=>{
            res.send(err.toString());
          });
      });
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

function manipulateProfiles(profiles, cb){
  let count = 0;
  profiles.forEach(profile =>{
    model.findById(db.connection, cont, profile.contacts_id)
      .then(contact=>{
        profile['name']=contact.name;
        profile['company']=contact.company;
        count++;
        if(count == profiles.length){
          cb(profiles);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  });
}

router.post('/', (req, res)=>{
  let obj = createObjProf(req);
  model.createData(db.connection, prof, obj)
    .then((redirect)=>{
      res.redirect('/profiles');
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  model.findById(db.connection, prof, id)
    .then(profile=>{
      model.findById(db.connection, cont, id)
      .then(contact=>{
        res.render('./edit-profile', {dataProfile:profile, dataContact:contact});
      })
      .catch(err=>{
        res.send(err.toString());
      });
    })
    .catch(err=>{
      res.send(err.toString());
    });
});

router.post('/edit/:id', (req, res)=>{
  let id = req.params.id;
  let obj = createObjProf(req);
  model.update(db.connection, prof, obj, id);
  res.redirect('/profiles');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  model.remove(db.connection, prof, id);
  res.redirect('/profiles');
});

function createObjProf(req){
  let obj = {};
  obj['hometown'] = req.body.hometown;
  obj['birth_year'] = req.body.birth_year;
  obj['relationship_status'] = req.body.relationship_status;
  obj['contacts_id'] = req.body.contacts_id;
  return obj;
}

module.exports = router;
