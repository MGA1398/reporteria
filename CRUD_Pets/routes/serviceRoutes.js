const services = require("../controllers/serviceController");
module.exports  = (router) => {
    // Create a new Service
    router.post("/services", services.create);
    // Retrieve all Services
    router.get("/services", services.findAll);
    // Retrieve all published Services
    //router.get("/published", services.findAllPublished);
    // Retrieve a single Service with id
    router.get("/services/:id", services.findOne);
    // Update a Service with id
    router.put("/services/:id", services.update);
    // Delete a Service with id
    router.delete("/services/:id", services.delete);
    // Create a new Service
    router.delete("/services", services.deleteAll);
};
