var inquirer = require('inquirer');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root', // Usually would keep this in .env file
    database: 'bamazon'
})

conn.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected as id = " + conn.threadId);
})
