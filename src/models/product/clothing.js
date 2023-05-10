const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'clothes';
const DOCUMENT_NAME = 'clothe';

const ClotheSchema = new Schema({
    brand: { type: String, require: true },
    size: { type: String, require: true },
    material: { type: String, require: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "shop" }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

const ClotheEntity = model(DOCUMENT_NAME, ClotheSchema);
module.exports = ClotheEntity