const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const COLLECTION_NAME = 'products';
const DOCUMENT_NAME = 'product';

const ProductsSchema = new Schema(
    {
        product_name: { type: String, require: true },
        product_slug: { type: String },
        product_thumb: { type: String, require: true },
        product_desc: { type: String, require: true },
        product_price: { type: Number, require: true },
        product_quantity: { type: Number, require: true },
        product_shop: { type: Schema.Types.ObjectId, ref: "shop" },
        product_type: { type: String, requre: true, enum: ["Electronics", "Clothes", "Funiture"] },

        product_rating: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1"],
            max: [5, "Rating must not be above 5"]
        },
        product_variations: { type: Array, default: [] },
        isDraft: { type: Boolean, default: true, index: true, select: false },
        isPublished: { type: Boolean, default: false, index: true, select: false },
        product_attr: { type: Schema.Types.Mixed, require: true }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
)
ProductsSchema.index({ product_name: "text", product_desc: "text" });
//cannot use arrow fnc
ProductsSchema.pre("save", async function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    return next();
})
const ProductEntity = model(DOCUMENT_NAME, ProductsSchema);
module.exports = ProductEntity;