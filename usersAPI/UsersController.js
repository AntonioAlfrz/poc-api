
var User = require('./UserModel.js');

exports.create = function (req, res, next) {
    User.create({
        name: req.body.name,
        admin: req.body.admin,
        url: req.body.url,
        creation: req.get('Date')
    },
        function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send({'error':"There was a problem adding an user to the database"});
            }
            console.log('User ' + user.name + ' created');
            return res.status(200).send(user);
        }
    );
}

exports.delete = function (req, res, next) {
    User.findOneAndRemove({ 'name': req.params.name }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send({'error':"There was a problem deleting an user to the database."});
        }
        if (user) {
            console.log('User ' + user.name + ' deleted');
            return res.send(user);
        } else {
            console.log('No user found with name ' + req.params.name);
            return res.send({'error':'No user found with name ' + req.body.name});
        }
    });
}

exports.list = function (req, res, next) {
    User.find(function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({'error':"There was a problem with the database"});
        } else {
            console.log("Listing users")
            res.send(user);
        }
    });
}

exports.update = function (req, res, next) {
    User.findOneAndUpdate({ 'name': req.body.name }, req.body.user, { new: true }, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({'error':"There was a problem with the database"});
        } else {
            if (user) {
                console.log("Updating user " + req.body.name + " to " + user.name);
                return res.send(user);
            } else {
                return res.send({'error':'No user found with name ' + req.body.name});
            }
        }
    });
}