var Post = require('../models/Post');
var markdown = require('markdown').markdown;
var util = require('./util');

var PostController = module.exports = {

  loadBySlug: function(req, res, next) {
    Post.findOne({slug: req.params.postIdentifier}, function(err, post) {
      if (err) return res.status(500).send(err);
      if (!post) return res.status(404).end();

      req.data.post = post;
      next();
    });
  },

  loadById: function(req, res, next) {
    if (!util.validId(req.params.postIdentifier)) return res.status(400).end();

    Post.findById(req.params.postIdentifier, function(err, post) {
      if (err) return res.status(500).send(err);
      if (!post) return res.status(404).end();
      req.data.post = post;
      next();
    });
  },

  loadByIdentifier: function(req, res, next) {
    if (util.validId(req.params.postIdentifier)) {
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

  loadByUser: function(req, res, next) {
    if (!req.data.user) return next(new Error('Unmet dependency: user not defined'));

    var query = {owner: req.data.user._id};

    if (!req.user || req.user._id.toString() !== req.data.user._id.toString()) {
      // not getting own posts
      query.isPrivate = false;
    }

    Post.find(query).sort('-updated').exec(function(err, posts) {
      if (err) return next(err);

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

      var ownPost = (req.user && req.user._id.toString() === req.data.post.owner.toString());
      var page = ownPost ? 'ViewOwnPostPage' : 'ViewPostPage';

      res.renderReact(page, { post: req.data.post, ownPost: ownPost });
    } else {
      res.json({
        post: req.data.post,
        url: '/posts/' + req.data.post.slug
      });
    }
  },

  sendAll: function(req, res) {
    if (!req.data.posts) return res.status(500).end();
    var loggedIn = (req.user && req.user._id.toString() === req.data.user._id.toString()) ? true : false;

    if (req.accepts('html')) {
      res.renderReact('PostListPage', { posts: req.data.posts, user: req.data.user, loggedIn: loggedIn });
    } else {
      res.json({posts: req.data.posts});
    }
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

    if (req.data.post.isPrivate && (req.body.isPrivate === 'false' || req.body.isPrivate === false)) {
      req.data.post.published = new Date();
    }
    req.data.post.isPrivate = req.body.isPrivate || req.data.post.isPrivate;

    if (req.body.title || req.body.body) {
      req.data.post.updated = Date.now();
    }

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
  },

  showPost: function(req, res, next) {
    if (!req.data.post) return res.status(500).end();
    util.redirect('/posts/' + req.data.post.slug)(req, res, next);
  }

};