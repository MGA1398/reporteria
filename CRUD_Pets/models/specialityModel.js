const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let specialitySchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

specialitySchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('speciality', specialitySchema);
