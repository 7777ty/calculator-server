 // 引入mysql模块
const express = require('express');
const bodyParser = require('body-parser');
const db=require('./server/connection');
const app = express();
const onComputed=require('./api/toCalculate');

const allowCrossDomain = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/auth/login',function (req, res) {
    db.query('SELECT * FROM users where name =  ? and psw=?;',[req.body.username,req.body.password],(err,ret)=>{

        if (err) { throw err }
        if (ret.length > 0) {
            res.cookie('name',ret[0].name);
            console.log(ret[0]);
            res.send({
                code: 0,
                msg: '登陆成功',
            })
        } else {
            res.send({
                code:1,
                msg: '账户名或密码错误'
            })
        }

    })


});
app.post('/auth/register', function (req, res) {
    db.query('insert into users (name,psw) values (?,?)',[req.body.username,req.body.password],(err,ret)=>{
        if (err) {
            if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                res.send({
                    code: 1062,
                    msg: '该用户已被注册,请尝试输入其他账号!'
                })
            }
        }
        if (ret) {
            if (ret.affectedRows > 0) {
                res.send({
                    code: 0,
                    msg: '注册成功!'
                })
            }
        }
    });
});
 app.post('/calculate', function (req, res) {
     try {
         onComputed(req.body);
     }catch (err) {
         switch (err.message) {
             case '除数为0':{
                 res.send({code:1,msg:'除数不能为0！！！',result:''});
                 break;
             }
             case '求余运算两边是小数':{
                 res.send({code:1,msg:'求余运算两边不能是小数！！！',result:''});
                 break;
             }
             case '求余运算分母是0':{
                 res.send({code:1,msg:'求余运算分母不可为0！！！',result:''});
                 break;
             }
         }
     }
     const result=onComputed(req.body);
     res.send({code:0,result})
 });
 app.post('/create-record', function (req, res) {
     db.query('insert into records (user,express,result) values (?,?,?)',[req.body.username,req.body.expression,req.body.result],(err,ret)=>{
         if (err) {
             if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                 res.send({
                     code: 1062,
                     msg: '保存失败'
                 })
             } else {
                 res.send({
                     code: 1063,
                     msg: '某种原因，该操作失败'
                 });
                 throw err
             }
         }
         if (ret) {
             if (ret.affectedRows > 0) {
                 res.send({
                     code: 0,
                     msg: '记录成功!'
                 })
             }
         }

     });
 });
 app.post('/update-record', function (req, res) {
     db.query('update records set express=? ,result=? where id=?',[req.body.expression,req.body.result,req.body.recordID],(err,ret)=>{
         if (err) {
             if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                 res.send({
                     code: 1062,
                     msg: '保存失败'
                 })
             } else {
                 res.send({
                     code: 1063,
                     msg: '某种原因，该操作失败'
                 });
                 throw err
             }
         }
         if (ret) {
             console.log(ret);
             if (ret.affectedRows > 0) {
                 res.send({
                     code: 0,
                     msg: '更新计算记录成功!'
                 })
             }
         }

     });

 });
 app.get('/records', function (req, res) {
     console.log(req.query);
     db.query('SELECT count(*) AS total FROM records where user =  ?;',[req.query.username],(err,ret)=>{
         if(ret){
             const total =ret[0].total;
             if(req.query.page==='1'){
                 db.query('SELECT * FROM records where user =  ? LIMIT 10;',[req.query.username],(err,ret)=>{
                     if(ret){
                         res.send({code:0,ret,total})
                     }
                     if(err){
                         res.send(({code:1,msg:'没有找到相应数据'}))
                     }

                 });
             }else{
                 db.query('SELECT * FROM records where user =  ? LIMIT ?,10;',[req.query.username,(req.query.page-1)*10],(err,ret)=>{
                     if(ret){
                         res.send({code:0,ret,total})
                     }
                     if(err){
                         res.send(({code:1,msg:'没有找到相应数据'}))
                     }

                 });
             }
         }
         if (err) {
             if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                 res.send({
                     code: 1062,
                     msg: '没有找到相应数据'
                 })
             } else {
                 res.send({
                     code: 1063,
                     msg: '某种原因，该操作失败'
                 });
                 throw err
             }
         }

     })
 });
 app.post('/records/deleteRecord', function (req, res) {
     console.log(req.body);
     db.query('delete from records where id= ?',[req.body.recordID],(err,ret)=>{
         if (ret) {
             if (ret.affectedRows > 0) {
                 res.send({
                     code: 0,
                     msg: '删除成功!'
                 })
             }
         }
         if (err) {
             if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                 res.send({
                     code: 1062,
                     msg: '没有找到相应数据'
                 })
             } else {
                 res.send({
                     code: 1063,
                     msg: '某种原因，该操作失败'
                 });
                 throw err
             }
         }
     });
 });
 app.get('/records/details', function (req, res) {
     console.log(req.query);
     db.query('SELECT * FROM records where id =  ? LIMIT 10;',[req.query.recordID],(err,ret)=>{
         if(ret){
             res.send({code:0,ret})
         }
         if (err) {
             if (err.code === 'ER_DUP_ENTRY' && err.errno === 1062) {
                 res.send({
                     code: 1062,
                     msg: '没有找到相应数据'
                 })
             } else {
                 res.send({
                     code: 1063,
                     msg: '某种原因，该操作失败'
                 });
                 throw err
             }
         }
     });
 });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

 module.exports = app;
