const Activity = require('../models/Activity');

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ name: 1 }); // Sorted by name
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
