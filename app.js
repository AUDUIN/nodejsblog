var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig-templates');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

mongoose.connect('mongodb://localhost:27018',function(err){
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})

var app = express();
//配置，使能够解析post请求发送的数据
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//配置模板引擎
app.engine('html', swig.renderFile); //固定配置项
app.set('view engine', 'html'); //固定配置项
app.set('views', __dirname + '/views'); //通知swig在渲染页面的时候，从哪个路径获取html模
app.use('/public', express.static(__dirname + '/public'));//静态资源托管


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/form', require('./routes/form'));
app.use('/table', require('./routes/table'));

module.exports = app;
