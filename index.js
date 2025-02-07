const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});