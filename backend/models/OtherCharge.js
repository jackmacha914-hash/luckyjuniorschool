const mongoose = require("mongoose");

const otherChargeSchema = new mongoose.Schema({
    className: String,
    studentName: String,
    chargeType: String,
    date: Date,
    amount: Number,
    receiptNumber: String
}, { timestamps: true });

module.exports = mongoose.model("OtherCharge", otherChargeSchema);
