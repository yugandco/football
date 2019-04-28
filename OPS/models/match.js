const mongoose = require('mongoose');


let MatchSchema = mongoose.Schema({
  first_team_select: {
    type: String,
    required: true
  },
  match_date: {
    type: String,
    required: true
  },
  second_team_select: {
    type: String,
    required: true
  },
  match_status: {
    type: String,
    required: true
  },
  left_sight: {
    type: Number,
    default: 0
  },
  right_sight: {
    type: Number,
    default: 0
  }
});

const Match = module.exports = mongoose.model('Match', MatchSchema);
