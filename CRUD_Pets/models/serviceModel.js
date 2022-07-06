const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let serviceSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

serviceSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('service', serviceSchema);
