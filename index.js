/**
 * @author: Omer Cagri Sayir 200597579
 * @date: 2025-02-07
 */

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Import routes
const recipeRoutes = require('./src/routes/recipeRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Use routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});