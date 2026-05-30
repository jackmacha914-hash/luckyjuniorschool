const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    className: String,
    studentName: String,
    mealType: String,
    date: Date,
    frequency: String,
    amount: Number,
    receiptNumber: String
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);
