const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
    max: 100,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
    min: 6,
    max: 100,
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    max: 1024,
  },
  avatarUrl: String,
  role: {
    type: String,
    max: 30,
  }},
  {timestamps: true},
);

userSchema.plugin(tz);
module.exports = mongoose.model('User', userSchema);

