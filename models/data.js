const mongoose = require('mongoose');

//DATA SCHEMA
let dataSchema = new mongoose.Schema({
    client: {type: String, required: 'Name cannot be blank'},
    acceptSR: {type: String, required: "This too should be filled"},
    date: {type: Date, default: Date.now }
    });
//PUT SCHEMA IN A MODEL 
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;