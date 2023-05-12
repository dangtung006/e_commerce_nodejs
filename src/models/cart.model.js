const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'carts';
const DOCUMENT_NAME = 'cart';

const CartSchema = new Schema({
    cart_state: { type: String, enum: ["active", "pending", "complete", "failed"] },
    cart_products: { type: Array, require: true, default: [] },
    // [
    //     {
    //         productId , shopId, quantity, price, name
    //     }
    // ]
    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: Number, require: true }
}, {
    collection: COLLECTION_NAME,
    timeseries: {
        createdAt: "createdOn",
        updatedAt: "modifiedOn"
    }
});

const CartEnity = model(DOCUMENT_NAME, CartSchema);
module.exports = CartEnity;