const Food = require('../models/Food');

// Get all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ name: 1 }); // Sort alphabetically
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
