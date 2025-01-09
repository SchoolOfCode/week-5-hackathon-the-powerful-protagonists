import express from "express";
import { getCharacters, getCharacterById } from "../controllers/character.js";

// creates a new router object using express
const router = express.Router();

router.get("/", getCharacters);
router.get("/:id", getCharacterById);
// router.post("/", createAuthor);
// router.patch("/:id", updateAuthorById);
// router.delete("/:id", deleteAuthorById);

export default router;
