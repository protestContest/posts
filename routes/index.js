var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var passport = require('passport');

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) return res.send(err);

    res.render('postList', {postList: posts});
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.end();
});

router.get('/login', function(req, res) {
  res.render('loginForm');
});

module.exports = router;
