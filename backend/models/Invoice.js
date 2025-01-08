const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    products: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    subtotal: Number,
    tax: Number,
    total: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
