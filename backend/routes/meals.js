// routes/meals.js
const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');


// GET all meals
router.get('/', async (req, res) => {
    try {
        const { className } = req.query;

        let filter = {};

        if (className) {
            filter.className = className;
        }

        const meals = await Meal.find(filter).sort({ createdAt: -1 });

        res.json(meals);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// CREATE meal
router.post('/', async (req, res) => {
    try {

        const meal = new Meal(req.body);

        await meal.save();

        res.status(201).json(meal);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
