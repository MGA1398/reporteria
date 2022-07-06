const db = require("../models");
const Service = db.services;
// Create and Save a new Service
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a Service
    const service = new Service({
        type: req.body.type,
        price: req.body.price
    });
    // Save Service in the database
    service
        .save(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service."
            });
        });

};
// Retrieve all Services from the database.
exports.findAll = (req, res) => {
    const type = req.query.type;
    const condition = type ? {type: {$regex: new RegExp(type), $options: "i"}} : {};
    Service.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving services."
            });
        });
};
// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Service.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Service with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Service with id=" + id });
        });
};
// Update a Service by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Service.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found!`
                });
            } else res.send({ message: "Service was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service with id=" + id
            });
        });
};
// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Service.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
                });
            } else {
                res.send({
                    message: "Service was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });
};
// Delete all Services from the database.
exports.deleteAll = (req, res) => {
    Service.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} services were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all services."
            });
        });
};
// Find all published Services
// exports.findAllPublished = (req, res) => {
//
// };
