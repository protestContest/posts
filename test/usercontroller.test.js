var q = require('q');
var chai = require('chai');
var should = chai.should();
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');
require('sinon-as-promised');
var User = require('../models/User');
var Subs = require('../models/Subscription');
var Post = require('../models/Post');
var UserCon = require('../lib/UserController')(User, Subs, Post);

describe('User controller', function() {

  describe('#loadByUsername', function() {
    it('should load a user based on req.params.username', function() {
      var testUser = { username: 'testUser', password: 'asdf' };

      sinon.mock(User).expects('findOne')
        .resolves(testUser);

      var req = {}, res = {};
      req.params = { username: 'testUser' };

      var username = UserCon.loadByUsername(req, res).then(function(user) {
        return user.username;
      });

      return expect(username).to.eventually.equal('testUser');
    });
  });

});