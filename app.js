var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressPaginate = require('express-paginate');
//var index = require('./routes/index');
var users = require('./routes/users');

var auth = require('./services/authantication');

var mongoose = require('mongoose');

var config = require('./config'); // get our config file
var User = require('./models/user');


var app = express();
app.use(expressPaginate.middleware(config.pageLimit, config.pageMaxLimit));
//view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/api', api);
app.set('clientSecret', config.clientSecret); // secret variable


mongoose.connect(config.database); // connect to database


// catch 404 and forward to error handler

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //auth.checkToke(req, res, next);
  next()
  console.log('Accessing the secret section ...')
  //next() // pass control to the next handler
})
// app.all('*', function(req, res) {
//   console.log('invalid url')
//     throw new Error("Bad request")
// })
app.use(function (err, req, res, next) {

  // next(err)
  console.log(err)
  //next() // pass control to the next handler
})
app.use('/api', users);

//app.use(authantication.checkToke);



module.exports = app;