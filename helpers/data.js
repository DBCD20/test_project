const db = require('../models')

//INDEX
exports.getDatas = (req, res) => {
    db.Data.find()
    .then(data => res.json(data))
    .catch(err => console.log("Error in Index" + err))
}
//CREATE 
exports.createData = (req, res) => {
    db.Data.create(req.body)
    .then( data => res.json(data))
    .catch(err => console.log("Error in Create" + err))
}
//RETRIEVE
exports.retrieveData = (req, res) => {
    db.Data.findById(req.params.dataid)
    .then( data => res.json(data))
    .catch( err => console.log("Error in Retrieve" + err))
}
//UPDATE
exports.updateData = (req, res) => {
   db.Data.findOneAndUpdate({_id: req.params.dataid}, req.body, {new: true})
   .then(updatedData => res.json(updatedData))
   .catch(err => console.log("Error in Update" + err))
}
//DELETE ROUTE
exports.deleteData = (req, res) => {
    db.Data.remove({_id: req.params.dataid})
    .then(res.json({message: 'Data Deleted!'}))
    .catch(err => res.send("Error in Delete" + err))
}

module.exports = exports;