var express = require('express');
var router = express.Router();
var passport = require('passport');
var React = require('react');
var ReactDOM = require('react-dom/server');
var userCon = require('../lib/UserController');
var util = require('../lib/util');

var LoginPage = React.createFactory(require('../components/scripts/dist/LoginPage'));
var SignupPage = React.createFactory(require('../components/scripts/dist/SignupPage'));

router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/posts');
  } else {
    res.render('page', {
      react: ReactDOM.renderToString(LoginPage())
    });
  }
});

router.get('/feed',
  userCon.loginOrContinue,
  userCon.loadLoggedInUser,
  userCon.loadSubscribedPosts,
  setTitle('Feed'),
  util.renderPage('FeedPage'));

router.post('/login', passport.authenticate('local'), function(req, res) {
  if (req.accepts('html')) {
    res.redirect('/');
  } else {
    res.end();
  }
});

router.get('/login', function(req, res) {
  res.render('page', {
    react: ReactDOM.renderToString(LoginPage())
  });
});

router.get('/join', function(req, res) {
  res.render('page', {
    react: ReactDOM.renderToString(SignupPage())
  });
});

router.get('/logout', function(req, res) {
  req.logout();

  if (req.accepts('html')) {
    res.redirect('/');
  } else {
    res.end();
  }
});

function setTitle(title) {
  return function(req, res, next) {
    req.data.title = title;
    next();
  };
}

module.exports = router;
