const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const fetch = require('node-fetch');
const env = "localhost";

router.get('/',function(req,res){
    res.render('index');
})

router.get('/employee', function (req, res) {
    fetch(`http://${env}:5000/api/v1/employee`).then(res => res.json()).then(json => {
        //  console.log(json);
        //  res.send(json);
        res.render('employee', { data: json });
    })
})

router.get('/employee/:id', function (req, res) {
    fetch(`http://${env}:5000/api/v1/employee/${req.params.id}`).then(res => res.json()).then(json => {
        //  console.log(json);
        //  res.send(json);
        res.render('employee', { data: json });
    })
})

router.get('/newemployee', function (req, res) {
    res.render('addEmployee');
})

router.get('/updateemployee', function (req, res) {
    res.render('updateEmployee');
})

router.get('/patchemployee', function (req, res) {
    res.render('patchEmployee');
})

router.get('/deleteemployee', function (req, res) {
    res.render('deleteEmployee');
})

router.post('/employee', urlEncodedParser, jsonParser, function (req, res) {
    var body= {
        'emp_no':req.body.emp_no,
        'lastName':req.body.lastName,
        'firstName':req.body.firstName,
        'extension':req.body.extension,
        'email':req.body.email,
        'officeCode':req.body.officeCode,
        'reportTo':req.body.reportTo,
        'jobTitle':req.body.jobTitle,
    };
    fetch(`http://${env}:5000/api/v1/employee`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if(response.status == 200){
            // res.send('Record added to the database succesfully');
            res.redirect('/employee');
        }
    }).catch(err => {
        console.log(err);
    })
})

router.post('/employeeUpdate', urlEncodedParser, jsonParser, function (req, res) {
    var body= {
        'emp_no':req.body.emp_no,
        'lastName':req.body.lastName,
        'firstName':req.body.firstName,
        'extension':req.body.extension,
        'email':req.body.email,
        'officeCode':req.body.officeCode,
        'reportTo':req.body.reportTo,
        'jobTitle':req.body.jobTitle,
    };
    console.log('entered update api');
    fetch(`http://${env}:5000/api/v1/employee`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if(response.status == 200){
            res.send('Record updated succesfully');
            res.redirect('/employee');
        }
    }).catch(err => {
        console.log(err);
    })
})

router.get('/employeeDelete', function (req, res) {
    console.log('entered in the delete api');
    console.log(req.query);
    if(req.query && req.query.emp_id){
        console.log(`http://${env}:5000/api/v1/employee/${req.query.emp_id}`);
    fetch(`http://${env}:5000/api/v1/employee/`+req.query.emp_id, {
        method: 'DELETE'
    }).then(response => {
        if(response.status == 200){
            // res.send('Record deleted succesfully');
            res.redirect('/employee');
        }
    }).catch(err => {
        console.log(err);
        res.send('Unable to delete');
    })
}
else{
    res.send('Empoyee Id not present');
}
})

router.post('/employeePatch',urlEncodedParser, jsonParser, function (req, res) {
    var body= {
        'emp_no':req.body.emp_no,
        'reportTo':req.body.reportTo,
        'jobTitle':req.body.jobTitle 
    };
    fetch(`http://${env}:5000/api/v1/employee`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if(response.status == 200){
            // res.send('Record updated succesfully');
            res.redirect('/employee');
        }
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
