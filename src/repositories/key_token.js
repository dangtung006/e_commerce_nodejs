const BaseRepository = require("./base");
const KeyModel = require("../models/key_tokens.model");
const { Types } = require("mongoose");

class KeyRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: KeyModel
        })
    }

    getByUserId(userId) {
        return this._Entity.finOne({ user: Types.ObjectId(userId) }).lean();
    }

    removeById(id) {
        return this._Entity.remove(id);
    }

    removeByUserId() {
        return this._Entity.deleteOne({ user: Types.ObjectId(userId) }).lean();
    }
}

module.exports = new KeyRepository()