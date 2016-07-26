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

router.post('/posts',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    if (!req.body.post) return res.status(400).end();
    
    const post = new Post({
      owner: req.user._id,
      title: req.body.post.title,
      body: req.body.post.body
    });

    post.save().then(() => res.json({post}))
      .catch((error) => res.status(500).json({ error }));
  });

router.put('/posts/:slug',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    if (req.body.post.owner !== req.user._id.toString()) return res.status(403).json({ error: { message: 'Forbidden' } });
    if (!req.body.post) return res.status(400).end();

    Post.findOne({ slug: req.params.slug })
      .then((post) => {
        if (!post) return res.status(404).end();

        post.title = req.body.post.title || post.title;
        post.body = req.body.post.body || post.body;
        post.updated = Date.now();

        if (post.isPrivate && req.body.post.isPrivate === false) {
          post.isPrivate = false;
          post.published = Date.now();
        }

        post.save().then(() => res.json({post}))
          .catch((error) => res.status(500).json({ error }));
      });
  });

router.delete('/posts/:id',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) return res.status(404).end();
        if (post.owner.toString() !== req.user._id.toString()) return res.status(403).json({ error: { message: 'Forbidden' } });
        post.remove().then(() => res.status(200).end());
      });
  });

module.exports = router;
