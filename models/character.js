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
    const allCharacter = await pool.query("SELECT * FROM character");
    return allCharacter.rows;
  } catch (error) {
    console.error("Error fetching author", error);
  }
}
