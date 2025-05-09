const mongoose = require('mongoose');

const dailyEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  foods: [{
    time: String,
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    },
    portion: Number,
    calories: Number
  }],
  activities: [{
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    duration: Number,
    caloriesBurned: Number
  }],
  bmr: Number,
  netCalories: Number
}, { timestamps: true });

module.exports = mongoose.model('DailyEntry', dailyEntrySchema);
