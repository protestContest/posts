var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var posts = require('../lib/Posts');

router.get('/:slug',
  posts.loadPostBySlug,
  posts.checkAuth,
  posts.sendOne);

router.post('/',
  posts.create,
  posts.sendOne);

router.get('/',
  posts.loadAll,
  posts.sendAll);

module.exports = router;
