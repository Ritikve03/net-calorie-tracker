const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  motion: {
    type: String,
    required: true
  },
  metValue: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
