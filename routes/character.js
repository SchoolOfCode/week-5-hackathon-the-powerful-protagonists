import express from "express";
import { 
    getCharacters, 
    getCharacterById,
    createCharacter,
    updateCharacterById,
    deleteCharacterById,
    } 
    from "../controllers/character.js";

// creates a new router object using express
const router = express.Router();

router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.patch("/:id", updateCharacterById);
router.delete("/:id", deleteCharacterById);

export default router;

