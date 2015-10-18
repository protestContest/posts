var Post = require('../models/Post');
var markdown = require('markdown').markdown;

module.exports = {

  loadBySlug: function(req, res, next) {
    Post.findOne({slug: req.params.slug}, function(err, post) {
      if (err) return res.status(500).send(err);
      if (!post) return res.status(404).end();

      req.post = post;
      next();
    });
  },

  loadAll: function(req, res, next) {
    Post.find({}, function(err, posts) {
      if (err) return res.status(500).send(err);

      req.posts = posts;
      next();
    });
  },

  publicOrOwned: function(req, res, next) {
    if (!req.post) return res.status(500).end();

    if (req.post.isPrivate) {
      if (!req.user) {
        return res.status(401).end();
      } else if (req.user._id !== req.post.owner) {
        return res.status(403).end();
      }
    }

    next();
  },

  ownedByUser: function(req, res, next) {
    next();
  },

  sendOne: function(req, res) {
    if (!req.post) return res.status(500).end();

    if (req.accepts('html')) {
      req.post.body = markdown.toHTML(req.post.body);
      res.render('post', { post: req.post });
    } else {
      res.json({
        post: req.post,
        url: '/posts/' + req.post.slug
      });
    }
  },

  sendAll: function(req, res) {
    if (!req.posts) return res.status(500).end();

    res.json({posts: req.posts});
  },

  create: function(req, res, next) {
    if (!req.user) return res.status(401).end();

    var post = new Post({
      title: req.body.title,
      body: req.body.body,
      owner: req.user._id
    });

    post.save(function(err) {
      if (err) return res.status(500).send(err);

      req.post = post;
      next();
    });
  },

  update: function(req, res, next) {
    if (!req.post) return res.status(500).end();

    req.post.title = req.body.title || req.post.title;
    req.post.body = req.body.body || req.post.body;
    req.post.isPrivate = req.body.isPrivate || req.post.isPrivate;

    req.post.save(function(err) {
      if (err) return res.status(500).end();
      next();
    });
  },

  remove: function(req, res, next) {
    if (!req.post) return res.status(500).end();
    req.post.remove(next);
  },

  end: function(req, res) {
    res.end();
  }

};