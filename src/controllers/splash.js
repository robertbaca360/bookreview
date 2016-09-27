
//  H O M E   C O N T R O L L E R
//  =============================

var express       = require('express'),
    SplashControl = express.Router(),
    UserModel     = require(__dirname + '/../models/user'),
    ReviewModel   = require(__dirname + '/../models/review'),
    bcrypt        = require('bcrypt');

  SplashControl.route('/signup')
  // POST - username and password to the new account form
  .post(function(req, res, next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      UserModel.create({
        username: req.body.username,
        password: hash
      }, function(err, user) {
        if (err) {
          console.log(err);
          res.render('splash', {error: err});
        } else {
          req.session.isLoggedIn = true;
          req.session.userID     = user._id;
          res.redirect('/users/' + user.id);
        }
      })
    });
  });

  SplashControl.route('/login')
  // POST - username and password to the login form
  .post(function(req, res, next) {
    UserModel.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
        res.send('Could not find that user.');
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send ('ERROR: ' + err);
          } else if (result) {
            req.session.isLoggedIn = true;
            req.session.userID     = user._id;
            res.redirect('/users/' + user._id);
          } else {
            res.send ('Wrong password!');
          }
        })
      }
    })
  })

  SplashControl.route('/logout')
  // GET - logout the user and return to the splash page
  .get(function(req, res, next) {
    req.session.isLoggedIn = false;
    res.redirect('/');
  })
  
SplashControl.route('/?')
    // GET - renders splash page
    .get(function(req, res, next) {
      ReviewModel.find(function(err, reviews) {
        reviews.reverse();
        reviews = reviews.slice(0, 4);
        res.render('splash', {reviews: reviews});
      });
    });

module.exports = SplashControl;
