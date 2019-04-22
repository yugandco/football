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
  const phone = req.body.phone;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const password3 = req.body.password;

  req.checkBody('phone', 'Phone is required').notEmpty();
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
      phone: phone,
      username: username,
      password: password,
      password3: password3
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
              res.redirect('/login');
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
    failureRedirect: '/login',
    failureFlash: true

  })(req, res, next);
});

// Logout Proccess
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/login');
})

// Get My Account
// router.get('/myaccount/:id', (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     if(err){
//       console.log(err);
//     } else {
//       res.render('myaccount', {
//         title: 'My Account Page',
//         user: user
//       })
//     }
//   })
// })




// Get Admin Panel
router.get('/admin', (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      console.log(err);
    } else {
      res.render('admin', {
        title: 'Admin Panel',
        users: users
      })
    }
  });
})
// Delete Users from Admin Panel
router.delete('/admin/:id', (req, res) => {
    let query = {_id: req.params.id}

    User.remove(query, (err) => {
        if(err) {
            console.log(err);
        }
        res.send('Success');
    });
});


module.exports = router;
