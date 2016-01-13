var express = require('express');
var router = express.Router();
var passport = require('passport');
var React = require('react');
var ReactDOM = require('react-dom/server');
var PostController = require('../lib/PostController');
var UserController = require('../lib/UserController');

var LoginPage = React.createFactory(require('../components/scripts/dist/LoginPage'));
var HomePage = React.createFactory(require('../components/scripts/dist/HomePage'));

router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('page', {
      react: ReactDOM.renderToString(LoginPage())
    });
  }
});

router.get('/home',
  UserController.loginOrContinue,
  UserController.loadLoggedInUser,
  PostController.loadByUser,
function(req, res) {
  res.render('page', {
    react: ReactDOM.renderToString(HomePage({
      posts: req.data.posts
    })),
    data: JSON.stringify(req.data)
  });
});

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

router.get('/logout', function(req, res) {
  req.logout();

  if (req.accepts('html')) {
    res.redirect('/');
  } else {
    res.end();
  }
});

module.exports = router;
