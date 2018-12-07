var app = require('./UserApp');
var mongoose = require('mongoose');
var server;

exports.listen = function (port) {
    // Reuse server variable for sockets,...
    server = app.listen(process.env.PORT || port, function () {
        console.log('Users server listening on port ' + port);
    });
};

exports.close = function (callback) {
    mongoose.connection.close(function(){
        server.close(function(){
            callback();
            console.log('Users server closed');
        });
    });
    
};