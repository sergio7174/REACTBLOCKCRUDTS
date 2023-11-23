const mongoose = require('mongoose');
/*** A mongoose plugin to normalize stored dates timezone. By default mongo dates are stored in UTC format, */
const tz = require('mongoose-timezone');

const postSchema = new mongoose.Schema({
    title: {
    type: String,
    max: 100,
  },
  text: {
    type: String,
    required: [true, "Please write text for your post"],

    min: 6,
    max: 100,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Did not found user"],
  },
  avatarUrl: String},
  {timestamps: true},
);

postSchema.plugin(tz);
module.exports = mongoose.model('Post', postSchema);


