//完成
var express = require('express');
var router = express.Router();

/* GET home page. */
//原本的
// router.get('/',function(req,res,next){
//   res.send(req.params.message+req.query.year);
// });
// router.post('/post',function(req,res,next){
//   res.send(req.body.message);
// });

//學長的
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, ) {
  res.send('Hello World!');
  db.each(loginAccount, req.body.username,req.body.username, function (err, row) {
      console.log('Welcome '+row.username);
  });
  db.run(loginAccount, [req.body.username,req.body.username]);
});

module.exports = router;