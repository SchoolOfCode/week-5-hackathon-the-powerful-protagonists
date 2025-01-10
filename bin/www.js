import app from "../app.js";
// imports dotenv package from .env
import dotenv from "dotenv";
// makes sure .env file is loaded
dotenv.config();

// retrieve the port number from environment variables
const PORT = process.env.PORT;

// start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
