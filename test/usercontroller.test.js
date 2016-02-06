var request = require('supertest');
var should = require('chai').should();
var sinon = require('sinon');
var User = require('../models/User');
var Subs = require('../models/Subscription');
var Post = require('../models/Post');
var UserCon = require('../lib/UserController')(User, Subs, Post);

describe('User controller', function() {

  describe('#loadByUsername', function() {
    it('should load a user based on req.params.username', function(done) {
      sinon.stub(User, 'findOne', function() {
        return { username: 'testUser', password: 'asdf' };
      });

      var req = res = {};
      req.params = { username: 'testUser' };

      UserCon.loadByUsername(req, res, function())
    });
  });

});