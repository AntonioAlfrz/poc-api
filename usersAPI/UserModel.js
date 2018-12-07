var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {type: String, unique:true, required: true},
    admin: Boolean,
    url: String,
    creation: Date
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');