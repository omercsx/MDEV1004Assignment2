/**
 * @author: Omer Cagri Sayir 200597579
 * @date: 2025-02-07
 */

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});