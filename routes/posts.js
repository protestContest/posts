var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var slug = require('slug');
var markdown = require('markdown').markdown;

router.get('/:slug', function(req, res) {
  Post.findOne({slug: req.params.slug}, function(err, post) {
    if (err) return res.send(500, err);

    post.body = markdown.toHTML(post.body);

    res.render('post', { post: post });
  });
});

router.post('/', function(req, res) {
  var post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  post.slug = slug(post.title);

  post.save(function(err) {
    if (err) return res.send(500, err);

    res.redirect('/posts');
  });
});

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) return res.send(500, err);

    res.render('postForm', {postList: posts});
  });
});

module.exports = router;
