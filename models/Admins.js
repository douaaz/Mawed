const mongoose = require('mongoose');

const AdminsSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const AdminsModel = mongoose.model('admins', AdminsSchema);

module.exports = AdminsModel;
