const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Bring in User model
let User = require('../models/user');

router.get('/registre', (req, res) => {
  res.render('regis', {
    title: 'Регистрация'
  });
});

router.post('/registre', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('email', 'Email is required').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('regis', {
      title: 'Регистрация',
      errors: errors
    });
  } else {
    let newUser = new User({
      email: email,
      username: username,
      password: password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save((err) => {
            if(err){
              console.log(err);
              return;
            } else {
              req.flash('success', 'You are registered and can log in');
              res.redirect('/users/login');
            }
          });
      });
    });
  }
});
// Get Login Form
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Логин'
  });
});
// Login Proccess
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true

  })(req, res, next);
});

// Logout Proccess
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
})


module.exports = router;
