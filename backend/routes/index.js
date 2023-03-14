//完成
var express = require('express');
var router = express.Router();
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./develop.db');
// const loginAccount = 'SELECT * FROM ACCOUNT WHERE ACC_UN = ? AND ACC_PW_MD5 = ?';
/* GET home page. */

router.get('/', function(req, res, next) {
  console.log('home page')
  res.render('index', { title: 'Message Board' });
});

// router.get('/about', function(req, res){
//   res.send('about');
// });

module.exports = router;