const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true
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
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
