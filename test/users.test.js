var request = require('supertest');
var app = require('../app');
var should = require('chai').should();
var User = require('../models/User');
var mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('User routes', function() {
  var testUser;

  before(function(done) {
    mongoose.connect('mongodb://localhost/test', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  beforeEach(function(done) {
    testUser = new User({
      username: "testUser",
      password: "asdf"
    });

    testUser.save(done);
  });

  afterEach(function(done) {
    testUser.remove(done);
  });

  describe('POST /users', function() {
    before(function(done) {
      User.remove({}, done);
    });

    it('should create a new user', function(done) {
      request(app)
        .post('/users/')
        .accept('json')
        .send({ username: "newUser", password: "asdf" })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should not create a user with the same username', function(done) {
      request(app)
        .post('/users/')
        .accept('json')
        .send({ username: testUser.username, password: "qwer" })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          res.text.should.equal("User exists");
          done();
        });
    });
  });

  describe('GET /user/:username', function() {

    it('should get a user', function(done) {
      request(app)
        .get('/users/' + testUser.username)
        .accept('json')
        .end(function(err, res) {
          if (err) return done(err);

          res.body.user.username.should.equal(testUser.username);
          done();
        });
    });

  });

  describe('GET /users', function() {
    before(function(done) {
      User.create([
        { username: "User_1", password: "asdf" },
        { username: "User_2", password: "qwer" }
      ], done);
    });

    after(function(done) {
      User.remove({}, done);
    });

    it('should get a list of all users', function(done) {
      request(app)
        .get('/users/')
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          should.exist(res.body.users);
          done();
        });
    });
  });

  describe('PUT /users/:username', function() {
    it('should update an existing user', function(done) {
      var updates = {
        password: "newPassword"
      };

      request(app)
        .put('/users/' + testUser.username)
        .send(updates)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body.user.password.should.equal(updates.password);
          done();
        });
    });
  });

  describe('DELETE /users/:username', function() {
    it('should remove the post', function(done) {
      request(app)
        .delete('/users/' + testUser.username)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

});