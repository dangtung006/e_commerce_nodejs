const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'inventories';
const DOCUMENT_NAME = 'inventory';

const InventorySchema = new Schema({
    invent_productId: { type: Schema.Types.ObjectId, require: true, ref: "product" },
    invent_shopId: { type: Schema.Types.ObjectId, require: true, ref: "shop" },
    invent_stock: { type: Number, require: true },
    invent_location: { type: String, default: "unKnow" },
    invent_reservation: { type: Array, default: [] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const InventoryEntity = model(DOCUMENT_NAME, InventorySchema);
module.exports = InventoryEntity;