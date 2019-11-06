var express = require('express');
var router = express.Router();
var data = require("../data/indexData.js");
var artmodel = require("../model/articleModel");
/* GET home page. */
router.get('/', function(req, res){

	artmodel.find().then((result)=>{
		res.render('index', { 
			'data':result
		});
	})
});
router.get('/a',function(req,res){
	console.log(req.query.id) 
	artmodel.find({_id:req.query.id}).then((result)=>{
		console.log(result)
		res.render('client/detail', {
			'data':result[0]
	  });
	})
	
})
module.exports = router;
