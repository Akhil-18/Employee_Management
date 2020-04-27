const mysql = require('mysql'); // my sql import
const connection = mysql.createConnection({
    host: 'mydbinstance.clzn4dnktzfg.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'mydbinstance',
    database: 'classicmodels'
    // host: 'localhost',
    // user: 'root',
    // password: 'Mysqlserver',
    // database: 'classicmodels'
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

  module.exports = connection;