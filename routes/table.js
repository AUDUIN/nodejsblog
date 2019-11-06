var express = require('express');
var router = express.Router();
const artmodel = require('../model/articleModel')

router.get('/', function(req, res, next) {

  artmodel.find().count().then(function(num){
    console.log(num)
    var p = Math.ceil(num/5);
    var arr = [];
    for(var i=1;i<=p;i++){
      arr.push(i)
    }
    console.log(arr);
    artmodel.find().limit(5).then(function(result){
      res.render('admin/table',{
          result,
          arr
        });
      
    })
  })

  
});
router.get('/page',(req,res)=>{
  var p = (req.query.p-1)*5
  artmodel.find().skip(p).limit(5).then(function(result){
    res.send({
      result
    })
  })
})
router.get('/del',(req,res)=>{
  console.log(req.query.id)
  // artmodel.remove({_id:req.query.id}).then((result)=>{
  //   console.log(result);
  // })
  artmodel.remove({_id:req.query.id}).then(function(result){
    console.log(result)
    if(result.deletedCount==1){
        res.send({
            code:1,
            msg:'删除成功'
        })
    }
}) 
})
router.get('/change',(req,res)=>{
  console.log(req.query);
  artmodel.update({_id:req.query.id},{
    'title':req.query.tittle,
    'author':req.query.author,
    'time':req.query.time,
    'intro': req.query.intro,
    'wrods':req.query.words
  }).then(function(result){
    console.log(result)
    if(result){
        res.send({
            code:1,
            msg:'修改成功'
        })
    }
}) 
})

router.get('/search',(req,res)=>{
    console.log(req.query.stxt);
    var txt = req.query.stxt;
    var reg = new RegExp(txt);
    artmodel.find({title:reg}).then((result)=>{
      console.log(result);
      res.send({
        result
      })
    })
})

module.exports = router;
