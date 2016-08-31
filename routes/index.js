var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mean Stack Starter App' });
});

// ===========================================================
// RESTful JSON API Endpoints for SignUp, Login, and Logout
// ===========================================================

// POST /signup
router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    req.login(user, function(err) {
      if (err) return res.status(401).json(error);
      res.json( { email: user.local.email });
    });
  })(req, res, next);
});

// POST /login
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    req.login(user, function(err) {
      if (err) return res.status(401).json(error);
      res.json( { email: user.local.email });
    });
  })(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
