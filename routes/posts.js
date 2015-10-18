var express = require('express');
var router = express.Router();
var post = require('../lib/PostController');
var user = require('../lib/UserController');

router.get('/:postIdentifier',
  post.loadByIdentifier,
  post.publicOrOwned,
  post.sendOne);

router.post('/',
  post.create,
  post.sendOne);

router.get('/',
  post.loadAllPublic,
  post.sendAll);

router.put('/:postIdentifier',
  post.loadById,
  post.update,
  post.sendOne);

router.delete('/:slug',
  post.ownedByUser,
  post.loadBySlug,
  post.remove,
  post.end);

module.exports = router;
