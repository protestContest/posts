var q = require('q');

module.exports = function(User, Subs, Post) {

  return {
    loadByUsername: function(req, res, next) {
      var def = q.defer();

      User.findOne({username: req.params.username}).then(function(user) {
        if (!user) def.reject(new Error('User not found'));
        else def.resolve(user);
      }).catch(def.reject);

      return def.promise;
    },

    loadLoggedInUser: function(req, res, next) {
      if (!req.user) return res.status(401).end();

      req.data.user = req.user;
      next();
    },

    loadAll: function(req, res, next) {
      User.find({}, function(err, users) {
        if (err) return res.status(500).send(err);

        req.data.users = users;
        next();
      });
    },

    loadSubscribedPosts: function(req, res, next) {
      if (!req.data.user) return res.status(500).end();

      Subs.find({owner: req.data.user._id}, function(err, follows) {
        if (err) return res.status(500).end();
        if (!follows || follows.length === 0) {
          req.data.posts = [];
          next();
        } else {
          var ids = follows.map(function(u) { return u.target; });
          Post.find({
            owner: { $in: ids },
            isPrivate: false
          }).sort({updated: -1}).exec(function(err, posts) {
            if (err) return res.status(500).end();

            req.data.posts = posts;
            next();
          });
        }
      });
    },

    loginUser: function(req, res, next) {
      if (!req.data.user) return res.status(500).end();

      req.login(req.data.user, function(err) {
        if (err) return res.status(500).end();

        next();
      });
    },

    sendOne: function(req, res) {
      if (!req.data.user) return res.status(500).end();
      req.data.posts = req.data.posts || [];

      if (req.accepts('html')) {
        res.renderReact('UserProfilePage', { user: req.data.user, posts: req.data.posts, subscription: req.data.subscription });
      } else {
        res.json({
          user: req.data.user,
          url: '/users/' + req.data.user.username
        });
      }
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

    loginOrContinue: function(req, res, next) {
      if (!req.user) res.redirect('/login');

      next();
    },

    isLoggedIn: function(req, res, next) {
      if (req.user) next;
      else next(true);
    },

    end: function(req, res) {
      res.end();
    }
  };
};