import express from "express";
import { 
    getUniverses, 
    getUniverseById,
    createUniverse,
    updateUniverseById,
    deleteUniverse,
     } 
    from "../controllers/universe.js";

// merge character and universe using .

// creates a new router object using express
const router = express.Router();

router.get("/", getUniverses);
router.get("/:id", getUniverseById);
router.post("/", createUniverse);
router.patch("/:id", updateUniverseById);
router.delete("/:id", deleteUniverse);

export default router;
