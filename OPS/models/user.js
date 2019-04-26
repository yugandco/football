const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  second_name: {
    type: String
  },
  team_name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password3: {
    type: String,
    required: true
  },

});

const User = module.exports = mongoose.model('User', UserSchema);
