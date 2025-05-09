const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  servingSize: {
    type: String,
    required: true
  },
  caloriesPerServing: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
