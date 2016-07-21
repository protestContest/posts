var express = require('express');
var router = express.Router();
var passport = require('passport');
var Post = require('../models/Post');

router.get('/users/:username/posts',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    if (req.user.username === req.params.username) {
      Post.find({owner: req.user._id})
        .then((posts) => {
          res.json({posts});
        });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
