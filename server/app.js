const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const activityRoutes = require('./routes/activityRoutes');
const dailyEntryRoutes = require('./routes/dailyEntryRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To handle cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api', userRoutes);
app.use('/api', foodRoutes);
app.use('/api', activityRoutes);
app.use('/api', dailyEntryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

