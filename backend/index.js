import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json()); // Ensure JSON body parsing
app.use(cors()); // Enable CORS

// Environment variables
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODB_URI;

if (!mongoDBURL) {
  console.error(" Error: MongoDB URI is missing. Set MONGODB_URI in .env");
  process.exit(1);
}

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack Book Shop");
});

app.use("/books", booksRoute);

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB Connection Error:", error);
  });
