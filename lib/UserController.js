var User = require('../models/User');

module.exports = {

  loadByUsername: function(req, res, next) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).end();

      req.data.user = user;
      next();
    });
  },

  loadAll: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) return res.status(500).send(err);

      req.data.users = users;
      next();
    });
  },

  sendOne: function(req, res) {
    if (!req.data.user) return res.status(500).end();

    res.json({
      user: req.data.user,
      url: '/users/' + req.data.user.username
    });
  },

  sendAll: function(req, res) {
    if (!req.data.users) return res.status(500).end();

    res.json({users: req.data.users});
  },

  create: function(req, res, next) {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) {
        if (/duplicate key/.test(err.message)) return res.status(400).send('User exists');
        else return res.status(500).send(err);
      }

      req.data.user = user;
      next();
    });
  },

  update: function(req, res, next) {
    if (!req.data.user) return res.status(500).end();

    req.data.user.password = req.body.password || req.data.user.password;

    req.data.user.save(function(err) {
      if (err) return res.status(500).end();
      next();
    });
  },

  remove: function(req, res, next) {
    if (!req.data.user) return res.status(500).end();
    req.data.user.remove(next);
  },

  end: function(req, res) {
    res.end();
  }

};