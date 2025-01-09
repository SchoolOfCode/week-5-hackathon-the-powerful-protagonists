import express from "express";
import { getCharacters } from "../controllers/character.js";

// creates a new router object using express
const router = express.Router();

router.get("/", getCharacters);
/*router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.patch("/:id", updateAuthorById);
router.delete("/:id", deleteAuthorById);

*/
export default router;
