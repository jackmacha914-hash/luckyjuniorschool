const express = require('express');
const router = express.Router();

const OtherCharge = require('../models/OtherCharge');


// GET all charges
router.get('/', async (req, res) => {
    try {

        const { className } = req.query;

        let filter = {};

        if (className) {
            filter.className = className;
        }

        const charges = await OtherCharge.find(filter)
            .sort({ createdAt: -1 });

        res.json(charges);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
});


// CREATE charge
router.post('/', async (req, res) => {
    try {

        const charge = new OtherCharge(req.body);

        await charge.save();

        res.status(201).json(charge);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
});

module.exports = router;
