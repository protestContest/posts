var express = require('express');
var router = express.Router();
var post = require('../lib/PostController');

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
  post.ownedByUser,
  post.update,
  post.sendOne);

router.delete('/:postIdentifier',
  post.loadById,
  post.ownedByUser,
  post.remove,
  post.end);

module.exports = router;
