const db = require("../models");
const Transaction = db.transactions;
// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.patient_id) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a Transaction
    const transaction = new Transaction({
        patient_id: req.body.patient_id,
        patient_name: req.body.patient_name,
        service_id: req.body.service_id,
        service_type: req.body.service_type,
        service_price: req.body.service_price,
        speciality_id: req.body.speciality_id,
        speciality_type: req.body.speciality_type,
        disease_id: req.body.disease_id,
        disease_type: req.body.disease_type,
        transaction_date: req.body.transaction_date,
        transaction_description: req.body.transaction_description,
        transaction_amount: req.body.transaction_amount,
    });
    // Save Transaction in the database
    transaction
        .save(transaction)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transaction."
            });
        });

};
// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
    const patient_id = req.query.patient_id;
    const condition = patient_id ? {patient_id: {$regex: new RegExp(patient_id), $options: "i"}} : {};
    Transaction.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transactions."
            });
        });
};
// Find a single Transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Transaction.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Transaction with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Transaction with id=" + id });
        });
};
// Update a Transaction by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Transaction.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found!`
                });
            } else res.send({ message: "Transaction was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transaction with id=" + id
            });
        });
};
// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Transaction.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
                });
            } else {
                res.send({
                    message: "Transaction was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction with id=" + id
            });
        });
};
// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
    Transaction.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} transactions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all transactions."
            });
        });
};
// Find all published Transactions
// exports.findAllPublished = (req, res) => {
//
// };
