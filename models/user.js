const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phonenumber: Number,
    password: String
});
module.exports = mongoose.model('Userinfo', userSchema);