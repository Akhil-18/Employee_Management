const express = require("express");
const router = express.Router();
const connection = require('./connection');
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res) {
    let query = 'select * from products' +
        ' order by productName';
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    })
})

router.get('/:id', function (req, res) {
    let query = `select * from products where productCode = ${req.params.id}`;
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    })
})

router.post('/employee', urlEncodedParser, jsonParser, function (req, res) {
    if (!req.body) {
        res.send("body is not present");
    }
    else {
        let q = req.body;
        let query = `insert into employees values(${q.emp_no},'${q.lastName}','${q.firstName}','${q.extension}','${q.email}','${q.officeCode}','${q.reportTo}','${q.jobTitle}')`;
        connection.query(query, (err, rows) => {
            if (err) {
                res.send(err.sqlMessage + ' Please use a different employee number use from range 100-200 and re-submit');
            }
            console.log(typeof (rows));
            console.log(rows);
            res.send('Record added to the database succesfully');
        })
    }
})

module.exports = router;