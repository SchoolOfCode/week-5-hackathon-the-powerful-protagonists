// import fetch character functions from roots.js and return as JSON with error handling

import { 
  fetchAllCharacter, 
  fetchCharacterById,
  insertCharacter
  } from "../models/character.js";

// export async function to getCharacters to await fetchAllCharacter
// response as json
// error handling

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
  try{
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
    if (!validateData(
      name,
      universe_id,
      age,
      intellect,
      power,
      charisma,
      morality,
      fun_fact)) {
      res.status(400).json({ status: "Request body formatted incorrectly", message: error.message });
    }
    const result = await insertCharacter(
      name,
      universe_id,
      age,
      intellect,
      power,
      charisma,
      morality,
      fun_fact);
      res.status(201).json({status: "success", data: result })
    } catch (error) {
      console.error("Could not insert character", error);
  }
}

function validateData(data) {
  // check keys are good using list of permitted key names
  const permittedKeys = new Set(["name", "universe_id", "age", "morality", "fun_fact", "charisma", "intellect", "power"]);
  // for each given key check whether its in permitted keys
  // loop using in
  for (const k in data) {
      const hasKey = permittedKeys.has(k); // .has method of hash set class 
      if (!hasKey) {
          console.log(k);
          return false;
      } 
  } 
  return true;
 }; 