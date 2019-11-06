const mongoose = require('mongoose');
const artSchema = new mongoose.Schema({  //【2】创建表结构对象
    'title':String,
    'author':String,
    'time':String,
    'intro': String,
    'imgUrl': String,
    'wrods':String
})

const artModel = mongoose.model('artmodel',artSchema) //【3】根据表结构生成一个用以操作表的数据模型对象

module.exports=artModel;


 