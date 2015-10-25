var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var passport = require('passport');
var React = require('react');
var ReactDOM = require('react-dom/server');
var components = require('../public/components');

var LoginPage = React.createFactory(components.LoginPage);

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.end();
});

router.get('/login', function(req, res) {
  res.render('page', {
    react: ReactDOM.renderToString(LoginPage())
  });
});

module.exports = router;
