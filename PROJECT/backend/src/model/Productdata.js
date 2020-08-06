const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/StudentDb");
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    studentId : Number,
    studentName : String,
    
    studentDob : String,
    markEng : Number,
    markMath : Number,
    markSci : Number,
    imageUrl : String
});

var Productdata = mongoose.model('student' , NewProductSchema ); 

module.exports = Productdata;