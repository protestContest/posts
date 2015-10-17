var request = require('supertest');
var app = require('../app');
var should = require('chai').should();
var Post = require('../models/Post');

describe('Posts routes', function() {

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
          should.exist(res.body.post.url);
          done();
        });
    });
  });

  describe('GET /posts/:postId', function() {
    var testPost;

    before(function(done) {
      testPost = new Post({
        "title": "Test Post",
        "body": "Please ignore."
      });

      testPost.save(done);
    });

    after(function(done) {
      testPost.remove(done);
    });

    it('should get a post html by default', function(done) {
      request(app)
        .get('/posts/' + testPost.slug)
        .end(function(err, res) {
          should.not.exist(err);
          should.not.exist(res.body.post);
          should.exist(res.text);
          done();
        });
    });

    it('should get a post JSON with the .json extension', function(done) {
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