const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended : false});

const app = express();

app.set('view engine','ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysqlserver',
    database: 'classicmodels'
  });
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get('/',function(req,res){
//     res.render('executeQuery');
//     // res.send('Hello,Welcome to this website!');
// })

app.get('/',function(req,res){
    res.send('Welcome to this website');
})

app.get('/v1/employee',function(req,res){
    let query = 'select * from employees'+
                    ' order by officeCode';
    connection.query(query,(err,rows) => {
        if(err) throw err;
        // console.log(rows.constructor === Array);
        res.render('employee',{data:rows});
    })
})

app.get('/v1/employee/:id',function(req,res){
    let query = `select * from employees where employeeNumber = ${req.params.id}`;
    connection.query(query,(err,rows) => {
        if(err) throw err;
        res.send(rows);
    })
})

app.get('/v1/newemployee',function(req,res){
    res.render('addEmployee');
})

app.get('/v1/department',function(req,res){

})

app.post('/v1/employee',urlEncodedParser,jsonParser, function(req,res){
    let q = req.body;
    let query = `insert into employees values(${q.emp_no},'${q.lastName}','${q.firstName}','${q.extension}','${q.email}','${q.officeCode}','${q.reportTo}','${q.jobTitle}')`; 
    connection.query(query,(err,rows) => {
        if(err) {
            res.send(err.sqlMessage+' Please use a different employee number use from range 100-200 and re-submit');
        }
        console.log(typeof(rows));
        console.log(rows);
        res.send('Record added to the database succesfully');
    })
})

app.post('/v1/query',urlEncodedParser,jsonParser, function(req,res){
    let q = req.body;
    let query = q.query;
    console.log(query);
    connection.query(query,(err,rows) => {
        if(err) {
            res.send(err.sqlMessage+' Please use a different employee number use from range 100-200 and re-submit');
        }
        // console.log(typeof(rows));
        console.log(rows);
        res.send('Record added to the database succesfully');
    })
})

app.put('/v1/employee',urlEncodedParser,jsonParser, function(req,res){
    let query = `UPDATE employees SET lastName = '${req.body.lastName}',firstName = '${req.body.firstName}',extension = '${req.body.extension}',email = '${req.body.email}',officeCode = '${req.body.officeCode}',
    reportsTo = '${req.body.reportTo}',jobTitle = '${req.body.jobTitle}' WHERE employeeNumber = ${req.body.emp_no}`;
    connection.query(query,(err,rows) => {
        if(err) {
            res.send(err.sqlMessage+' Please use a different employee number use from range 100-200 and re-submit');
        }
        console.log(rows);
        res.send('Record updated succesfully');
    })
})

app.delete('/v1/employee/:id',function(req,res){
    console.log(req.params);
    let query = `DELETE FROM employees WHERE employeeNumber = ${req.params.id}`;
    connection.query(query,(err,rows) => {
        if(err) {
            res.send(err.sqlMessage+' Please use a different employee number use from range 100-200 and re-submit');
        }
        console.log(rows);
        res.send('Record deleted succesfully');
    })
})

app.patch('/v1/employee',function(req,res){
})


app.listen(5000,function(){
    console.log('app started and listening on port 5000');
})