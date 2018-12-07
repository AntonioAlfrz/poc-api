
var express = require('express');
var router = express.Router();
var userController = require('./UsersController.js');

// Every request in the middleware order implementation
router.use(function index(req, res, next) {
    next();
});

// If a request has ':id' parameter, it is called in one ocurrence
// router.get('/foo/:id) - localhost:port/users/foo/myid
router.param('id', function(req,res,next,id){
    next();
})

router.get('/', function(req,res){
    res.send('Users endpoint');
})

// Health check
router.get('/health', function(req,res){
    res.send('OK');
})

router.get('/list', userController.list, function (req, res) {
});

router.post('/create', userController.create, function (req, res) {
});

router.patch('/update', userController.update, function(req,res){
})

router.delete('/delete/:name', userController.delete, function (req, res) {
});

module.exports = router;