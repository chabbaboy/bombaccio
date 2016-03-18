var express = require('express');
var bodyParser = require('body-parser');
var configRoutes = require('./routes/config');
var instancesRoutes = require('./routes/instances');
var modelRoutes = require('./routes/model');
var modelParameters = require('./routes/parameter');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', configRoutes());
app.use('/api', instancesRoutes());
app.use('/api', modelRoutes());
app.use('/api', modelParameters());

app.listen(3000);