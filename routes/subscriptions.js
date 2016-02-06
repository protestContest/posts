var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Subs = require('../models/Subscription');
var Post = require('../models/Post');
var user = require('../lib/UserController')(User, Subs, Post);
var subs = require('../lib/SubscriptionController');
var util = require('../lib/util');

router.get('/:subId',
  user.loginOrContinue,
  user.loadLoggedInUser,
  subs.loadByIdentifier,
  subs.ownedByUser,
  subs.sendOne);

router.post('/',
  subs.create,
  util.redirect('/feed'),
  subs.sendOne);

router.put('/:subId',
  user.loginOrContinue,
  user.loadLoggedInUser,
  subs.loadByIdentifier,
  subs.ownedByUser,
  subs.update,
  subs.sendOne);

router.delete('/:subId',
  user.loadLoggedInUser,
  subs.loadByIdentifier,
  subs.ownedByUser,
  subs.remove,
  util.redirect('/feed'),
  subs.end);

module.exports = router;
