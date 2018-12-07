var expect = require("chai").expect;
var axios = require("axios");

var config = require('../env.json')[process.env.NODE_ENV || 'dev'];
var app = require('../users/UsersServer.js');

var url = config.url + config['users_test_port'] + '/users';

describe("Testing Users endpoint", function () {
    before(function () {
        app.listen(config['users_test_port']);
    });
    after(function (done) {
        app.close(done);
    });
    describe("Users endpoint alive", function () {
        // Done is necessary as it is async code
        it("Returns status 200", function () {
            return axios.get(url)
                .then(function (response) {
                    expect(response.status).to.equal(200);
                });
        });
        it("Users endpoint /health check", function () {
            return axios.get(url + "/health")
                .then(function (response) {
                    expect(response.data).to.equal("OK");
                });
        });
    });
    describe("Users endpoint database", function () {
        var mongoose = require('mongoose');
        it("Connected to Mongo", function () {
            // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
            expect(mongoose.connection.readyState).to.equal(1);
        });
        it("Creates, modifies and deletes user", function (done) {
            var test_user = {
                name: "test_name",
                admin: false,
                url: "test_url",
                creation: Date.now()
            }
            var new_user = {
                name: "test_name2"
            }
            axios.post(url + "/create", test_user)
                // User created
                .then(response => {
                    expect(response.data.name).to.equal(test_user.name);
                    return axios.patch(url + '/update', { name: test_user.name, user: new_user });
                })
                // User updated
                .then(response => {
                    expect(response.data.name).to.equal(new_user.name);
                    return axios.delete(url + '/delete/' + new_user.name);
                })
                // User deleted
                .then(response => {
                    expect(response.data.name).to.equal(new_user.name);
                    done();
                })
                .catch(error => {
                    // Borrar db
                    console.log('Error: ' + error);
                    done(error);
                });
        });
    });
});