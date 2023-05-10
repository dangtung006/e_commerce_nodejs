const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'products';
const DOCUMENT_NAME = 'product';

const ProductsSchema = new Schema(
    {
        product_name: { type: String, require: true },
        product_thumb: { type: String, require: true },
        product_desc: { type: String, require: true },
        product_price: { type: Number, require: true },
        product_quantity: { type: Number, require: true },
        product_shop: { type: Schema.Types.ObjectId, ref: "shop" },
        product_type: { type: String, requre: true, enum: ["Electronics", "Clothing", "Funiture"] },
        product_attr: { type: Schema.Types.Mixed, require: true }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
)

const ProductEntity = model(DOCUMENT_NAME, ProductsSchema);
module.exports = ProductEntity;