
var express = require('express');
var app = express();
// Connection to Mongo
var db = require('./dbConnection.js');
var bodyParser = require('body-parser');

/*
Middleware --> app / router
     Use --> All requests
     Method --> Only method request (GET,POST)
*/
// req.body...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers (app.use() removes the path)
var routes_users = require('./UsersRouter.js');
app.use("/users", routes_users);

app.get('/', function (req, res) {
    res.send('Users endpoint --> /users');
});

// Ultimately error handlers (4 arguments)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('App ERROR!');
});

module.exports = app;
