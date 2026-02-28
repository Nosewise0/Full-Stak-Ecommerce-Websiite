const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        default: "COD",
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
