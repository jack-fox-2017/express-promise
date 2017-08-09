const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('index', {header: 'Contacts & Addresses: CallBack-ORM-MVC'});
  //res.send('hello');
});

module.exports = router;
