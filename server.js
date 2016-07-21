var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./models/User');

var routes = require('./routes/index');
var apiRoutes = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('apiSecret', 'TYqrmtO0z7cAoc43lgh323Yz02bcIkD8');

if (app.get('env') === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function(req){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

if (app.get('env') !== 'production') {
  const webpack = require('webpack');
  const wpConfig = require('./webpack.config');
  const wpDevMiddleware = require('webpack-dev-middleware');
  const wpHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(wpConfig);
  
  app.use(wpDevMiddleware(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath
  }));
  app.use(wpHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          username,
          password
        });

        user.save(function(err) {
          if (err) return done(err, false);
          else return done(null, user);
        });
      } else {
        if (!user.validPassword(password)) return done(null, false, {message: 'Bad password'});
        return done(null, user);
      }
    });
  })
);

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: app.get('apiSecret')
}, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) done(null, user);
      else done(null, false);
    })
    .catch((err) => done(err, false));
}));

app.use('/api', apiRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  if (req.accepts('html')) {
    res.render('404');
  } else {
    next(err);
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
