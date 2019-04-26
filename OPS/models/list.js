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
    required: true,
    default: 0
  },
  wins:{
    type: Number,
    required: true,
    default: 0
  },
  draw:{
    type: Number,
    required: true,
    default: 0
  },
  loss:{
    type: Number,
    required: true,
    default: 0
  },
  scored_goal:{
    type: Number,
    required: true,
    default: 0
  },
  missed_goal:{
    type: Number,
    required: true,
    default: 0
  },
  point:{
    type: Number,
    required: true,
    default: 0
  }
});

const List = module.exports = mongoose.model('List', ListSchema);
