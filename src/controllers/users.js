
//  U S E R   C O N T R O L L E R
//  =============================

//  Requires
//  --------
var express     = require('express'),
    Users       = express.Router(),
    mongoose    = require('mongoose'),
    UserModel   = require('../models/user'),
    ReviewModel = require('../models/review'),
    fs          = require('fs'),
    books       = require('google-books-search');

//  Define routes
//  -------------

Users.route('/users')
  // GET - see JSON of all users - for dev purposes - delete in production
  .get(function(req, res, next) {
    UserModel.find(function(err, users) {
      res.json(users);  
    });
  });

Users.route('/:id')
  // GET - render the logged-in user's account page
  .get(function(req, res, next) {
    UserModel.findOne({_id: req.session.userID}, function(error, user) { 
      ReviewModel.find(function(err, reviews) {
        reviews.reverse();
        var userReviews = [];
        for (var x in reviews) {
          if (reviews[x].userid === req.session.userID) {
            userReviews.push(reviews[x]);
          };
        };
        res.render('useraccount', {user:    user,
                                   reviews: userReviews});
      });
    });
  });

Users.route('/results/:id/?')
  // GET - go to a new post page to post a review of the selected book
  .get(function(req, res, next) {
    books.lookup(req.params.id, function(error, result) {
      res.render('postreview', {'result': result});
    });
  });
  
Users.route('/results')
  // POST - search for a book using Google Books API and render the results page
  .post(function(req, res, next) {
    books.search(req.body.title, function(error, result) {
      if (!error) {
        res.render('usresults', {'result': result});
      } else {
        console.log(error);
      };
    });
  });

  

//  Export so the index can access it
//  ---------------------------------
module.exports = Users;
