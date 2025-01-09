// Import the required modules
import express from "express";
import morgan from "morgan";
// imports dotenv package from .env
import dotenv from "dotenv";
// makes sure .env file is loaded
dotenv.config();

import characterRouter from "./routes/character.js";
import universeRouter from "./routes/universe.js";

// Initialize the express app
const app = express();

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Use sub-routers
app.use("/character", characterRouter);
app.use("/universe", universeRouter);

export default app;
