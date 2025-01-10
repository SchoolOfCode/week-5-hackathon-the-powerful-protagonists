    import { 
    fetchAllUniverses, 
    fetchUniverseById,
    insertUniverse,
    deleteUniverseById,
    modifyUniverseById
    } from "../models/universe.js";

    export async function getUniverses(req, res) {
        try {
          const result = await fetchAllUniverses();
          res.status(200).json({ status: "Success", data: result });
        } catch (error) {
          res.status(500).json({ message: "Error fetching universe information" });
        }
      }

    export async function getUniverseById(req, res) {
        try {
          const id = req.params.id;
          const result = await fetchUniverseById(id);
          if (!result) {
            return res
              .status(404)
              .json({ message: "Universe not found" });
          }
          res.status(200).json({ status: "Success", data: result });
        } catch (error) {
          res.status(500).json({ message: "Error fetching specific universe" });
        }
      }
    
    export async function createUniverse(req, res){
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
            description,
            creator
          } = req.body; 
        
          const result = await insertUniverse(
            name,
            description,
            creator);
            res.status(201).json({ status: "success", data: result })
          } catch (error) {
            console.error("Could not insert universe", error);
        }
      }

    export async function deleteUniverse(req, res) {
        const id = req.params.id
        if (!validateIdIsNum(id)) {
          res.status(400).json({ message: "must give an id of digit"})
        }
        await deleteUniverseById(id);
        res.status(200).json({ message: `Universe deleted sucessfully with id of ${id}` }); // 204 no content
       }

       export async function updateUniverseById(req, res) {
        try {
          const id = req.params.id;
          console.log(id)
          const {
            name,
            description,
            creator
          } = req.body;
      
          const success = await modifyUniverseById(
            name,
            description,
            creator,
            id 
          );
          res.status(200).json({ message: "success", data: success })
        } catch (error) {
          res.status(400).json({ message: "error updating universe", status: error });
        }
      }

    function validateData(data) {
    // check keys are good using list of permitted key names
    const permittedKeys = new Set(["name", "description", "creator"]);
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

  