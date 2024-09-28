const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    qty: {
        type: Number,
    },
    price: {
        type: Number,
    },
    mode: {
        type: String,
    }
});

module.exports = { OrdersSchema };