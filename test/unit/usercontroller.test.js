var chai = require('chai');

chai.use(require('chai-as-promised'));
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');
require('sinon-as-promised');
var httpMocks = require('node-mocks-http');
var User = require('../../models/User');
var Subs = require('../../models/Subscription');
var Post = require('../../models/Post');
var UserCon = require('../../lib/UserController')(User, Subs, Post);
var mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('User controller', function() {
  var testUser = { username: 'testUser', password: 'asdf' };
  var req, res;

  beforeEach( (done) => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    done();
  });

  describe('#loadByUsername', function() {
    it('should load a user based on req.params.username', function() {
      sinon.mock(User).expects('findOne')
        .resolves(testUser);

      var username = UserCon.loadByUsername(req, res).then(function(user) {
        return user.username;
      });

      return expect(username).to.eventually.equal('testUser');
    });
  });

  describe('#', function() {
  });

});