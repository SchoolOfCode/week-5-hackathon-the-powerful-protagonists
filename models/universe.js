import { pool } from "../db/index.js";

export async function fetchAllUniverses() {
    try {
      const result = await pool.query("SELECT * FROM universe");
      console.log("success");
      return result.rows;
    } catch (error) {
      console.error("Error fetching universe information", error);
    }
  }

  export async function fetchUniverseById(id) {
    try {
      const result = await pool.query("SELECT * FROM universe WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching universe information", error);
    }
  }

  export async function insertUniverse(
    name,
    description,
    creator
  ) {
    try {
      const result = await pool.query(`
        INSERT INTO universe 
        (name, description, creator) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [name, description, creator]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting new universe information", error);
    }
  }

  export async function deleteUniverseById(id) {
    try {
      const result = await pool.query(`
        DELETE FROM universe 
        WHERE id = $1
        `,
        [id]
      );
      if (result.rows.length === 0) {
        console.log("no universe found with given id")
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting universe", error);
    }
  }
  
  export async function modifyUniverseById(
    name,
    description,
    creator,
    id
  ) {
    try {
      const result = await pool.query( 'UPDATE universe SET name = $1, description = $2, creator = $3 WHERE id = $4 RETURNING *', [name, description, creator, id]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error modifying universe", error);
    }
  }