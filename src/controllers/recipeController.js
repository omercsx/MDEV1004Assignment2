/**
 * @author: Gurpreet Kaur
 * @date: 2025-02-17
 */

const Recipe = require("../model/Recipe");

const recipeController = {
  // Get all recipes
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find({}).sort({ createdAt: -1 });
      res.json({
        success: true,
        count: recipes.length,
        data: recipes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching recipes",
        error: error.message
      });
    }
  },

  // Get single recipe by ID
  getRecipeById: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }

      res.json({
        success: true,
        data: recipe
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID format"
        });
      }
      res.status(500).json({
        success: false,
        message: "Error fetching recipe",
        error: error.message
      });
    }
  },

  // Create new recipe
  createRecipe: async (req, res) => {
    try {
      const {
        recipeName,
        ingredients,
        cookingTime,
        difficulty,
        cuisine,
        description
      } = req.body;

      // Validation
      if (!recipeName || !ingredients || !cookingTime || !difficulty || !cuisine || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields"
        });
      }

      // Validate difficulty enum
      const validDifficulties = ['Easy', 'Medium', 'Hard'];
      if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({
          success: false,
          message: "Difficulty must be either 'Easy', 'Medium', or 'Hard'"
        });
      }

      const recipe = await Recipe.create({
        recipeName,
        ingredients,
        cookingTime,
        difficulty,
        cuisine,
        description,
        averageRating: 0 // Default value
      });

      res.status(201).json({
        success: true,
        message: "Recipe created successfully",
        data: recipe
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating recipe",
        error: error.message
      });
    }
  },

  // Update recipe
  updateRecipe: async (req, res) => {
    try {
      const {
        recipeName,
        ingredients,
        cookingTime,
        difficulty,
        cuisine,
        description
      } = req.body;

      // Validate difficulty if provided
      if (difficulty && !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
        return res.status(400).json({
          success: false,
          message: "Difficulty must be either 'Easy', 'Medium', or 'Hard'"
        });
      }

      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }

      // Update only provided fields
      recipe.recipeName = recipeName || recipe.recipeName;
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.cookingTime = cookingTime || recipe.cookingTime;
      recipe.difficulty = difficulty || recipe.difficulty;
      recipe.cuisine = cuisine || recipe.cuisine;
      recipe.description = description || recipe.description;

      const updatedRecipe = await recipe.save();

      res.json({
        success: true,
        message: "Recipe updated successfully",
        data: updatedRecipe
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID format"
        });
      }
      res.status(500).json({
        success: false,
        message: "Error updating recipe",
        error: error.message
      });
    }
  },

  // Delete recipe
  deleteRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found"
        });
      }

      await recipe.deleteOne();

      res.json({
        success: true,
        message: "Recipe deleted successfully"
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({
          success: false,
          message: "Invalid recipe ID format"
        });
      }
      res.status(500).json({
        success: false,
        message: "Error deleting recipe",
        error: error.message
      });
    }
  }
};

module.exports = recipeController;