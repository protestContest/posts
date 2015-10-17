var request = require('supertest');
var app = require('../app');
var should = require('chai').should();
var Post = require('../models/Post');
var mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('Posts routes', function() {

  before(function(done) {
    mongoose.connect('mongodb://localhost/test', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
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
          should.not.exist(err);
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
    var testPost, privatePost;

    before(function(done) {
      testPost = new Post({
        "title": "Test Post",
        "body": "Please ignore."
      });

      privatePost = new Post({
        "title": "Private Post",
        "body": "Don't look.",
        "private": true
      });

      testPost.save(function() {
        privatePost.save(done);
      });
    });

    after(function(done) {
      testPost.remove(done);
    });

    it('should get a post', function(done) {
      request(app)
        .get('/posts/' + testPost.slug)
        .accept('json')
        .end(function(err, res) {
          should.not.exist(err);
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
          should.not.exist(err);
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
          should.not.exist(err);
          should.exist(res.body.posts);
          done();
        });
    });
  });

});