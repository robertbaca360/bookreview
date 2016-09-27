
//  N E W   R E V I E W   P O S T   C O N T R O L L E R
//  ===================================================

//  Requires
//  --------
var express = require('express'),
NewReview   = express.Router(),
mongoose    = require('mongoose'),
ReviewModel = require('../models/review'),
fs          = require('fs');

NewReview.route('/')
  .post(function(req, res, next) {
    ReviewModel.create({
      userid:  req.session.userID,
      title:   req.body.titletext,
      content: req.body.reviewtext,
      book:    req.body.book,
      authors: req.body.authors,
      image: req.body.image
    }, function(err, review) {
      if (err) {
        console.log(err);
        res.render('postreview', {error:err});
      } else {
        res.redirect('/users/' + req.session.userID);
      };
    });
  });


//  Export so the index can access it
//  ---------------------------------
module.exports = NewReview;
