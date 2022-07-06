const db = require('../models');
const User = db.authDao;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const {log} = require("util");
const secret_key = 'secret123';
// const schema = mongoose.Schema(
//     {
//         name: String,
//         email: String,
//         password: String,
//     }
// );
// schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });
// const User = mongoose.model('User', schema);

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: req.body.isAdmin,
    };
     User.create(newUser, (err, user) =>{
         if( err && err.code === 11000) return res.status(409).send('Email already exists');
         if (err) return res.status(500).send('Server error');
         const expiresIn = 24*60*60;
         const accessToken = jwt.sign({ id: user.id },
             secret_key, { expiresIn: expiresIn
         });
         const dataUser = {
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             accessToken: accessToken,
             expiresIn: expiresIn
         }
         res.send( {dataUser} );
     })
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server Error');
        if(!user) {
            res.status(409).send({ message: 'Something is Wrong'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({ id: user.id}, secret_key, {expiresIn: expiresIn});
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                res.status(409).send({ message: 'Something is Wrong'});
            }
        }
    });
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ? {name: {$regex: new RegExp(name), $options: "i"}} : {};
    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
