const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'orders';
const DOCUMENT_NAME = 'order';

const OrdersSchema = new Schema({
    order_userId: { type: Number, require: true },
    order_checkouts: { type: Object, default: {} },/* { totalPrice, totalApplyDiscount, feeShip} */
    order_shipping: { type: Object, default: {} },/*{ street, city, country, zipcode, ...}*/
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, require: true },
    order_checkingNumber: { type: String, default: "#0000118062023" },
    order_status: { type: String, enum: ["pending", "confirmed", "shipped", "canceled", "deliveried"] }
}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "modifiedOn"
    }
});

const OrdersEnity = model(DOCUMENT_NAME, OrdersSchema);
module.exports = OrdersEnity;