var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Subs = require('../models/Subscription');
var Post = require('../models/Post');
var users = require('../lib/UserController')(User, Subs, Post);
var posts = require('../lib/PostController');
var subs = require('../lib/SubscriptionController');
var util = require('../lib/util');

router.get('/:username',
  users.loadByUsername,
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
  users.loadByUsername,
  posts.loadByUser,
  posts.sendAll);

router.put('/:username',
  users.loadByUsername,
  users.update,
  users.sendOne);

router.delete('/:username',
  users.loadByUsername,
  users.remove,
  users.end);

module.exports = router;