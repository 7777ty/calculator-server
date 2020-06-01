const express = require('express');
const app = new express();


const bodyParser = require('body-parser');
const allowCrossDomain = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/'));

app.listen(3000, () => {
    console.log('server start, listening is 3000');
});

module.exports = app;
