const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'electronics';
const DOCUMENT_NAME = 'electronic';

const ElectronicsSchema = new Schema({
    manufacturer: { type: String, require: true },
    model: { type: String, require: true },
    color: { type: String, require: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "shop" }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

const ElectronicsEntity = model(DOCUMENT_NAME, ElectronicsSchema);
module.exports = ElectronicsEntity;