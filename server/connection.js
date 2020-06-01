const mysql = require('mysql');

let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'mycalculator' ,
    port: 3306
});

db.connect();

module.exports = db;
