const express = require('express');
const app = express();
var swaggerUi = require('swagger-ui-express'); // swagger
swaggerDocument = require('./swagger.json');
var employeeApi = require('./apis/employee');
var routes = require('./apis/router');

// setting the app-engine
app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));


// swagger document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/api/v1', employeeApi);
app.use('/',routes);

// starting the app
app.listen(5000, function () {
    console.log('app started and listening on port 5000');
})