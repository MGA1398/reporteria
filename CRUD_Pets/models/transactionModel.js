const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transaction = new Schema({
    patient_id: {
        type: String,
        required: true,
        trim: true
    },
    patient_name: {
        type: String,
        required: true,
        trim: true
    },
    service_id: {
        type: String,
        required: true,
        trim: true
    },
    service_type: {
        type: String,
        required: true,
        trim: true
    },
    service_price: {
        type: Number,
        required: true,
        trim: true
    },
    speciality_id: {
        type: String,
        required: true,
        trim: true
    },
    speciality_type: {
        type: String,
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
    },
    transaction_date: {
        type: Date,
        required: true,
        trim: true
    },
    transaction_description: {
        type: String,
        required: true,
        trim: true
    },
    transaction_amount: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

transaction.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Transaction', transaction);
