
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*
Middleware --> app / router
     Use --> All requests
     Method --> Only method request (GET,POST)
*/
// HTTP request in req.body as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers (app.use() removes the path)
var routes_actions = require('./ActionsRouter.js');
app.use("/actions", routes_actions);

app.get('/', function (req, res) {
    res.send('Actions endpoint --> /actions');
});

// Ultimately error handlers (4 arguments)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('App ERROR!');
});

module.exports = app;
