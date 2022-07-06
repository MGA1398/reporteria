const diseases = require("../controllers/diseaseController");
module.exports  = (router) => {
    // Create a new Specialty
    router.post("/diseases", diseases.create);
    // Retrieve all Specialitys
    router.get("/diseases", diseases.findAll);
    // Retrieve all published Specialitys
    //router.get("/published", diseases.findAllPublished);
    // Retrieve a single Specialty with id
    router.get("/diseases/:id", diseases.findOne);
    // Update a Specialty with id
    router.put("/diseases/:id", diseases.update);
    // Delete a Specialty with id
    router.delete("/diseases/:id", diseases.delete);
    // Create a new Specialty
    router.delete("/diseases", diseases.deleteAll);
};
