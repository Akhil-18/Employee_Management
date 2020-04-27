const express = require("express");
const router = express.Router();
const connection = require('./connection');
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get('/employee', function (req, res) {
    let query = 'select * from employees' +
        ' order by officeCode';
    connection.query(query, (err, rows) => {
        if (err) {
              res.status(500).send('Could not fetch the results');
        }
        res.status(200).send(rows);
    })
})

router.get('/employee/:id', function (req, res) {
    let query = `select * from employees where employeeNumber = ${req.params.id}`;
    connection.query(query, (err, rows) => {
        if (err){
             res.status(500).send(err.sqlMessage);
        }
        if(rows.length != 0){
            res.status(200).send(rows);
        }
        else
            res.status(404).send('No records found');
    })
})

router.post('/employee', urlEncodedParser, jsonParser, function (req, res) {
    if (!req.body) {
        res.status(400).send("body is not present");
    }
    else {
        let q = req.body;
        let query = `insert into employees values(${q.emp_no},'${q.lastName}','${q.firstName}','${q.extension}','${q.email}','${q.officeCode}','${q.reportTo}','${q.jobTitle}')`;
        connection.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage + ' Please use a different employee number use from range 100-200 and re-submit');
            }
            else{
            res.status(200).send('Record added to the database succesfully');
            }
        })
    }
})

router.put('/employee', urlEncodedParser, jsonParser, function (req, res) {
    console.log("entered in put api");
    console.log(req.body);
    if (!req.body) {
        res.send("Please send the request body");
    }
    else {
        let query = `UPDATE employees SET lastName = '${req.body.lastName}',firstName = '${req.body.firstName}',extension = '${req.body.extension}',email = '${req.body.email}',officeCode = '${req.body.officeCode}',
         reportsTo = '${req.body.reportTo}',jobTitle = '${req.body.jobTitle}' WHERE employeeNumber = ${req.body.emp_no}`;
        connection.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage + ' Please use a different employee number use from range 100-200 and re-submit');
            }
            else{
                res.status(200).send('Record updated succesfully');
            }          
        })
    }
})

router.delete('/employee/:id', function (req, res) {
        // console.log(req.params);
        let query = `DELETE FROM employees WHERE employeeNumber = ${req.params.id}`;
        connection.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage + ' Please use a different employee number use from range 100-200 and re-submit');
            }
            else{
                console.log(rows);
            res.send('Record deleted succesfully');
            }
        })

})

router.patch('/employee', urlEncodedParser, jsonParser,function (req, res) {
    console.log(req.body);
    let query = `UPDATE employees SET reportsTo = '${req.body.reportTo}',jobTitle = '${req.body.jobTitle}' WHERE employeeNumber = ${req.body.emp_no}`;
   connection.query(query, (err, rows) => {
       if (err) {
           res.status(500).send(err.sqlMessage + ' Please use a different employee number use from range 100-200 and re-submit');
       }
       else{
        res.status(200).send('Record updated succesfully');
       }
   })
})

module.exports = router;