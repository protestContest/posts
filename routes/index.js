var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.render('app');
});

router.post('/login', passport.authenticate('local', {session:false}),
  function(req, res) {
    const token = jwt.sign(req.user, req.app.get('apiSecret'), {
      subject: req.user._id.toString()
    });
    
    res.json({
      success: true,
      token
    });
  });

module.exports = router;
