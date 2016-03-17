var express = require('express');
var configRoutes = require('./routes/config');

var app = express();

app.use('/api', configRoutes());

app.listen(3000);