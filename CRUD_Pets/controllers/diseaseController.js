const db = require("../models");
const Disease = db.diseases;
// Create and Save a new Disease
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a Disease
    const disease = new Disease({
        type: req.body.type
    });
    // Save Disease in the database
    disease
        .save(disease)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Disease."
            });
        });

};
// Retrieve all Diseases from the database.
exports.findAll = (req, res) => {
    const type = req.query.type;
    const condition = type ? {type: {$regex: new RegExp(type), $options: "i"}} : {};
    Disease.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving diseases."
            });
        });
};
// Find a single Disease with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Disease.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Disease with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Disease with id=" + id });
        });
};
// Update a Disease by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Disease.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Disease with id=${id}. Maybe Disease was not found!`
                });
            } else res.send({ message: "Disease was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Disease with id=" + id
            });
        });
};
// Delete a Disease with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Disease.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Disease with id=${id}. Maybe Disease was not found!`
                });
            } else {
                res.send({
                    message: "Disease was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Disease with id=" + id
            });
        });
};
// Delete all Diseases from the database.
exports.deleteAll = (req, res) => {
    Disease.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} diseases were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all diseases."
            });
        });
};
// Find all published Diseases
// exports.findAllPublished = (req, res) => {
//
// };
