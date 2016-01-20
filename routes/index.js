var express = require('express');
var router = express.Router();
var passport = require('passport');
var React = require('react');
var ReactDOM = require('react-dom/server');
var PostController = require('../lib/PostController');
var UserController = require('../lib/UserController');
var util = require('../lib/util');

var LoginPage = React.createFactory(require('../components/scripts/dist/LoginPage'));

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
  util.renderPage('HomePage'));

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
