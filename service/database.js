var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo-sweeden');

module.exports = mongoose;
