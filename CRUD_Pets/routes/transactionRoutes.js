const transactions = require("../controllers/transactionController");
module.exports  = (router) => {
    // Create a new transaction
    router.post("/transactions", transactions.create);
    // Retrieve all Transactions
    router.get("/transactions", transactions.findAll);
    // Retrieve all published Transactions
    //router.get("/published", transactions.findAllPublished);
    // Retrieve a single transaction with id
    router.get("/transactions/:id", transactions.findOne);
    // Update a transaction with id
    router.put("/transactions/:id", transactions.update);
    // Delete a transaction with id
    router.delete("/transactions/:id", transactions.delete);
    // Create a new transaction
    router.delete("/transactions", transactions.deleteAll);
};
