const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();

// Create an invoice
router.post('/', async (req, res) => {
    try {
        const { customerName, customerEmail, products, subtotal, tax, total } = req.body;
        const newInvoice = new Invoice({ customerName, customerEmail, products, subtotal, tax, total });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
