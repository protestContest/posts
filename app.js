require('babel-register');
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var React = require('react');
var ReactDOM = require('react-dom/server');

var User = require('./models/User');
var Subs = require('./models/Subscription');
var Post = require('./models/Post');

var routes = require('./routes/index')(User, Subs, Post);
// var posts = require('./routes/posts')(User, Subs, Post);
// var users = require('./routes/users')(User, Subs, Post);
// var subscriptions = require('./routes/subscriptions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
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
app.use(cookieParser('oddfellows'));
app.use(express.static(path.join(__dirname, 'public')));

var redisUrl = 'redis://localhost:6379';
if (app.get('env') === 'production') {
  redisUrl = process.env.REDIS_URL;
}

app.use(session({
  secret:'oddfellows',
  store: new RedisStore({ url: redisUrl }),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username}, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, {message: 'No such user'});
        if (!user.validPassword(password)) return done(null, false, {message: 'Bad password'});

        return done(null, user);
      });
    })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* Custom request initialization */
app.use(function(req, res, next) {
  req.data = {};

  res.renderReact = function(pageName, data) {
    var Page = React.createFactory(require('./components/scripts/dist/' + pageName));
    data = data || {};
    data.pageName = pageName;
    this.render('page', {
      react: ReactDOM.renderToString(Page(data)),
      pageName: pageName,
      data: JSON.stringify(data)
    });
  };

  next();
});

app.use('/', routes);
// app.use('/posts', posts);
// app.use('/users', users);
// app.use('/subscriptions', subscriptions);

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
