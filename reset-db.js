/**
 * Database Reset Script
 * 
 * This script will clear all recipes from the database and reload sample data.
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Get the MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI not found. Please check your .env file.');
  process.exit(1);
}

// Import the Recipe model
const Recipe = require('./src/model/Recipe');

async function resetDatabase() {
  console.log('Connecting to MongoDB...');

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    // Delete all existing recipes
    console.log('Deleting all existing recipes...');
    await Recipe.deleteMany({});
    console.log('All recipes deleted');

    // Load sample recipes from JSON file
    console.log('Loading sample recipes from JSON file...');
    const filePath = path.join(__dirname, 'src/model/recipes.json');
    const recipesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Extract the recipes array from the JSON structure
    const recipesToInsert = recipesData.recipes;

    // Insert sample recipes
    console.log(`Inserting ${recipesToInsert.length} sample recipes...`);
    await Recipe.insertMany(recipesToInsert);

    console.log('Database reset successful!');
    console.log(`${recipesToInsert.length} sample recipes added to the database`);

    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

// Run the reset function
resetDatabase(); 