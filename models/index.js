const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/data-api', {useNewUrlParser:true});

mongoose.Promise = Promise;

//INDEX FILE WILL LEAD TO DATA MODEL
module.exports.Data = require('./data');