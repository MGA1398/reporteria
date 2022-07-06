const pets = require("../controllers/petController");
module.exports  = (router) => {
    // Create a new Patient
    router.post("/pets", pets.create);
    // Retrieve all Patients
    router.get("/pets", pets.findAll);
    // Retrieve all published Patients
    //router.get("/published", pets.findAllPublished);
    // Retrieve a single Patient with id
    router.get("/pets/:id", pets.findOne);
    // Update a Patient with id
    router.put("/pets/:id", pets.update);
    // Delete a Patient with id
    router.delete("/pets/:id", pets.delete);
    // Delete all Patients
    router.delete("/pets", pets.deleteAll);
};
