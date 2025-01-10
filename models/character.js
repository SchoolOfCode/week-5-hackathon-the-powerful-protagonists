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
    // tried to changed from result.rows to improve legibilty of data being returned (null = no customisation, 2 = indents by 2 spaces) -- try again as stretch goal
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

// check if universe_id is generated
export async function insertCharacter(
  name,
  universe_id,
  age,
  intellect,
  power,
  charisma,
  morality,
  fun_fact
) {
  try {
    const result = await pool.query(`
      INSERT INTO character 
      (name, universe_id, age, intellect, power, charisma, morality, fun_fact) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [name, universe_id, age, intellect, power, charisma, morality, fun_fact]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting new character", error);
  }
}

export async function deleteCharacter(id) {
  try {
    const result = await pool.query(`
      DELETE FROM character 
      WHERE id = $1
      `,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting character", error);
  }
}

/* export async function modifyAuthorById(
  name,
  universe_id,
  age,
  intellect,
  power,
  charisma,
  morality,
  fun_fact
) {
  try {
    const result = await pool.query('UPDATE character SET')
  } catch (error) {

  }
}

*/