var express = require('express');
var router = express.Router();
const artmodel = require('../model/articleModel')

router.get('/', function(req, res, next) {
  res.render('admin/form',{ });
});
router.post('/sub', function(req, res, next) {
  console.log(req.body) 
  new artmodel({
    'title':req.body.tittle,
    'author':req.body.author,
    'time':req.body.date,
    'intro': req.body.intro,
    'wrods':req.body.content
  }).save().then((result)=>{ //【3】执行保存动作
    console.log(result)
    if(result){
      res.render('admin/success',{});
    }
})
 
});
module.exports = router;