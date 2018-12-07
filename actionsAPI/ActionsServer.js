var app = require('./ActionsApp');
var server;

exports.listen = function (port) {
    // Reuse server variable for sockets,...
    server = app.listen(process.env.PORT || port, function () {
        console.log('Actions server listening on port ' + port);
    });
};

exports.close = function (callback) {
    server.close(function () {
        callback();
        console.log('Actions server closed');
    });
};