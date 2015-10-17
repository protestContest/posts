var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var markdown = require('markdown').markdown;

router.get('/:slug', function(req, res) {
  Post.findOne({slug: req.params.slug}, function(err, post) {
    if (err) return res.status(500).send(err);
    if (!post) return res.status(404).end();

    if (req.accepts('html')) {
      post.body = markdown.toHTML(post.body);
      res.render('post', { post: post });
    } else {
      res.json({post: post});
    }
  });
});

router.post('/', function(req, res) {
  var post = new Post({
    title: req.body.title,
    body: req.body.body
  });

  post.save(function(err) {
    if (err) return res.status(500).send(err);

    if (req.accepts('html')) {
      res.redirect('/posts/' + post.slug);
    } else {
      res.json({post: {url: '/posts/' + post.slug}});
    }
  });
});

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) return res.status(500).send(err);

    res.render('postForm', {postList: posts});
  });
});

module.exports = router;
