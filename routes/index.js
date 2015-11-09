var express = require('express');
var router = express.Router();
var passport = require('passport');
var React = require('react');
var ReactDOM = require('react-dom/server');
var components = require('../public/scripts/components');

var LoginPage = React.createFactory(components.LoginPage);
var HomePage = React.createFactory(components.HomePage);

router.get('/', function(req, res) {
  if (req.user) {
    res.render('page', {
      react: ReactDOM.renderToString(HomePage())
    });
  } else {
    res.render('page', {
      react: ReactDOM.renderToString(LoginPage())
    });
  }
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
