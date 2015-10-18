var express = require('express');
var router = express.Router();
var posts = require('../lib/PostController');

router.get('/:slug',
  posts.loadBySlug,
  posts.checkAuth,
  posts.sendOne);

router.post('/',
  posts.create,
  posts.sendOne);

router.get('/',
  posts.loadAll,
  posts.sendAll);

router.put('/:slug',
  posts.loadBySlug,
  posts.update,
  posts.sendOne);

router.delete('/:slug',
  posts.loadBySlug,
  posts.remove,
  posts.end);

module.exports = router;
