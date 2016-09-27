
//  U S E R   R E S O U R C E
//  =========================

//  Requires Mongoose
//  -----------------
var mongoose = require('mongoose');

//  Define the user resource model
//  ------------------------------
var UserSchema = new mongoose.Schema( {
  username:  String,
  password:  String,
});

//  Declare User as a model and attach the schema to it
//  ---------------------------------------------------
module.exports = mongoose.model('User', UserSchema);
