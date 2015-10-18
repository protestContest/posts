var request = require('supertest');
var app = require('../app');
var should = require('chai').should();
var Post = require('../models/Post');
var User = require('../models/User');
var mongoose = require('mongoose');
var testUtils = require('./testUtils');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('Posts routes', function() {
  var testPost, testUser, cookies;

  before(function(done) {
    mongoose.connect('mongodb://localhost/test', function() {
      testUser = new User({
        username: 'testUser',
        password: 'asdf'
      });

      testUser.save(function(err) {
        testUtils.loginUser(app, testUser, function(err, sessionCookies) {
          cookies = sessionCookies;
          done();
        });
      });

    });
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  beforeEach(function(done) {
    testPost = new Post({
      "title": "Test Post",
      "body": "Please ignore."
    });

    testPost.save(done);
  });

  afterEach(function(done) {
    testPost.remove(done);
  });

  describe('POST /posts/', function() {
    after(function(done) {
      Post.remove({}, done);
    });

    it('should allow a logged in user to post', function(done) {
      var req = request(app).post('/posts/');
      req.cookies = cookies;
      req.accept('json')
        .send({ title: "Test Post", body: "Please ignore." })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body.post.owner.should.equal(testUser._id.toString());
          done();
        });
    });

    it('should not allow posting when not logged in', function(done) {
      request(app)
        .post('/posts/')
        .accept('json')
        .send({ title: "Test Post", body: "Please ignore." })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);

          done();
        });
    });

    it('should return the URL of the new post', function(done) {
      var req = request(app).post('/posts/');
      req.cookies = cookies;
      req.accept('json')
        .send({ title: "Test Post", body: "Please ignore." })
        .end(function(err, res) {
          if (err) return done(err);

          should.exist(res.body.url);
          done();
        });
    });
  });

  describe('GET /posts/:slugOrId', function() {
    var privatePost, privateOwnPost;

    before(function(done) {
      privatePost = new Post({
        "title": "Private Post",
        "body": "Don't look.",
        "isPrivate": true
      });

      privateOwnPost = new Post({
        "title": "My Private Post",
        "body": "My secrets.",
        "isPrivate": true,
        "owner": testUser._id
      });

      privatePost.save(function(err) {
        privateOwnPost.save(done);
      });
    });

    after(function(done) {
      Post.remove({}, function(err) {
        User.remove({}, done);
      });
    });

    it('should get a post by slug', function(done) {
      request(app)
        .get('/posts/' + testPost.slug)
        .accept('json')
        .end(function(err, res) {
          if (err) return done(err);

          res.body.post.title.should.equal(testPost.title);
          res.body.post.body.should.equal(testPost.body);
          done();
        });
    });

    it('should get a post by id', function(done) {
      request(app)
        .get('/posts/' + testPost._id)
        .accept('json')
        .end(function(err, res) {
          if (err) return done(err);

          res.body.post.title.should.equal(testPost.title);
          res.body.post.body.should.equal(testPost.body);
          done();
        });
    });

    it('should not get a private post', function(done) {
      request(app)
        .get('/posts/' + privatePost.slug)
        .accept('json')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should get a private post if logged in user owns it', function(done) {
      var req = request(app).get('/posts/' + privateOwnPost.slug);
      req.cookies = cookies;
      req.accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('GET /posts', function() {
    before(function(done) {
      Post.create([
        { title: "Post 1", body: "asdf" },
        { title: "Post 2", body: "qwer" }
      ], done);
    });

    after(function(done) {
      Post.remove({}, done);
    });

    it('should get a list of all public posts', function(done) {
      request(app)
        .get('/posts/')
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          should.exist(res.body.posts);
          res.body.posts.length.should.equal(1);
          res.body.posts[0].isPrivate.should.equal(false);
          done();
        });
    });
  });

  describe('PUT /posts/:slug', function() {
    it('should update an existing post', function(done) {
      var updates = {
        title: "Updated Title",
        body: "Updated body.",
        isPrivate: true
      };

      request(app)
        .put('/posts/' + testPost.slug)
        .send(updates)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body.post.title.should.equal(updates.title);
          res.body.post.body.should.equal(updates.body);
          res.body.post.isPrivate.should.equal(updates.isPrivate);
          done();
        });
    });

    it.skip('should not update a post the logged in user does not own', function(done) {

    });
  });

  describe('DELETE /posts/:slug', function() {
    it('should remove the post if owned', function(done) {
      request(app)
        .delete('/posts/' + testPost.slug)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should not remove the post if not owned', function(done) {
      request(app)
        .delete('/posts/' + testPost.slug)
        .accept('json')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

});