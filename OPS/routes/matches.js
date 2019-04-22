const express = require('express');
const router = express.Router();

// Bring Match Model
let Match = require('../models/match');

router.get('/',ensureAuthenticated, (req, res) => {
  Match.find({}, (err, matches) => {
    if(err){
      console.log(err);
    } else {
      res.render('matches', {
        title: 'Time for Play',
        matches: matches
      });
    }
  });
});

router.post('/', (req, res) => {
  let match = new Match();
  match.first_team_select = req.body.first_team_select;
  match.match_date = req.body.match_date;
  match.second_team_select = req.body.second_team_select;

  match.save((err) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/matches');
    }
  });
});

router.delete('/:id', (req, res) => {
    let query = {_id: req.params.id}

    Match.remove(query, (err) => {
        if(err) {
            console.log(err);
        }
        res.send('Success');
    });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Пожалуйста, Войдите через Логин или Зарегистрируйтесь')
    res.redirect('/login');
  }
}
module.exports = router;
