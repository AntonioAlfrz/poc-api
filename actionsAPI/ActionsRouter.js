var express = require('express');
var router = express.Router();
var actionsController = require('./ActionsController.js');
var multer  = require('multer')
var upload = multer({ storage: multer.memoryStorage() })

router.param('id', function(req,res,next,id){
    console.log('Endpoint with id:',id);
    next();
})

router.get('/', function(req,res){
    res.send('Actions endpoint');
})

// Health check
router.get('/health', function(req,res){
    res.send('OK');
})

router.get('/list', actionsController.list, function (req, res) {  
    res.send('Update endpoint')
});
// Fieldname must be 'field' in the post request
router.post('/upload',upload.single('file'), actionsController.upload, function (req, res) {
    res.send(req.file);
});

router.patch('/update', actionsController.update, function(req,res){
})

router.delete('/delete/:id', actionsController.delete, function (req, res) {
});

module.exports = router;