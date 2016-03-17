var express = require('express');
var configRoutes = require('./routes/config');
var instancesRoutes = require('./routes/instances');
var modelRoutes = require('./routes/model');

var app = express();

app.use('/api', configRoutes());
app.use('/api', instancesRoutes());
app.use('/api', modelRoutes());

app.listen(3000);