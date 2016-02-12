var express = require('express');
var router = express.Router();

var posts = require('../lib/PostController');
var subs = require('../lib/SubscriptionController');
var util = require('../lib/util');

module.exports = function(User, Subs, Post) {
  var users = require('../lib/UserController')(User, Subs, Post);
  
  router.get('/:username',
    (req, res, next) => {
      users.loadByUsername(req).then((user) => {
        req.data.user = user;
        next();
      }).done();
    },
    subs.loadUserSubscription,
    posts.loadByUser,
    users.sendOne);

  router.post('/',
    users.create,
    users.loginUser,
    util.redirect('/posts'),
    users.sendOne);

  router.get('/',
    users.loadAll,
    users.sendAll);

  router.get('/:username/posts',
    (req, res, next) => {
      users.loadByUsername(req).then((user) => {
        req.data.user = user;
        next();
      }).done();
    },
    posts.loadByUser,
    posts.sendAll);

  router.put('/:username',
    (req, res, next) => {
      users.loadByUsername(req).then((user) => {
        req.data.user = user;
        next();
      }).done();
    },
    users.update,
    users.sendOne);

  router.delete('/:username',
    (req, res, next) => {
      users.loadByUsername(req).then((user) => {
        req.data.user = user;
        next();
      }).done();
    },
    users.remove,
    users.end);

  return router;
};