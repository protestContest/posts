var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Subs = require('../models/Subscription');
var Post = require('../models/Post');
var post = require('../lib/PostController');
var user = require('../lib/UserController')(User, Subs, Post);
var util = require('../lib/util');

router.get('/new',
  user.loginOrContinue,
  user.loadLoggedInUser,
  util.renderPage('EditPostPage'));

router.get('/:postIdentifier/edit',
  user.loginOrContinue,
  post.loadByIdentifier,
  post.ownedByUser,
  util.renderPage('EditPostPage'));

router.get('/:postIdentifier/delete',
  user.loginOrContinue,
  post.loadByIdentifier,
  post.ownedByUser,
  util.renderPage('DeletePostPage'));

router.get('/:postIdentifier/publish',
  user.loginOrContinue,
  post.loadByIdentifier,
  post.ownedByUser,
  util.renderPage('PublishPostPage'));

router.get('/:postIdentifier',
  post.loadByIdentifier,
  post.publicOrOwned,
  post.sendOne);

router.post('/',
  post.create,
  post.sendOne);

router.get('/',
  user.loginOrContinue,
  user.loadLoggedInUser,
  post.loadByUser,
  post.sendAll);

router.put('/:postIdentifier',
  post.loadById,
  post.ownedByUser,
  post.update,
  post.showPost,
  post.sendOne);

router.delete('/:postIdentifier',
  post.loadById,
  post.ownedByUser,
  post.remove,
  util.redirect('/'),
  post.end);

module.exports = router;
