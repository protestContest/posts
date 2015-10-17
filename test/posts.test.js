var request = require('supertest');
var app = require('../app');
var should = require('chai').should();
var Post = require('../models/Post');
var mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('Posts routes', function() {
  var testPost;

  before(function(done) {
    mongoose.connect('mongodb://localhost/test', done);
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

    it('should return HTTP 200', function(done) {
      request(app)
        .post('/posts/')
        .accept('json')
        .send({ title: "Test Post", body: "Please ignore." })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          done();
        });
    });

    it('should return the URL of the new post', function(done) {
      request(app)
        .post('/posts/')
        .accept('json')
        .send({ title: "Test Post", body: "Please ignore." })
        .end(function(err, res) {
          should.exist(res.body.url);
          done();
        });
    });
  });

  describe('GET /posts/:postId', function() {
    var privatePost;

    before(function(done) {
      privatePost = new Post({
        "title": "Private Post",
        "body": "Don't look.",
        "isPrivate": true
      });

      privatePost.save(done);
    });

    after(function(done) {
      privatePost.remove(done);
    });

    it('should get a post', function(done) {
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

    it('should get a list of all posts', function(done) {
      request(app)
        .get('/posts/')
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          should.exist(res.body.posts);
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
  });

  describe('DELETE /posts/:slug', function() {
    it('should remove the post', function(done) {
      request(app)
        .delete('/posts/' + testPost.slug)
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

});