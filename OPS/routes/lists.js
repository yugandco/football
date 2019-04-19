const express = require('express');
const router = express.Router();

// Bring list Model
let List = require('../models/list');

router.get('/teams', (req, res) => {
  List.find({}, (err, lists) => {
    if(err){
      console.log(err);
    } else {
      res.render('dream_teams', {
        title: 'Welcome to Dream Teams',
        subtitle: 'Если вы новенький, то нажмите на кнопку и заполните данные',
        lists: lists
      });
    }
  });
});

router.get('/teams/add/new', (req, res) => {
  List.find({}, (err, lists) => {
    if(err){
      console.log(err);
    } else {
      res.render('new_dream_teams', {
        title: 'Новая Команда',
        lists: lists
      });
    }
  })
})

router.post('/teams/add/new', (req, res) => {
  let list = new List();
  list.first_name = req.body.first_name;
  list.second_name = req.body.first_name;
  list.team_name = req.body.team_name;
  list.games = 0;
  list.wins = 0;
  list.draw = 0;
  list.loss = 0;
  list.scored_goal = 0;
  list.missed_goal = 0;
  list.point = 0;

  list.save((err) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/lists/teams');
    }
  });

});

router.post('/teams/:id', (req, res) => {
  let list = {};
  list.games = req.body.games;
  list.wins = req.body.wins;
  list.draw = req.body.draw;
  list.loss = req.body.loss;
  list.scored_goal = req.body.scored_goal;
  list.missed_goal = req.body.missed_goal;

  let query = {_id: req.params.id};

  List.update(query, list, (err) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/lists/teams');
    }
  })

});

module.exports = router;
