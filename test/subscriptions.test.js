var request = require('supertest');
var app = require('../app');
var Subscription = require('../models/Subscription');
var User = require('../models/User');
var Post = require('../models/Post');
var mongoose = require('mongoose');
var testUtils = require('./testUtils');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('Subscription routes', function() {
  var testUser1, testUser2, user2Post, cookies;

  before(function(done) {
    mongoose.connect('mongodb://localhost/test', function() {
      done();
    });
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  beforeEach(function(done) {
    testUser1 = new User({
      username: 'testUser1',
      password: 'asdf'
    });

    testUser2 = new User({
      username: 'testUser2',
      password: 'asdf'
    });

    testUser1.save(function(err) {
      if (err) return done(err);

      testUser2.save(function(err) {
        if (err) return done(err);

        testUtils.loginUser(app, testUser1, function(err, sessionCookies) {
          if (err) return done(err);

          cookies = sessionCookies;

          user2Post = new Post({
            'title': 'Test Post',
            'body': 'Please ignore.',
            'isPrivate': false,
            'owner': testUser2._id
          });

          user2Post.save(function(err) {
            if (err) return done(err);

            done();
          });
        });
      });
    });

  });

  afterEach(function(done) {
    User.remove(function(err) {
      if (err) return done(err);

      Post.remove(done);
    });
  });

  describe('POST /subscriptions', function() {
    after(function(done) {
      Post.remove({}, done);
    });

    it('should create a subscription', function(done) {
      var req = request(app).post('/subscriptions/');
      req.cookies = cookies;
      req.accept('json')
        .send({ target: testUser2._id })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body.subscription.owner.should.equal(testUser1._id.toString());
          res.body.subscription.target.should.equal(testUser2._id.toString());
          done();
        });
    });

    it('should not allow posting when not logged in', function(done) {
      request(app)
        .post('/subscriptions/')
        .accept('json')
        .send({ target: testUser2._id })
        .expect(401)
        .end(function(err) {
          if (err) return done(err);

          done();
        });
    });
  });

  describe('GET /subscriptions/:subscriptionId', function() {
    var sub1;

    beforeEach(function(done) {
      sub1 = new Subscription({
        owner: testUser1._id,
        target: testUser2._id
      });

      sub1.save(done);
    });

    after(function(done) {
      Subscription.remove({}, done);
    });

    it('should get a subscription detail by id', function(done) {
      var req = request(app).get('/subscriptions/' + sub1._id);
      req.cookies = cookies;
      req.accept('json')
        .end(function(err, res) {
          if (err) return done(err);
          res.body.subscription.owner.should.equal(testUser1._id.toString());
          res.body.subscription.target.should.equal(testUser2._id.toString());
          done();
        });
    });

    it('should get a subscription detail by target name', function(done) {
      var req = request(app).get('/subscriptions/' + testUser2.username);
      req.cookies = cookies;
      req.accept('json')
        .end(function(err, res) {
          if (err) return done(err);

          res.body.subscription.owner.should.equal(testUser1._id.toString());
          res.body.subscription.target.should.equal(testUser2._id.toString());
          done();
        });
    });

  });

  describe('PUT /subscriptions/:id', function() {
    var sub1;

    beforeEach(function(done) {
      sub1 = new Subscription({
        owner: testUser1._id,
        target: testUser2._id
      });

      sub1.save(done);
    });

    after(function(done) {
      Subscription.remove({}, done);
    });

    it('should update an existing subscription', function(done) {
      var updates = {
        filters: ['sensitive']
      };

      var req = request(app).put('/subscriptions/' + sub1._id);
      req.cookies = cookies;
      req.send(updates)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body.subscription.filters.should.contain('sensitive');
          done();
        });
    });

  });

  describe('DELETE /subscriptions/:id', function() {
    var sub1;

    beforeEach(function(done) {
      sub1 = new Subscription({
        owner: testUser1._id,
        target: testUser2._id
      });

      sub1.save(done);
    });

    after(function(done) {
      Subscription.remove({}, done);
    });

    it('should remove the subscription if owned', function(done) {
      var req = request(app).delete('/subscriptions/' + sub1._id);
      req.cookies = cookies;
      req.accept('json')
        .expect(200)
        .end(function(err) {
          if (err) return done(err);
          done();
        });

    });

    it('should not remove the post if not owned', function(done) {
      request(app)
        .delete('/subscriptions/' + sub1._id)
        .accept('json')
        .expect(401)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });
  });

});