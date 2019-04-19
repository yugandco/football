const mongoose = require('mongoose');

let ListSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String,
    required: true
  },
  team_name: {
    type: String,
    required: true
  },
  games:{
    type: Number,
    required: true
  },
  wins:{
    type: Number,
    required: true
  },
  draw:{
    type: Number,
    required: true
  },
  loss:{
    type: Number,
    required: true
  },
  scored_goal:{
    type: Number,
    required: true
  },
  missed_goal:{
    type: Number,
    required: true
  },
  point:{
    type: Number,
    required: true
  }
});

const List = module.exports = mongoose.model('List', ListSchema);
