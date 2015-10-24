var Post = require('../models/Post');
var markdown = require('markdown').markdown;
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = PostController = {

  loadBySlug: function(req, res, next) {
    Post.findOne({slug: req.params.postIdentifier}, function(err, post) {
      if (err) return res.status(500).send(err);
      if (!post) return res.status(404).end();

      req.data.post = post;
      next();
    });
  },

  loadById: function(req, res, next) {
    if (!validId(req.params.postIdentifier)) return res.status(400).end();

    Post.findById(req.params.postIdentifier, function(err, post) {
      if (err) return res.status(500).send(err);
      if (!post) return res.status(404).end();
      req.data.post = post;
      next();
    });
  },

  loadByIdentifier: function(req, res, next) {
    if (validId(req.params.postIdentifier)) {
      PostController.loadById(req, res, next);
    } else {
      PostController.loadBySlug(req, res, next);
    }
  },

  loadAllPublic: function(req, res, next) {
    Post.find({isPrivate: false}, function(err, posts) {
      if (err) return res.status(500).send(err);

      req.data.posts = posts;
      next();
    });
  },

  publicOrOwned: function(req, res, next) {
    if (!req.data.post) return res.status(500).end();

    if (req.data.post.isPrivate) {
      if (!req.user) {
        return res.status(401).end();
      } else if (req.user._id.toString() !== req.data.post.owner.toString()) {
        return res.status(403).end();
      }
    }

    next();
  },

  ownedByUser: function(req, res, next) {
    if (!req.data.post) return res.status(500).end();
    if (!req.user) return res.status(401).end();

    if (req.user._id.toString() !== req.data.post.owner.toString()) {
      return res.status(403).end();
    }

    next();
  },

  sendOne: function(req, res) {
    if (!req.data.post) return res.status(500).end();

    if (req.accepts('html')) {
      req.data.post.body = markdown.toHTML(req.data.post.body);
      res.render('post', { post: req.data.post });
    } else {
      res.json({
        post: req.data.post,
        url: '/posts/' + req.data.post.slug
      });
    }
  },

  sendAll: function(req, res) {
    if (!req.data.posts) return res.status(500).end();

    res.json({posts: req.data.posts});
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

      req.data.post = post;
      next();
    });
  },

  update: function(req, res, next) {
    if (!req.data.post) return res.status(500).end();

    req.data.post.title = req.body.title || req.data.post.title;
    req.data.post.body = req.body.body || req.data.post.body;
    req.data.post.isPrivate = req.body.isPrivate || req.data.post.isPrivate;

    req.data.post.save(function(err) {
      if (err) return res.status(500).end();
      next();
    });
  },

  remove: function(req, res, next) {
    if (!req.data.post) return res.status(500).end();
    req.data.post.remove(next);
  },

  end: function(req, res) {
    res.end();
  }

};

function validId(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}