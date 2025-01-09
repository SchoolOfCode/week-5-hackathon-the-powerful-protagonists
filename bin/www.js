import app from "../app.js";
// imports dotenv package from .env
import dotenv from "dotenv";
// makes sure .env file is loaded
dotenv.config();

// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
