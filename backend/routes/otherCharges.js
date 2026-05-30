const express = require('express');
const router = express.Router();

const OtherCharge = require('../models/OtherCharge');


// GET all charges (FILTERED)
router.get('/', async (req, res) => {
    try {

        const { className, chargeType, date, search } = req.query;

        let filter = {};

        // Class filter
        if (className) {
            filter.className = className;
        }

        // Charge type filter (Diary, Book, Trip, etc.)
        if (chargeType) {
            filter.chargeType = chargeType;
        }

        // Date filter (safe same-day range)
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);

            filter.date = {
                $gte: start,
                $lt: end
            };
        }

        // Student search filter
        if (search) {
            filter.studentName = {
                $regex: search,
                $options: "i"
            };
        }

        const charges = await OtherCharge.find(filter)
            .sort({ createdAt: -1 });

        res.json(charges);

    } catch (err) {
        console.error("Other Charges GET error:", err);
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
