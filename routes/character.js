import express from "express";
import { 
    getCharacters, 
    getCharacterById,
    createCharacter
    } 
    from "../controllers/character.js";

// import { insertCharacter } from "../models/character.js";

// creates a new router object using express
const router = express.Router();

router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
// router.patch("/:id", updateAuthorById);
// router.delete("/:id", deleteAuthorById);

export default router;
