// const DailyEntry = require('../models/DailyEntry');
// const User = require('../models/User');
// const Food = require('../models/Food');
// const Activity = require('../models/Activity');
// const { calculateBMR, calculateFoodCalories, calculateActivityCalories, calculateNetCalories } = require('../utils/calculator');

// // Save daily entry
// exports.saveDailyEntry = async (req, res) => {
//   try {
//     const { userId, date, foods, activities } = req.body;

//     // Find the user to get their details for BMR calculation
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Calculate BMR
//     const bmr = calculateBMR(user.sex, user.weight, user.height, user.age);

//     // Calculate total food calories
//     const foodCalories = calculateFoodCalories(foods);

//     // Calculate total activity calories burned
//     const activityCalories = calculateActivityCalories(activities);

//     // Calculate net calories
//     const netCalories = calculateNetCalories(bmr, foodCalories, activityCalories);

//     // Create a new daily entry
//     const entry = new DailyEntry({
//       userId,
//       date,
//       foods,
//       activities,
//       bmr,
//       netCalories
//     });

//     const savedEntry = await entry.save();
//     res.status(201).json(savedEntry);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get user entry for a specific date
// exports.getDailyEntry = async (req, res) => {
//   try {
//     const { userId, date } = req.query;

//     // Find the entry for the user and date
//     const entry = await DailyEntry.findOne({ userId, date });
//     if (!entry) return res.status(404).json({ error: 'No entry found for this date' });

//     res.status(200).json(entry);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const DailyEntry = require('../models/DailyEntry');
const User = require('../models/User');
const { calculateBMR, calculateFoodCalories, calculateActivityCalories, calculateNetCalories } = require('../utils/calculator');

// POST /entries
exports.saveDailyEntry = async (req, res) => {
  try {
    const { userId, date, foods = [], activities = [] } = req.body;

    // Get user for BMR calculation
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find if entry already exists for this date
    let entry = await DailyEntry.findOne({ userId, date });

    // Append or create new
    if (entry) {
      entry.foods.push(...foods);
      entry.activities.push(...activities);
    } else {
      entry = new DailyEntry({ userId, date, foods, activities });
    }

    // Recalculate totals
    const totalFoodCalories = calculateFoodCalories(entry.foods);
    const totalActivityCalories = calculateActivityCalories(entry.activities);
    const bmr = calculateBMR(user.sex, user.weight, user.height, user.age);
    const netCalories = calculateNetCalories(bmr, totalFoodCalories, totalActivityCalories);

    entry.bmr = bmr;
    entry.netCalories = netCalories;

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
};

// GET /entries?userId=...&date=...
exports.getDailyEntry = async (req, res) => {
  try {
    const { userId, date } = req.query;
    const entry = await DailyEntry.findOne({ userId, date });
    if (!entry) return res.status(404).json({ error: 'No entry found' });
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
