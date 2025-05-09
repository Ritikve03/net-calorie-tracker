const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Routes for activities
router.get('/activities', activityController.getAllActivities);

module.exports = router;

