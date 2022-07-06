const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    disease_id: {
        type: String,
        required: true,
        trim: true
    },
    disease_type: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

petSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Pet', petSchema);
