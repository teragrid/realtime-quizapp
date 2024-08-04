const express = require('express');

const router = express.Router();

function isAuthenticated(req, res, next) {
  if (!req.session.userInfo) {
    return next();
  }

  // return res.redirect('/login');
  return true;
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {
  res.render('admin');
});

module.exports = router;
