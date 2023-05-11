const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'discounts';
const DOCUMENT_NAME = 'discount';

const DiscountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_desc: { type: String, required: true },
    discount_type: { type: String, enum: ["fixed_amount", "percentage"], default: "fixed_amount" },
    discount_value: { type: Number, required: true },
    discount_code: { type: String, required: true },
    discount_start_date: { type: Date, required: true },
    discount_end_date: { type: Date, required: true },
    discount_max_uses: { type: Number, required: true },
    discount_used_count: { type: Number, required: true },
    discount_user_used: { type: Array, default: [] },
    discount_max_per_user: { type: Number, required: true },
    discount_min_order_value: { type: Number, required: true },
    discount_is_active: { type: Boolean, default: true },
    discount_products_type: { type: String, required: true, enum: ["all", "specific"] },
    discount_products_applied: { type: Array, default: [] },
    discount_shopId: { type: Schema.Types.ObjectId, ref: "shop" }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const DiscountEntity = model(DOCUMENT_NAME, DiscountSchema);
module.exports = DiscountEntity

