var express = require('express');
var router = express.Router();
var data = require('../data/data')
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var auth = require('./../services/authantication');

var ObjectId = require('mongoose').Types.ObjectId;

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.setHeader('content-type','application/json')
//   res.send(data.getJsonData());
// });

router.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
});
router.get('/users/:id', (req, res) => {

  if (!req.params.id) {
    res.send("please provide id")
  } else {

    User.findById(req.params.id, function (err, users) {
      res.json(users);
    });
  }

})
router.get('/users', auth.checkToken, function (request, response, next) {
  console.log('start get users api')
  User.paginate({}, {
      page: request.query.page,
      limit: request.query.limit,
      sort:{name:-1}
    },
    function (error, pageCount, result, itemCount) {
      if (error) {
        console.error(error);
               response.end('Internal server error');
        return;
      }
      response.json({
        object: 'users',
        page_count: pageCount,
        result: result
      });
    });


});
router.post('/users', function (req, res) {
  console.log('my log')

  // create a sample user
  var userModel = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.isAdmin,
    roles: req.body.roles
  });

  // save the sample user
  userModel.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({
      success: true
    });
  });
});
router.post('/users/auth', function (req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    console.log(user);
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        // var token = jwt.sign(user, , {
        //   exp: 1440 // expires in 24 hours
        // });
        var token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: user
        }, req.app.get('clientSecret'));
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
})



//app.use('/api', router);
module.exports = router;