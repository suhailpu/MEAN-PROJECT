const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/StudentDb");

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email:String,
    password:String
});



module.exports = mongoose.model('user', userSchema, 'users');