var request = require('supertest');
var app = require('../app');
var should = require('chai').should();

describe('Posts routes', function() {

  describe('POST /posts/', function() {
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

});