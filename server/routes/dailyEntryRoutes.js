const express = require('express');
const router = express.Router();
const dailyEntryController = require('../controllers/dailyEntryController');

// Routes for daily entries
router.post('/entries', dailyEntryController.saveDailyEntry);
router.get('/entries', dailyEntryController.getDailyEntry); // Uses query parameters

module.exports = router;

