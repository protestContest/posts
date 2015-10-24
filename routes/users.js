var express = require('express');
var router = express.Router();
var users = require('../lib/UserController');
var posts = require('../lib/PostController');

router.get('/:username',
  users.loadByUsername,
  users.sendOne);

router.post('/',
  users.create,
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