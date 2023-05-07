const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'keys';
const DOCUMENT_NAME = 'key';

const ShopSchema = new Schema({
    user: { type: Schema.Types.ObjectId, require: true, ref: "Shop" },
    publicKey: { type: String, trim: true, require: true },
    privateKey: { type: String, trim: true, require: true },
    refreshToken: { type: String, required: true },
    refreshTokenUsed: { type: Array, default: [] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ShopSchema)