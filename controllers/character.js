// import fetch character functions from roots.js and return as JSON with error handling

import { 
  fetchAllCharacter, 
  fetchCharacterById,
  insertCharacter,
  deleteCharacter,
  modifyCharacterById
  } from "../models/character.js";

export async function getCharacters(req, res) {
  try {
    const character = await fetchAllCharacter();
    res.status(200).json({ status: "Success", data: character });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getCharacterById(req, res) {
  try {
    const id = req.params.id;
    const character = await fetchCharacterById(id);
    if (!character) {
      return res
        .status(404)
        .json({ status: "fail", message: "Character not found" });
    }
    res.status(200).json({ status: "Success", data: character });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createCharacter(req, res){
  try {
    const isValid = validateData(req.body); // wasn't passing request body
      console.log(isValid)
    if (!isValid) {
        console.log("validation failed");
      res.status(400).json({  message: "Request body formatted incorrectly" });
    }
    console.log("still executing function");

    const { 
      name,
      universe_id,
      age,
      intellect,
      power,
      charisma,
      morality,
      fun_fact
    } = req.body; 
  
    const result = await insertCharacter(
      name,
      universe_id,
      age,
      intellect,
      power,
      charisma,
      morality,
      fun_fact);
      res.status(201).json({ status: "success", data: result })
    } catch (error) {
      console.error("Could not insert character", error);
  }
}

export async function deleteCharacterById(req, res) {
    const id = req.params.id
    if (!validateIdIsNum(id)) {
      res.status(400).json({ message: "Must give an id of digit"})
    };
    await deleteCharacter(id);
    res.status(200).json({ message: `Character deleted sucessfully with id of ${id}` }); 
   }

   export async function updateCharacterById(req, res) {
    try {
      const id = req.params.id;
      console.log(id)
      const {
        name,
        universe_id,
        age,
        intellect,
        power,
        charisma,
        morality,
        fun_fact,
      } = req.body;
  
      const success = await modifyCharacterById(
        name,
        universe_id,
        age,
        intellect,
        power,
        charisma,
        morality,
        fun_fact,
        id // wasn't passing id 
      );
      res.status(200).json({ message: "success", data: success })
    } catch (error) {
      res.status(400).json({ message: "Error updating character", status: error });
    }
  }

function validateData(data) {
  const permittedKeys = new Set(["id", "name", "universe_id", "age", "morality", "fun_fact", "charisma", "intellect", "power"]); // stores unique values without a specific order
  for (const k in data) {
      const hasKey = permittedKeys.has(k);
      if (!hasKey) {
          console.log(k);
          return false;
      } 
  } 
  return true;
 }; 

 function validateIdIsNum(id) {
  const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const char of id) {
      if (!digits.has(char)) {
        return false;
      }
    }
    return true;
 }

