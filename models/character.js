//Import pool
//Create fetchAllCharacters function
//try catch
//create variable allCharacters
//await SQL pool query
//select all from characters
//return rows
//error handling

import { pool } from "../db/index.js";

export async function fetchAllCharacter() {
  try {
    const result = await pool.query("SELECT * FROM character");
    return result.rows;
  } catch (error) {
    console.error("Error fetching character", error);
  }
}

export async function fetchCharacterById(id) {
  try {
    const result = await pool.query("SELECT * FROM character WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching character", error);
  }
}
