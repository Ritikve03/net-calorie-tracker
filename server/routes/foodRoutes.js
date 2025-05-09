const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Routes for foods
router.get('/foods', foodController.getAllFoods);

module.exports = router;

