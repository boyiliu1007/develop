var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/get/:message/',function(req,res,next){
  res.send(req.params.message+req.query.year);
});

// module.exports = router;(原本在這裡不知道要不要刪)
router.post('/post',function(req,res,next){
  res.send(req.body.message);
});