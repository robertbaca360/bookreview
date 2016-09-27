var mongoose = require('mongoose');

//  Location of the database
//  ------------------------
var connectionString = process.env.DB_HOST;

//  Connect to the database
//  -----------------------
mongoose.connect(connectionString);

//  Alert when connected
//  --------------------
mongoose.connection.on('connected', function() {
  console.log('Mongoose is connected at ' + connectionString + '.');
});

//  Alert when error occurs
//  -----------------------
mongoose.connection.on('error', function(error) {
  console.log('Mongoose connction error: ' + error);
});

//  Alert when mongoose disconnects
//  -------------------------------
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected.');
});
