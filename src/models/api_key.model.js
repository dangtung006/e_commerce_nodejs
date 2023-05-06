const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'apikeys';
const DOCUMENT_NAME = 'apikey';

const ShopSchema = new Schema({
    key: { type: String, require: true, unique: true },
    status: { type: Boolean, default: true },
    permission: { type: [String], require: true, enum: ["1111", "2222", "3333"] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ShopSchema)