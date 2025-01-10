// import fetch character functions from roots.js and return as JSON with error handling

import { 
  fetchAllCharacter, 
  fetchCharacterById,
  insertCharacter,
  deleteCharacter
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
    const isValid = validateData(req.body);
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
      res.status(400).json({ message: "must give an id of digit"})
    }
    await deleteCharacter(id);
    res.status(200).json({ message: `Character deleted sucessfully with id of ${id}` }); // 204 no content
   }


// to do - edit validateData so that it confirms request contains all 8 keys
function validateData(data) {
  // check keys are good using list of permitted key names
  const permittedKeys = new Set(["name", "universe_id", "age", "morality", "fun_fact", "charisma", "intellect", "power"]);
  // for each given key check whether its in permitted keys
  // loop using in
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
  const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]); // quicker lookup time
    for (const char of id) {
      if (!digits.has(char)) {
        return false;
      }
    }
    return true;
 }

