var express = require('express');
var router = express.Router();
var post = require('../lib/PostController');
var user = require('../lib/UserController');

router.get('/:slug',
  post.loadBySlug,
  post.publicOrOwned,
  post.sendOne);

router.post('/',
  post.create,
  post.sendOne);

router.get('/',
  post.loadAll,
  post.sendAll);

router.put('/:slug',
  post.loadBySlug,
  post.update,
  post.sendOne);

router.delete('/:slug',
  post.ownedByUser,
  post.loadBySlug,
  post.remove,
  post.end);

module.exports = router;
