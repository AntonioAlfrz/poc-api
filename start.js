var users_app = require('./usersAPI/UsersServer.js');
var actions_app = require('./actionsAPI/ActionsServer.js');
var config = require('./env.json')[process.env.NODE_ENV || 'dev'];

users_app.listen(config['users_port']);
actions_app.listen(config['actions_port']);