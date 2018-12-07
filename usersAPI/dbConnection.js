var mongoose = require('mongoose');
var config = require('../env.json')[process.env.NODE_ENV || 'dev'];
var dbURI = config['dbURI'];

// Connection events
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose UsersApp connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose UsersApp connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose UsersApp connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose UsersApp connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

mongoose.connect(dbURI);