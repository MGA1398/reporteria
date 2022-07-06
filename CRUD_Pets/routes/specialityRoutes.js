const specialitys = require("../controllers/specialityController.");
module.exports  = (router) => {
    // Create a new Specialty
    router.post("/specialitys", specialitys.create);
    // Retrieve all Specialitys
    router.get("/specialitys", specialitys.findAll);
    // Retrieve all published Specialitys
    //router.get("/published", specialitys.findAllPublished);
    // Retrieve a single Specialty with id
    router.get("/specialitys/:id", specialitys.findOne);
    // Update a Specialty with id
    router.put("/specialitys/:id", specialitys.update);
    // Delete a Specialty with id
    router.delete("/specialitys/:id", specialitys.delete);
    // Create a new Specialty
    router.delete("/specialitys", specialitys.deleteAll);
};
