var createError = require('http-errors');
var compression = require('compression');
// var helmet = require('helmet');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var passport = require('passport');
// var WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;
// var CALLBACK_URL = "/login";
var CloudantStore = require('connect-cloudant-store')(session);

//ibm cloudant creds
// var account = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix';
// var password = '2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559';
// var host = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';
// var port = '443';
var url1 = 'https://28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix:2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559@28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';

var store = new CloudantStore(
  {
    url: url1
  }
);

store.on('connect', function () {
  console.log("session store connected");
});

store.on('disconnect', function () {
  console.log("failed to connect to session store");
});

store.on('error', function (err) {
  console.log(err);
  console.log('session store error');

});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// passport.use(new WebAppStrategy({
//   clientId: "de36dc96-04bf-4850-a978-5459ef2c9716",
//   tenantId: "aae48710-9d0b-442b-a4c4-03e6aabac4a5",
//   secret: "MjhjOTJkNjktMDJiZC00NDIyLWFiMWItNWZmMzhmNmY4NzNi",
//   oauthServerUrl: "https://us-south.appid.cloud.ibm.com/oauth/v4/aae48710-9d0b-442b-a4c4-03e6aabac4a5",
//   redirectUri: "http://localhost:4000/"
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
// app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: "qsxdrgbhuk",
//   resave: true,
//   saveUninitialized: false
// }));

app.use(session({
  store: store,
  secret: 'qsxdrgbhuk',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/*', function (req, res) {
  res.redirect('/../');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
