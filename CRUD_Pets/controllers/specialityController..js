const db = require("../models");
const Speciality = db.specialitys;
// Create and Save a new Specialty
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a Specialty
    const speciality = new Speciality({
        type: req.body.type
    });
    // Save Specialty in the database
    speciality
        .save(speciality)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Specialty."
            });
        });

};
// Retrieve all Specialitys from the database.
exports.findAll = (req, res) => {
    const type = req.query.type;
    const condition = type ? {type: {$regex: new RegExp(type), $options: "i"}} : {};
    Speciality.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving specialitys."
            });
        });
};
// Find a single Specialty with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Speciality.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Specialty with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Specialty with id=" + id });
        });
};
// Update a Specialty by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Speciality.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Speciality with id=${id}. Maybe Speciality was not found!`
                });
            } else res.send({ message: "Specialty was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Specialty with id=" + id
            });
        });
};
// Delete a Specialty with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Speciality.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Speciality with id=${id}. Maybe Speciality was not found!`
                });
            } else {
                res.send({
                    message: "Specialty was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Specialty with id=" + id
            });
        });
};
// Delete all Specialitys from the database.
exports.deleteAll = (req, res) => {
    Speciality.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} specialitys were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all specialitys."
            });
        });
};
// Find all published Specialitys
// exports.findAllPublished = (req, res) => {
//
// };
