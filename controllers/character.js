// import fetch character functions from roots.js and return as JSON with error handling

import { fetchAllCharacter, fetchCharacterById } from "../models/character.js";

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
