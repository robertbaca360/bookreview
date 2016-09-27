
//  R E V I E W  C O N T R O L L E R
//  ================================

//  Requires
//  --------
var express     = require('express'),
    Reviews     = express.Router(),
    mongoose    = require('mongoose'),
    ReviewModel = require('../models/review'),
    fs          = require('fs'),
    books       = require('google-books-search');

//  Define routes
//  -------------  

Reviews.route('/reviews')
  // GET - see JSON of all reviews - for dev purposes - delete in production
  .get(function(req, res, next) {
    ReviewModel.find(function(err, reviews) {
      res.json(reviews);
    });
  });

Reviews.route('/results/:id/?')
  // GET - go to a new post page to post a review of the selected book
  .get(function(req, res, next) {
    books.lookup(req.params.id, function(error, result) {
      res.render('postreview', {'result': result});
    });
  });

Reviews.route('/results')
  // POST - perform search for a title from the community reviews page
  .post(function(req, res, next) {
    books.search(req.body.title, function(error, result) {
      if (!error) {
        res.render('reresults', {'result': result});
      } else {
        console.log(error);
      }
    });
  });

Reviews.route('/?')
  // GET - render page of community review posts
  .get(function(req, res, next) {
    ReviewModel.find(function(err, reviews) {
      reviews.reverse();
      res.render('community', {reviews: reviews});
    }) 
  });
  
  
  //  Export so the index can access it
//  ---------------------------------
module.exports = Reviews;
