
module.exports = function(req, res, next) {
  if (req.session.isLoggedIn === true) {
    return next();
  } else {
    res.redirect('/?');
  }
};
